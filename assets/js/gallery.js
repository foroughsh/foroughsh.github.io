document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector(".art-lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const cards = document.querySelectorAll(".art-card");

  if (!lightbox || !lightboxImg || !closeBtn) return;

  function openLightbox(src, altText = "") {
    lightboxImg.src = src;
    lightboxImg.alt = altText;
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    lightboxImg.alt = "";
    document.body.style.overflow = "";
  }

  cards.forEach((card) => {
    const img = card.querySelector("img");
    const full = card.getAttribute("data-full") || img?.src;

    card.addEventListener("click", () => {
      if (!full) return;
      openLightbox(full, img?.alt || "");
    });

    card.addEventListener("keydown", (e) => {
      if (!full) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(full, img?.alt || "");
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
});
