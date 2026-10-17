
(function () {
  const STORAGE_KEY = 'cv-theme';
  const root = document.documentElement;

  function guardarTema(tema) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tema: tema }));
    } catch (error) {
      console.warn('No se pudo guardar el tema:', error);
    }
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

  function actualizarBoton() {
    const boton = document.getElementById('theme-toggle');
    if (!boton) return;
    const esOscuro = root.getAttribute('data-theme') === 'dark';
    boton.textContent = esOscuro ? 'Modo claro' : 'Modo oscuro';
    boton.setAttribute('aria-pressed', String(esOscuro));
  }

  function aplicarTema(tema) {
    if (tema === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    actualizarBoton();
  }

  // Tema inicial: preferencia guardada > preferencia del sistema > claro
  const guardado = leerTemaGuardado();
  if (guardado) {
    aplicarTema(guardado);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    aplicarTema('dark');
  }

  // El botón existe solo cuando el DOM está listo
  document.addEventListener('DOMContentLoaded', function () {
    actualizarBoton();
    const boton = document.getElementById('theme-toggle');
    if (!boton) return;
    boton.addEventListener('click', function () {
      const nuevo = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      aplicarTema(nuevo);
      guardarTema(nuevo);
    });
  });
})();
