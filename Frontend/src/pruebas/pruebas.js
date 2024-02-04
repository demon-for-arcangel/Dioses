import { obtenerOraculos, eliminarOraculo } from "../http/http-verPruebas.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');

let tablaOraculos = document.getElementById('tabla-oraculos');

async function init() {
    try {
        let respuesta = await obtenerOraculos(token);
        console.log(respuesta);
        let oraculos = respuesta.oraculos;
        ObtencionOraculos(oraculos);
    } catch (error) {
        console.error('Error al obtener los oráculos: ', error);
    }
}

init(); 

async function ObtencionOraculos(oraculos) {
    try {
        if (oraculos && Array.isArray(oraculos)) {
            oraculos.forEach(oraculo => {
                let row = document.createElement('tr');

                let tipoCell = document.createElement('td');
                tipoCell.textContent = oraculo.tipo;
                row.appendChild(tipoCell);

                let preguntaCell = document.createElement('td');

                let enlaceImgEditar = document.createElement('a');
                enlaceImgEditar.href = '../modificarPruebas/modificarPruebas.html'; 

                let imgEditar = document.createElement('img');
                imgEditar.src = '../assets/editar.png'; 
                imgEditar.alt = 'Editar Prueba';
                imgEditar.style.width = '50px'; 

                enlaceImgEditar.appendChild(imgEditar);

                let buttonBorrar = document.createElement('button');
                buttonBorrar.setAttribute('data-id', oraculo.id);
                buttonBorrar.addEventListener('click', async function() {
                    try {
                        const id = this.getAttribute('data-id');
                        console.log('Intentando eliminar el oráculo con ID:', id);
                        console.log(token)
                        const respuesta = await eliminarOraculo(id, token);

                        if (respuesta.error) {
                            console.error('Error al eliminar el oráculo:', respuesta.error);
                        } else {
                            console.log('Respuesta de eliminación:', respuesta);
                        }
                    } catch (error) {
                        console.error('Error al eliminar el oráculo: ', error);
                    }
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
        } else {
            console.error('La respuesta de la API no contiene la lista de oráculos');
        }
    } catch (error) {
        console.error('Error al manejar la obtención de oráculos: ', error);
    }
}