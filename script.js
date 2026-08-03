/**
 * PAIVA ACESSÓRIOS — script.js
 * Comportamento de interface: menu mobile, botão "voltar ao topo",
 * ano dinâmico no rodapé, fechamento automático do menu ao navegar,
 * e a galeria de fotos (lightbox) dos produtos.
 */

// Fotos de cada produto. Para adicionar fotos de um novo produto:
// 1. Suba os arquivos de imagem no repositório (ex: img/fones/fone-1.jpg)
// 2. Adicione uma nova chave aqui com a lista de caminhos
// 3. No index.html, adicione data-gallery="fones" no card correspondente
const PRODUCT_GALLERIES = {
  capas: [
    "IMG_0681.jpeg",
    "IMG_0682.jpeg",
    "IMG_0683.jpeg",
    "IMG_0684.jpeg",
    "IMG_0685.jpeg",
    "IMG_0686.jpeg",
    "IMG_0687.jpeg",
    "IMG_0688.jpeg",
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initBackToTop();
  setFooterYear();
  initProductGallery();
});

/**
 * Abre/fecha o menu de navegação em telas pequenas
 * e fecha automaticamente ao clicar em um link.
 */
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Mostra o botão "voltar ao topo" depois que o usuário
 * rola a página além da altura da viewport, e faz o scroll suave.
 */
function initBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  const toggleVisibility = () => {
    const shouldShow = window.scrollY > window.innerHeight * 0.6;
    button.classList.toggle("is-visible", shouldShow);
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Preenche o ano corrente no rodapé (© <ano> Paiva Acessórios).
 */
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Galeria de fotos dos produtos: ao tocar num card com data-gallery,
 * abre um lightbox com as fotos daquele produto. Dá pra navegar
 * pelos botões, pelo teclado (setas/Esc) ou arrastando o dedo.
 */
function initProductGallery() {
  const lightbox = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightbox-img");
  const countEl = document.getElementById("lightbox-count");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");
  const cards = document.querySelectorAll("[data-gallery]");

  if (!lightbox || !imgEl || cards.length === 0) return;

  let currentPhotos = [];
  let currentIndex = 0;

  function openGallery(key) {
    const photos = PRODUCT_GALLERIES[key];
    if (!photos || photos.length === 0) return;
    currentPhotos = photos;
    currentIndex = 0;
    render();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeGallery() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function render() {
    imgEl.src = currentPhotos[currentIndex];
    countEl.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentPhotos.length;
    render();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
    render();
  }

  cards.forEach((card) => {
    const key = card.getAttribute("data-gallery");
    if (!PRODUCT_GALLERIES[key]) return; // ainda sem fotos cadastradas

    card.addEventListener("click", () => openGallery(key));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGallery(key);
      }
    });
  });

  closeBtn.addEventListener("click", closeGallery);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeGallery();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });

  // arrastar o dedo pra trocar de foto no celular
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) < 40) return;
    if (deltaX < 0) showNext();
    else showPrev();
  }, { passive: true });
}
