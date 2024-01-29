import { crearUsuario } from "../http/http-registro.js";
import { comprobarValidaciones } from "../utils/validaciones.js";

document.addEventListener("DOMContentLoaded", function () {
    // Obtener elementos del formulario
    let nombre = document.querySelector("input[name='nombre']");
    let email = document.querySelector("input[name='email']");
    let password = document.querySelector("input[name='password']");
    let sabiduria = document.querySelector("input[name='sabiduria']:checked");
    let nobleza = document.querySelector("input[name='nobleza']:checked");
    let virtud = document.querySelector("input[name='virtud']:checked");
    let maldad = document.querySelector("input[name='maldad']:checked");
    let audacia = document.querySelector("input[name='audacia']:checked");

    let btnCrearHumano = document.getElementById("btnCrearHumano");

    // Agregar evento de clic al botón de crear humano
    btnCrearHumano.addEventListener("click", async function () {
        console.log("Botón de clic presionado");

        // Verificar validaciones antes de enviar la solicitud
        if (comprobarValidaciones(nombre.value, email.value, password.value)) {
            console.log("Validaciones pasadas");

            // Obtener valores de los campos seleccionados
            let datos = {
                nombre: nombre.value,
                email: email.value,
                password: password.value,
                sabiduria: sabiduria ? sabiduria.value : null,
                nobleza: nobleza ? nobleza.value : null,
                virtud: virtud ? virtud.value : null,
                maldad: maldad ? maldad.value : null,
                audacia: audacia ? audacia.value : null
            };

            console.log("Datos a enviar:", datos);

            try {
                // Enviar solicitud para crear usuario
                let response = await crearUsuario(datos);

                console.log('Usuario creado exitosamente:', response);
                // Manejar el éxito (p. ej., mostrar mensaje, redirigir)
            } catch (error) {
                console.error('Error al crear el usuario:', error);
                // Manejar el error (p. ej., mostrar mensaje de error)
            }
        } else {
            console.log("Validaciones no pasadas");
        }
    });

    // Agregar evento de input para habilitar/deshabilitar el botón
    document.getElementById("crearHumanoForm").addEventListener("input", function () {
        habilitarBoton();
    });

    // Función para habilitar/deshabilitar el botón de registro
    function habilitarBoton() {
        if (nombre.value && email.value && password.value && sabiduria && nobleza && virtud && maldad && audacia) {
            btnCrearHumano.removeAttribute("disabled");
        } else {
            btnCrearHumano.setAttribute("disabled", true);
        }
    }
});
