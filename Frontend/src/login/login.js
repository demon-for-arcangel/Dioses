import { inicioSesion } from "../http/http-login.js";

let btnIniciarSesion = document.getElementById("btn-iniciar-sesion");
let errorContainer = document.getElementById('error');

async function realizarInicioSesion() {
    let email = document.getElementById('email').value;
    let contrasena = document.getElementById('password').value;

    if (!email || !contrasena) {
        mostrarError('No se encontraron los campos de email electrónico o contraseña');
        return;
    }

    try {
        let datos = {
            email: email,
            password: contrasena,
        };

        let respuestaServidor = await inicioSesion(datos);

        if (respuestaServidor.success && respuestaServidor.data) {
            let datosUsuario = respuestaServidor.data;
            let token = datosUsuario.token;
            var match = token.replace(/^'(.*)'$/, '$1');
            console.log(match);
            sessionStorage.setItem('usuario', JSON.stringify(datosUsuario));
            sessionStorage.setItem('token', JSON.stringify(datosUsuario.token));
            localStorage.setItem('usuarioId', datosUsuario.id);
            window.location.href = '/src/inicio/inicio.html';
        } else {
            mostrarError(respuestaServidor.message || "Inicio de sesión fallido.");
        }
    } catch (error) {
        mostrarError("Inicio de sesión fallido.");
    }
}

if (btnIniciarSesion) {
    btnIniciarSesion.addEventListener('click', realizarInicioSesion);
} else {
    console.error('No se encontró el botón de inicio de sesión');
}

function mostrarError(mensaje) {
    errorContainer.textContent = mensaje;
    setTimeout(() => {
        errorContainer.textContent = "";
    }, 3500);
}