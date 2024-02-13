import { consultarUser } from "../http/http-miPerfil.js";

// Obtener referencia a los elementos de los inputs
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const sabiduriaInput = document.getElementById('sabiduria');
const noblezaInput = document.getElementById('nobleza');
const virtudInput = document.getElementById('virtud');
const maldadInput = document.getElementById('maldad');
const audaciaInput = document.getElementById('audacia');

const guardarCambiosButton = document.querySelector('button');

const userId = sessionStorage.getItem('id-usuario');
const token = sessionStorage.getItem('token')

consultarUser(token, userId)
    .then(response => {
        const datosUsuario = response.mens.datosUsuario;

        nombreInput.value = datosUsuario.nombre;
        emailInput.value = datosUsuario.email;
        sabiduriaInput.value = datosUsuario.sabiduria;
        noblezaInput.value = datosUsuario.nobleza;
        virtudInput.value = datosUsuario.virtud;
        maldadInput.value = datosUsuario.maldad;
        audaciaInput.value = datosUsuario.audacia;
    })
    .catch(error => {
        console.error('Error al consultar el usuario:', error);
    });

guardarCambiosButton.addEventListener('click', function () {
    console.log('Guardando cambios...');
});
