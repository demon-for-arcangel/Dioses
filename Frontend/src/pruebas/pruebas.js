import { obtenerOraculos, eliminarOraculo } from "../http/http-verPruebas.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');

let tablaOraculos = document.getElementById('tabla-oraculos');

let respuesta = await obtenerOraculos(token);
let oraculos = respuesta.oraculos;

async function ObtencionOraculos() {
    try {
        oraculos.forEach(oraculo => {
            let row = document.createElement('tr');

            let tipoCell = document.createElement('td');
            tipoCell.textContent = oraculo.tipo;
            row.appendChild(tipoCell);

            console.log(oraculo.id)

            let preguntaCell = document.createElement('td');

            let enlaceImgEditar = document.createElement('a');
            enlaceImgEditar.href = '../modificarPruebas/modificarPruebas.html'; 

            let imgEditar = document.createElement('img');
            imgEditar.src = '../assets/editar.png'; 
            imgEditar.alt = 'Editar Prueba';
            imgEditar.style.width = '50px'; 

            enlaceImgEditar.appendChild(imgEditar);

            let buttonBorrar = document.createElement('button');
            buttonBorrar.addEventListener('click', function() {
                eliminarPrueba(oraculo.id, token);  
            });

            let imgBorrar = document.createElement('img');
            imgBorrar.src = '../assets/papelera.png';  
            imgBorrar.alt = 'Eliminar Prueba';
            imgBorrar.style.width = '50px';

            buttonBorrar.appendChild(imgBorrar);

            let textoPregunta = document.createElement('span');
            textoPregunta.textContent = oraculo.pregunta;

            preguntaCell.appendChild(enlaceImgEditar);
            preguntaCell.appendChild(buttonBorrar);
            preguntaCell.appendChild(textoPregunta);

            row.appendChild(preguntaCell);

            tablaOraculos.appendChild(row);
        });
    } catch (error) {
        console.error('Error al manejar la obtención de oráculos: ', error);
    }
}
async function eliminarPrueba(id, token) {
    try {
        console.log('ID recibido:', id);
        const index = oraculos.findIndex(oraculo => oraculo.id === id);

        if (index !== -1) {
            const respuesta = await eliminarOraculo(oraculos[index].id, token);
            console.log(respuesta);
        } else {
            console.error('Oráculo no encontrado para el id: ', id);
        }
    } catch (error) {
        console.error('Error al eliminar el oráculo: ', error);
    }
}

eliminarPrueba();
ObtencionOraculos();
