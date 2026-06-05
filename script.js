// Animation du score "avant" + "après"
const scoreNumber = document.getElementById("scoreNumber");
const scoreFill = document.getElementById("scoreFill");
const scoreAfterFill = document.querySelector(".score-fill.high");
const scoreAfterNumber = document.querySelector(".score-number.white");

scoreAfterFill.style.width = "0%";
scoreAfterNumber.textContent = "0";

let before = 0;
let after = 0;
const duration = 1500; // ms
const steps = 60;
const interval = duration / steps;

const countUp = setInterval(() => {
  before = Math.min(Math.round((34 / steps) * (before / (34 / steps) + 1)), 34);
  after = Math.min(Math.round((98 / steps) * (after / (98 / steps) + 1)), 98);

  before = Math.min(before + Math.ceil(34 / steps), 34);
  after = Math.min(after + Math.ceil(98 / steps), 98);

  scoreNumber.textContent = before;
  scoreFill.style.width = before + "%";
  scoreAfterNumber.textContent = after;
  scoreAfterFill.style.width = after + "%";

  if (before >= 34 && after >= 98) clearInterval(countUp);
}, interval);

// Animation des éléments au scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".problem-item, .service-card, .step").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(el);
});

// Formulaire contact
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("contactName").value.trim();
  const url = document.getElementById("contactUrl").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const btn = contactForm.querySelector("button");

  if (!name || !email) {
    alert("Merci de remplir votre prénom et votre mail.");
    return;
  }

  btn.textContent = "Envoi en cours...";
  btn.disabled = true;

  try {
    const response = await fetch("https://formspree.io/f/mzdqbwva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prenom: name,
        site: url,
        email: email
      })
    });

    if (response.ok) {
      contactForm.innerHTML = `
        <div style="text-align:center; padding: 40px 0;">
          <p style="font-size: 32px; margin-bottom: 16px;">✅</p>
          <p style="font-size: 18px; font-weight: 500; color: #c8f000;">Demande reçue !</p>
          <p style="font-size: 14px; color: #999; margin-top: 8px;">Je vous envoie votre audit sous 24h.</p>
        </div>
      `;
    } else {
      alert("Une erreur est survenue, veuillez réessayer.");
      btn.textContent = "Recevoir mon audit gratuit";
      btn.disabled = false;
    }
  } catch (error) {
    alert("Une erreur est survenue, veuillez réessayer.");
    btn.textContent = "Recevoir mon audit gratuit";
    btn.disabled = false;
  }
});