// Animation du score "avant"
const scoreNumber = document.getElementById("scoreNumber");
const scoreFill = document.getElementById("scoreFill");

let count = 0;
const target = 34;

const countUp = setInterval(() => {
  count++;
  scoreNumber.textContent = count;
  scoreFill.style.width = (count / 100 * 100) + "%";
  if (count >= target) clearInterval(countUp);
}, 40);

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