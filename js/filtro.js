
(function () {
  const input = document.getElementById('buscador-habilidades');
  const resultado = document.getElementById('filtro-resultado');
  if (!input) return;

  // Snapshot inmutable: [{ texto, elementoLi, elementoGrupo }]
  const habilidadesOriginales = Array.from(document.querySelectorAll('.skills-group li')).map(function (li) {
    return {
      texto: li.textContent.trim(),
      elementoLi: li,
      elementoGrupo: li.closest('.skills-group')
    };
  });

  function filtrarHabilidades(consulta) {
    const termino = consulta.trim().toLowerCase();

    const visibles = habilidadesOriginales
      .filter(function (item) { return item.texto.toLowerCase().includes(termino); })
      .map(function (item) { return item.elementoLi; });

    habilidadesOriginales.forEach(function (item) {
      const esVisible = termino === '' || visibles.includes(item.elementoLi);
      item.elementoLi.hidden = !esVisible;
    });

    document.querySelectorAll('.skills-group').forEach(function (grupo) {
      const quedanVisibles = Array.from(grupo.querySelectorAll('li')).some(function (li) { return !li.hidden; });
      grupo.hidden = !quedanVisibles;
    });

    if (resultado) {
      resultado.textContent = termino === ''
        ? ''
        : `${visibles.length} resultado(s) para “${consulta}”.`;
    }
  }

  input.addEventListener('input', function () {
    filtrarHabilidades(input.value);
  });
})();
