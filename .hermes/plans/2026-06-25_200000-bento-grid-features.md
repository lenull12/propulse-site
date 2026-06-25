# Bento Grid Features — Sous le Hero PropulseDev

> **For Hermes:** Créer `components/landing/feature-grid.tsx`, intégrer dans `app/page.tsx` juste après `<HeroV2 />`.

**Goal:** Ajouter une section bento grid asymétrique sous le hero, inspirée des templates v0 (Nexus/Optimus/Compute), présentant les 6 piliers du site premium PropulseDev.

**Architecture:** Section sombre avec titre centré + grid CSS asymétrique (6 cartes, spans variables). Chaque carte : icône SVG inline + titre + description courte + micro-interaction hover.

**Tech Stack:** Next.js 15.5 + React 19 + TypeScript + Tailwind CSS v4 (pas de dépendance externe).

---

## Référence visuelle (pattern v0)

```
┌──────────────────────────────────────────────────────────────┐
│           Everything you need to ship                        │
│     Tout ce que votre site peut faire pour vous              │
│                                                              │
│  ┌──────────────────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │  🎨                  │ │ ⚡       │ │ 📱               │ │
│  │  Design sur-mesure   │ │ 95+     │ │ Mobile & PWA     │ │
│  │  Pas de template...  │ │ PageSpeed│ │ Adapté à tous... │ │
│  └──────────────────────┘ └──────────┘ └──────────────────┘ │
│                                                              │
│  ┌──────────┐ ┌──────────────────────┐ ┌──────────────────┐ │
│  │ 🔍       │ │ 🤖                   │ │ 🔐               │ │
│  │ SEO local│ │ Chatbot IA intégré   │ │ Clé en main      │ │
│  └──────────┘ └──────────────────────┘ └──────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## Contenu des 6 cartes

### Carte 1 — Design sur-mesure (large, span 2 cols)
- **Icône** : Palette SVG (crayon/pinceau simplifié)
- **Titre** : Design sur‑mesure
- **Description** : Pas de template ni de builder. Un site unique, conçu pour votre métier et vos clients. Chaque couleur, chaque typo, chaque mise en page est pensée pour convertir.
- **Accent visuel** : Fond avec micro-dégradé lime discret

### Carte 2 — Performance (moyen, span 1)
- **Icône** : Éclair SVG
- **Titre** : Vitesse 95+
- **Description** : Votre site charge en moins d'une seconde. Core Web Vitals au vert, Score PageSpeed 95+ garanti.
- **Accent visuel** : Chiffre 95 en grand + lime dans la carte

### Carte 3 — Mobile & PWA (moyen, span 1)
- **Icône** : Smartphone SVG
- **Titre** : Mobile & PWA
- **Description** : 60% de vos clients sont sur mobile. Site responsive, installable comme une app.
- **Accent visuel** : Petit mockup device en bas de carte

### Carte 4 — SEO local (petit, span 1)
- **Icône** : Loupe / cible SVG
- **Titre** : SEO local
- **Description** : Optimisé pour Google, Google My Business, mots‑clés locaux. Soyez trouvé par vos clients.
- **Accent visuel** : Pin / marker icon

### Carte 5 — Chatbot IA (large, span 2 cols)
- **Icône** : Bulles de chat SVG
- **Titre** : Chatbot IA intégré
- **Description** : Un assistant intelligent sur votre site, 24h/24. Il répond aux questions, qualifie les demandes et vous transmet les rendez‑vous par mail. Même quand vous êtes au tribunal ou en rendez‑vous.
- **Accent visuel** : Mini mockup de conversation dans la carte

### Carte 6 — Clé en main (moyen, span 1)
- **Icône** : Clé SVG
- **Titre** : Clé en main
- **Description** : Domaine, hébergement, SSL, sauvegardes, mises à jour : tout est inclus pendant 1 an. Zéro maintenance de votre côté.
- **Accent visuel** : Checkmarks verticaux

---

## Layout grid CSS

```
Grid 3 colonnes desktop, 1 colonne mobile
Spans asymétriques :

Desktop (md+):
┌──────────┬─────┬─────┐
│ design   │perf │pwa  │  → row 1
│ (col 1-3)│(4)  │(5)  │
├─────┬────┴─────┴─────┤
│ SEO │   chatbot IA   │  → row 2
│ (1) │   (col 2-3)    │
├─────┴─────┬──────────┤
│ clé en main│ (col 2-3)│  → row 3 (optionnel — fusionné dans row 2)
└───────────┴──────────┘

Mobile : tout en 1 colonne, ordre conservé.
```

---

## Design tokens

```css
Fond carte         : bg-surface (#111118)
Bordure            : border border-white/[0.06]
Hover bordure      : hover:border-accent/20
Titre              : text-foreground font-sans font-semibold text-lg
Description        : text-gray-400 text-sm leading-relaxed
Icône              : text-accent (lime #c8f000)
Glow hover         : shadow-[0_0_30px_rgba(200,240,0,0.05)]
```

---

## Structure du composant

```tsx
// components/landing/feature-grid.tsx
"use client"

export function FeatureGrid() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Titre section */}
        <div className="text-center mb-16">
          <h2 className="font-sans text-3xl md:text-5xl font-bold text-foreground">
            Tout ce que votre site{" "}
            <span className="text-accent">fait pour vous</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Un site professionnel n'est pas juste une vitrine. C'est un outil
            qui travaille 24h/24 pour attirer, rassurer et convertir vos clients.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
          {/* Cartes avec spans différentes */}
        </div>
      </div>
    </section>
  )
}
```

---

## Icônes SVG inline

Chaque icône est un SVG inline de 24x24 à 32x32, couleur `text-accent`, intégré directement dans le JSX (pas d'import externe). Style : trait (stroke), pas de remplissage.

Exemple pour "Design sur-mesure" (palette) :
```tsx
<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
  <path d="M12 20h9" />
  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
</svg>
```

---

## Plan d'exécution

### Task 1: Créer le composant FeatureGrid (structure + cartes 1-3)

**Files:** Create `components/landing/feature-grid.tsx`

**Code:** Squelette complet avec les 3 premières cartes (design, perf, pwa), icônes SVG inline, spans grid.

### Task 2: Ajouter les cartes 4-6

**Files:** Modify `components/landing/feature-grid.tsx`

**Code:** Ajouter SEO local, Chatbot IA, Clé en main.

### Task 3: Intégration dans page.tsx + validation

**Files:**
- Modify `app/page.tsx` (ajouter import + `<FeatureGrid />` après `<HeroV2 />`)
- Valider `npm run build`

---

## Fichiers impactés

| Fichier | Action |
|---------|--------|
| `components/landing/feature-grid.tsx` | **Créer** |
| `app/page.tsx` | **Modifier** (import + usage) |

---

## Validation

```bash
npx tsc --noEmit && npm run build
```

---

## Questions / options

- **Carte "Chatbot IA"** : le mockup de conversation dans la carte sera-t-il un vrai rendu CSS ou une image ? → CSS simple (mini bulles stylisées)
- **Ordre des cartes** : à ajuster selon l'importance perçue par les clients. L'ordre actuel met le design en premier (impact visuel immédiat)
- **Micro-animations** : hover lift + glow sur chaque carte (CSS uniquement, pas de framer-motion)
