import { crearUsuario } from "../http/http-registro.js";
import { comprobarValidaciones } from "../utils/validaciones.js";

let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let password = document.getElementById("password");

let sabiduria = document.querySelector('input[name="sabiduria"]:checked');
let nobleza = document.querySelector('input[name="nobleza"]:checked');
let virtud = document.querySelector('input[name="virtud"]:checked');
let maldad = document.querySelector('input[name="maldad"]:checked');
let audacia = document.querySelector('input[name="audacia"]:checked');

let formulario = document.getElementById("crearHumanoForm"); 
let btnRegistro = document.querySelector("button[type='submit']")

formulario.addEventListener("input", function() {
    if (nombre.value && email.value && password.value) {
        btnRegistro.removeAttribute("disabled");
    } else {
        btnRegistro.setAttribute("disabled", true);
    }
});

formulario.addEventListener("submit", async function(event) {
    event.preventDefault();
    console.log('Submit event triggered');
    if (comprobarValidaciones(nombre.value, email.value, password.value)) {
        let datos = cargarDatos();
        try {
            let response = await crearUsuario(datos);
            console.log('Usuario creado exitosamente:', response);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    }
});

function cargarDatos() {
    return {
        nombre: nombre.value,
        email: email.value,
        password: password.value,
        sabiduria: sabiduria.value,
        nobleza: nobleza.value,
        virtud:  virtud.value,
        maldad:  maldad.value,
        audacia: audacia.value,
    };
}