# PropulseDev — Règles du projet

## Contexte général

PropulseDev est une agence digitale freelance (je suis un développeur web freelance). J'accompagne les professionnels indépendants (avocats, architectes, restaurateurs, artisans, etc.) à améliorer leur visibilité Google et à inspirer confiance via leur site web.

### Offres
- **Prix fixe** : refonte complète de site web + optimisation SEO, livraison clé en main
- **Abonnement** : gestion des avis Google — QR code à flasher → atterrissage sur mon site → redirection vers Google. Les avis inférieurs à 4 ou 5 étoiles sont filtrés (ne passent pas par le système)

### Cible
Professionnels indépendants ayant besoin d'un bon référencement local (SEO local) et d'un site qui inspire la confiance.

### Ton
Utiliser **"nous"** sur le site (pas "je") pour faire plus professionnel. Le contenu textuel est en français.

## Palette graphique

### Couleurs
- **Fond** : `#050505` (noir profond)
- **Surface** : `#111118` (gris anthracite)
- **Texte** : `#ffffff` (blanc)
- **Accent** : `#c8f000` (vert limon fluo) — utilisé pour les glows, bordures, boutons CTA, chiffres clés et éléments mis en avant

### Polices
- **Titres** : JetBrains Mono (monospace, technique)
- **Corps** : Inter (sans-serif, lisible)
- Le combo **monospace technique + sans-serif épuré** crée un contraste moderne qui renforce l'identité tech/premium

## Stack

- **Framework** : Next.js 15.5 (App Router) + React 19
- **Langage** : TypeScript strict
- **CSS** : Tailwind CSS v4 avec `@theme` dans `globals.css`
- **Polices** : Inter (body, `--font-inter`), JetBrains Mono (titres, `--font-jetbrains-mono`)
- **Déploiement** : Vercel

## Conventions de code

- Pas de point-virgule
- Utiliser `"use client"` pour les composants interactifs
- Exports nommés (`export function X()`), pas de default export
- Imports avec l'alias `@/` (ex: `@/components/site-nav`)
- Typage explicite des props (éviter `React.FC`)
- Exporter `metadata` et `viewport` depuis les pages (`app/`)
- Contenu textuel en français
- `next/link` pour la navigation interne
- Éviter les dépendances externes quand possible

## Palette Tailwind personnalisée

```css
bg-background     → #050505
bg-foreground     → #ffffff
bg-accent         → #c8f000
bg-surface        → #111118
text-accent       → #c8f000
text-foreground   → #ffffff
```

## Structure du projet

```
app/             → Pages Next.js App Router
  page.tsx       → Landing page
  layout.tsx     → Layout racine
  blog/          → Blog
  demos/         → Démonstrations par niche
  solutions/     → Page solutions
  tarifs/        → Page tarifs
  api/contact/   → API route (Formspree)
components/
  ui/            → Composants réutilisables (cursor, typewriter)
  landing/       → Sections de la landing page
  hub/           → Design cards
lib/             → Données et utilitaires (articles.ts, niches.ts)
```

## Commandes

```bash
npm run dev      → Lancer le serveur de dev
npm run build    → Build de production
npm run lint     → Linter (next lint)
npm run start    → Démarrer le serveur de production
```

## Design & Inspiration

- Au début de chaque session, lire `lib/inspiration.md` pour s'imprégner des patterns de design, techniques CSS et idées à adapter
- Utiliser les sites modèles référencés comme référence pour :
  - Structure de landing page (pattern v0)
  - Animations et effets (glow, gradient text, bento grid)
  - Mise en page des sections (process, pricing, features)
  - Typos contrastées (gras/maigre dans les titres)
- Notre accent #c8f000 doit être utilisé pour les glows, bordures et éléments mis en avant

## Mémoire persistante (MCP memory)

- Utiliser les outils `memory` (create_entities, create_relations, add_observations) pour sauvegarder les décisions, préférences et faits importants du projet entre les sessions
- Au début de chaque session, lire le graphe avec `read_graph` ou `search_nodes` pour rappeler le contexte

## Règles générales

- Ne pas ajouter de commentaires dans le code sauf si demandé
- Ne pas créer de fichiers README ou documentation sauf si demandé
- Privilégier les classes Tailwind au CSS custom
- Les nouvelles sections landing vont dans `components/landing/`
- Les données statiques (articles, niches) dans `lib/` sous forme de fichiers TS
