#!/usr/bin/env python3
"""Génère un email d'outreach personnalisé à partir d'un audit JSON.
Usage: python scripts/audit-site.py <url> | python scripts/generate-outreach.py
    ou: python scripts/generate-outreach.py --json audit.json
    ou avec infos prospect: python scripts/generate-outreach.py --url <url> --prenom Jean --nom Dupont --specialite "droit des affaires" --ville Paris
"""

import sys, json, argparse
from pathlib import Path

def select_best_observation(audit: dict, nombre: int = 2) -> list[str]:
    """Sélectionne les observations les plus percutantes pour l'email.
    Priorité : VISIBLE (design, email, navigation) > TECHNIQUE (H1, schema, alt).
    Le prospect doit pouvoir vérifier l'observation en 5 secondes sur son propre site."""
    issues = audit["diagnostic"]["issues"]
    seo = audit["seo"]
    tech = audit["technique"]

    # Niveaux de priorité décroissante
    design_issues = []
    tech_issues = []
    business_issues = []

    for issue in issues:
        # Design visible — ce que l'avocat VOIT
        if any(kw in issue for kw in ["Jimdo", "Wix", "générateur amateur", "template"]):
            design_issues.append(("cms", issue))
        elif any(kw in issue for kw in ["@gmail", "@orange", "@hotmail", "@yahoo", "@free",
                                         "@wanadoo", "@laposte", "@sfr", "@neuf", "@bbox"]):
            design_issues.append(("email", issue))
        elif "ancres" in issue or "one-page" in issue:
            design_issues.append(("nav", issue))
        elif "Google Maps" in issue and "iframe" in issue:
            design_issues.append(("map", issue))
        elif "widget" in issue and "gratuit" in issue:
            design_issues.append(("widget", issue))
        elif "FontAwesome" in issue or "Font Awesome" in issue:
            design_issues.append(("icons", issue))
        elif "balises sémantiques" in issue:
            design_issues.append(("semantic", issue))
        elif "menu sticky" in issue or "menu fixe" in issue or "Menu non fixe" in issue:
            design_issues.append(("sticky", issue))
        elif "polices différentes" in issue or "Times New Roman" in issue:
            design_issues.append(("fonts", issue))
        elif "CSS Grid" in issue or "Flexbox" in issue and "Aucun layout" in issue:
            design_issues.append(("layout", issue))
        elif "couleur d'accent" in issue or "pas de contraste" in issue:
            design_issues.append(("colors", issue))
        elif "photo professionnelle" in issue or "photos de mauvaise qualité" in issue:
            design_issues.append(("photos", issue))
        elif "ombres" in issue and "absence" in issue.lower():
            design_issues.append(("shadows", issue))
        elif "non structurée en sections" in issue:
            design_issues.append(("sections", issue))
        elif "CTA" in issue and "Aucun" not in issue:
            design_issues.append(("cta", issue))

        # Business — perte de clients directe
        elif any(kw in issue for kw in ["formulaire de contact", "pas de lien téléphone",
                                         "pas de formulaire", "lead"]):
            business_issues.append(("form", issue))
        elif "LinkedIn" in issue and "aucun" in issue.lower():
            business_issues.append(("linkedin", issue))

        # Technique — invisible mais important
        elif "H1" in issue:
            tech_issues.append(("h1", issue))
        elif "balisage schema.org" in issue:
            tech_issues.append(("schema", issue))
        elif "alt" in issue.lower() and "image" in issue:
            tech_issues.append(("alt", issue))
        elif "viewport" in issue or "responsive" in issue:
            tech_issues.append(("responsive", issue))
        elif "copyright" in issue or "abandonné" in issue:
            tech_issues.append(("copyright", issue))
        elif "OG image" in issue or "OG title" in issue:
            tech_issues.append(("og", issue))

    # Construire les observations — priorité VISIBLE
    observations = []

    # Prendre d'abord les observations design
    for cat, issue in design_issues:
        if len(observations) >= nombre:
            break
        obs = _build_design_observation(cat, issue, audit)
        if obs:
            observations.append(obs)

    # Compléter avec les observations business
    for cat, issue in business_issues:
        if len(observations) >= nombre:
            break
        obs = _build_business_observation(cat, issue, audit)
        if obs:
            observations.append(obs)

    # Compléter avec les observations techniques
    for cat, issue in tech_issues:
        if len(observations) >= nombre:
            break
        obs = _build_tech_observation(cat, issue, audit)
        if obs:
            observations.append(obs)

    return observations[:nombre]


