// Función para abrir la invitación (sobre) y reproducir la música
function abrirInvitacion() {
    // Obtener el sobre y la invitación
    const envelope = document.getElementById('envelope');
    const invitacion = document.getElementById('invitacion');
    
    // Añadir clase para animar la apertura del sobre
    envelope.classList.add('open');

    // Mostrar la invitación después de la animación
    setTimeout(() => {
        envelope.style.display = 'none';
        invitacion.style.display = 'block';
        
        // Reproducir la música solo después de abrir el sobre
        const musica = document.getElementById('musica');
        if (musica) {
            musica.play();
        }
    }, 1000); // Ajustar tiempo para esperar la animación de apertura del sobre
}

// Asignar el evento de clic al sello para abrir el sobre
document.addEventListener('DOMContentLoaded', function() {
    const seal = document.getElementById('seal');
    if (seal) {
        seal.addEventListener('click', abrirInvitacion);
    }

    // Iniciar el contador y cargar los datos del invitado al cargar la página
    iniciarContador();
    cargarDatosInvitado();
});

// Función para obtener datos de invitados (sin inputs)
function cargarDatosInvitado() {
    const params = new URLSearchParams(window.location.search);
    const invitadoId = params.get('id');

    if (!invitadoId) {
        alert('ID de invitado no encontrado en el enlace.');
        return;
    }

    // Base de datos simulada
    const invitados = {
        '1': { nombre: 'Ana Pérez', pases: 3 },
        '2': { nombre: 'Luis García', pases: 2 },
        '3': { nombre: 'María López', pases: 4 }
    };

    const invitado = invitados[invitadoId];

    if (invitado) {
        document.getElementById('nombreInvitado').innerText = invitado.nombre;
        document.getElementById('cantidadPases').innerText = `Pases: ${invitado.pases}`;
    } else {
        alert('Invitado no encontrado.');
    }
}

// Función para iniciar el contador de la fecha del evento
function iniciarContador() {
    const eventoFecha = new Date("September 27, 2025 14:30:00").getTime();

    setInterval(() => {
        const ahora = new Date().getTime();
        const diferencia = eventoFecha - ahora;

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerText = dias;
        document.getElementById("horas").innerText = horas;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("segundos").innerText = segundos;
    }, 1000);
}

// Función para abrir el lightbox solo al hacer clic en una imagen de la galería
function changePhoto(element) {
    const mainPhotoModal = document.getElementById('main-photo-modal');

    // Establecer la imagen del modal como la imagen seleccionada
    mainPhotoModal.src = element.src;

    // Mostrar el modal
    openModal();
}

// Función para mostrar el modal
function openModal() {
    const modal = document.getElementById('photo-modal');
    modal.style.display = 'flex'; // Usar 'flex' para centrar la imagen en pantalla
}

// Función para cerrar el modal
function closeModal(event) {
    // Cerrar el modal solo si el clic no fue en la imagen
    if (event.target.id === 'photo-modal' || event.target.className === 'close') {
        const modal = document.getElementById('photo-modal');
        modal.style.display = 'none';
    }
}

// Fade-in effect cuando los elementos se hacen visibles al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    const elementsToFade = document.querySelectorAll('.fade-in-element');

    const observerOptions = {
        threshold: 0.5, // El porcentaje del elemento que debe ser visible antes de activar la animación
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Deja de observar una vez que la animación se activa
            }
        });
    }, observerOptions);

    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});

//Funcion para confirmar la asistencia 
// --- Config del Form de Google (usa tus IDs de entrada) ---
const FORM_BASE = 'https://docs.google.com/forms/d/e/1FAIpQLSdjU9KfiwIEhIkFyIw7LVk2wHkPt9zJ2t9IZbwjcevCihNWCQ/viewform?usp=pp_url';
const ENTRY_NAME = 'entry.1297710131';     // Campo: Nombre
const ENTRY_PASES = 'entry.1099367965';    // Campo: Pases

function buildFormLink(nombre, pases) {
  const params = new URLSearchParams();
  params.set(ENTRY_NAME, nombre);
  params.set(ENTRY_PASES, String(pases));
  return `${FORM_BASE}&${params.toString()}`;
}

// ------- Tu código existente con pequeños ajustes -------
let invitadoActual = null;

