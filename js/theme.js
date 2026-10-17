(function () {
  const STORAGE_KEY = 'cv-theme';
  const root = document.documentElement;
  const boton = document.getElementById('theme-toggle');

  function aplicarTema(tema) {
    if (tema === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (boton) boton.textContent = 'Modo claro';
    } else {
      root.removeAttribute('data-theme');
      if (boton) boton.textContent = 'Modo oscuro';
    }
  }

  // Cargar preferencia guardada (o detectar preferencia del sistema)
  const guardado = localStorage.getItem(STORAGE_KEY);
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
      localStorage.setItem(STORAGE_KEY, nuevo);
    });
  }
})();
