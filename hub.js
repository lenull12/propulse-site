// ============================================
// CONFIG DES NICHES
// Pour ajouter une niche : ajoute un objet ici
// Pour ajouter un design : ajoute dans "designs"
// ============================================

const NICHES = {
  "avocats": {
    tag: "Secteur juridique",
    title: "Cabinets d'avocats",
    subtitle: "Des sites qui inspirent confiance, rigueur et prestige. Chaque design est pensé pour convertir un justiciable hésitant en client.",
    designs: [
      {
        id: "chic",
        tag: "Premium",
        title: "Le Prestige",
        description: "Design sobre et luxueux, typographie serif élégante, palette or et noir. Idéal pour les cabinets haut de gamme.",
        badge: "Populaire",
        url: "demos/avocats/chic/index.html"
      },
      {
        id: "moderne",
        tag: "Contemporain",
        title: "Le Moderne",
        description: "Design épuré et dynamique, sections claires, forte lisibilité mobile. Parfait pour les avocats qui veulent se démarquer.",
        badge: "Nouveau",
        url: "demos/avocats/moderne/index.html"
      },
      {
        id: "classique",
        tag: "Institutionnel",
        title: "Le Classique",
        description: "Design sobre et institutionnel, couleurs neutres, structure rassurante. Pour les cabinets établis qui veulent inspirer confiance.",
        badge: "Sobre",
        url: "demos/avocats/classique/index.html"
      }
    ]
  },

  "experts-comptables": {
    tag: "Secteur comptable",
    title: "Experts comptables",
    subtitle: "Des sites qui reflètent rigueur, fiabilité et expertise. Pensés pour rassurer les dirigeants de PME avant qu'ils ne décrochent leur téléphone.",
    designs: [
      {
        id: "chic",
        tag: "Premium",
        title: "Le Prestige",
        description: "Design corporate et raffiné, palette bleu nuit et blanc, typographie soignée. Pour les cabinets qui gèrent de grands comptes.",
        badge: "Populaire",
        url: "demos/experts-comptables/chic/index.html"
      },
      {
        id: "moderne",
        tag: "Contemporain",
        title: "Le Moderne",
        description: "Design clair et structuré, mise en avant des chiffres clés et des services. Idéal pour attirer les TPE et indépendants.",
        badge: "Nouveau",
        url: "demos/experts-comptables/moderne/index.html"
      }
    ]
  },

  "architectes": {
    tag: "Secteur créatif",
    title: "Architectes",
    subtitle: "Des sites à la hauteur de votre vision créative. Mise en valeur de vos réalisations, storytelling fort et expérience immersive.",
    designs: [
      {
        id: "chic",
        tag: "Portfolio",
        title: "Le Portfolio",
        description: "Design minimaliste et aéré, grandes photos plein écran, typographie architecturale. Pour les architectes qui laissent leurs projets parler.",
        badge: "Populaire",
        url: "demos/architectes/chic/index.html"
      },
      {
        id: "moderne",
        tag: "Contemporain",
        title: "Le Studio",
        description: "Design sombre et sophistiqué, animations subtiles, présentation du cabinet et de l'équipe. Pour un cabinet avec une identité forte.",
        badge: "Nouveau",
        url: "demos/architectes/moderne/index.html"
      }
    ]
  }
};

// ============================================
// LOGIQUE DU HUB
// Ne pas modifier en dessous
// ============================================

function getNicheFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("niche");
}

function renderHub(niche) {
  const data = NICHES[niche];

  if (!data) {
    document.getElementById("hubTitle").textContent = "Niche introuvable.";
    document.getElementById("hubSubtitle").textContent = "Cette catégorie n'existe pas encore.";
    return;
  }

  // Mise à jour du titre de la page
  document.title = `${data.title} — Démos Propulse Dev`;

  // Mise à jour du header
  document.getElementById("hubTag").textContent = data.tag;
  document.getElementById("hubTitle").textContent = data.title;
  document.getElementById("hubSubtitle").textContent = data.subtitle;

  // Génération des cards
  const grid = document.getElementById("hubGrid");
  grid.innerHTML = data.designs.map(design => `
    <a href="${design.url}" class="design-card" target="_blank">
      <div class="design-card-preview">
        <iframe
          src="${design.url}"
          loading="lazy"
          title="${design.title}"
          scrolling="no">
        </iframe>
        <div class="preview-overlay"></div>
      </div>
      <div class="design-card-body">
        <p class="design-card-tag">${design.tag}</p>
        <h3 class="design-card-title">${design.title}</h3>
        <p class="design-card-desc">${design.description}</p>
        <div class="design-card-footer">
          <span class="design-card-cta">
            Voir la démo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </span>
          <span class="design-card-badge">${design.badge}</span>
        </div>
      </div>
    </a>
  `).join("");
}

// Mise à jour des liens dans la nav principale
function updateNavLinks() {
  const niche = getNicheFromURL();
  if (!niche) return;
}

// Init
const niche = getNicheFromURL();
if (niche) {
  renderHub(niche);
} else {
  document.getElementById("hubTitle").textContent = "Nos démos";
  document.getElementById("hubSubtitle").textContent = "Sélectionnez un secteur depuis le menu pour explorer les designs disponibles.";
}