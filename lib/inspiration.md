# Inspiration Design — Sites modèles

## Sites analysés

- **COMPUTE** → `https://v0-compute-11.vercel.app/`
- **OPTIMUS** → `https://v0-optimus-delta.vercel.app/`

---

## Patron commun (v0 landing page)

Les deux sites suivent une structure quasi identique — c'est le pattern le plus performant pour une landing SaaS :

```
NavBar (logo + nav links + CTA buttons)
Hero (titre large + sous-titre + CTA + stats)
  ↓
Logos / social proof (marques client)
  ↓
Capabilities / Features (2-3 sections avec split image/texte)
  ↓
How it works (étapes numérotées)
  ↓
Infrastructure / Global (carte/métriques)
  ↓
Live metrics / Dashboard (stats en temps réel)
  ↓
Integrations (logos des outils partenaires)
  ↓
Security (badges de conformité + cartes)
  ↓
For Developers (SDK / code block)
  ↓
Testimonials (carousel)
  ↓
Pricing (3 cartes)
  ↓
CTA finale (titre + sous-titre + 2 boutons)
  ↓
Footer (logo + colonnes + social)
```

---

## Éléments de design notables

### Typographie

- Titres énormes avec **font-weight mix** (ex: "Distributed compute, agents that automate" → premier mot normal, deuxième en bold/italique)
- Hero en `clamp()` pour la taille fluide
- Alternance gras / fin dans les titres de section (ex: "Global by default." → "Global" en normal, "by default" en bold)
- Texte en français pour nous, mais ce pattern de contraste fonctionne dans toutes les langues

### Accents lumineux / glow

- Bordures et séparateurs avec **overflow hidden + gradient radial** pour créer un halo lumineux
- Images et blocs avec **coins arrondis + glow subtil** derrière
- Chiffres clés (stats) avec **texte en accent color + grande taille**
- Possibilité de remplacer le glow vert/bleu par notre **#c8f000**

### Sections alternées

- `image | texte` puis `texte | image` en miroir (zigzag)
- Ça casse la monotonie et retient l'attention
- Pour nous : une section avec mockup desktop, la suivante avec mockup mobile

### Process en étapes

- Numéros larges (01, 02, 03) ou chiffres romains (I, II, III)
- Chaque étape = titre + description courte
- Parfois reliées par une ligne verticale ou un chemin visuel

### Social proof

- Logos clients en niveaux de gris avec opacité réduite
- Stats percutantes avec logo à côté : "20 days saved on builds → NETFLIX"
- Pour nous : témoignages clients ou chiffres (ex: "+50 sites livrés", "4.9/5 satisfaction")

### Pricing

- 3 colonnes : Starter gratuit / Pro (mis en avant) / Enterprise (custom)
- Bouton CTA dans chaque carte
- Badge "Most Popular" sur la carte Pro
- Pour nous : adapté à nos offres (Prix fixe / Abonnement avis Google / Sur-mesure)

### Code block (section développeur)

- Fond type terminal/IDE
- Highlight syntaxique
- Lignes avec numéros
- Pour nous : peut être remplacé par un aperçu de tableau de bord client

### Section "Live metrics"

- Style dashboard temps réel
- Statistiques qui donnent confiance
- Pour nous : nombre de sites livrés, avis gérés, etc.

---

## Techniques CSS/animations repérées

| Technique | Usage |
|---|---|
| **Position sticky + sections** | Sections qui se chevauchent avec effet de stacking |
| **Gradient text** | Texte hero avec dégradé via `background-clip: text` |
| **Border glow** | `box-shadow` avec couleur accent + spread fluo |
| **Grid asymétrique** | Bento grid (2/3 + 1/3 ou spans variables) |
| **Overflow hidden + pseudo-éléments** | Coins avec gradient radial pour effet lueur |
| **Keyframe pulse** | Animation lente sur les stats/chiffres |
| **Intersection Observer** | Fade-in / slide-up au scroll |
| **Image mask / clip-path** | Formes organiques pour les images |

---

## Idées à adapter pour PropulseDev

1. **Hero** : "Le site web qui vous trouve des clients" avec un texte accent sur "vous trouve"
2. **Stats** : "50+ sites livrés · 4.9/5 satisfaction · 100% SEO optimisé"
3. **Process** : 3 étapes — Audit & Stratégie → Conception & Développement → Lancement & Suivi
4. **Démos** : Remplacer le "for developers" par notre carrousel de démos interactives
5. **Notre twist** : On parle SEO local + avis Google — ce sont nos piliers différenciants
6. **Glow #c8f000** : Utiliser l'accent vert fluo sur les bordures, titres, et chiffres
7. **Témoignages** : Carousel de vrais retours clients (ou mockups si pas encore de clients)
8. **Pricing** : 3 formules — Site clé en main (prix fixe) / Abonnement avis / Sur-mesure

---

## Notes supplémentaires

- Les deux sites sont générés par **v0 (Vercel AI)** — ils partagent donc une structure similaire
- L'ambiance est **dark / tech / premium** — parfait pour notre charte actuelle
- La force du design : **hiérarchie claire**, **espacement généreux**, **contraste entre texte clair et fond foncé**
- À éviter : le sur-empilement de sections inutiles — chaque section doit avoir un objectif précis
