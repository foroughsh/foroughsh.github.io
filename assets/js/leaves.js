(() => {
  // try a few likely selectors for your header/logo image
  const logo =
    document.querySelector('img[alt*="profile icon" i]') ||
    document.querySelector('header img') ||
    document.querySelector('.site-logo img') ||
    document.querySelector('img');

  const overlay = document.getElementById('leaf-overlay');
  if (!logo || !overlay) return;

  // simple svg leaf as a data url (transparent background)
  const leafSvg = (fill) => {
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
        <path fill="${fill}" d="M54 10C40 12 28 20 22 28c-6 8-8 18-6 26 10 2 20 0 28-6 8-6 16-18 18-38z"/>
        <path fill="rgba(255,255,255,0.25)" d="M50 14C38 18 29 24 24 31c-5 7-6 14-5 21 7 1 14 0 21-5 7-5 13-14 15-33z"/>
        <path fill="rgba(90,50,20,0.45)" d="M16 52c10-9 20-19 33-34" stroke="rgba(90,50,20,0.55)" stroke-width="2" />
      </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  const palette = ["#c84c0c", "#d97706", "#b45309", "#9a3412", "#f59e0b"];

  let running = false;

  function spawnLeaves(count = 18, runMs = 2200) {
    if (running) return;
    running = true;

    overlay.style.display = "block";

    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const leaf = document.createElement("img");
      const color = palette[Math.floor(Math.random() * palette.length)];
      leaf.src = leafSvg(color);
      leaf.className = "leaf";

      const x = Math.random() * 100;            // vw
      const size = 18 + Math.random() * 26;     // px
      const dur = 3.6 + Math.random() * 2.8;    // s
      const sway = 1.0 + Math.random() * 1.2;   // s
      const drift = (Math.random() * 140 - 70); // px
      const rot = 360 + Math.random() * 720;    // deg
      const delay = Math.random() * 0.35;       // s

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

    // stop the effect and hide overlay after a short burst
    setTimeout(() => {
      overlay.innerHTML = "";
      overlay.style.display = "none";
      running = false;
    }, runMs);
  }

  // click on the logo triggers the leaves
  logo.style.cursor = "pointer";
  logo.addEventListener("click", (e) => {
    // optional: prevent navigation if the logo is inside a link
    // e.preventDefault();
    spawnLeaves(22, 2400);
  });
})();
