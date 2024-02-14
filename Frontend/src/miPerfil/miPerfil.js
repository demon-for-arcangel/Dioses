import { consultarUser, subirImagenS3, actualizarImg } from "../http/http-miPerfil.js";

// Obtener referencia a los elementos de los inputs
const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const sabiduriaInput = document.getElementById('sabiduria');
const noblezaInput = document.getElementById('nobleza');
const virtudInput = document.getElementById('virtud');
const maldadInput = document.getElementById('maldad');
const audaciaInput = document.getElementById('audacia');
const img = document.getElementById("imgSubida")

const guardarCambiosButton = document.querySelector('button');

const userId = sessionStorage.getItem('id-usuario');
const token = sessionStorage.getItem('token')

consultarUser(token, userId)
    .then(response => {
        const datosUsuario = response.mens.datosUsuario;

        img.src = datosUsuario.img
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

function subirImagen(){
    var inputImagen=document.getElementById("inputImage")

    var bodyImage=new FormData()

    bodyImage.append("image",inputImagen.files[0])

    subirImagenS3(bodyImage).then(function(image){
        let bodyContent=JSON.stringify({
            "id":idUsuario,
            "img":image.url
        })

        console.log(bodyContent)
        actualizarImg(bodyContent).then(function(){
            setTimeout(function(){
                window.location.reload()
            },5000)
        })
    }) 
}

btnSubir.addEventListener("click",function(){
    subirImagen()
})