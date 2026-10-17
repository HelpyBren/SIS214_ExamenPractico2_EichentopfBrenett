// menu.js — menú hamburguesa responsivo (móvil y tablet)
(function () {
  const boton = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-principal');
  if (!boton || !nav) return;

  function cerrarMenu() {
    nav.classList.remove('is-open');
    boton.setAttribute('aria-expanded', 'false');
  }

  function alternarMenu() {
    const abierto = nav.classList.toggle('is-open');
    boton.setAttribute('aria-expanded', String(abierto));
  }

  boton.addEventListener('click', alternarMenu);

  // Cerrar el menú al elegir un enlace (mejor experiencia en móvil)
  nav.querySelectorAll('a').forEach(function (enlace) {
    enlace.addEventListener('click', cerrarMenu);
  });

  // Si la pantalla pasa a escritorio, el nav vuelve a su estado fijo
  const mediaEscritorio = window.matchMedia('(min-width: 1025px)');
  mediaEscritorio.addEventListener('change', function (evento) {
    if (evento.matches) cerrarMenu();
  });
})();
