const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
const bookingForm = document.querySelector("#booking-form");
const statusMessage = document.querySelector("#form-status");
const certificateDialog = document.querySelector("#certificate-dialog");
const certificateDialogTitle = document.querySelector("#certificate-dialog-title");
const certificateDialogImage = document.querySelector("#certificate-dialog-image");
const certificateDialogClose = document.querySelector(".certificate-dialog-close");
const processCarousel = document.querySelector(".process-carousel");
const processSlides = [...document.querySelectorAll(".process-slide")];
const carouselDots = [...document.querySelectorAll(".carousel-dot")];
const carouselCount = document.querySelector(".carousel-count");
let currentSlideIndex = 0;

const whatsappNumber = "595982284705";

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Abrir menú" : "Cerrar menú");
  navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
    navLinks.classList.remove("is-open");
  }
});

document.querySelector(".certificate-grid").addEventListener("click", (event) => {
  const certificate = event.target.closest(".certificate-card");
  if (!certificate) return;

  certificateDialogTitle.textContent = certificate.dataset.title;
  certificateDialogImage.src = certificate.dataset.image;
  certificateDialogImage.alt = certificate.dataset.title;
  certificateDialog.showModal();
});

processCarousel.addEventListener("click", (event) => {
  const imageButton = event.target.closest(".process-slide-image");
  if (!imageButton) return;

  const slide = imageButton.closest(".process-slide");
  certificateDialogTitle.textContent = slide.querySelector("figcaption").textContent;
  certificateDialogImage.src = imageButton.querySelector("img").src;
  certificateDialogImage.alt = imageButton.querySelector("img").alt;
  certificateDialog.showModal();
});

certificateDialogClose.addEventListener("click", () => {
  certificateDialog.close();
});

certificateDialog.addEventListener("click", (event) => {
  if (event.target === certificateDialog) certificateDialog.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && certificateDialog.open) certificateDialog.close();
});

function showProcessSlide(index) {
  currentSlideIndex = (index + processSlides.length) % processSlides.length;
  processSlides.forEach((slide, slideIndex) => {
    slide.hidden = slideIndex !== currentSlideIndex;
  });
  carouselDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === currentSlideIndex;
    dot.classList.toggle("is-active", isActive);
    if (isActive) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });
  carouselCount.textContent = `${String(currentSlideIndex + 1).padStart(2, "0")} / ${String(processSlides.length).padStart(2, "0")}`;
}

document.querySelector("[data-carousel-prev]").addEventListener("click", () => {
  showProcessSlide(currentSlideIndex - 1);
});

document.querySelector("[data-carousel-next]").addEventListener("click", () => {
  showProcessSlide(currentSlideIndex + 1);
});

carouselDots.forEach((dot, index) => {
  dot.addEventListener("click", () => showProcessSlide(index));
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => {
    if (!document.hidden && !certificateDialog.open && !processCarousel.matches(":hover, :focus-within")) {
      showProcessSlide(currentSlideIndex + 1);
    }
  }, 7000);
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  if (!/^\d{8,15}$/.test(whatsappNumber)) {
    statusMessage.textContent = "Para activar las solicitudes, agrega tu número de WhatsApp en js/script.js (con código de país y solo dígitos).";
    statusMessage.classList.add("is-visible");
    return;
  }

  const formData = new FormData(bookingForm);
  const message = [
    `Hola, soy ${formData.get("nombre")}.`,
    `Mi teléfono es ${formData.get("telefono")}.`,
    "Me gustaría coordinar una consulta.",
  ].join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

function girarCedula() {
  const card = document.getElementById('cedulaCard');
  card.classList.toggle('flipped');
}
