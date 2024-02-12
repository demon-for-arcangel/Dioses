import { eliminarHumano, obtenerHumanosProtegidos, obtenerIdDios } from "../http/http-verHumanosAsignados.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');
let id_usuario = sessionStorage.getItem('id-usuario');
let tablaHumanos = document.getElementById('tabla-humanos');

async function init() {
    try {
        const respuestaIdDios = await obtenerIdDios(id_usuario, token);
        const idDios = respuestaIdDios.id_dios;

        let respuesta = await obtenerHumanosProtegidos(token, idDios);

        if (respuesta && respuesta.humanosProtegidos) {
            let humanos = respuesta.humanosProtegidos;
            ObtencionHumanos(humanos);
        } else {
            console.error('La respuesta de la API no contiene la lista de humanos bajo tu protección');
        }
    } catch (error) {
        console.error('Error al obtener los humanos bajo tu protección: ', error);
    }
}

init();

async function ObtencionHumanos(respuesta) {
    try {
        console.log(respuesta);

        if (respuesta) {
            const humanos = respuesta;

            humanos.forEach(humano => {
                let row = document.createElement('tr');

                let nombreCell = document.createElement('td');
                nombreCell.textContent = humano.nombre_usuario;
                row.appendChild(nombreCell);

                let accionesCell = document.createElement('td');

                let buttonBorrar = document.createElement('button');
                buttonBorrar.setAttribute('data-id', humano.id);
                buttonBorrar.addEventListener('click', async function () {
                    try {
                        const id = this.getAttribute('data-id');
                        const respuesta = await eliminarHumano(id, token);

                        if (respuesta.error) {
                            console.error('Error al eliminar el humano:', respuesta.error);
                        } else {
                            console.log('Respuesta de eliminación:', respuesta);
                            window.location.reload();
                        }
                    } catch (error) {
                        console.error('Error al eliminar el humano: ', error);
                    }
                });

                let imgBorrar = document.createElement('img');
                imgBorrar.src = '../assets/papelera.png';
                imgBorrar.alt = 'Eliminar Humano';
                imgBorrar.style.width = '35px';

                buttonBorrar.appendChild(imgBorrar);
                accionesCell.appendChild(buttonBorrar);

                row.appendChild(accionesCell);

                tablaHumanos.appendChild(row);
            });
        } else {
            console.error('La respuesta de la API no contiene la lista de humanos bajo tu protección');
        }
    } catch (error) {
        console.error('Error al manejar la obtención de humanos: ', error);
    }
}
