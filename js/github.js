// trae mis repositorios más recientes desde la API pública de GitHub
// (sin token, así que el límite es de 60 peticiones por hora por IP)

(function () {
  const USUARIO_GITHUB = 'HelpyBren';
  const lista = document.getElementById('repos-list');
  const estado = document.getElementById('repos-status');
  if (!lista || !estado) return;

  // error propio para guardar el código HTTP y mostrar el mensaje correcto después
  class ErrorHttp extends Error {
    constructor(codigo, mensaje) {
      super(mensaje);
      this.name = 'ErrorHttp';
      this.codigo = codigo;
    }
  }

  // traduce el código HTTP a algo que entienda quien visita la página
  function mensajePorEstado(codigo) {
    switch (codigo) {
      case 400:
        return 'Solicitud incorrecta (400). Revisa los parámetros de la consulta.';
      case 403:
      case 429:
        return `Se alcanzó el límite de peticiones de la API de GitHub (${codigo}). Intenta de nuevo en unos minutos.`;
      case 404:
        return 'No se encontró el usuario de GitHub (404).';
      default:
        return codigo >= 500
          ? `GitHub tiene problemas en su servidor (${codigo}). Intenta más tarde.`
          : `Respuesta inesperada del servidor (${codigo}).`;
    }
  }

  // los tres estados de la interfaz: cargando, error y éxito
  function mostrarCargando() {
    lista.replaceChildren();
    estado.textContent = 'Cargando repositorios…';
    estado.classList.remove('error', 'hidden');
  }

  function mostrarError(mensaje) {
    lista.replaceChildren();
    estado.textContent = mensaje;
    estado.classList.add('error');
    estado.classList.remove('hidden');
  }

  // textContent y no innerHTML: la descripción la escribe cualquiera en GitHub
  function crearTarjeta(repo) {
    const item = document.createElement('li');
    item.className = 'repo-card';

    const titulo = document.createElement('h3');
    const enlace = document.createElement('a');
    enlace.href = repo.html_url;
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    enlace.textContent = repo.name;
    titulo.appendChild(enlace);

    const descripcion = document.createElement('p');
    descripcion.textContent = repo.description || 'Sin descripción.';

    const meta = document.createElement('p');
    meta.className = 'repo-meta';
    meta.textContent = (repo.language ? repo.language + ' · ' : '') + '⭐ ' + repo.stargazers_count;

    item.append(titulo, descripcion, meta);
    return item;
  }

  function mostrarExito(repos) {
    if (!Array.isArray(repos) || repos.length === 0) {
      lista.replaceChildren();
      estado.textContent = 'Aún no hay repositorios públicos para mostrar.';
      estado.classList.remove('hidden', 'error');
      return;
    }
    estado.classList.add('hidden');
    lista.replaceChildren(...repos.map(crearTarjeta));
  }

  async function cargarRepositorios() {
    mostrarCargando();
    try {
      const respuesta = await fetch(
        `https://api.github.com/users/${USUARIO_GITHUB}/repos?sort=updated&per_page=6`
      );

      // fetch no falla con un 404 o 500, hay que mirar respuesta.ok a mano
      if (!respuesta.ok) {
        throw new ErrorHttp(respuesta.status, mensajePorEstado(respuesta.status));
      }

      const repos = await respuesta.json();
      mostrarExito(repos);
    } catch (error) {
      if (error instanceof ErrorHttp) {
        mostrarError(error.message);
      } else {
        // Fallo de red, CORS o JSON inválido
        mostrarError('No se pudieron cargar los repositorios. Revisa tu conexión e intenta más tarde.');
      }
      console.error('Error al consumir la API de GitHub:', error);
    }
  }

  cargarRepositorios();
})();
