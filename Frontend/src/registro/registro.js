import { crearUsuario } from "../http/http-registro.js";
import { comprobarValidaciones } from "../utils/validaciones.js";

let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confpass = document.getElementById("confpass");

let formulario = document.getElementById("formularioRegistro");
let btnRegistro = document.getElementById("btn-registrar");

formulario.addEventListener("input", function(){
    if (nombre.value && email.value && password.value && confpass.value) {
        btnRegistro.removeAttribute("disabled");
    } else {
        btnRegistro.setAttribute("disabled", true);
    }
});

btnRegistro.addEventListener("click", async function(){
    event.preventDefault();
    console.log('Click event triggered')
    if (comprobarValidaciones(nombre.value, email.value, password.value, confpass.value)) {
        console.log('Validation pased')
        var datos=cargarDatos();
        await crearUsuario(datos).then(function(data){
            console.log('User creation succeddful', data)
            var error=document.getElementById("errores");
            error.innerHTML="";
            error.style.color="green";
            error.innerHTML="Usuario Creado";
        }).catch(function(error){
            console.log('User creation failed', error)
            var error=document.getElementById("errores");
            error.innerHTML="";
            error.style.color="red";
            error.innerHTML="Usuario no creado";
        });
        setTimeout(function(){
            window.location.href = "../index.html"
        },5000)
    }else{
        console.log('Validation failed')
    }
})

function cargarDatos(){
    var datos={
      nombre:nombre.value,
      email:email.value,
      password:password.value,
      confpass:confpass.value
    }
    return datos;
}