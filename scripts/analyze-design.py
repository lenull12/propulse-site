#!/usr/bin/env python3
"""Analyse le design visuel d'un site via screenshot + modèle vision.
Usage: python scripts/analyze-design.py <screenshot.png>"""

import sys, json, base64, os
from pathlib import Path
from openai import OpenAI

DESIGN_PROMPT = """Tu es un expert en design web spécialisé dans l'audit de sites de cabinets d'avocats.

Analyse ce screenshot de page d'accueil et identifie les points de design VISIBLES.
Sois précis et factuel. Pour chaque point, dis si c'est un problème ou un point positif.

Structure ta réponse en EXACTEMENT 6 catégories :

1. PREMIÈRE IMPRESSION (1 phrase simple : site moderne/professionnel/daté/amateur ?)
2. TYPOGRAPHIE (polices utilisées, hiérarchie, lisibilité, tailles)
3. COULEURS (palette, contrastes, harmonie, utilisation des couleurs)
4. MISE EN PAGE (structure, espacement, équilibre, grille)
5. PHOTOS/VISUELS (qualité des images, présence de photos du cabinet/avocat)
6. PROBLÈMES CRITIQUES (top 3 des choses qui sautent aux yeux en négatif)

Pour chaque catégorie, réponds en 1-2 phrases maximum.
Format : CATÉGORIE: phrase d'analyse"""


def analyze_screenshot(image_path: str, model: str = "xiaomi/mimo-v2.5",
                       base_url: str = "https://opencode.ai/zen/go/v1",
                       api_key: str = "") -> dict:
    """Envoie le screenshot au modèle vision et retourne l'analyse design."""

    # Lire l'image en base64
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")

    ext = Path(image_path).suffix.lower()
    mime = "image/png" if ext == ".png" else "image/jpeg"

    client = OpenAI(base_url=base_url, api_key=api_key or os.environ.get("OPENROUTER_API_KEY", "EMPTY"))

    response = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": DESIGN_PROMPT},
                    {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{b64}"}}
                ]
            }
        ],
        max_tokens=800,
        temperature=0.1
    )

    content = response.choices[0].message.content

    # Parser la réponse structurée
    result = {"raw": content, "categories": {}}
    current_cat = None
    for line in content.split("\n"):
        line = line.strip()
        if not line:
            continue
        for cat in ["PREMIÈRE IMPRESSION", "TYPOGRAPHIE", "COULEURS",
                     "MISE EN PAGE", "PHOTOS/VISUELS", "PROBLÈMES CRITIQUES"]:
            if line.upper().startswith(cat + ":"):
                result["categories"][cat] = line[len(cat)+1:].strip()
                current_cat = cat
                break
            elif line.upper().startswith(cat):
                result["categories"][cat] = line[len(cat):].strip()
                current_cat = cat
                break
        else:
            if current_cat and current_cat in result["categories"]:
                result["categories"][current_cat] += " " + line

    return result


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/analyze-design.py <screenshot.png>", file=sys.stderr)
        sys.exit(1)

    path = sys.argv[1]
    if not os.path.exists(path):
        print(f"Erreur: fichier {path} introuvable", file=sys.stderr)
        sys.exit(1)

    result = analyze_screenshot(path)
    print(json.dumps(result, ensure_ascii=False, indent=2))
