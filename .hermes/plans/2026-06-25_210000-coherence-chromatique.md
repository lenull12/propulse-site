# Plan — Cohérence chromatique & séparation des sections

> **For Hermes:** Exécuter task-by-task. Chaque tâche modifie les backgrounds d'une section ou d'un groupe de composants.

**Goal:** Unifier la landing page autour d'un système de couleurs cohérent : fond unique, surfaces neutres, séparateurs uniformes, suppression des sections claires parasites, accent lime exclusif.

**Architecture:** Une palette à 3 tons (pas 8) — fond `#050505`, surface `#0a0a0d` (neutre, sans bleu), accent `#c8f000`. Séparateurs `border-white/[0.04]` partout.

---

## Diagnostic

### Ce qui cloche aujourd'hui

| Problème | Détail |
|----------|--------|
| **3 noirs différents** | `#000000` (hero, process, about), `#050505` (problem, capabilities, contact...), `#0a0a0a` (cards) |
| **Surface bleutée** | `#111118` (bg-surface) a une teinte bleu marine qui jure avec le noir+lime |
| **Sections claires** | LiveMetrics, DemosPreview, Testimonials en `#f5f4f0` — cassent l'immersion dark |
| **Glow parasite** | `#14b8a6` (teal) utilisé dans About et Process — seul `#c8f000` doit briller |
| **Cards incohérentes** | `#0d0d08` (ProductCards), `#0a0a0a` (Process, ProductCards) — chacun sa teinte |
| **Séparateurs aléatoires** | `border-white/5` vs `border-white/10` vs rien — pas de règle |

### Ce qu'on veut

```
┌─────────────────────────────────────────────────┐
│  FOND UNIQUE : #050505 (partout)                │
│                                                 │
│  SURFACE UNIQUE : #0a0a0d (cartes, mockups)     │
│  → noir pur + 2% de luminosité, 0 teinte bleue │
│                                                 │
│  ACCENT UNIQUE : #c8f000 (lime)                 │
│  → glows, bordures actives, icônes, stats       │
│                                                 │
│  SÉPARATEUR UNIQUE : border-t border-white/[0.04]│
│  → entre chaque section                         │
│                                                 │
│  GLOW DÉCORATIF : radial-gradient(#c8f000)      │
│  → jamais de teal, jamais de bleu               │
└─────────────────────────────────────────────────┘
```

---

## Plan d'exécution

### Task 1: Remplacer `bg-surface` (#111118) → `#0a0a0d` dans globals.css

**Objective:** Supprimer la teinte bleu marine du thème.

**Files:** Modify `app/globals.css`

```css
/* Avant */
--color-surface: #111118;

/* Après */
--color-surface: #0a0a0d;
```

**Impact:** Tous les `bg-surface` deviennent neutres, instantanément.

---

### Task 2: FeatureGrid — remplacer `bg-[#0a0a10]` par `bg-surface`

**Objective:** Les illustrations internes (browser mockup, phone) utilisent la surface unifiée.

**Files:** Modify `components/landing/feature-grid.tsx`

Remplacer tous les `bg-[#0a0a10]` par `bg-surface`. ~4 occurrences.

---

### Task 3: Unifier les fonds de section à `#050505`

**Objective:** Toutes les sections utilisent le même noir.

**Files à modifier:**

| Fichier | Actuel | → |
|---------|--------|---|
| `hero-v2.tsx` | `bg-[#000000]` | `bg-background` |
| `process.tsx` | `bg-[#000000]` | `bg-background` |
| `about.tsx` | `bg-[#000000]` | `bg-background` |
| `hero.tsx` (vieux) | `bg-[#000000]` | `bg-background` |

---

### Task 4: Uniformiser les fonds de carte

**Objective:** Toutes les cartes utilisent `bg-surface` (#0a0a0d).

**Files à modifier:**

| Fichier | Actuel | → |
|---------|--------|---|
| `product-cards.tsx` | `bg-[#0d0d08]`, `bg-[#0a0a0a]` | `bg-surface` |
| `process.tsx` | `bg-[#0a0a0a]/40`, `bg-[#0a0a0a]` | `bg-surface` |

---

### Task 5: Passer les sections claires en dark

**Objective:** LiveMetrics, DemosPreview, Testimonials → fond dark.

**Files à modifier:**

| Fichier | Actuel | → |
|---------|--------|---|
| `live-metrics.tsx` | `bg-[#f5f4f0]` + bordures `border-black/5` | `bg-background` + `border-white/[0.04]` |
| `demos-preview.tsx` | `bg-[#f5f4f0]` (tout) | `bg-background` + refonte bordures/couleurs |
| `testimonials.tsx` | `bg-[#f5f4f0]` + `border-black/5` | `bg-background` + `border-white/[0.04]` |

**Attention DemosPreview:** utilise des textes noirs et des boutons blancs → tout passer en thème dark (texte blanc, boutons dark, bordures white/[0.06]).

---

### Task 6: Supprimer les glows parasites (teal → lime)

**Objective:** Remplacer `#14b8a6` par `#c8f000` dans les glows décoratifs.

**Files à modifier:**

| Fichier | Occurrence |
|---------|-----------|
| `about.tsx:57` | `bg-[#14b8a6]` → `bg-[#c8f000]` |
| `process.tsx:82` | `bg-[#14b8a6]` → `bg-[#c8f000]` |

---

### Task 7: Uniformiser les séparateurs de section

**Objective:** `border-t border-white/[0.04]` partout.

**Files à modifier:** Tous les composants landing qui ont `border-t` — vérifier que c'est bien `border-white/[0.04]` ou `border-white/5`.

Actuellement `border-white/5` → passer à `border-white/[0.04]` pour plus de subtilité, ou garder `border-white/5` si c'est déjà cohérent.

---

### Task 8: Build + validation visuelle

```bash
cd C:/Users/Admin/Documents/Projects/PropulseDev && npm run build
```

Vérifier qu'aucune section ne jure, que le passage dark→dark est fluide, que les cartes se fondent naturellement dans le fond.

---

## Fichiers impactés (récapitulatif)

| Fichier | Changement |
|---------|-----------|
| `app/globals.css` | `--color-surface: #0a0a0d` |
| `components/landing/feature-grid.tsx` | `bg-[#0a0a10]` → `bg-surface` |
| `components/landing/hero-v2.tsx` | `bg-[#000000]` → `bg-background` ; `bg-[#0a0a10]` → `bg-surface` |
| `components/landing/process.tsx` | Fond + cartes + glow |
| `components/landing/about.tsx` | Fond + glow |
| `components/landing/product-cards.tsx` | Fonds de carte |
| `components/landing/live-metrics.tsx` | Fond clair → dark |
| `components/landing/demos-preview.tsx` | Fond clair → dark (refonte plus lourde) |
| `components/landing/testimonials.tsx` | Fond clair → dark |
| `components/landing/hero.tsx` | `bg-[#000000]` → `bg-background` (vieux fichier) |

---

## Résultat attendu

```
Avant :  #000000 / #050505 / #0a0a0a / #0d0d08 / #111118 / #f5f4f0 / teal / lime
Après :  #050505 (fond) + #0a0a0d (surface) + #c8f000 (accent) + border-white/[0.04]
```

Une landing qui respire le premium parce qu'elle est visuellement cohérente du premier au dernier pixel.
