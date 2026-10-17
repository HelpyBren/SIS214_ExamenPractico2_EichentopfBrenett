// tema claro/oscuro. Va en el <head> para que el tema se aplique antes de pintar
// la página (si no, al recargar en oscuro se ve un destello blanco)
(function () {
  const STORAGE_KEY = 'cv-theme';
  const root = document.documentElement;

  function guardarTema(tema) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ tema: tema }));
    } catch (error) {
      // pasa en modo privado o con el almacenamiento lleno; el tema igual funciona esa sesión
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
      // JSON corrupto o sin acceso a localStorage: se ignora y se usa el valor por defecto
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

  // orden: lo que eligió la persona > preferencia del sistema > claro
  const guardado = leerTemaGuardado();
  if (guardado) {
    aplicarTema(guardado);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    aplicarTema('dark');
  }

  // como el script está en el head, el botón todavía no existe: esperar al DOM
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
