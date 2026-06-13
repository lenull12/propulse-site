// MODAL
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const openModalBtns = document.querySelectorAll("#openModal, #openModal2");
const modalForm = document.getElementById("modalForm");
const modalSuccess = document.getElementById("modalSuccess");

openModalBtns.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// VALIDATION FORMULAIRE MODAL
modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("modalName").value.trim();
  const phone = document.getElementById("modalPhone").value.trim();
  const email = document.getElementById("modalEmail").value.trim();
  const domain = document.getElementById("modalDomain").value;

  // Validation basique
  if (!name || !phone || !email || !domain) {
    showError("Merci de remplir tous les champs obligatoires.");
    return;
  }

  if (!isValidEmail(email)) {
    showError("Merci d'entrer une adresse email valide.");
    return;
  }

  if (!isValidPhone(phone)) {
    showError("Merci d'entrer un numéro de téléphone valide.");
    return;
  }

  // Simulation envoi
  const submitBtn = modalForm.querySelector("button[type='submit']");
  submitBtn.textContent = "Envoi en cours...";
  submitBtn.disabled = true;

  setTimeout(() => {
    modalForm.style.display = "none";
    modalSuccess.style.display = "flex";
  }, 1000);
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\+\-\(\)]{8,}$/.test(phone);
}

function showError(message) {
  const existing = document.querySelector(".form-error");
  if (existing) existing.remove();

  const error = document.createElement("p");
  error.className = "form-error";
  error.textContent = message;
  error.style.cssText = `
    color: #c0392b;
    font-size: 13px;
    font-weight: 400;
    padding: 12px 16px;
    background: #fdf0f0;
    border: 1px solid #e74c3c;
    border-radius: 4px;
    margin-top: -4px;
  `;

  const btn = modalForm.querySelector("button[type='submit']");
  modalForm.insertBefore(error, btn);

  setTimeout(() => error.remove(), 4000);
}

// SCROLL ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});

// FAQ ACCORDION
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
      openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// NAV SCROLL EFFECT
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    nav.style.borderBottomColor = "rgba(201, 168, 76, 0.3)";
  } else {
    nav.style.borderBottomColor = "rgba(201, 168, 76, 0.15)";
  }
});

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const contactSuccess = document.getElementById("contactSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.textContent = "Envoi en cours...";
    submitBtn.disabled = true;
    setTimeout(() => {
      contactForm.style.display = "none";
      contactSuccess.classList.add("active");
    }, 800);
  });
}