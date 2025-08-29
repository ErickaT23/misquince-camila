import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGA7YejGQ1nDxkYGyrCRhHGNcXtmKZMQo",
  authDomain: "misquince-camila.firebaseapp.com",
  projectId: "misquince-camila",
  storageBucket: "misquince-camila.firebasestorage.app",
  messagingSenderId: "580899916243",
  appId: "1:580899916243:web:569b862a0110a1c49ec726",
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Definir funciones globales
window.guardarDeseo = function(nombre, mensaje) {
  return push(ref(db, 'buenos-deseos/'), {
    nombre,
    mensaje,
    timestamp: new Date().toISOString()
  });
};

window.toggleWishes = function() {
  const wishesDiv = document.getElementById('wishes-container');

  if (wishesDiv.classList.contains('visible')) {
    wishesDiv.classList.remove('visible');
    wishesDiv.classList.add('hidden');
    return;
  }

  if (wishesDiv.dataset.loaded === 'true') {
    wishesDiv.classList.remove('hidden');
    wishesDiv.classList.add('visible');
    return;
  }

  onValue(ref(db, 'buenos-deseos/'), (snapshot) => {
    requestIdleCallback(() => {
      wishesDiv.innerHTML = '';

      snapshot.forEach((childSnapshot) => {
        const wish = childSnapshot.val();
        const wishElement = document.createElement('p');
        wishElement.innerHTML = `<strong>${wish.nombre}:</strong> ${wish.mensaje}`;
        wishesDiv.appendChild(wishElement);
      });

      wishesDiv.dataset.loaded = 'true';
      wishesDiv.classList.remove('hidden');
      wishesDiv.classList.add('visible');
    });
  });
};
