import { comprobarValidaciones } from "../utils/validaciones.js";
import { crearHumano, obtenerIdDios } from "../http/http-crearHumanos.js"
import { empty } from "../utils/funciones.js"

document.addEventListener("DOMContentLoaded", async function () {
    var token = sessionStorage.getItem("token");
    var id_usuario = sessionStorage.getItem("id-usuario");

    if (token && id_usuario) {
        try {
            const respuestaIdDios = await obtenerIdDios(id_usuario, token);
            const idDios = respuestaIdDios.id_dios;

            btnCrearHumano.addEventListener("click", async function () {
                var nombreNuevo = document.getElementById("nombre");
                var correoNuevo = document.getElementById("email");
                var passwordNuevo = document.getElementById("password");
                var crear = document.getElementById("mensajeCrear");
        
                if (comprobarValidaciones(nombreNuevo.value, correoNuevo.value, passwordNuevo.value)) {
                    console.log("Validaciones pasadas");
        
                    let datos = cargarDatosHumano(nombreNuevo.value, correoNuevo.value, passwordNuevo.value);
        
                    console.log("Datos a enviar:", datos);
                    console.log(token)
                    try {
                        await crearHumano(datos, token, idDios);
                        crear.textContent = "Usuario Creado";
                        crear.style.color = "green";
        
                        setTimeout(function () {
                            nombreNuevo.value = "";
                            correoNuevo.value = "";
                            passwordNuevo.value = "";
                            crear.textContent = "";
                            window.location.href = "../humanos/humanos.html"
                        }, 3000);
                    } catch (error) {
                        console.error('Error al crear el usuario:', error);
                    }
                } else {
                    console.log("Validaciones no pasadas");
                }
            });
        
        } catch (error) {
            console.error('Error al obtener el ID del Dios:', error);
        }
    } else {
        console.error('Token o ID de usuario no disponibles');
    }
});


function cargarDatosHumano(nombre, correo, password) {
    var datos;
    var errores = [];
    var errorNombre = document.getElementById("errorNombre");
    var errorCorreo = document.getElementById("errorEmail");
    var errorPassword = document.getElementById("errorPassword");
    errorNombre.textContent = "";
    errorCorreo.textContent = "";
    errorPassword.textContent = "";

    if (empty(nombre)) {
        errorNombre.textContent = "El nombre se encuentra vacío";
        errorNombre.style.color = "red";
        errores.push("error");
    }

    if (empty(correo)) {
        errorCorreo.textContent = "El correo se encuentra vacío";
        errorCorreo.style.color = "red";
        errores.push("error");
    }

    if (empty(password)) {
        errorPassword.textContent = "El password se encuentra vacío";
        errorPassword.style.color = "red";
        errores.push("error");
    }

    if (errores.length == 0) {
        datos = {
            nombre: nombre,
            correo: correo,
            password: password,
        };
    }

    return datos;
}
