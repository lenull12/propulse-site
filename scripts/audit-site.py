#!/usr/bin/env python3
"""Audit express d'un site d'avocat — scraping + analyse SEO/technique.
Usage: python scripts/audit-site.py <url>
Sortie: JSON structuré avec findings + observations prêtes pour l'email."""

import sys, json, re
from pathlib import Path
from urllib.parse import urlparse
import requests
from bs4 import BeautifulSoup

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
}

def fetch(url: str) -> requests.Response:
    """Fetch URL with timeout and error handling."""
    try:
        r = requests.get(url, headers=HEADERS, timeout=20, allow_redirects=True)
        r.raise_for_status()
        return r
    except requests.exceptions.SSLError:
        # Try without SSL verification as fallback
        return requests.get(url, headers=HEADERS, timeout=20, allow_redirects=True, verify=False)
    except Exception as e:
        return None

def detect_cms(soup: BeautifulSoup, url: str, html: str) -> dict:
    """Detect CMS and tech stack from HTML."""
    result = {"cms": "inconnu", "indicators": []}

    # WordPress indicators
    if soup.select_one('meta[name="generator"][content*="WordPress"]'):
        result["cms"] = "WordPress"
        result["indicators"].append("meta generator WordPress")
    elif "wp-content" in html or "wp-includes" in html:
        result["cms"] = "WordPress"
        result["indicators"].append("chemins wp-content/wp-includes")

    # WPML (WordPress Multilingual Plugin)
    if "WPML" in html:
        result["indicators"].append("plugin WPML (multilingue)")

    # Joomla
    if soup.select_one('meta[name="generator"][content*="Joomla"]'):
        result["cms"] = "Joomla"
        result["indicators"].append("meta generator Joomla")
    elif "/media/jui/" in html or "/components/com_" in html:
        result["cms"] = "Joomla (probable)"
        result["indicators"].append("chemins Joomla (/media/jui/, /components/com_)")

    # Wix
    if "wix.com" in html or "Wix.com" in html:
        result["cms"] = "Wix"
        result["indicators"].append("Wix signature")

    # Squarespace
    if "squarespace.com" in html or "Squarespace" in html:
        result["cms"] = "Squarespace"
        result["indicators"].append("Squarespace signature")

    # Jimdo
    if "Jimdo" in html or "jimdo.com" in html:
        result["cms"] = "Jimdo"
        result["indicators"].append("Jimdo signature")

    # Next.js / React
    if soup.select_one("#__next") or "__NEXT_DATA__" in html:
        result["cms"] = "Next.js"
        result["indicators"].append("#__next ou __NEXT_DATA__")

    # PHP brut
    if urlparse(url).path.endswith(".php"):
        result["indicators"].append("URLs en .php")

    # Detect template marketplace names from CSS/JS paths
    template_patterns = re.findall(r'(?:themes|templates)/([\w-]+)/', html)
    if template_patterns:
        unique = list(set(template_patterns))
        result["template_paths"] = unique[:5]

    # Admin panel check
    generator = (soup.select_one('meta[name="generator"]') or {}).get("content", "")
    if generator:
        result["generator_meta"] = generator

    return result

