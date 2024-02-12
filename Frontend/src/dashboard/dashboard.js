import { obtenerHumanos, obtenerOraculos, eliminarHumano } from "../http/http-dashboard.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');

let tablaHumanos = document.getElementById('tabla-humanos');
let tablaOraculos = document.getElementById('tabla-oraculos');

async function ObtencionDeHumanos() {
    let respuesta = await obtenerHumanos(token);
    let humanos = respuesta.humanos;

    humanos.forEach(humano => {
        let row = document.createElement('tr');

        let nombreCell = document.createElement('td');
        nombreCell.textContent = humano.nombre;
        row.appendChild(nombreCell);

        let correoCell = document.createElement('td');
        correoCell.textContent = humano.email;
        row.appendChild(correoCell);

        let accionesCell = document.createElement('td');

        let buttonBorrar = document.createElement('button');
        buttonBorrar.setAttribute('data-id', humano.id);
        buttonBorrar.addEventListener('click', async function () {
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

        let imgBorrar = document.createElement('img');
        imgBorrar.src = '../assets/papelera.png';
        imgBorrar.alt = 'Eliminar Humano';
        imgBorrar.style.width = '35px';

        buttonBorrar.appendChild(imgBorrar);
        accionesCell.appendChild(buttonBorrar);

        row.appendChild(accionesCell);

        tablaHumanos.appendChild(row);
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