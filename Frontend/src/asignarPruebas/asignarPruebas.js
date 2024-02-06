import { obtenerOraculos, mostrarPrueba } from '../http/http-asignarPruebas.js';
document.addEventListener('DOMContentLoaded', () => {
    cargarHumanos();
});
var token = sessionStorage.getItem("token");

async function cargarHumanos() {
    try {
        const humanos = await obtenerOraculos(token);
        const tablaHumanos = document.getElementById('tabla-humanos');
        humanos.forEach(humano => {
            const fila = tablaHumanos.insertRow();
            fila.insertCell().textContent = humano.nombre; 
        });
    } catch (error) {
        console.error('Error al cargar los humanos:', error);
    }
}