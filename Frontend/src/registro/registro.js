import { crearUsuario } from "../http/http-registro.js";

let nombre = document.getElementById("nombre");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confpass = document.getElementById("confpass");

let formulario = document.getElementById("formularioRegistro");
let btnRegistro = document.getElementById("btn-registrar");

formulario.addEventListener("input", function(){
    btnRegistro.removeAttribute("disabled", true);
})

btnRegistro.addEventListener("click", async function(){
    if (comprobarValidaciones(nombre,email,password,confpass)) {
        var datos=cargarDatos();
        await crearUsuario(datos).then(function(data){
            var error=document.getElementById("errores");
            error.innerHTML="";
            error.style.color="green";
            error.innerHTML="Usuario Creado";
        }).catch(function(error){
            var error=document.getElementById("errores");
            error.innerHTML="";
            error.style.color="red";
            error.innerHTML="Usuario no creado";
        });
        setTimeout(function(){
            window.location.href = "../index.html"
        },5000)
    }
})

function cargarDatos(){
    var datos={
      nombre:nombre.value,
      email:email.value,
      password:password.value
    }
    return datos;
}