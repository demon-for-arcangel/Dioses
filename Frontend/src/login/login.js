import { obtenerDatos, enviarSessionStorage } from "../http/http-login.js";

let btnIniciarSesion = document.getElementById("btn-iniciar-sesion");
let errorContainer = document.getElementById('error');
let correo = document.getElementById('email');
let contrasena = document.getElementById('password');

btnIniciarSesion.addEventListener('click', function(event){
    event.preventDefault();

    obtenerDatos(correo.value, contrasena.value)
    .then(response => {
        mostrarError('');
        var token = response.data.token;
        var id = response.data.id;
        var tipoUsuario = response.data.tipoUsuario;
        //sessionStorage.setItem('foto-url',data.foto)
        sessionStorage.setItem('nombre',response.data.nombre)
        enviarSessionStorage(id, token)

        if (tipoUsuario === 'dios'){
            window.location.href='./dashboard/dashboard.html';
        } else if (tipoUsuario === 'humano'){
            window.location.href='./inicio/inicio.html';
        } else {
            mostrarError('Tipo de usuario desconocido. Por favor, inténtelo de nuevo')
        }
    })
    .catch(error => {
        console.error('Error durante el inicio de sesión:', error);
    mostrarError('Error durante el inicio de sesión. Por favor, inténtalo de nuevo.');
        errorContainer.style.color = 'red';
    });
})

function mostrarError(mensaje) {
    errorContainer.textContent = mensaje;
    setTimeout(() => {
        errorContainer.textContent = "";
    }, 5000);
}
