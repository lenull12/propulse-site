export type StyleConfig = {
  radius: string
  shadow: string
  spacing: string
  border: string
  decorator: string
  titleSize: string
  layout: "left" | "center"
}

export type SecteurData = {
  hero: string
  accroche: string
  services: { icon: string; title: string; desc: string }[]
  avis: { nom: string; texte: string }
  stats: { icon: string; value: string; label: string }[]
}

export const STYLES: Record<string, StyleConfig> = {
  moderne: {
    radius: "16px",
    shadow: "0 20px 60px rgba(0,0,0,0.12)",
    spacing: "36px",
    border: "none",
    decorator: "none",
    titleSize: "40px",
    layout: "left",
  },
  sobre: {
    radius: "4px",
    shadow: "0 4px 12px rgba(0,0,0,0.06)",
    spacing: "24px",
    border: "1px solid rgba(0,0,0,0.08)",
    decorator: "none",
    titleSize: "30px",
    layout: "left",
  },
  classique: {
    radius: "0px",
    shadow: "none",
    spacing: "28px",
    border: "2px solid rgba(0,0,0,0.15)",
    decorator: "ornament",
    titleSize: "34px",
    layout: "center",
  },
  premium: {
    radius: "8px",
    shadow: "0 12px 40px rgba(0,0,0,0.08)",
    spacing: "32px",
    border: "1px solid rgba(0,0,0,0.06)",
    decorator: "glow",
    titleSize: "38px",
    layout: "center",
  },
}

