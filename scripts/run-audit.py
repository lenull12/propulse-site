#!/usr/bin/env python3
"""Pipeline complet : audit SEO + design metrics + génération email.
Usage: python scripts/run-audit.py <url> [options]

Options:
  --prenom PRENOM      Prénom du prospect
  --nom NOM            Nom du prospect
  --specialite SPÉ      Spécialité (ex: "droit du travail")
  --ville VILLE        Ville du cabinet
  --canal {email,linkedin}  Canal de sortie (défaut: email)
  --no-email           Ne pas générer l'email, juste l'audit
  --force              Ré-analyser même si l'audit existe déjà aujourd'hui
"""

import sys, json, os, subprocess, argparse, re
from pathlib import Path
from datetime import date
import time

SCRIPT_DIR = Path(__file__).parent
PROJECT_DIR = SCRIPT_DIR.parent
DATA_DIR = PROJECT_DIR / "data"
AUDITS_DIR = DATA_DIR / "audits"
SCREENSHOTS_DIR = DATA_DIR / "screenshots"

PYTHON = "C:/Users/Admin/AppData/Local/Programs/Python/Python311/python.exe"
NODE = "node"


def ensure_dirs():
    AUDITS_DIR.mkdir(parents=True, exist_ok=True)
    SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)


def safe_domain(url: str) -> str:
    """Extract domain without www."""
    m = re.search(r'https?://(?:www\.)?([^/]+)', url)
    return m.group(1).replace(".", "-") if m else url.replace("https://", "").replace("/", "_")


def run_cmd(cmd: list, label: str, timeout: int = 60) -> str:
    """Run a command and return stdout."""
    print(f"\n[{label}] {' '.join(str(c) for c in cmd)}", file=sys.stderr)
    start = time.time()
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
    elapsed = time.time() - start
    print(f"  → {elapsed:.1f}s (exit: {result.returncode})", file=sys.stderr)
    if result.returncode != 0:
        print(f"  ⚠ stderr: {result.stderr[:500]}", file=sys.stderr)
    return result.stdout


