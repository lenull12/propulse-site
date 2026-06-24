#!/usr/bin/env python3
"""Test quel modèle supporte la vision sur le provider opencode-go.
Usage: python scripts/test-vision-model.py <screenshot.png> [model_name]
Défaut: qwen3.7-plus"""

import sys, json, base64, os
from pathlib import Path
from openai import OpenAI

PROMPT = "Décris ce que tu vois dans cette image en 2 phrases maximum."


def test_model(image_path: str, model: str, base_url: str = "https://opencode.ai/zen/go/v1",
               api_key: str = "") -> str:
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    ext = Path(image_path).suffix.lower()
    mime = "image/png" if ext == ".png" else "image/jpeg"

    client = OpenAI(base_url=base_url, api_key=api_key or os.environ.get("OPENROUTER_API_KEY", ""))
    response = client.chat.completions.create(
        model=model,
        messages=[{
            "role": "user",
            "content": [
                {"type": "text", "text": PROMPT},
                {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{b64}"}}
            ]
        }],
        max_tokens=200,
        temperature=0.1
    )
    return response.choices[0].message.content


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/test-vision-model.py <screenshot.png> [model]", file=sys.stderr)
        sys.exit(1)

    path = sys.argv[1]
    model = sys.argv[2] if len(sys.argv) > 2 else "qwen3.7-plus"

    if not os.path.exists(path):
        print(f"Erreur: {path} introuvable", file=sys.stderr)
        sys.exit(1)

    print(f"Test du modèle {model}...", file=sys.stderr)
    try:
        result = test_model(path, model)
        print(f"✅ {model} fonctionne!")
        print(f"Réponse: {result}")
    except Exception as e:
        print(f"❌ {model} a échoué: {e}")
