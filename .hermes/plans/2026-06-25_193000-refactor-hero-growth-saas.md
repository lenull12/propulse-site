# Refactor Hero PropulseDev — Style Growth SaaS Américain

> **For Hermes:** Execute task-by-task, validating chaque étape visuellement via `npm run dev`.

**Goal:** Refactoriser le hero actuel (split layout texte/image) vers un hero centré, épuré, premium, inspiré des growth SaaS US (Linear, Webflow, Vercel).

**Architecture:** Hero full-viewport centré avec mockup produit flottant + social proof intégrée. On garde l'identité dark + lime, on retire/anime ce qui est daté.

**Tech Stack:** Next.js 15.5, React 19, TypeScript, Tailwind CSS v4, JetBrains Mono + Inter

**Fichier principal modifié:** `components/landing/hero-v2.tsx` (nouveau)

---

## État des lieux

### Ce qu'on garde
- Palette dark (#050505 fond, #c8f000 accent, #111118 surface)
- Polices JetBrains Mono (titres) + Inter (corps)
- WordSwitcher (bon concept, à affiner)
- Particules de fond (à réduire en opacité/intensité)
- Stats (5★, 95+, 48h, +200%)

### Ce qui change
- **Layout** : split → centré vertical, full-screen
- **Hiérarchie** : titre plus massif, sous-titre plus concis
- **Mockup** : image statique → mockup navigateur flottant avec glow
- **CTA** : deux boutons → un CTA principal fort + un lien discret
- **Social proof** : les stats migrent sous le mockup, style "logo + chiffre" (Webflow)
- **Badge** : "★★★★★ Avis Google" → plus sobre, style Linear

### Références visuelles
- **Linear** : fond noir profond, H1 énorme, mockup réaliste, espacement généreux, badge feature
- **Webflow** : titre + sous-titre centrés, mockup vidéo, logos clients marquee dans le hero
- **Vercel** : mockups desktop/mobile en toggle, typo contrastée, glow subtil

---

## Plan d'exécution

### Task 1: Créer le nouveau composant `HeroV2` (squelette)

**Objective:** Créer le nouveau composant hero avec le layout centré, sans casser l'existant.

**Files:**
- Create: `components/landing/hero-v2.tsx`

```tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { WordSwitcher } from "./word-switcher"
import { ParticlesBackground } from "./particles-background"

export function HeroV2() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#000000] overflow-hidden px-6">
      <ParticlesBackground
        count={30}
        connectDistance={80}
        color="200,240,0"
        className="opacity-15"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto w-full pt-24 pb-16">
        {/* Badge */}
        ...

        {/* Headline */}
        <h1>...</h1>

        {/* Subtitle */}
        <p>...</p>

        {/* CTA */}
        <div>...</div>

        {/* Mockup */}
        <div>...</div>

        {/* Social proof */}
        <div>...</div>
      </div>
    </section>
  )
}
```

**Vérification:** `npx tsc --noEmit` doit passer.

---

### Task 2: Headline massive + WordSwitcher affiné

**Objective:** Typographie growth SaaS : titre énorme, contraste de graisse.

**Files:**
- Modify: `components/landing/hero-v2.tsx`
- Modify (optionnel): `components/landing/word-switcher.tsx`

```tsx
<h1 className="font-sans text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-foreground">
  <span className="block font-normal text-gray-400">Votre site devrait</span>
  <span className="block mt-3">
    <WordSwitcher />
  </span>
</h1>
```

**Option — nouveaux mots pour le WordSwitcher:**
```
"travailler pour vous" → "vous trouver des clients"
"charger instantanément" → OK
"automatiser vos ventes" → "vendre 24h/24"
```

---

### Task 3: Sous-titre concis + CTA unique

**Objective:** Sous-titre 1 ligne desktop max + CTA principal avec glow.

```tsx
<p className="mt-6 max-w-xl text-lg md:text-xl text-gray-400 font-light leading-relaxed">
  Sites web sur-mesure pour professionnels indépendants.
  Design premium, SEO local, zéro maintenance.
</p>

<div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
  <Link
    href="/contact"
    className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground transition-all hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(200,240,0,0.35)]"
  >
    Obtenir un audit gratuit
    <span className="cta-arrow text-lg">→</span>
  </Link>
  <Link
    href="/demos"
    className="text-sm text-gray-500 hover:text-gray-300 transition-colors underline-offset-4 hover:underline"
  >
    Voir une démo
  </Link>
</div>
```

---

### Task 4: Mockup navigateur flottant avec glow

**Objective:** Remplacer l'image statique par un mockup "navigateur" avec barre d'adresse, glow lime.

```tsx
<div className="mt-16 md:mt-20 relative w-full max-w-4xl mx-auto">
  {/* Glow externe */}
  <div 
    className="absolute -inset-4 rounded-2xl opacity-30 blur-2xl"
    style={{
      background: "radial-gradient(ellipse at center, rgba(200,240,0,0.12) 0%, transparent 70%)"
    }}
  />
  
  {/* Cadre navigateur */}
  <div className="relative rounded-xl border border-white/[0.08] bg-surface overflow-hidden shadow-[0_0_80px_rgba(200,240,0,0.05)]">
    {/* Barre adresse */}
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.05] bg-[#0a0a10]">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
      <span className="ml-3 text-[10px] text-gray-600 font-mono truncate">propulsedev.fr</span>
    </div>
    {/* Contenu */}
    <div className="aspect-[16/9] relative bg-[#050505]">
      <Image
        src="/images/herolanding.webp"
        alt=""
        aria-hidden="true"
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 900px"
        priority
      />
    </div>
  </div>
</div>
```

---

### Task 5: Social proof intégrée (stats sous le mockup)

**Objective:** Stats centrées, style Webflow : gros chiffres + labels discrets.

```tsx
<div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 max-w-3xl mx-auto">
  {[
    { value: "5★", label: "Avis Google" },
    { value: "95+", label: "Score PageSpeed" },
    { value: "48h", label: "Audit livré" },
    { value: "+200%", label: "Trafic Google" },
  ].map((stat) => (
    <div key={stat.label} className="text-center">
      <p className="font-mono text-3xl md:text-4xl font-bold text-foreground">
        {stat.value}
      </p>
      <p className="mt-1.5 text-xs text-gray-500 tracking-wide">{stat.label}</p>
    </div>
  ))}
</div>
```

---

### Task 6: Badge statut épuré

**Objective:** Remplacer le badge encombré par un tag sobre style Linear.

```tsx
<div className="inline-flex items-center gap-2 rounded-full border border-accent/10 bg-accent/[0.03] px-4 py-1.5">
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
  </span>
  <span className="text-xs font-medium text-accent/80 tracking-wide">
    Disponible — 3 places ce mois
  </span>
</div>
```

---

### Task 7: Intégration dans `app/page.tsx`

**Objective:** Switcher l'import de `Hero` → `HeroV2`.

```tsx
// Remplacer
import { Hero } from "@/components/landing/hero"
// Par
import { HeroV2 } from "@/components/landing/hero-v2"

// Dans le JSX : <Hero /> → <HeroV2 />
```

**Suppression:** `components/landing/hero.tsx` après validation visuelle.

---

### Task 8: Ajustements responsive + polish

**Objective:** Vérifier mobile, animations d'entrée, espacements.

Points de vérification :
- Mockup ne déborde pas sur mobile (< 640px)
- Stats en 2 colonnes sur mobile
- Titre lisible (clamp correct)
- CTA tappable (min 44px height)
- Option : animation fade-up stagger à l'entrée (titre → sous-titre → CTA → mockup)

---

## Fichiers impactés

| Fichier | Action |
|---------|--------|
| `components/landing/hero-v2.tsx` | **Créer** |
| `app/page.tsx` | **Modifier** (import + usage) |
| `components/landing/word-switcher.tsx` | **Modifier** (optionnel — nouveaux mots) |
| `components/landing/hero.tsx` | **Supprimer** (après validation) |

---

## Validation

```bash
npx tsc --noEmit          # TypeScript
npm run build             # Build production
npm run dev               # Test visuel → http://localhost:3000
```

---

## Risques & questions

- **`herolanding.webp`** pas idéal pour le mockup 16:9 navigateur — à remplacer par une capture d'écran wide. Solution temporaire : `object-cover`.
- **Gradient WordSwitcher** (teal→cyan→lime) potentiellement trop chargé. Si le rendu est lourd, simplifier vers lime-only.
- **Particules** opacité 0.15 : si trop vide, remonter à 0.20.
- **"3 places ce mois"** → à mettre à jour manuellement ou via une variable.