def _build_design_observation(cat: str, issue: str, audit: dict) -> str | None:
    """Transforme une issue design en observation commerciale percutante."""
    specialite = audit.get("specialite", "[spécialité]")
    ville = audit.get("ville", "[ville]")

    if cat == "cms":
        cms = audit.get("cms", {}).get("cms", "")
        if cms == "Jimdo":
            return (
                "votre site est construit avec Jimdo Creator — un générateur de sites "
                "grand public. Le design est limité et les templates sont les mêmes pour "
                "des centaines de cabinets. Pour un avocat spécialisé, ça manque de sérieux "
                "et ça ne valorise pas votre expertise auprès des justiciables."
            )
        elif cms == "Wix":
            return (
                "votre site est sur Wix — pratique pour démarrer, mais les limitations "
                "de personnalisation et de SEO vous empêchent de vous classer correctement "
                "sur Google quand un prospect cherche « avocat {} {} ».".format(specialite, ville)
            )
    elif cat == "email":
        return (
            "l'adresse email sur votre site utilise un fournisseur grand public "
            "(orange.fr / gmail.com). Quand un justiciable hésite entre deux cabinets, "
            "une adresse @nom-cabinet.fr inspire beaucoup plus confiance qu'une adresse "
            "personnelle."
        )
    elif cat == "nav":
        return (
            "votre navigation utilise des ancres (#) au lieu de vraies pages dédiées. "
            "C'est typique des sites one-page amateurs — et ça limite votre possibilité "
            "d'avoir une page par spécialité bien classée sur Google."
        )
    elif cat == "map":
        return (
            "la carte Google Maps est intégrée brute en iframe sur votre page d'accueil. "
            "Ça ralentit le chargement et ça donne un aspect « bricolé » — sur mobile "
            "c'est encore pire, la carte prend tout l'écran avant que le visiteur ne voie "
            "vos coordonnées."
        )
    elif cat == "widget":
        return (
            "j'ai détecté un widget d'avis gratuit sur votre site. Pour un cabinet "
            "d'avocats, un affichage amateur des avis Google (logo « Free » visible) "
            "donne l'impression que vous négligez votre image en ligne."
        )
    elif cat == "icons":
        return (
            "votre site utilise encore les icônes FontAwesome — un standard graphique "
            "qui datait déjà en 2020. Les sites modernes utilisent des icônes SVG "
            "personnalisées, plus fines et plus professionnelles."
        )
    elif cat == "semantic":
        return (
            "la structure de votre site n'utilise pas les balises HTML modernes "
            "(header, nav, main). Concrètement : Google a plus de mal à comprendre "
            "la hiérarchie de vos informations, ce qui pénalise votre référencement."
        )
    elif cat == "sticky":
        return (
            "votre menu n'est pas fixe (sticky). Sur mobile, un visiteur doit scroller "
            "tout en haut de la page pour naviguer ou vous appeler — 4 visiteurs sur 10 "
            "abandonnent dans ce cas."
        )
    elif cat == "fonts":
        return (
            "votre site utilise des polices qui ne sont plus standards sur le web "
            "professionnel (Times New Roman, différentes polices mélangées). "
            "La typographie, c'est la première chose que le cerveau remarque — "
            "un mélange de polices donne immédiatement une impression d'amateur."
        )
    elif cat == "layout":
        return (
            "la mise en page de votre site n'utilise pas les techniques modernes "
            "(CSS Grid ou Flexbox). Le rendu a une structure rigide qui date "
            "d'avant 2015 — ça se voit au premier coup d'œil."
        )
    elif cat == "colors":
        return (
            "votre site manque de couleurs d'accent — tout est dans des tons "
            "neutres sans point d'ancrage visuel. Un cabinet d'avocats a besoin "
            "d'une identité couleur forte pour être mémorisé."
        )
    elif cat == "photos":
        return (
            "je n'ai pas trouvé de photos professionnelles du cabinet ou de l'avocat "
            "sur votre site. Pour un métier de conseil où la relation humaine est clé, "
            "le visiteur a besoin de voir à qui il va confier son dossier."
        )
    elif cat == "shadows":
        return (
            "votre design est totalement « plat » — pas d'ombre, pas de profondeur. "
            "C'était la mode en 2015, mais aujourd'hui un site sans hiérarchie visuelle "
            "donne l'impression d'être figé, non maintenu."
        )
    elif cat == "sections":
        return (
            "votre page d'accueil n'est pas structurée en sections visuelles claires. "
            "Le visiteur arrive et ne sait pas où poser les yeux — il faut moins de "
            "3 secondes pour qu'il décide de rester ou de partir."
        )
    elif cat == "cta":
        return (
            "il y a très peu de boutons ou liens qui invitent à passer à l'action "
            "(contact, appel, rendez-vous). Un visiteur intéressé doit chercher "
            "comment vous joindre — et souvent, il ne cherche pas."
        )
    return None


