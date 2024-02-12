import { obtenerHumanos, obtenerOraculos, eliminarHumano } from "../http/http-dashboard.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');

let tablaHumanos = document.getElementById('tabla-humanos');
let tablaOraculos = document.getElementById('tabla-oraculos');
let tablaHumanosMuertos = document.getElementById('tabla-humanos-muertos');

let correoUsuario = sessionStorage.getItem('email');

async function ObtencionDeHumanos() {
    let respuesta = await obtenerHumanos(token);
    let humanos = respuesta.humanos;

    humanos.forEach(humano => {
        if (!humano.fecha_muerte) { 
            let row = document.createElement('tr');

            let nombreCell = document.createElement('td');
            nombreCell.textContent = humano.nombre;
            row.appendChild(nombreCell);

            let correoCell = document.createElement('td');
            correoCell.textContent = humano.email;
            row.appendChild(correoCell);

            if (correoUsuario === 'hades@gmail.com') {
                let accionesCell = document.createElement('td');

                let buttonMatar = document.createElement('button');
                buttonMatar.setAttribute('data-id', humano.id);
                buttonMatar.addEventListener('click', async function () {
                    try {
                        const id = this.getAttribute('data-id');
                        console.log(id)
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

                let imgMatar = document.createElement('img');
                imgMatar.src = '../assets/icono matar humano.png';
                imgMatar.alt = 'Matar Humano';
                imgMatar.style.width = '35px';

                buttonMatar.appendChild(imgMatar);
                accionesCell.appendChild(buttonMatar);

                row.appendChild(accionesCell);
            }

            tablaHumanos.appendChild(row);
        } else {
            if (correoUsuario === 'hades@gmail.com') {
                if (humano.fecha_muerte) { 
                    let row = document.createElement('tr');

                    let nombreCell = document.createElement('td');
                    nombreCell.textContent = humano.nombre;
                    row.appendChild(nombreCell);

                    let correoCell = document.createElement('td');
                    correoCell.textContent = humano.email;
                    row.appendChild(correoCell);

                    tablaHumanosMuertos.appendChild(row);
                }
            }
        }
    });
}

async function ObtencionOraculos() {
    try {
        let respuesta = await obtenerOraculos(token);
        let oraculos = respuesta.oraculos;

        oraculos.forEach(oraculo => {
            let row = document.createElement('tr');

            let tipoCell = document.createElement('td');
            tipoCell.textContent = oraculo.tipo;
            row.appendChild(tipoCell);

            let preguntaCell = document.createElement('td');
            preguntaCell.textContent = oraculo.pregunta;
            row.appendChild(preguntaCell);

            tablaOraculos.appendChild(row);
        });
    } catch (error) {
        console.error('Error al manejar la obtención de oráculos: ', error);
    }
}

ObtencionDeHumanos();
ObtencionOraculos();