
(function () {
  const boton = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-principal');
  if (!boton || !nav) return;

  function establecerEstado(abierto) {
    nav.classList.toggle('is-open', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
  }

  function cerrarMenu() {
    establecerEstado(false);
  }

  function alternarMenu() {
    establecerEstado(!nav.classList.contains('is-open'));
  }

  boton.addEventListener('click', alternarMenu);

  // Cerrar el menú al elegir un enlace (mejor experiencia en móvil)
  nav.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && nav.classList.contains('is-open')) {
      cerrarMenu();
      boton.focus();
    }
  });

  const mediaEscritorio = window.matchMedia('(min-width: 1025px)');
  mediaEscritorio.addEventListener('change', function (evento) {
    if (evento.matches) cerrarMenu();
  });
})();