def _build_business_observation(cat: str, issue: str, audit: dict) -> str | None:
    """Transforme une issue business en observation percutante."""
    if cat == "form":
        return (
            "il n'y a pas de formulaire de contact sur votre site. Un justiciable qui "
            "a un besoin urgent le soir ou le week-end ne peut pas vous joindre facilement — "
            "il passe au cabinet suivant dans les résultats Google."
        )
    elif cat == "linkedin":
        return (
            "votre site n'a pas de lien vers votre profil LinkedIn ou celui de votre cabinet. "
            "Pour un avocat, c'est un signal fort de crédibilité qui manque."
        )
    return None


def _build_tech_observation(cat: str, issue: str, audit: dict) -> str | None:
    """Transforme une issue technique en observation compréhensible."""
    specialite = audit.get("specialite", "[spécialité]")
    ville = audit.get("ville", "[ville]")

    if cat == "h1":
        return (
            "votre page d'accueil n'a pas de véritable titre structuré (balise H1). "
            "Google ne peut pas identifier clairement votre spécialité, ce qui vous "
            "pénalise sur les recherches « avocat {} {} ».".format(specialite, ville)
        )
    elif cat == "schema":
        return (
            "votre site n'a pas de balisage schema.org. Concrètement : quand un justiciable "
            "cherche un avocat, Google n'affiche pas votre fiche cabinet en haut des résultats — "
            "vos confrères qui l'ont fait captent l'attention avant vous."
        )
    elif cat == "alt":
        total = audit.get("technique", {}).get("images_total", 0)
        sans_alt = audit.get("technique", {}).get("images_without_alt", 0)
        if total > 2:
            return (
                "{} images sur {} n'ont pas de description textuelle (alt). Pour un cabinet "
                "d'avocats, c'est un problème d'accessibilité et un manque SEO qui empêche "
                "vos photos de ressortir dans Google Images.".format(sans_alt, total)
            )
    elif cat == "responsive":
        return (
            "votre site n'est pas optimisé pour le mobile (pas de viewport responsive). "
            "Plus de 60% des recherches d'avocat se font depuis un smartphone — si le site "
            "s'affiche mal, le justiciable ne prend pas le temps d'appeler."
        )
    elif cat == "og":
        return (
            "quand on partage votre site sur LinkedIn ou Facebook, l'aperçu est vide "
            "(pas d'image, pas de description). Pour un cabinet qui travaille avec des "
            "professionnels, c'est votre réputation qui trinque à chaque partage."
        )
    elif cat == "copyright":
        return (
            "le copyright sur votre site date de plusieurs années — ça donne l'impression "
            "d'un site abandonné, même si votre activité est bien réelle. Un détail qui "
            "fait fuir les prospects exigeants."
        )
    return None