def main():
    parser = argparse.ArgumentParser(description="Pipeline complet d'audit PropulseDev")
    parser.add_argument("url", help="URL du site à auditer")
    parser.add_argument("--prenom", default="[Prénom]")
    parser.add_argument("--nom", default="[Nom]")
    parser.add_argument("--specialite", default="[Spécialité]")
    parser.add_argument("--ville", default="[Ville]")
    parser.add_argument("--canal", default="email", choices=["email", "linkedin"])
    parser.add_argument("--no-email", action="store_true", help="Ne pas générer l'email")
    parser.add_argument("--force", action="store_true", help="Forcer la ré-analyse")
    args = parser.parse_args()

    ensure_dirs()
    sdomain = safe_domain(args.url)
    today = date.today().isoformat()

    # Chemins de sortie
    audit_path = AUDITS_DIR / f"{sdomain}-{today}.json"
    design_path = AUDITS_DIR / f"{sdomain}-{today}-design.json"
    screenshot_path = SCREENSHOTS_DIR / f"{sdomain}-{today}.png"

    # 1. Screenshot via Puppeteer
    if args.force or not screenshot_path.exists():
        run_cmd([
            NODE, str(SCRIPT_DIR / "screenshot.js"),
            args.url, str(screenshot_path)
        ], "📸 Screenshot")
    else:
        print(f"[📸] Screenshot déjà existant: {screenshot_path}", file=sys.stderr)

    # 2. Design metrics via Puppeteer
    if args.force or not design_path.exists():
        run_cmd([
            NODE, str(SCRIPT_DIR / "extract-design-metrics.js"),
            args.url, str(design_path)
        ], "🎨 Design metrics", timeout=30)
    else:
        print(f"[🎨] Design déjà analysé: {design_path}", file=sys.stderr)

    design_data = json.loads(design_path.read_text())

    # 3. Audit SEO/technique
    if args.force or not audit_path.exists():
        seo_raw = run_cmd([
            PYTHON, str(SCRIPT_DIR / "audit-site.py"),
            args.url, "--save-only", "--output", str(audit_path)
        ], "🔍 Audit SEO", timeout=20)
        audit_data = json.loads(audit_path.read_text())
    else:
        print(f"[🔍] Audit SEO déjà existant: {audit_path}", file=sys.stderr)
        audit_data = json.loads(audit_path.read_text())

    # 4. Fusionner les données design dans l'audit
    audit_data["design"] = design_data

    # Ajouter des observations design au diagnostic
    design_issues = []
    design_good = []

    # 4a. Analyse des polices
    fonts = design_data.get("typography", {}).get("fontFamilies", [])
    if len(fonts) > 3:
        design_issues.append(f"{len(fonts)} polices différentes utilisées ({', '.join(fonts[:4])}) — pas de hiérarchie typographique cohérente, aspect amateur")
    if any("Times New Roman" in f for f in fonts):
        design_issues.append("Police Times New Roman détectée — cette police a disparu du web professionnel depuis 2015. À remplacer par Inter, Lora ou Merriweather")

    # 4b. Sémantique HTML
    sem = design_data.get("layout", {}).get("semanticTags", {})
    missing_sem = [k for k, v in sem.items() if not v]
    if len(missing_sem) == 5:
        design_issues.append("Aucune balise HTML5 sémantique (header, nav, main, footer, article) — structure en « soupe de divs », mauvaise pour le SEO et l'accessibilité")
    elif len(missing_sem) > 2:
        design_issues.append(f"Balises sémantiques manquantes : {' ,'.join(missing_sem)} — le site n'utilise pas la structure HTML moderne")

    # 4c. Layout moderne
    if not design_data.get("layout", {}).get("usesCSSGrid") and not design_data.get("layout", {}).get("usesFlexbox"):
        design_issues.append("Aucun layout moderne (ni CSS Grid, ni Flexbox) — technique de mise en page qui date d'avant 2015")
    if design_data.get("layout", {}).get("usesCSSGrid"):
        design_good.append("Utilisation de CSS Grid — mise en page moderne")

    # 4d. Couleurs
    if not design_data.get("colors", {}).get("hasAccentColor"):
        design_issues.append("Pas de couleur d'accent/secondaire — le design manque de contraste et de hiérarchie visuelle")

    # 4e. Photos professionnelles
    pro_photos = design_data.get("images", {}).get("professionalSize", 0)
    total_imgs = design_data.get("images", {}).get("total", 0)
    if total_imgs > 0 and pro_photos == 0:
        design_issues.append(f"Aucune photo professionnelle ({total_imgs} images mais toutes en petit format ou icônes) — un cabinet d'avocats sans photo du cabinet ou de l'avocat rassure moins")
    elif total_imgs > 0 and pro_photos < total_imgs * 0.3:
        design_issues.append(f"Seulement {pro_photos}/{total_imgs} photos en format professionnel — les images de mauvaise qualité nuisent à la crédibilité")

    # 4f. Ombres et profondeur
    if design_data.get("layout", {}).get("shadows", 0) == 0:
        design_issues.append("Absence totale d'ombres et de profondeur visuelle — design « plat » qui donne un aspect vieillot")

    # 4g. Sticky header
    if not design_data.get("layout", {}).get("hasStickyHeader"):
        design_issues.append("Menu non fixe (non sticky) — navigation inconfortable sur mobile, le visiteur perd le fil")

    # 4h. Sections structurées
    if design_data.get("layout", {}).get("sections", 0) == 0:
        design_issues.append("Page d'accueil non structurée en sections visuelles — pas de hiérarchie claire, le visiteur ne sait pas où regarder")

    # 4i. CTA
    cta_count = design_data.get("cta", {}).get("totalCTALinks", 0)
    if cta_count == 0:
        design_issues.append("Aucun bouton d'appel à l'action (CTA) — le visiteur ne sait pas quoi faire après avoir lu")
    elif cta_count < 3 and total_imgs > 0:
        design_issues.append(f"Seulement {cta_count} CTA visibles — pas assez d'invitations à passer à l'action")

    # Ajouter au diagnostic existant
    audit_data["diagnostic"]["design_issues"] = design_issues
    audit_data["diagnostic"]["design_good"] = design_good
    audit_data["diagnostic"]["issues"].extend(design_issues)
    audit_data["diagnostic"]["good_points"].extend(design_good)

    # Recalculer score
    audit_data["diagnostic"]["score"] = max(0, min(100, 100 - len(audit_data["diagnostic"]["issues"]) * 4))

    # Sauvegarder l'audit enrichi
    with open(audit_path, "w", encoding="utf-8") as f:
        json.dump(audit_data, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Audit complet sauvegardé: {audit_path}", file=sys.stderr)
    print(f"   Score: {audit_data['diagnostic']['score']}/100", file=sys.stderr)
    print(f"   Issues: {len(audit_data['diagnostic']['issues'])}", file=sys.stderr)

    # 5. Générer l'email
    if not args.no_email:
        email = run_cmd([
            PYTHON, str(SCRIPT_DIR / "generate-outreach.py"),
            "--json", str(audit_path),
            "--prenom", args.prenom,
            "--nom", args.nom,
            "--specialite", args.specialite,
            "--ville", args.ville,
            "--canal", args.canal
        ], "📧 Génération email", timeout=10)
        print(f"\n{'-'*60}\nEMAIL GÉNÉRÉ\n{'-'*60}\n")
        print(email)


if __name__ == "__main__":
    main()
