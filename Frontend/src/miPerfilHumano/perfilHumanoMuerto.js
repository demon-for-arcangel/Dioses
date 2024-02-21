import { consultarUser, subirImagenS3, actualizarImg, modificarContra  } from "../http/http-miPerfilHumano.js";

const nombreInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const fechaMuerte = document.getElementById('fecha_muerte');
const ubicacionInput = document.getElementById('ubicacion');
const sabiduriaInput = document.getElementById('sabiduria');
const noblezaInput = document.getElementById('nobleza');
const virtudInput = document.getElementById('virtud');
const maldadInput = document.getElementById('maldad');
const audaciaInput = document.getElementById('audacia');
const img = document.getElementById("imgSubida")

const guardarCambiosButton = document.getElementById('guardar');

const userId = sessionStorage.getItem('id-usuario');
const token = sessionStorage.getItem('token')

consultarUser(token, userId)
    .then(response => {
        const datosUsuario = response.mens.datosUsuario;

        img.src = datosUsuario.img
        nombreInput.value = datosUsuario.nombre;
        emailInput.value = datosUsuario.email;
        fechaMuerte.value = datosUsuario.fecha_muerte;
        ubicacionInput.value = datosUsuario.ubicacion;
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
    const oldPassword = document.getElementById('password').value;
    const newPassword = document.getElementById('newPassword').value;

    modificarContra(token, userId, oldPassword, newPassword)
        .then(response => {
            mensajeResultado.textContent = 'Contraseña modificada exitosamente';
            mensajeResultado.style.color = 'green';
            setTimeout(function(){
                window.location.reload()
            },5000);
        })
        .catch(error => {
            mensajeResultado.textContent = 'No se ha podido modificar la contraseña';
            mensajeResultado.style.color = 'red';
            console.error('Error al modificar la contraseña:', error);
        });
});

function subirImagen(){
    var inputImagen=document.getElementById("inputImage");

    var bodyImage=new FormData();

    bodyImage.append("image",inputImagen.files[0]);

    subirImagenS3(bodyImage).then(function(image){
        let bodyContent=JSON.stringify({
            "id":userId,
            "img":image.url
        });

        actualizarImg(bodyContent).then(function(){
            setTimeout(function(){
                window.location.reload()
            },5000);
        });
    });
}

btnSubir.addEventListener("click",function(){
    subirImagen();
    window.location.reload();
});