def generate_email(audit: dict, prenom: str = "[Prénom]", nom: str = "[Nom]",
                   specialite: str = "[Spécialité]", ville: str = "[Ville]",
                   email_expediteur: str = "contact@propulsedev.fr",
                   canal: str = "email") -> str:
    """Génère l'email ou le message LinkedIn d'outreach complet.
    canal: 'email' (complet) ou 'linkedin' (compact, permission-demand)."""

    # Enrichir l'audit avec les infos prospect pour les observations
    audit["specialite"] = specialite
    audit["ville"] = ville

    observations = select_best_observation(audit, nombre=2)
    domain = audit["domain"]

    # Si pas assez d'observations, en ajouter une générique basée sur les données
    if len(observations) < 2:
        score = audit["diagnostic"]["score"]
        observations.append(
            f"dans l'ensemble, votre site pourrait être mieux optimisé pour attirer "
            f"des clients via Google (score technique : {score}/100). J'ai identifié "
            f"{len(audit['diagnostic']['issues'])} axes d'amélioration concrets."
        )

    obs_text = "\n\n".join(f"• {obs}" for obs in observations)

    # Score pour contextualiser
    score = audit["diagnostic"]["score"]

    # Détection CMS pour personnaliser
    cms = audit["cms"]["cms"]
    cms_mention = ""
    # Vérifier si le CMS a déjà été mentionné dans les observations (éviter doublon)
    obs_text_lower = obs_text.lower()
    cms_already_covered = False
    if cms != "inconnu":
        for kw in [cms.lower(), "jimdo", "générateur", "constructeur"]:
            if kw in obs_text_lower:
                cms_already_covered = True
                break
    if not cms_already_covered:
        if cms == "WordPress":
            cms_mention = (
                f"\n\nJ'ai noté que votre site tourne sous WordPress — un CMS que nous maîtrisons "
                f"parfaitement pour les migrations vers des technologies plus modernes et performantes."
            )
        elif cms == "Joomla":
            cms_mention = (
                f"\n\nJ'ai noté que votre site tourne sous Joomla — un CMS aujourd'hui très peu "
                f"maintenu, pour lequel trouver un développeur devient complexe. Nous proposons "
                f"une migration complète vers une stack moderne (Next.js/Cloudflare)."
            )
        elif cms == "Wix":
            cms_mention = (
                f"\n\nJ'ai noté que votre site est hébergé sur Wix — une solution pratique pour "
                f"démarrer, mais qui limite fortement le référencement local et la personnalisation "
                f"avancée."
            )
        elif cms == "Jimdo":
            cms_mention = (
                f"\n\nJ'ai noté que votre site est construit avec Jimdo Creator — un constructeur "
                f"simple, mais qui ne permet pas un vrai référencement local. Les sites Jimdo sont "
                f"rarement bien classés sur des requêtes concurrentielles comme « avocat {specialite} {ville} »."
            )

    if canal == "linkedin":
        return _linkedin_message(observations, domain, nom, specialite, ville, cms_mention)

    email = f"""Objet : {domain} — 2 points qui vous font perdre des clients sans que vous le sachiez

Bonjour Maître {nom},

En préparant un comparatif des cabinets spécialisés en {specialite} à {ville}, j'ai parcouru votre site {domain}. Deux choses m'ont sauté aux yeux :

{obs_text}

Ces points ne remettent pas en cause la qualité de votre cabinet — mais ils réduisent concrètement le nombre de prospects qui vous contactent via Google.{cms_mention}

Je vous propose un appel découverte de 15 minutes, sans engagement. L'objectif : je vous montre en direct ce que révèle une analyse complète de votre site, et je vous donne 3 actions correctives que vous pouvez appliquer vous-même si vous préférez.

Vous êtes disponible en fin de semaine pour qu'on échange ?

Bien à vous,
Raphaël TRAN
Fondateur, PropulseDev
contact@propulsedev.fr • 06 95 38 27 56
propulsedev.fr

—
PropulseDev — Sites web & SEO pour professions réglementées
50+ sites livrés • Note moyenne 4.9 • Audit gratuit sous 24h
"""
    return email


def _linkedin_message(observations: list[str], domain: str, nom: str,
                      specialite: str, ville: str, cms_mention: str) -> str:
    """Version LinkedIn : plus courte, demande de permission pour envoyer l'audit complet."""
    # Prendre UNE seule observation la plus parlante
    obs = observations[0] if observations else (
        f"j'ai identifié plusieurs optimisations concrètes sur votre site {domain} "
        f"qui pourraient améliorer votre visibilité sur « avocat {specialite} {ville} »."
    )

    message = f"""Bonjour Maître {nom},

J'ai analysé le site de votre cabinet ({domain}) dans le cadre d'un comparatif sur les avocats en {specialite} à {ville}.

Un point m'a frappé : {obs}{cms_mention}

J'ai préparé une note détaillée avec les corrections techniques — je peux vous l'envoyer par email si vous êtes intéressé. Quel est le bon contact ?

Cordialement,
Raphaël TRAN — PropulseDev
propulsedev.fr
"""
    return message


