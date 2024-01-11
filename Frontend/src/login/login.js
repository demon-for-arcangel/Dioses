import { inicioSesion } from "../http/inicioSesion.js";

let btnIniciarSesion = document.getElementById("btn-iniciar-sesion");
let errorContainer = document.getElementById('error');

async function realizarInicioSesion() {
    let correo = document.getElementById('correoElectronico').value;
    let contrasena = document.getElementById('contrasena').value;

    if (!correo || !contrasena) {
        mostrarError('No se encontraron los campos de correo electrónico o contraseña');
        return;
    }

    try {
        let datos = {
            correo: correo,
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
        console.error("Error al iniciar sesión:", error);
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