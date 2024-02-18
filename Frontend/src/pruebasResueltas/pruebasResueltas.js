import { obtenerPruebasResueltas, obtenerIdHumano } from '../http/http-pruebasResueltas.js';

document.addEventListener('DOMContentLoaded', async () => {
    const userId = sessionStorage.getItem('id-usuario');
    const token = sessionStorage.getItem('token')

    const respuestaIdHumano = await obtenerIdHumano(userId, token);
    const idHumano = respuestaIdHumano.id_humano;

    obtenerPruebasResueltas(token, idHumano)
        .then(pruebas => {
            if (pruebas.length > 0) {
                llenarTabla(pruebas);
            } else {
                mostrarMensaje('No hay pruebas resueltas para mostrar.', false);
            }
        })
        .catch(error => {
            console.error('Error al obtener pruebas resueltas:', error);
        });
});

function llenarTabla(pruebas) {
    const tablaResueltos = document.getElementById('tabla-resueltos');

    if (tablaResueltos) {
        const tbody = tablaResueltos.querySelector('tbody');

        if (tbody) {
            tbody.innerHTML = '';

            pruebas.forEach(prueba => {
                const fila = document.createElement('tr');

                const tipoCelda = document.createElement('td');
                tipoCelda.textContent = prueba.tipo;
                fila.appendChild(tipoCelda);

                const preguntaCelda = document.createElement('td');
                preguntaCelda.textContent = prueba.pregunta;
                fila.appendChild(preguntaCelda);

                const resultadoCelda = document.createElement('td');
                resultadoCelda.textContent = prueba.resultado;
                fila.appendChild(resultadoCelda);

                tbody.appendChild(fila);
            });
        } else {
            console.error('No se encontró el elemento tbody en la tabla.');
        }
    } else {
        console.error('No se encontró la tabla con el id "tabla-resueltos".');
    }
}

function mostrarMensaje(mensaje, mostrarTabla = true) {
    const mensajeElement = document.getElementById('mensaje');
    const tablaResueltos = document.getElementById('tabla-resueltos');

    mensajeElement.textContent = mensaje;
    tablaResueltos.style.display = mostrarTabla ? 'table' : 'none';
}