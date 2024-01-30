import { comprobarValidaciones } from "../utils/validaciones.js";
import { crearHumano } from "../http/http-crearHumanos.js"
import { empty } from "../utils/funciones.js"

document.addEventListener("DOMContentLoaded", function () {
    let btnCrearHumano = document.getElementById("btnCrearHumano");
    var token = sessionStorage.getItem("token");

    btnCrearHumano.addEventListener("click", async function () {
        var nombreNuevo = document.getElementById("nombre");
        var correoNuevo = document.getElementById("email");
        var passwordNuevo = document.getElementById("password");
        var sabiduria = getRadioValueByName("sabiduria");
        var nobleza = getRadioValueByName("nobleza");
        var virtud = getRadioValueByName("virtud");
        var maldad = getRadioValueByName("maldad");
        var audacia = getRadioValueByName("audacia");
        var crear = document.getElementById("mensajeCrear");

        console.log("Botón de clic presionado");

        console.log('Valor de sabiduria:', sabiduria ? sabiduria.value : null);
        console.log('Nombre: ', nombreNuevo);
        console.log('correo: ', correoNuevo);
        console.log('password: ', passwordNuevo);

        let sabiduriaValida = sabiduria ? sabiduria.value : null;
        let noblezaValida = nobleza ? nobleza.value : null;
        let virtudValida = virtud ? virtud.value : null;
        let maldadValida = maldad ? maldad.value : null;
        let audaciaValida = audacia ? audacia.value : null;


        // Realizar validaciones específicas para sabiduria, nobleza, virtud, maldad, audacia
        // (Agrega tus validaciones específicas aquí)

        // Si las validaciones específicas pasan, proceder a la validación general
        if (comprobarValidaciones(nombreNuevo.value, correoNuevo.value, passwordNuevo.value)) {
            console.log("Validaciones pasadas");

            // Obtener valores de los campos seleccionados
            let datos = cargarDatosHumano(nombreNuevo.value, correoNuevo.value, passwordNuevo.value, sabiduriaValida, noblezaValida, virtudValida, maldadValida, audaciaValida);

            console.log("Datos a enviar:", datos);
            console.log(token)
            try {
                // Enviar solicitud para crear usuario usando la función del archivo http-crearUsuario
                await crearHumano(datos, token);
                crear.textContent = "Usuario Creado";
                crear.style.color = "green";

                setTimeout(function () {
                    nombreNuevo.value = "";
                    correoNuevo.value = "";
                    passwordNuevo.value = "";
                    crear.textContent = "";
                    window.location.reload();
                }, 5000);
            } catch (error) {
                console.error('Error al crear el usuario:', error);
            }
        } else {
            console.log("Validaciones no pasadas");
        }
    });
});

function getRadioValueByName(name) {
    const radioButtons = document.getElementsByName(name);

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i];
        }
    }

    return null;
}


function cargarDatosHumano(nombre, correo, password, sabiduria, nobleza, virtud, maldad, audacia) {
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
            sabiduria: sabiduria,
            nobleza: nobleza,
            virtud: virtud,
            maldad: maldad,
            audacia: audacia
        };
    }

    return datos;
}
