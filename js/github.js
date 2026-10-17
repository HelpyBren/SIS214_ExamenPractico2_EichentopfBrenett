// github.js — módulo asíncrono: consume la API REST pública de GitHub
// para mostrar los repositorios más recientes. Maneja los tres estados
// (loading / success / error) y usa try/catch + response.ok.
(function () {
  const USUARIO_GITHUB = 'HelpyBren';
  const lista = document.getElementById('repos-list');
  const estado = document.getElementById('repos-status');
  if (!lista || !estado) return;

  function mostrarCargando() {
    estado.textContent = 'Cargando repositorios…';
    estado.classList.remove('error', 'hidden');
  }

  function mostrarError(mensaje) {
    estado.textContent = mensaje;
    estado.classList.add('error');
    estado.classList.remove('hidden');
  }

  function mostrarExito(repos) {
    estado.classList.add('hidden');
    lista.innerHTML = '';

    if (repos.length === 0) {
      estado.classList.remove('hidden');
      estado.textContent = 'Aún no hay repositorios públicos para mostrar.';
      return;
    }

    repos.forEach(function (repo) {
      const item = document.createElement('li');
      item.className = 'repo-card';
      item.innerHTML = `
        <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
        <p>${repo.description ? repo.description : 'Sin descripción.'}</p>
        <p class="repo-meta">${repo.language ? repo.language + ' · ' : ''}⭐ ${repo.stargazers_count}</p>
      `;
      lista.appendChild(item);
    });
  }

  async function cargarRepositorios() {
    mostrarCargando();
    try {
      const respuesta = await fetch(
        `https://api.github.com/users/${USUARIO_GITHUB}/repos?sort=updated&per_page=6`
      );

      if (!respuesta.ok) {
        if (respuesta.status === 404) {
          throw new Error('No se encontró el usuario de GitHub (404).');
        }
        throw new Error(`Error del servidor: ${respuesta.status}`);
      }

      const repos = await respuesta.json();
      mostrarExito(repos);
    } catch (error) {
      mostrarError('No se pudieron cargar los repositorios en este momento. Intenta más tarde.');
      console.error('Error al consumir la API de GitHub:', error);
    }
  }

  cargarRepositorios();
})();
