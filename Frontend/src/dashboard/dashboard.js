var usuario = JSON.parse(sessionStorage.getItem('usuario'));
if (usuario && usuario.nombre) {
    document.getElementById('mensaje-bienvenida').textContent += ' ' + usuario.nombre;
}

let tableBody = document.querySelector('.table tbody');

async function ObtencionDeHumanos() {
    let humanos = await obtenerHumanos(user_id, token);
    humanos.forEach(humano => {
        let row = document.createElement('tr');

        let nombreCell = document.createElement('td');
        nombreCell.textContent = humano.nombre;
        row.appendChild(nombreCell);

        let correoCell = document.createElement('td');
        correoCell.textContent = humano.correo;
        row.appendChild(correoCell);

        tableBody.appendChild(row);
    });
}

ObtencionDeHumanos().catch(error => console.error('Error al manejar la obtención de humanos: ', error));
