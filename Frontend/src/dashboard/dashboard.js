import { obtenerHumanos } from "../http/http-dashboard.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');

let tableBody = document.querySelector('.table tbody');

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

        tableBody.appendChild(row);
    });
}

ObtencionDeHumanos().catch(error => console.error('Error al manejar la obtención de humanos: ', error));
