/**
 * PAIVA ACESSÓRIOS — script.js
 * Comportamento de interface: menu mobile, botão "voltar ao topo",
 * ano dinâmico no rodapé e fechamento automático do menu ao navegar.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initBackToTop();
  setFooterYear();
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