export const SECTEURS: Record<string, SecteurData> = {
  avocat: {
    hero: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    accroche: "pour défendre vos droits",
    services: [
      { icon: "⚖", title: "Conseil juridique", desc: "Analyse personnalisée de votre situation et solutions adaptées." },
      { icon: "🛡", title: "Défense", desc: "Assistance devant toutes les juridictions, civiles et pénales." },
      { icon: "📋", title: "Médiation", desc: "Résolution amiable des conflits, rapide et économique." },
    ],
    avis: { nom: "Sophie M.", texte: "Un accompagnement d'une grande humanité. Résultat au-delà de mes attentes." },
    stats: [
      { icon: "⚖", value: "4.9★", label: "Note moyenne" },
      { icon: "📋", value: "200+", label: "Dossiers traités" },
      { icon: "✓", value: "95%", label: "Taux de succès" },
    ],
  },
  "expert-comptable": {
    hero: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    accroche: "pour votre sérénité financière",
    services: [
      { icon: "📊", title: "Comptabilité", desc: "Tenue de comptes et bilan annuel." },
      { icon: "📑", title: "Fiscalité", desc: "Déclarations, optimisation fiscale, conseil." },
      { icon: "📈", title: "Social & paie", desc: "Bulletins de paie, charges sociales, déclarations URSSAF." },
    ],
    avis: { nom: "Isabelle F.", texte: "Un expert-comptable réactif et compétent. Un gain de temps énorme." },
    stats: [
      { icon: "📊", value: "4.8★", label: "Note clients" },
      { icon: "🏢", value: "100+", label: "Entreprises suivies" },
      { icon: "✓", value: "99%", label: "Déclarations conformes" },
    ],
  },
  architecte: {
    hero: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    accroche: "pour concrétiser vos projets",
    services: [
      { icon: "✏", title: "Conception", desc: "Plans, esquisses et rendus 3D de vos espaces." },
      { icon: "🏗", title: "Suivi de chantier", desc: "Coordination des corps de métier pour un résultat parfait." },
      { icon: "🌿", title: "Éco-conception", desc: "Matériaux durables et performance énergétique." },
    ],
    avis: { nom: "Catherine R.", texte: "Une architecte à l'écoute, créative et rigoureuse. Un vrai bonheur." },
    stats: [
      { icon: "✏", value: "4.9★", label: "Note" },
      { icon: "🏗", value: "80+", label: "Projets livrés" },
      { icon: "🏆", value: "15", label: "Ans d'expérience" },
    ],
  },
  medecin: {
    hero: "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=600",
    accroche: "pour votre santé",
    services: [
      { icon: "🩺", title: "Consultation générale", desc: "Médecine générale pour toute la famille, sur rendez-vous." },
      { icon: "📋", title: "Médecine préventive", desc: "Bilans de santé, dépistages et suivi personnalisé." },
      { icon: "🧬", title: "Suivi personnalisé", desc: "Accompagnement continu pour vos pathologies chroniques." },
    ],
    avis: { nom: "Marie L.", texte: "Un médecin à l'écoute, disponible et rassurant. Je recommande." },
    stats: [
      { icon: "🩺", value: "4.9★", label: "Satisfaction" },
      { icon: "👥", value: "5000+", label: "Patients suivis" },
      { icon: "✓", value: "98%", label: "Recommandation" },
    ],
  },
  restaurateur: {
    hero: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    accroche: "pour des moments inoubliables",
    services: [
      { icon: "🍽", title: "Carte saisonnière", desc: "Produits frais, locaux, cuisinés avec passion." },
      { icon: "🍷", title: "Carte des vins", desc: "Sélection de vins français et internationaux." },
      { icon: "🎉", title: "Événements privés", desc: "Réceptions, anniversaires, séminaires sur réservation." },
    ],
    avis: { nom: "Marc D.", texte: "Une cuisine exceptionnelle, un service attentionné. Coup de cœur !" },
    stats: [
      { icon: "🍽", value: "4.8★", label: "Avis clients" },
      { icon: "👥", value: "500+", label: "Couverts/mois" },
      { icon: "🎖", value: "2", label: "Fourchettes Gault&Millau" },
    ],
  },
  artisan: {
    hero: "https://images.pexels.com/photos/5974335/pexels-photo-5974335.jpeg?auto=compress&cs=tinysrgb&w=600",
    accroche: "pour tous vos travaux",
    services: [
      { icon: "🔨", title: "Rénovation", desc: "Travaux de rénovation intérieure et extérieure sur mesure." },
      { icon: "🔧", title: "Dépannage", desc: "Intervention rapide pour vos urgences, 7j/7." },
      { icon: "📐", title: "Devis gratuit", desc: "Estimation transparente, sans engagement, sous 48h." },
    ],
    avis: { nom: "Pierre L.", texte: "Travail soigné, respect des délais, je recommande vivement." },
    stats: [
      { icon: "🔧", value: "4.8★", label: "Satisfaction" },
      { icon: "🏠", value: "150+", label: "Chantiers réalisés" },
      { icon: "⏱", value: "100%", label: "Délais respectés" },
    ],
  },
  immobilier: {
    hero: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
    accroche: "pour votre projet immobilier",
    services: [
      { icon: "🏡", title: "Achat & vente", desc: "Accompagnement complet pour votre transaction immobilière." },
      { icon: "📊", title: "Estimation gratuite", desc: "Évaluation de votre bien sans engagement sous 48h." },
      { icon: "📋", title: "Gestion locative", desc: "Recherche de locataires et gestion administrative." },
    ],
    avis: { nom: "Sophie D.", texte: "Une agence réactive et professionnelle. Vente conclue en 3 semaines !" },
    stats: [
      { icon: "🏡", value: "4.8★", label: "Satisfaction" },
      { icon: "📋", value: "300+", label: "Biens vendus" },
      { icon: "✓", value: "95%", label: "Clients satisfaits" },
    ],
  },
  coiffure: {
    hero: "https://images.pexels.com/photos/3992879/pexels-photo-3992879.jpeg?auto=compress&cs=tinysrgb&w=600",
    accroche: "pour votre beauté",
    services: [
      { icon: "💇", title: "Coupe & coiffage", desc: "Coupe tendance et coiffage adapté à votre morphologie." },
      { icon: "🎨", title: "Coloration", desc: "Balayage, ombré, coloration naturelle et soins pigments." },
      { icon: "✨", title: "Soins capillaires", desc: "Soins nutritifs, lissant et régénérants pour vos cheveux." },
    ],
    avis: { nom: "Camille R.", texte: "Meilleur salon de la ville ! À l'écoute et toujours de bons conseils." },
    stats: [
      { icon: "💇", value: "4.9★", label: "Satisfaction" },
      { icon: "🎨", value: "10+", label: "Ans d'expérience" },
      { icon: "✓", value: "100%", label: "Produits bio" },
    ],
  },
  garage: {
    hero: "https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg?auto=compress&cs=tinysrgb&w=600",
    accroche: "pour votre véhicule",
    services: [
      { icon: "🔧", title: "Réparation mécanique", desc: "Moteur, freins, embrayage, toutes marques confondues." },
      { icon: "🛢", title: "Entretien courant", desc: "Vidange, révision, pneus, batterie, courroie de distribution." },
      { icon: "💻", title: "Diagnostic électronique", desc: "Analyse complète des calculateurs et systèmes embarqués." },
    ],
    avis: { nom: "Antoine B.", texte: "Garage honnête et compétent. Prix justes, travail soigné." },
    stats: [
      { icon: "🔧", value: "4.8★", label: "Satisfaction" },
      { icon: "🚗", value: "1000+", label: "Véhicules réparés" },
      { icon: "⏱", value: "24h", label: "Délai moyen" },
    ],
  },
  "bien-etre": {
    hero: "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=600",
    accroche: "pour votre bien-être",
    services: [
      { icon: "🌿", title: "Consultation naturopathie", desc: "Bilan personnalisé et conseils en nutrition naturelle." },
      { icon: "✨", title: "Soins énergétiques", desc: "Réflexologie, reiki, lithothérapie et relaxation profonde." },
      { icon: "🧘", title: "Suivi personnalisé", desc: "Programme sur mesure pour votre équilibre physique et mental." },
    ],
    avis: { nom: "Claire V.", texte: "Une approche holistique qui a changé ma vie. Je me sens revivre." },
    stats: [
      { icon: "🌿", value: "4.9★", label: "Satisfaction" },
      { icon: "👥", value: "500+", label: "Clients accompagnés" },
      { icon: "✓", value: "95%", label: "Recommandent" },
    ],
  },
}
