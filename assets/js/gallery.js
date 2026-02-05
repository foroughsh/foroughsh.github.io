document.addEventListener("DOMContentLoaded", () => {
  const box = document.querySelector(".lightbox");
  const boxImg = box?.querySelector("img");

  document.querySelectorAll(".art-item img").forEach((img) => {
    img.addEventListener("click", () => {
      boxImg.src = img.src;
      box.hidden = false;
    });
  });

  box?.addEventListener("click", () => {
    box.hidden = true;
    boxImg.src = "";
  });
});
