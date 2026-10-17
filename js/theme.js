// theme.js — modo claro/oscuro persistente con localStorage (JSON)
(function () {
  const STORAGE_KEY = 'cv-theme';
  const root = document.documentElement;
  const boton = document.getElementById('theme-toggle');

  function guardarTema(tema) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ tema: tema }));
  }

  function leerTemaGuardado() {
    try {
      const crudo = localStorage.getItem(STORAGE_KEY);
      if (!crudo) return null;
      const datos = JSON.parse(crudo);
      return datos && datos.tema ? datos.tema : null;
    } catch (error) {
      return null;
    }
  }

  function aplicarTema(tema) {
    const esOscuro = tema === 'dark';
    if (esOscuro) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    if (boton) {
      boton.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
      boton.setAttribute('aria-pressed', String(esOscuro));
    }
  }

  const guardado = leerTemaGuardado();
  if (guardado) {
    aplicarTema(guardado);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    aplicarTema('dark');
  }

  if (boton) {
    boton.addEventListener('click', function () {
      const actual = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nuevo = actual === 'dark' ? 'light' : 'dark';
      aplicarTema(nuevo);
      guardarTema(nuevo);
    });
  }
})();
