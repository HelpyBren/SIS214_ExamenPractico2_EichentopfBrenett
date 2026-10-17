// validación del formulario de contacto (todo en el cliente, no hay backend)
(function () {
  const form = document.getElementById('form-contacto');
  if (!form) return;

  const status = document.getElementById('form-status');
  // el type="email" nativo acepta "a@b" sin punto, por eso esta regex extra
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // el <p class="error-msg"> está justo debajo de cada campo
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

  // devuelve el texto del error, o '' si el campo está bien
  function obtenerError(campo) {
    const valor = campo.value.trim();

    // el trim() es para que unos cuantos espacios no cuenten como "lleno"
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

    // map y no some/every directo: así se revisan todos y salen todos los errores juntos
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

      // foco al primer error para no tener que buscarlo
      const primerInvalido = campos.find(function (campo) {
        return campo.classList.contains('invalid');
      });
      if (primerInvalido) primerInvalido.focus();
    }
  });
})();
