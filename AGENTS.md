# PropulseDev — Règles du projet

## Contexte général

PropulseDev est une agence digitale freelance (je suis un développeur web freelance). J'accompagne les professionnels indépendants (avocats, architectes, restaurateurs, artisans, etc.) à améliorer leur visibilité Google et à inspirer confiance via leur site web.

### Offres
- **Prix fixe** : refonte complète site web + optimisation SEO (Starter 1 000€ / Pro 2 000€ / Premium 3 500€)
- **Abonnements mensuels** (résiliables à tout moment) :
  - **Zen** 29 €/mois — hébergement, domaine, màj sécurité, backups, 2 modifs/mois
  - **Performance** 59 €/mois — Zen + audit SEO mensuel + suivi classement, 5 modifs/mois
  - **Business** 89 €/mois — Performance + filtrage avis Google + prioritaire, 10 modifs/mois
- **Paiement** : 30% acompte, 70% à la mise en ligne

### Cible
Professionnels indépendants ayant besoin d'un bon référencement local (SEO local) et d'un site qui inspire la confiance.

### Ton
Utiliser **"nous"** sur le site (pas "je") pour faire plus professionnel. Le contenu textuel est en français.

## Flux client

```
1. Contact via formulaire /contact
2. Audit gratuit (analyse site + concurrence, 24-48h)
3. Proposition devis + signature (30% acompte)
4. Conception du site (preview partagée)
5. Relecture + ajustements
6. Mise en ligne + solde 70%
7. Abonnement mensuel (optionnel, résiliable à tout moment)
   → Zen / Performance / Business
8. Modifications : client demande → on modifie (compteur de modifs)
   → Résiliation : mail → zip du site + transfert domaine si besoin
   → Le site appartient au client, pas de blocage
```

### Définition d'une modification

| Type | Compteur |
|---|---|
| Modifier un texte existant | 1 |
| Changer une photo | 1 |
| Modifier horaire/téléphone/lien | 1 |
| Publier 1 article de blog | 1 |
| Nouvelle page | 2 |
| Nouvelle section | 3 |
| Refonte / gros changement | Devis dédié |

Pas de CMS headless. Le client demande → on modifie.

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
- **Déploiement** : Cloudflare Pages

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
  contact/       → Page contact avec formulaire
  cgv/           → Conditions générales de vente
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

## SEO Blog

Le blog est le principal levier d'acquisition organique. Chaque article doit respecter les règles suivantes :

### Structure d'un article
- **Titre (H1)** : 50-60 caractères, accroche + mot-clé principal, pas de clickbait
- **Introduction** : 100-150 mots, décrit le problème + annonce la solution, mot-clé dans le premier paragraphe
- **Corps** : 800-1200 mots, 3-4 sous-parties (H2), paragraphes courts (2-4 phrases), un H3 par H2 si nécessaire
- **Conclusion** : 80-100 mots, résumé + CTA doux vers "/contact"
- **Liens internes** : 2-3 liens vers d'autres articles du blog + 1 lien vers une page service ou la page contact
- **Pas de liens externes sortants** dans le corps (sauf source indispensable → alors en note de bas de page)

### SEO on-page
- **Méta description** : 150-160 caractères, mot-clé principal présent, promesse de valeur
- **URL (slug)** : mot-clé principal en kebab-case, pas de stop words
- **Schéma JSON-LD** : `Article` obligatoire (name, description, datePublished, author) — à injecter dans le `<head>` via la page `[slug]/page.tsx`
- **Mots-clés** : 1 mot-clé principal + 2-3 mots-clés longue traîne naturels
- **E-E-A-T** : ton expert, pas générique. Phrases courtes, données chiffrées, exemples concrets
- **GEO (Generative Engine Optimization)** : contenu qui répond à des questions précises = cité par ChatGPT/Perplexity

### Contenu
- **Longue traîne avant tout** : "créer un site d'avocat à Lyon" plutôt que "création site web"
- **Ton** : "nous", professionnel mais pas jargonneux. Le lecteur doit comprendre sans être expert
- **Villes cibles** : Lyon, Paris, Marseille, Bordeaux, Lille, Toulouse, Nice
- **Métiers cibles** : avocats, artisans, architectes, restaurateurs, experts-comptables, kinés, dentistes, notaires
- **Fréquence** : 2-3 articles par mois minimum
- **Engagement** : pas de contenu putaclic. Chaque article doit aider le lecteur à prendre une décision éclairée

### Liens internes automatiques
- Fin de chaque article : section "Articles liés" avec 3 articles pertinents (basée sur `relatedSlugs` dans les données)
- 1 lien contextuel dans le corps vers une page service ou `/contact`

## Cold Mailing

### Script d'envoi
- `scripts/send-cold-email.mjs` — envoie via API Resend avec `COLD_EMAIL_API_KEY` (dédiée, dans `.env.local`)
- Usage : `node scripts/send-cold-email.mjs --import-csv` / `--all` / `--index=N` / `--email=x --first_name=...`
- 30s délai entre envois, confirmation avant chaque envoi
- `Reply-To: contact@propulsedev.fr`
- Données prospects dans `data/prospects.mjs`

### Template
- **Objet** : `Proposition de modernisation de votre site — Cabinet {{{first_name}}}`
- Passage en gras : `{{{practice_area}}}`, "premier vecteur de réassurance", "capter davantage de demandes qualifiées", "gratuitement et sans engagement une maquette visuelle"
- **Signature** : Raphaël TRAN, Développeur web / Consultant en visibilité digitale, PropulseDev, 06 95 38 27 56, propulsedev.fr

## Règles générales

- Ne pas ajouter de commentaires dans le code sauf si demandé
- Ne pas créer de fichiers README ou documentation sauf si demandé
- Privilégier les classes Tailwind au CSS custom
- Les nouvelles sections landing vont dans `components/landing/`
- Les données statiques (articles, niches) dans `lib/` sous forme de fichiers TS
- Les maquettes clients (lead chaud) vont dans `public/demo/nom-du-cabinet/index.html` puis on partage l'URL `propulsedev.fr/demo/nom-du-cabinet`
- Ne jamais utiliser d'entités HTML (`&apos;`, `&amp;`, `&lt;`, `&gt;`) dans les chaînes JavaScript — toujours le caractère direct (`'`, `&`, `<`, `>`). Les entités HTML ne sont valides qu'en JSX pur (contenu entre balises), pas dans les strings JS (`"..."`, `'...'`, `` `...` ``)
