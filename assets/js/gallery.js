document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector(".art-lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const cards = document.querySelectorAll(".art-card");

  if (!lightbox || !lightboxImg || !closeBtn) return;

  function openLightbox(src, altText = "expanded artwork") {
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
    document.body.style.overflow = "";
  }

  // open on click
  cards.forEach((card) => {
    const img = card.querySelector("img");
    const full = card.getAttribute("data-full") || img?.src;

    card.addEventListener("click", () => {
      if (!full) return;
      openLightbox(full, img?.alt || "expanded artwork");
    });

    // open with keyboard (Enter/Space)
    card.addEventListener("keydown", (e) => {
      if (!full) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(full, img?.alt || "expanded artwork");
      }
    });
  });

  // close button
  closeBtn.addEventListener("click", closeLightbox);

  // click outside image closes
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
});
