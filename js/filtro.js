
(function () {
  const input = document.getElementById('buscador-habilidades');
  const resultado = document.getElementById('filtro-resultado');
  if (!input) return;

  function normalizar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const habilidadesOriginales = Object.freeze(
    Array.from(document.querySelectorAll('.skills-group li')).map(function (li) {
      const texto = li.textContent.trim();
      return Object.freeze({
        texto: texto,
        textoNormalizado: normalizar(texto),
        elementoLi: li,
        elementoGrupo: li.closest('.skills-group')
      });
    })
  );

  function filtrarHabilidades(consulta) {
    const termino = normalizar(consulta.trim());

    const visibles = new Set(
      habilidadesOriginales
        .filter(function (item) { return item.textoNormalizado.includes(termino); })
        .map(function (item) { return item.elementoLi; })
    );

    habilidadesOriginales.forEach(function (item) {
      item.elementoLi.hidden = !visibles.has(item.elementoLi);
    });

    document.querySelectorAll('.skills-group').forEach(function (grupo) {
      const quedanVisibles = Array.from(grupo.querySelectorAll('li')).some(function (li) {
        return !li.hidden;
      });
      grupo.hidden = !quedanVisibles;
    });

    if (resultado) {
      if (termino === '') {
        resultado.textContent = '';
      } else if (visibles.size === 0) {
        resultado.textContent = `No se encontraron habilidades para “${consulta.trim()}”.`;
      } else {
        resultado.textContent = `${visibles.size} resultado(s) para “${consulta.trim()}”.`;
      }
    }
  }

  input.addEventListener('input', function () {
    filtrarHabilidades(input.value);
  });
})();
