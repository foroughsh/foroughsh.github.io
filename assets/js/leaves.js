(() => {
  // trigger: big photo on the left
  const trigger =
    document.getElementById("photo-trigger") ||
    document.querySelector(".photo-flip") ||
    document.querySelector(".photo-front");

  const overlay = document.getElementById("leaf-overlay");
  if (!trigger || !overlay) return;

  // simple svg leaf as a data url (transparent background)
  const leafSvg = (fill) => {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path fill="${fill}" d="M54 10C40 12 28 20 22 28c-6 8-8 18-6 26 10 2 20 0 28-6 8-6 16-18 18-38z"/>
        <path fill="rgba(255,255,255,0.25)" d="M50 14C38 18 29 24 24 31c-5 7-6 14-5 21 7 1 14 0 21-5 7-5 13-14 15-33z"/>
      </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const palette = ["#c84c0c", "#d97706", "#b45309", "#9a3412", "#f59e0b"];
  let running = false;

  // longer run time + longer fall, but keeps the original "instant burst" feel
  function spawnLeaves(count = 26, runMs = 5200) {
    if (running) return;
    running = true;

    overlay.style.display = "block";
    overlay.innerHTML = "";

    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const leaf = document.createElement("img");
      leaf.className = "leaf";

      const color = palette[Math.floor(Math.random() * palette.length)];
      leaf.src = leafSvg(color);

      const x = Math.random() * 100;            // vw
      const size = 18 + Math.random() * 26;     // px

      // longer fall (keeps the same style as the first version)
      const dur = 5.6 + Math.random() * 3.4;    // ~5.6–9.0s

      const sway = 1.2 + Math.random() * 1.4;   // similar feel
      const drift = (Math.random() * 140 - 70); // px
      const rot = 360 + Math.random() * 720;    // deg

      // IMPORTANT: tiny delay only (keeps "immediate" start)
      const delay = Math.random() * 0.25;       // up to 0.25s

      leaf.style.setProperty("--x", `${x}vw`);
      leaf.style.setProperty("--size", `${size}px`);
      leaf.style.setProperty("--dur", `${dur}s`);
      leaf.style.setProperty("--sway", `${sway}s`);
      leaf.style.setProperty("--drift", `${drift}px`);
      leaf.style.setProperty("--rot", `${rot}deg`);
      leaf.style.animationDelay = `${delay}s`;

      leaf.addEventListener("animationend", () => leaf.remove(), { once: true });
      frag.appendChild(leaf);
    }

    overlay.appendChild(frag);

    setTimeout(() => {
      overlay.innerHTML = "";
      overlay.style.display = "none";
      running = false;
    }, runMs);
  }

  trigger.style.cursor = "pointer";
  trigger.addEventListener("click", () => spawnLeaves(28, 5200));
})();
