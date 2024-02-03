import { obtenerOraculos } from "../http/http-verPruebas.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');

let tablaOraculos = document.getElementById('tabla-oraculos');

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

ObtencionOraculos();