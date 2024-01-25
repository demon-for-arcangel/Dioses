import { obtenerHumanos, obtenerOraculos } from "../http/http-dashboard.js";

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