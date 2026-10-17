// validacion.js — valida el formulario de contacto en el cliente.
// intercepta submit con preventDefault() y valida en tiempo real
// con el evento 'input' (no solo al salir del campo).
(function () {
  const form = document.getElementById('form-contacto');
  if (!form) return;

  const status = document.getElementById('form-status');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function mensajeDe(campo) {
    return campo.nextElementSibling && campo.nextElementSibling.classList.contains('error-msg')
      ? campo.nextElementSibling
      : null;
  }

  function mostrarError(campo, texto) {
    campo.classList.add('invalid');
    const msg = mensajeDe(campo);
    if (msg) {
      msg.textContent = texto;
      msg.classList.add('show');
    }
  }

  function limpiarError(campo) {
    campo.classList.remove('invalid');
    const msg = mensajeDe(campo);
    if (msg) {
      msg.textContent = '';
      msg.classList.remove('show');
    }
  }

  function validarCampo(campo) {
    const valor = campo.value.trim();

    if (campo.hasAttribute('required') && valor === '') {
      mostrarError(campo, 'Este campo es obligatorio.');
      return false;
    }
    if (campo.type === 'email' && valor !== '' && !regexEmail.test(valor)) {
      mostrarError(campo, 'Ingresa un correo válido, ej. nombre@dominio.com');
      return false;
    }
    if (campo.id === 'mensaje' && valor !== '' && valor.length < 10) {
      mostrarError(campo, 'El mensaje debe tener al menos 10 caracteres.');
      return false;
    }
    limpiarError(campo);
    return true;
  }

  // Validación en tiempo real mientras el usuario escribe
  form.querySelectorAll('input, textarea').forEach(function (campo) {
    campo.addEventListener('input', function () { validarCampo(campo); });
    campo.addEventListener('blur', function () { validarCampo(campo); });
  });

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    let formularioValido = true;

    form.querySelectorAll('input, textarea').forEach(function (campo) {
      if (!validarCampo(campo)) formularioValido = false;
    });

    status.classList.remove('ok', 'fail');

    if (formularioValido) {
      status.textContent = '¡Mensaje listo para enviar! (demo sin backend — conecta aquí tu servicio de envío)';
      status.classList.add('ok');
      form.reset();
    } else {
      status.textContent = 'Revisa los campos marcados antes de enviar.';
      status.classList.add('fail');
    }
  });
})();
