
(function () {
  const form = document.getElementById('form-contacto');
  if (!form) return;

  const status = document.getElementById('form-status');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function mensajeDe(campo) {
    const siguiente = campo.nextElementSibling;
    return siguiente && siguiente.classList.contains('error-msg') ? siguiente : null;
  }

  function mostrarError(campo, texto) {
    campo.classList.add('invalid');
    campo.setAttribute('aria-invalid', 'true');
    const msg = mensajeDe(campo);
    if (msg) {
      msg.textContent = texto;
      msg.classList.add('show');
    }
  }

  function limpiarError(campo) {
    campo.classList.remove('invalid');
    campo.removeAttribute('aria-invalid');
    const msg = mensajeDe(campo);
    if (msg) {
      msg.textContent = '';
      msg.classList.remove('show');
    }
  }

  //devuelve el texto de error del campo o '' si es válido
  function obtenerError(campo) {
    const valor = campo.value.trim();

    if (campo.validity.valueMissing || (campo.required && valor === '')) {
      return 'Este campo es obligatorio.';
    }
    if (campo.type === 'email' && (campo.validity.typeMismatch || !regexEmail.test(valor))) {
      return 'Ingresa un correo válido, ej. nombre@dominio.com';
    }
    if (campo.minLength > 0 && valor.length < campo.minLength) {
      return 'Debe tener al menos ' + campo.minLength + ' caracteres.';
    }
    return '';
  }

  function validarCampo(campo) {
    const error = obtenerError(campo);
    if (error) {
      mostrarError(campo, error);
      return false;
    }
    limpiarError(campo);
    return true;
  }

  const campos = Array.from(form.querySelectorAll('input, textarea'));

  campos.forEach(function (campo) {
    campo.addEventListener('input', function () { validarCampo(campo); });
    campo.addEventListener('blur', function () { validarCampo(campo); });
  });

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    // map() evalúa TODOS los campos (así se muestran todos los errores a la vez)
    const resultados = campos.map(validarCampo);
    const formularioValido = resultados.every(Boolean);

    status.classList.remove('ok', 'fail');

    if (formularioValido) {
      status.textContent = '¡Mensaje listo para enviar! (demo sin backend — conecta aquí tu servicio de envío)';
      status.classList.add('ok');
      form.reset();
    } else {
      status.textContent = 'Revisa los campos marcados antes de enviar.';
      status.classList.add('fail');

      const primerInvalido = campos.find(function (campo) {
        return campo.classList.contains('invalid');
      });
      if (primerInvalido) primerInvalido.focus();
    }
  });
})();