def extract_all(url: str) -> dict:
    """Extract all SEO, technical, and content metrics from a URL."""
    r = fetch(url)
    if r is None:
        return {"error": f"Impossible de charger {url}"}

    html = r.text
    soup = BeautifulSoup(html, "lxml")
    final_url = r.url
    domain = urlparse(final_url).netloc
    is_https = final_url.startswith("https://")

    # === SEO On-page ===
    title = soup.title.string.strip() if soup.title else None
    meta_desc = (soup.select_one('meta[name="description"]') or {}).get("content", "")
    viewport = (soup.select_one('meta[name="viewport"]') or {}).get("content", "")

    h1_tags = [h.get_text(strip=True) for h in soup.select("h1")]
    h1_count = len(h1_tags)

    lang = soup.html.get("lang", "") if soup.html else ""

    og_title = (soup.select_one('meta[property="og:title"]') or {}).get("content", "")
    og_desc = (soup.select_one('meta[property="og:description"]') or {}).get("content", "")
    og_image = (soup.select_one('meta[property="og:image"]') or {}).get("content", "")

    canonical = (soup.select_one('link[rel="canonical"]') or {}).get("href", "")

    # Schema.org JSON-LD
    schema_scripts = soup.select('script[type="application/ld+json"]')
    schema_present = len(schema_scripts) > 0
    schema_types = []
    for s in schema_scripts:
        try:
            data = json.loads(s.string)
            if isinstance(data, dict):
                graph = data.get("@graph", [data])
                if isinstance(graph, list):
                    for item in graph:
                        if isinstance(item, dict):
                            stype = item.get("@type", "")
                            if isinstance(stype, list):
                                schema_types.extend(stype)
                            else:
                                schema_types.append(stype)
        except:
            pass
    schema_types = list(set(schema_types))

    robots = (soup.select_one('meta[name="robots"]') or {}).get("content", "")

    # === Technique ===
    forms_count = len(soup.select("form"))
    images = soup.select("img")
    images_total = len(images)
    images_without_alt = len([img for img in images if not img.get("alt", "").strip()])

    css_count = len(soup.select('link[rel="stylesheet"]'))
    js_count = len(soup.select('script[src]'))

    telephone_links = [a.get("href", "") for a in soup.select('a[href^="tel:"]')]
    mailto_links = [a.get("href", "") for a in soup.select('a[href^="mailto:"]')]

    linkedin_count = len([a for a in soup.select('a[href*="linkedin.com"]')])

    # === Content ===
    body_text = soup.body.get_text(" ", strip=True) if soup.body else ""
    copyright_match = re.search(r"©\s*(\d{4})", body_text)
    copyright_year = copyright_match.group(1) if copyright_match else None

    # Detect CMS
    cms_info = detect_cms(soup, final_url, html)

    # Check for contact form or contact page
    has_contact_form = forms_count > 0
    contact_page_links = len([
        a for a in soup.select('a[href]')
        if any(kw in (a.get("href", "") + a.get_text(strip=True)).lower()
               for kw in ["contact", "contactez", "rendez-vous", "rdv"])
    ])

    # === Diagnostics ===
    issues = []
    good_points = []

    # Title checks
    if not title:
        issues.append("Balise <title> absente — critique SEO")
    elif len(title) < 30:
        issues.append(f"Titre trop court ({len(title)} car.) — doit faire 50-60 car. pour le SEO")
    elif len(title) > 70:
        issues.append(f"Titre trop long ({len(title)} car.) — sera tronqué dans Google")
    else:
        good_points.append(f"Titre bien dimensionné ({len(title)} car. — visible en entier dans Google)")

    # Meta description
    if not meta_desc:
        issues.append("Meta description absente — Google affichera un extrait aléatoire")
    elif len(meta_desc) < 120:
        issues.append(f"Meta description trop courte ({len(meta_desc)} car.) — visez 150-160 car.")
    elif len(meta_desc) > 160:
        issues.append(f"Meta description trop longue ({len(meta_desc)} car.) — sera tronquée")
    else:
        good_points.append("Meta description bien calibrée")

    # H1
    if h1_count == 0:
        issues.append("Aucune balise H1 — un des pires manques SEO sur une page")
    elif h1_count > 1:
        issues.append(f"{h1_count} balises H1 — une seule est recommandée")
    else:
        good_points.append("1 H1 unique présent")

    # Viewport
    if not viewport or "width=device-width" not in viewport:
        issues.append("Pas de meta viewport 'width=device-width' — site probablement non responsive")
    else:
        good_points.append("Viewport responsive présent")

    # Language
    if not lang or not lang.startswith("fr"):
        issues.append(f"Attribut lang manquant ou pas en français ({lang or 'absent'}) — impact SEO local")
    else:
        good_points.append(f"Langue déclarée : {lang}")

    # OG tags
    if not og_title:
        issues.append("OG title manquant — mauvais aperçu lors du partage LinkedIn/Facebook")
    if not og_image:
        issues.append("OG image manquante — partage sans visuel = taux de clic divisé par 3")

    # Canonical
    if not canonical:
        issues.append("Canonical absent — risque de duplicate content")

    # Schema
    if not schema_present:
        issues.append("Aucun balisage schema.org — pas de rich snippet Google (carte cabinet, avis...)")
    else:
        schema_str = ", ".join(schema_types) if schema_types else "présent"
        has_legal = any(t in ["LegalService", "Attorney", "Organization"] for t in schema_types)
        if has_legal:
            good_points.append(f"Schema.org présent ({schema_str}) — peut générer des rich snippets Google")
        else:
            good_points.append(f"Schema.org présent mais pas de type LegalService/Attorney ({schema_str})")

    # Images alt
    if images_total > 0:
        pct = round(images_without_alt / images_total * 100)
        if pct > 50:
            issues.append(f"{images_without_alt}/{images_total} images sans attribut alt ({pct}%) — problème d'accessibilité et SEO images")
        elif pct > 0:
            issues.append(f"Quelques images sans alt ({images_without_alt}/{images_total})")
        else:
            good_points.append(f"Toutes les images ({images_total}) ont un attribut alt")

    # CSS/JS bloat
    if css_count > 10:
        issues.append(f"{css_count} fichiers CSS chargés — lourd, pas de bundling/optimisation")
    if js_count > 15:
        issues.append(f"{js_count} fichiers JS externes — temps de chargement pénalisé")

    # HTTPS
    if not is_https:
        issues.append("Site en HTTP (non sécurisé) — Google pénalise + les visiteurs voient 'Non sécurisé'")

    # Contact form
    if not has_contact_form:
        issues.append("Aucun formulaire de contact — les leads passent à côté")
    else:
        good_points.append(f"Formulaire de contact présent ({forms_count} formulaire(s))")

    # Telephone
    if not telephone_links:
        issues.append("Pas de lien téléphone cliquable (tel:) — gênant sur mobile")
    else:
        good_points.append("Numéro de téléphone cliquable présent")

    # Copyright year
    if copyright_year and int(copyright_year) < 2025:
        issues.append(f"Copyright {copyright_year} — peut donner l'impression d'un site abandonné")

    # CMS issues
    if cms_info["cms"] in ["WordPress", "Joomla"] and cms_info.get("generator_meta"):
        issues.append(f"Meta generator expose la version du CMS ({cms_info['generator_meta'][:60]}...) — fail sécurité")

    if cms_info.get("template_paths"):
        issues.append(f"Template détectable dans les chemins ({', '.join(cms_info['template_paths'][:3])}) — site générique")

    if cms_info["cms"] == "Joomla":
        issues.append("Joomla : CMS obsolète, difficile à maintenir. Page admin souvent exposée (/administrator/)")

    # LinkedIn
    if linkedin_count == 0:
        issues.append("Aucun lien LinkedIn — manque de preuve sociale pour un cabinet d'avocats")

    # === Analyse design ===
    design_obs = analyze_design(soup, html, cms_info, final_url)
    issues.extend(design_obs["issues"])
    good_points.extend(design_obs["good_points"])

    # === Score ===
    score = 100 - len(issues) * 5
    score = max(0, min(100, score))

    return {
        "url": final_url,
        "domain": domain,
        "https": is_https,
        "seo": {
            "title": title,
            "title_length": len(title) if title else 0,
            "meta_description": meta_desc,
            "meta_description_length": len(meta_desc),
            "h1_tags": h1_tags,
            "h1_count": h1_count,
            "viewport": viewport,
            "language": lang,
            "og_title": og_title,
            "og_description": og_desc,
            "og_image": og_image,
            "canonical": canonical,
            "robots": robots,
            "schema_ld_json": schema_present,
            "schema_types": schema_types,
        },
        "technique": {
            "css_files": css_count,
            "js_files": js_count,
            "forms": forms_count,
            "images_total": images_total,
            "images_without_alt": images_without_alt,
            "telephone_links": telephone_links,
            "mailto_links": mailto_links,
            "linkedin_links": linkedin_count,
            "contact_page_indicators": contact_page_links,
            "copyright_year": copyright_year,
        },
        "cms": cms_info,
        "diagnostic": {
            "score": score,
            "issues": issues,
            "good_points": good_points,
        }
    }


