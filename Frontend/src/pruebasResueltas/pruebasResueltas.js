import { obtenerPruebasResueltas } from '../http/http-pruebasResueltas.js';

document.addEventListener('DOMContentLoaded', () => {
    obtenerPruebasResueltas()
        .then(pruebas => {
            llenarTabla(pruebas);
        })
        .catch(error => {
            console.error('Error al obtener pruebas resueltas:', error);
        });
});

function llenarTabla(pruebas) {
    const tablaResueltos = document.getElementById('tabla-resueltos');
    const tbody = tablaResueltos.querySelector('tbody');

    tbody.innerHTML = '';

    pruebas.forEach(prueba => {
        const fila = document.createElement('tr');

        const tipoCelda = document.createElement('td');
        tipoCelda.textContent = prueba.tipo;
        fila.appendChild(tipoCelda);

        const preguntaCelda = document.createElement('td');
        preguntaCelda.textContent = prueba.pregunta;
        fila.appendChild(preguntaCelda);

        tbody.appendChild(fila);
    });
}
