// footer year
(function(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

/* HERO SIMPLE (robusto) */
(function(){
  const root = document.getElementById('heroSimple');
  if (!root) return;

  const titleEl = document.getElementById('hs-title');
  const descEl  = document.getElementById('hs-desc');
  const ctaEl   = document.getElementById('hs-cta');
  const imgEl   = document.getElementById('hs-img');
  const btnPrev = document.getElementById('hs-prev');
  const btnNext = document.getElementById('hs-next');

  // Slides: ajustá rutas/textos si necesitás
  const slides = [
    {
      title: 'Calidad y diseño para tu hogar',
      desc: 'Productos seleccionados que combinan estética y funcionalidad.',
      ctaText: 'Ver catálogo',
      ctaHref: './productos.html',
      img: 'imagenes/mesa_ventro_araucaria.png',
      alt: 'Mesa Ventro Araucaria'
    },
    {
      title: 'Quiénes somos',
      desc: 'Somos Mi Tienda — diseño y calidad en muebles hechos a mano.',
      ctaText: 'Conocé más',
      ctaHref: './quienes.html',
      img: 'imagenes/logo.svg',
      alt: 'Mi Tienda logo'
    },
    {
      title: 'Contáctanos',
      desc: 'Consultas o pedidos? Escribinos y te respondemos rápido.',
      ctaText: 'Contactanos',
      ctaHref: './contacto.html',
      img: 'imagenes/butaca_mendoza.png',
      alt: 'Butaca Mendoza'
    }
  ];

  let idx = 0;
  let timer = null;
  const AUTO_MS = 5000;

  function render(i, withFade = true){
    const s = slides[i];
    if (!s) return;

    // safe updates (check DOM nodes)
    const doUpdate = () => {
      if (titleEl) titleEl.textContent = s.title;
      if (descEl) descEl.textContent = s.desc;
      if (ctaEl) { ctaEl.textContent = s.ctaText; ctaEl.href = s.ctaHref; }
      if (imgEl) { imgEl.src = s.img; imgEl.alt = s.alt; }
    };

    if (withFade && root) {
      root.style.transition = 'opacity .24s ease';
      root.style.opacity = '0';
      setTimeout(() => {
        doUpdate();
        root.style.opacity = '1';
      }, 220);
    } else {
      doUpdate();
      if (root) root.style.opacity = '1';
    }
  }

  function next(){ idx = (idx + 1) % slides.length; render(idx); resetTimer(); }
  function prev(){ idx = (idx - 1 + slides.length) % slides.length; render(idx); resetTimer(); }

  function resetTimer(){
    if (timer) clearInterval(timer);
    timer = setInterval(next, AUTO_MS);
  }

  // Attach handlers only if buttons exist
  if (btnNext) btnNext.addEventListener('click', next);
  if (btnPrev) btnPrev.addEventListener('click', prev);

  // Pause on hover (if root exists)
  if (root) {
    root.addEventListener('mouseenter', () => { if (timer) { clearInterval(timer); timer = null; } });
    root.addEventListener('mouseleave', resetTimer);
  }

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Init
  render(idx, false);
  resetTimer();
})();

/* -------- DESTACADOS -------- */
(function(){
  const wrap = document.getElementById('featured');
  const nojs = document.getElementById('nojs');
  if (!wrap) return;

  if (!Array.isArray(window.PRODUCTS)) {
    if (nojs) nojs.textContent = "No se encontraron datos (data.js no cargó).";
    return;
  }
  if (nojs) nojs.remove();

  let destacados = PRODUCTS.filter(p => p.featured === true);
  if (destacados.length === 0) destacados = PRODUCTS.slice(0, 4);

  wrap.innerHTML = destacados.map(p => `
    <article class="card">
      <div class="thumb"><img src="${p.imagen}" alt="${p.nombre}"></div>
      <div class="body">
        <h3 class="title">${p.nombre}</h3>
        <p class="desc">${p.categoria ?? ""}</p>
        <div class="row">
          <span class="price"></span>
          <a class="cta" href="./producto.html?id=${encodeURIComponent(p.id)}">Ver</a>
        </div>
      </div>
    </article>
  `).join('');
})();