def analyze_design(soup: BeautifulSoup, html: str, cms_info: dict, site_url: str) -> dict:
    """Analyse les signes de design daté / amateur dans le HTML structuré."""
    issues = []
    good = []

    # 1. CMS bas de gamme
    cms = cms_info.get("cms", "")
    if cms == "Jimdo":
        issues.append("Site construit avec Jimdo Creator — un générateur amateur aux templates très limités, design rarement à jour")
    elif cms == "Wix":
        issues.append("Site hébergé sur Wix — constructeur grand public, pas de référencement local sérieux possible")

    # 2. Email perso au lieu d'email professionnel
    personal_domains = ["gmail.com", "orange.fr", "yahoo.fr", "hotmail.fr", "hotmail.com",
                        "free.fr", "wanadoo.fr", "laposte.net", "sfr.fr", "neuf.fr", "bbox.fr"]
    email_pattern = r'[\w.+-]+@([\w.-]+\.\w{2,})'
    found_domains = re.findall(email_pattern, html)
    for domain in found_domains:
        domain_clean = domain.lower().strip()
        for pd in personal_domains:
            if pd in domain_clean:
                issues.append(f"Email en @{pd} — pour un cabinet d'avocats, une adresse @{pd} ne rassure pas. Attendu : prenom@nom-cabinet.fr")
                break

    # 3. Navigation par ancres (#section) = site one-page amateur
    all_links = soup.select('a[href^="#"]')
    hash_links = [a for a in all_links if a.get("href", "#") != "#" and a.get("href", "") not in ("#", "")]
    if len(hash_links) > 2:
        issues.append(f"Navigation par ancres ({len(hash_links)} liens en #) — structure one-page qui limite le SEO et donne un aspect amateur")

    # 4. Iframe Google Maps brute sur la homepage
    maps_iframes = [i for i in soup.select("iframe") if "google" in (i.get("src", "") + (i.get("title", "") or "")).lower()]
    if maps_iframes:
        issues.append("Widget Google Maps intégré en iframe sur l'accueil — ralentit le chargement, donne un aspect non professionnel")

    # 5. Widgets gratuits / "Free" badges
    if re.findall(r'(?i)(free|gratuit).{0,30}(review|avis|rating)', html):
        issues.append("Widget d'avis gratuit détecté — pour un cabinet d'avocats, un affichage amateur des avis Google donne une impression de manque de sérieux")

    # 6. FontAwesome (icônes génériques = design qui date)
    fa_icons = len(soup.select('i[class*="fa-"], i[class*="fa "], span[class*="fa-"], span[class*="fa "]'))
    if fa_icons > 5:
        issues.append(f"Icônes FontAwesome génériques ({fa_icons}) — ces icônes dataient déjà en 2020. Les sites modernes utilisent des SVG personnalisés")
    elif fa_icons > 0:
        issues.append("Icônes FontAwesome utilisées — design qui commence à dater, préférez des icônes modernes (SVG, lignes fines)")

    # 7. Balises HTML5 sémantiques modernes
    semantic_count = len(soup.select("header, footer, nav, main, section, article, aside"))
    if semantic_count < 3:
        issues.append("Structure HTML sans balises sémantiques (header, nav, main, section) — code non structuré, mauvais SEO")
    else:
        good.append(f"Structure HTML sémantique correcte ({semantic_count} balises modernes)")

    # 8. Menu sticky
    has_sticky = bool(soup.select('[class*="sticky"], [class*="fixed"], [data-sticky]'))
    if not has_sticky and semantic_count >= 3:
        issues.append("Pas de menu sticky — sur mobile, 40% des visiteurs partent quand ils doivent scroller pour retrouver la navigation")

    # 9. Section héro
    if not soup.select("[class*='hero'], [class*='banner'], [class*='cover']"):
        pass  # pas forcément critique

    return {"issues": issues, "good_points": good}


