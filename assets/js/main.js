document.addEventListener("DOMContentLoaded", () => {
  // set footer year
  const el = document.getElementById("year");
  if (el) el.textContent = String(new Date().getFullYear());

  // single-open accordions (independent per section)
  // default behavior: open first item unless data-default-open="none"
  document.querySelectorAll(".cv-accordion[data-accordion='single']").forEach((acc) => {
    const items = Array.from(acc.querySelectorAll(".cv-acc-item"));
    const defaultOpenMode = acc.getAttribute("data-default-open"); // "none" or null

    // decide which item should be open initially
    let openItem = items.find((i) => i.classList.contains("is-open"));

    if (!openItem && items.length && defaultOpenMode !== "none") {
      openItem = items[0];
    }

    // apply initial state
    items.forEach((item) => {
      const btn = item.querySelector(".cv-acc-trigger");
      const isOpen = openItem ? item === openItem : false;
      item.classList.toggle("is-open", isOpen);
      if (btn) btn.setAttribute("aria-expanded", String(isOpen));
    });

    // click: close others, open clicked
    items.forEach((item) => {
      const btn = item.querySelector(".cv-acc-trigger");
      if (!btn) return;

      btn.addEventListener("click", () => {
        const wasOpen = item.classList.contains("is-open");

        // close all
        items.forEach((i) => {
          i.classList.remove("is-open");
          const b = i.querySelector(".cv-acc-trigger");
          if (b) b.setAttribute("aria-expanded", "false");
        });

        // open clicked unless it was already open
        if (!wasOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  });
});