// Función para obtener datos de invitados (desde invitados.js)
function cargarDatosInvitado() {
  const params = new URLSearchParams(window.location.search);
  const invitadoId = params.get('id');

  if (!invitadoId) {
    alert('ID de invitado no encontrado en el enlace.');
    return;
  }

  invitadoActual = invitados[invitadoId] || null;

  if (invitadoActual) {
    document.getElementById('nombreInvitado').innerText = invitadoActual.nombre;
    document.getElementById('cantidadPases').innerText = `Pases: ${invitadoActual.pases}`;
  } else {
    alert('Invitado no encontrado.');
  }
}

// Confirmación → abre Form prellenado dinámicamente
function confirmarAsistencia() {
  if (!invitadoActual) {
    alert('No se pudo identificar al invitado.');
    return;
  }
  const enlaceForm = buildFormLink(invitadoActual.nombre, invitadoActual.pases);
  window.open(enlaceForm, '_blank');
}

//Funcion para abrir waze o maps
//iglesia
function elegirAplicacion() {
    const enlaceGoogleMaps = 'https://maps.app.goo.gl/KE3H6gYxKCyyFCCu8';
    const enlaceWaze = 'https://waze.com/ul/h9fxekk30h';

    // Intentar abrir Google Maps primero
    window.open(enlaceGoogleMaps, '_blank');
    
    // Intentar abrir Waze (en caso de que Google Maps no esté disponible)
    setTimeout(() => {
        window.open(enlaceWaze, '_blank');
    }, 1000); // Retraso para permitir que el primer enlace se abra si está disponible
}
//fiesta
function elegirAplicacionOtraDireccion() {
    const enlaceGoogleMaps = 'https://maps.app.goo.gl/NJyqgMPfTJyzQK2cA';
    const enlaceWaze = 'https://waze.com/ul/h9fxeh1mgb';

    // Intentar abrir Google Maps primero
    window.open(enlaceWaze, '_blank');

    // Intentar abrir Waze (en caso de que Google Maps no esté disponible)
    setTimeout(() => {
        window.open(enlaceGoogleMaps, '_blank');
    }, 1000); // Retraso para permitir que el primer enlace se abra si está disponible
}

function abrirAlbumDigital() {
    const ALBUM_URL = 'https://drive.google.com/drive/folders/1rC6R8V9IijFWGEtQVLxrXTvXhp0KQ7c7?usp=drive_link';
    window.open(ALBUM_URL, '_blank');
  }
  document.addEventListener('DOMContentLoaded', () => {
    const formWrap = document.getElementById('wish-form');
    const inputNombre = document.getElementById('wish-nombre');
    const inputMensaje = document.getElementById('wish-mensaje');
    const btnEscribir = document.getElementById('btn-escribir');
    const btnEnviar = document.getElementById('btn-enviar-deseo');
    const btnCancelar = document.getElementById('btn-cancelar-deseo');
    const feedback = document.getElementById('wish-feedback');
    const wishesDiv = document.getElementById('wishes-container');
  
    const abrirForm = () => {
      formWrap.classList.remove('hidden');
      formWrap.classList.add('visible');
      formWrap.setAttribute('aria-hidden', 'false');
      inputNombre.focus();
    };
  
    const cerrarForm = () => {
      formWrap.classList.add('hidden');
      formWrap.classList.remove('visible');
      formWrap.setAttribute('aria-hidden', 'true');
    };
  
    btnEscribir.addEventListener('click', abrirForm);
    btnCancelar.addEventListener('click', cerrarForm);
  
    btnEnviar.addEventListener('click', async () => {
      const nombre = (inputNombre.value || '').trim();
      const mensaje = (inputMensaje.value || '').trim();
  
      if (!nombre || !mensaje) {
        alert('Por favor escribe tu nombre y un mensaje 🙏');
        return;
      }
  
      btnEnviar.disabled = true;
      try {
        await window.guardarDeseo(nombre, mensaje);
        inputNombre.value = '';
        inputMensaje.value = '';
  
        // Mensaje de agradecimiento
        feedback.classList.remove('hidden');
        feedback.classList.add('visible');
        setTimeout(() => {
          feedback.classList.add('hidden');
          feedback.classList.remove('visible');
        }, 2500);
  
        cerrarForm();
  
        // Si la lista está abierta, refrescarla de forma simple
        if (wishesDiv.classList.contains('visible')) {
          wishesDiv.dataset.loaded = 'false';
          window.toggleWishes(); // ocultar
          window.toggleWishes(); // volver a cargar y mostrar
        }
      } catch (e) {
        console.error(e);
        alert('Ocurrió un error al guardar tu deseo. Intenta de nuevo.');
      } finally {
        btnEnviar.disabled = false;
      }
    });
  });
    