def _default_output_path(domain: str) -> str:
    """Génère le chemin par défaut : data/audits/{domain}-{YYYY-MM-DD}.json"""
    from datetime import date
    today = date.today().isoformat()  # YYYY-MM-DD
    audit_dir = Path(__file__).parent.parent / "data" / "audits"
    audit_dir.mkdir(parents=True, exist_ok=True)
    safe_domain = domain.replace("www.", "")
    return str(audit_dir / f"{safe_domain}-{today}.json")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Audit SEO/technique express d'un site")
    parser.add_argument("url", nargs="?", help="URL du site à auditer")
    parser.add_argument("--output", "-o", type=str, default=None,
                        help="Chemin du fichier JSON de sortie (défaut: data/audits/{domain}-{date}.json)")
    parser.add_argument("--no-save", action="store_true",
                        help="Ne pas sauvegarder, afficher sur stdout uniquement")
    parser.add_argument("--save-only", action="store_true",
                        help="Sauvegarder sans afficher sur stdout")
    args = parser.parse_args()

    if not args.url:
        print("Usage: python scripts/audit-site.py <url> [--output chemin] [--no-save] [--save-only]",
              file=sys.stderr)
        sys.exit(1)

    url = args.url
    if not url.startswith("http"):
        url = "https://" + url

    result = extract_all(url)

    if "error" in result:
        print(result["error"], file=sys.stderr)
        sys.exit(1)

    # Sauvegarde automatique
    if not args.no_save:
        output_path = args.output or _default_output_path(result["domain"])
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print(f"✓ Audit sauvegardé : {output_path}", file=sys.stderr)

    # Affichage stdout (sauf si --save-only)
    if not args.save_only:
        print(json.dumps(result, ensure_ascii=False, indent=2))