def main():
    parser = argparse.ArgumentParser(description="Génère un email d'outreach à partir d'un audit")
    parser.add_argument("--json", type=str, help="Fichier JSON d'audit (sinon lit stdin)")
    parser.add_argument("--url", type=str, help="URL à auditer directement (lance audit-site.py)")
    parser.add_argument("--domain", type=str, help="Nom de domaine pour chercher dans les audits sauvegardés")
    parser.add_argument("--json-dir", type=str, default=None,
                        help="Dossier des audits sauvegardés (défaut: data/audits/)")
    parser.add_argument("--prenom", type=str, default="[Prénom]")
    parser.add_argument("--nom", type=str, default="[Nom]")
    parser.add_argument("--specialite", type=str, default="[Spécialité]")
    parser.add_argument("--ville", type=str, default="[Ville]")
    parser.add_argument("--canal", type=str, default="email", choices=["email", "linkedin"])
    parser.add_argument("--list-audits", action="store_true", help="Lister les audits disponibles")
    args = parser.parse_args()

    # Lister les audits disponibles si demandé
    if args.list_audits:
        audit_dir = Path(args.json_dir) if args.json_dir else (
            Path(__file__).parent.parent / "data" / "audits")
        if audit_dir.exists():
            files = sorted(audit_dir.glob("*.json"), reverse=True)
            print("Audits disponibles :", file=sys.stderr)
            for f in files:
                data = json.loads(f.read_text())
                domain = data.get("domain", f.stem)
                score = data.get("diagnostic", {}).get("score", "?")
                print(f"  {f.name}  |  {domain}  |  score: {score}", file=sys.stderr)
            if not files:
                print("  (aucun audit dans ce dossier)", file=sys.stderr)
        else:
            print(f"  (dossier {audit_dir} introuvable)", file=sys.stderr)
        return

    # Charger l'audit
    audit = None

    if args.json:
        audit = json.loads(Path(args.json).read_text())
    elif args.domain:
        # Chercher dans les sauvegardes
        audit_dir = Path(args.json_dir) if args.json_dir else (
            Path(__file__).parent.parent / "data" / "audits")
        if not audit_dir.exists():
            print(f"Erreur : dossier {audit_dir} introuvable", file=sys.stderr)
            sys.exit(1)
        # Chercher le fichier le plus récent qui matche le domaine
        safe_domain = args.domain.replace("www.", "")
        candidates = sorted(audit_dir.glob(f"{safe_domain}*.json"), reverse=True)
        if not safe_domain.count(".") > 1 and safe_domain.count(".") == 1:
            # Essaie aussi avec www.
            candidates += sorted(audit_dir.glob(f"www.{safe_domain}*.json"), reverse=True)
        if not candidates:
            print(f"Erreur : aucun audit trouvé pour {args.domain} dans {audit_dir}", file=sys.stderr)
            print("Audits disponibles :", file=sys.stderr)
            for f in sorted(audit_dir.glob("*.json"), reverse=True):
                print(f"  {f.name}", file=sys.stderr)
            sys.exit(1)
        audit_path = candidates[0]
        print(f"✓ Audit chargé : {audit_path}", file=sys.stderr)
        audit = json.loads(audit_path.read_text())
    elif not sys.stdin.isatty():
        audit = json.load(sys.stdin)
    elif args.url:
        # Appel récursif : on lance l'audit puis on génère
        import subprocess
        script = Path(__file__).parent / "audit-site.py"
        result = subprocess.run(
            [sys.executable, str(script), args.url, "--save-only"],
            capture_output=True, text=True
        )
        # Lire la sortie stderr pour trouver le chemin
        if result.returncode != 0:
            print(f"Erreur pendant l'audit : {result.stderr}", file=sys.stderr)
            sys.exit(1)
        # Il faut rerun sans --save-only pour avoir stdout, ou lire le fichier
        result2 = subprocess.run(
            [sys.executable, str(script), args.url, "--no-save"],
            capture_output=True, text=True
        )
        audit = json.loads(result2.stdout)
    else:
        print("Erreur : fournissez --json, --domain, --url, ou pipez le résultat de audit-site.py",
              file=sys.stderr)
        print("\nUsage : python scripts/generate-outreach.py --url <url> --nom ...", file=sys.stderr)
        sys.exit(1)

    if "error" in audit:
        print(f"Erreur d'audit : {audit['error']}", file=sys.stderr)
        sys.exit(1)

    email = generate_email(
        audit,
        prenom=args.prenom,
        nom=args.nom,
        specialite=args.specialite,
        ville=args.ville,
        canal=args.canal
    )
    print(email)


if __name__ == "__main__":
    main()
