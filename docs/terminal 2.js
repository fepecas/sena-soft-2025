(() => {
  const el = document.getElementById('typer');

  // Frases SIN el prefijo. El prefijo está fijo en el HTML.
  const phrases = [
    "💡 Connecting Technology with Purpose...",
    "💻 Framework de Programación Competitiva...",
    "🚀 Aprende, Itera y Sé Excelente...",
    "🎨 Piensa un Producto, Diseña y Codifica...",
    "⚖️ Calidad Primero, Velocidad Después...",
    "✨ Hazlo Simple, Hazlo Bien...",
    "🤝 Trabaja en Equipo, Llega Lejos..."
  ];

  const typeDelay = 35;   // ms por carácter al escribir
  const eraseDelay = 20;  // ms por carácter al borrar
  const holdDelay  = 5000; // ms de espera con frase completa
  const loopDelay  = 400;  // pausa breve entre ciclos

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function type(text) {
    el.textContent = "";
    for (const ch of text) {
      el.textContent += ch;
      await sleep(typeDelay);
    }
  }

  async function erase() {
    const s = el.textContent;
    for (let i = s.length; i > 0; i--) {
      el.textContent = s.slice(0, i - 1);
      await sleep(eraseDelay);
    }
  }

  // Opcional: pausa si la página no está visible (ahorra batería)
  const visible = () =>
    document.visibilityState === "visible" && el.offsetParent !== null;

  async function run() {
    let i = 0;
    for (;;) {
      if (!visible()) { await sleep(300); continue; }
      const text = phrases[i % phrases.length];
      await type(text);
      await sleep(holdDelay);
      await erase();
      await sleep(loopDelay);
      i++;
    }
  }

  run();
})();
