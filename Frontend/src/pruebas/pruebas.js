import { obtenerOraculos, eliminarOraculo, modificarPrueba } from "../http/http-verPruebas.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');

let tablaOraculos = document.getElementById('tabla-oraculos');

// Agregar un contenedor para el modal en el body
let modalContainer = document.createElement('div');
modalContainer.id = 'modal-container';
document.body.appendChild(modalContainer);

async function init() {
    try {
        let respuesta = await obtenerOraculos(token);
        console.log(respuesta);
        let oraculos = respuesta.oraculos;
        ObtencionOraculos(oraculos);
    } catch (error) {
        console.error('Error al obtener los oráculos: ', error);
    }
}

init(); 

async function ObtencionOraculos(oraculos) {
    try {
        if (oraculos && Array.isArray(oraculos)) {
            oraculos.forEach(oraculo => {
                let row = document.createElement('tr');

                let tipoCell = document.createElement('td');
                tipoCell.textContent = oraculo.tipo;
                row.appendChild(tipoCell);

                let preguntaCell = document.createElement('td');
                preguntaCell.textContent = oraculo.pregunta;
                row.appendChild(preguntaCell);

                // Nueva columna para "Cantidad Destino"
                let cantidadDestinoCell = document.createElement('td');
                cantidadDestinoCell.textContent = oraculo.cantidad_destino;
                row.appendChild(cantidadDestinoCell);

                // Crear una nueva celda para las acciones (editar y borrar)
                let accionesCell = document.createElement('td');

                let buttonEditar = document.createElement('button');
                buttonEditar.addEventListener('click', () => {
                    switch (oraculo.tipo) {
                        case 'libre':
                            abrirModalLibre(oraculo.id, oraculo.tipo, oraculo.pregunta, oraculo.cantidad_destino, oraculo.palabra_clave);
                            break;
                
                        case 'valoracion':
                            abrirModalValoracion(oraculo.id, oraculo.tipo, oraculo.pregunta, oraculo.cantidad_destino, oraculo.valor_maximo);
                            break;
                
                        case 'eleccion':
                            abrirModalEleccion(oraculo.id, oraculo.tipo, oraculo.pregunta, oraculo.cantidad_destino, oraculo.opcion_1, oraculo.opcion_2);
                            break;
                
                        default:
                            console.error('Tipo de prueba no reconocido:', oraculo.tipo);
                            break;
                    }
                });
                let imgEditar = document.createElement('img');
                imgEditar.src = '../assets/editar.png'; 
                imgEditar.alt = 'Editar Prueba';
                imgEditar.style.width = '35px'; 

                buttonEditar.appendChild(imgEditar);
                accionesCell.appendChild(buttonEditar); // Añadir el botón de editar a la celda de acciones

                let buttonBorrar = document.createElement('button');
                buttonBorrar.setAttribute('data-id', oraculo.id);
                buttonBorrar.addEventListener('click', async function() {
                    try {
                        const id = this.getAttribute('data-id');
                        console.log('Intentando eliminar el oráculo con ID:', id);
                        console.log(token);
                        const respuesta = await eliminarOraculo(id, token);

                        if (respuesta.error) {
                            console.error('Error al eliminar el oráculo:', respuesta.error);
                        } else {
                            console.log('Respuesta de eliminación:', respuesta);
                            window.location.reload();
                        }
                    } catch (error) {
                        console.error('Error al eliminar el oráculo: ', error);
                    }
                });

                let imgBorrar = document.createElement('img');
                imgBorrar.src = '../assets/papelera.png';  
                imgBorrar.alt = 'Eliminar Prueba';
                imgBorrar.style.width = '35px';

                buttonBorrar.appendChild(imgBorrar);
                accionesCell.appendChild(buttonBorrar); // Añadir el botón de borrar a la celda de acciones

                row.appendChild(accionesCell); // Añadir la celda de acciones a la fila

                tablaOraculos.appendChild(row);
            });
        } else {
            console.error('La respuesta de la API no contiene la lista de oráculos');
        }
    } catch (error) {
        console.error('Error al manejar la obtención de oraculos: ', error);
    }
}

function abrirModalLibre(id, tipoActual, preguntaActual, cantidadDestinoActual, palabraClaveActual) {
    // HTML del modal
    const modalHTML = `
        <div id="miModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="cerrarModalEdicion()">&times;</span>
                <label for="nuevoTipo">Tipo:</label>
                <input type="text" id="nuevoTipo" value="${tipoActual}" readonly>
                <label for="nuevaPregunta">Pregunta:</label>
                <input type="text" id="nuevaPregunta" value="${preguntaActual}">
                <label for="nuevaCantidadDestino">Cantidad de Destino:</label>
                <input type="text" id="nuevaCantidadDestino" value="${cantidadDestinoActual}">
                <label for="palabraClave">Palabra Clave:</label>
                <input type="text" id="palabraClave" value="${palabraClaveActual}">
                <button id="btnModificarOraculo">Modificar Prueba</button>
                <button id="btnCancelarModificacion">Cancelar Modificación</button>
            </div>
        </div>
    `;

    // Añadir el HTML del modal al contenedor
    modalContainer.innerHTML = modalHTML;

    // Mostrar el modal
    document.getElementById('miModal').style.display = 'block';

    // Agregar los event listeners
    document.getElementById('btnModificarOraculo').addEventListener('click', () => modificarOraculo(id));
    document.getElementById('btnCancelarModificacion').addEventListener('click', cerrarModal);
}

function abrirModalValoracion(id, tipoActual, preguntaActual, cantidadDestinoActual, valorMaximoActual) {
    // HTML del modal
    const modalHTML = `
        <div id="miModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="cerrarModalEdicion()">&times;</span>
                <label for="nuevoTipo">Tipo:</label>
                <input type="text" id="nuevoTipo" value="${tipoActual}" readonly>
                <label for="nuevaPregunta">Pregunta:</label>
                <input type="text" id="nuevaPregunta" value="${preguntaActual}">
                <label for="nuevaCantidadDestino">Cantidad de Destino:</label>
                <input type="text" id="nuevaCantidadDestino" value="${cantidadDestinoActual}">
                <label for="valorMaximo">Valor Máximo:</label>
                <input type="number" id="valorMaximo" value="${valorMaximoActual}" min="1" max="5">
                <button id="btnModificarOraculo">Modificar Prueba</button>
                <button id="btnCancelarModificacion">Cancelar Modificación</button>
            </div>
        </div>
    `;

    // Añadir el HTML del modal al contenedor
    modalContainer.innerHTML = modalHTML;

    // Mostrar el modal
    document.getElementById('miModal').style.display = 'block';

    // Agregar los event listeners
    document.getElementById('btnModificarOraculo').addEventListener('click', () => modificarOraculo(id));
    document.getElementById('btnCancelarModificacion').addEventListener('click', cerrarModal);
}

function abrirModalEleccion(id, tipoActual, preguntaActual, cantidadDestinoActual, opcion1Actual, opcion2Actual) {
    // HTML del modal
    const modalHTML = `
        <div id="miModal" class="modal">
            <div class="modal-content">
                <span class="close" onclick="cerrarModalEdicion()">&times;</span>
                <label for="nuevoTipo">Tipo:</label>
                <input type="text" id="nuevoTipo" value="${tipoActual}" readonly>
                <label for="nuevaPregunta">Pregunta:</label>
                <input type="text" id="nuevaPregunta" value="${preguntaActual}">
                <label for="nuevaCantidadDestino">Cantidad de Destino:</label>
                <input type="text" id="nuevaCantidadDestino" value="${cantidadDestinoActual}">
                <label for="opcion1">Opción 1:</label>
                <input type="text" id="opcion1" value="${opcion1Actual}">
                <label for="opcion2">Opción 2:</label>
                <input type="text" id="opcion2" value="${opcion2Actual}">
                <button id="btnModificarOraculo">Modificar Prueba</button>
                <button id="btnCancelarModificacion">Cancelar Modificación</button>
            </div>
        </div>
    `;

    // Añadir el HTML del modal al contenedor
    modalContainer.innerHTML = modalHTML;

    // Mostrar el modal
    document.getElementById('miModal').style.display = 'block';

    // Agregar los event listeners
    document.getElementById('btnModificarOraculo').addEventListener('click', () => modificarOraculo(id));
    document.getElementById('btnCancelarModificacion').addEventListener('click', cerrarModal);
}

async function modificarOraculo(id) {
    const nuevoTipo = document.getElementById('nuevoTipo').value;
    const nuevaPregunta = document.getElementById('nuevaPregunta').value;
    const nuevaCantidadDestino = document.getElementById('nuevaCantidadDestino').value;

    let datos = {
        tipo: nuevoTipo,
        pregunta: nuevaPregunta,
        cantidad_destino: nuevaCantidadDestino,
        palabra_clave: document.getElementById('palabraClave') ? document.getElementById('palabraClave').value : null,
        valor_maximo: document.getElementById('valorMaximo') ? document.getElementById('valorMaximo').value : null,
        opcion_1: document.getElementById('opcion1') ? document.getElementById('opcion1').value : null,
        opcion_2: document.getElementById('opcion2') ? document.getElementById('opcion2').value : null,
    };

    console.log(nuevoTipo)
    console.log(nuevaPregunta)
    console.log(nuevaCantidadDestino)
    console.log(datos)
    console.log(id)
    console.log(token)

    try {
        const respuesta = await modificarPrueba(datos, id, token);
    console.log(respuesta)
        if (respuesta.error) {
            console.error('Error al modificar la prueba:', respuesta.error);
        } else {
            console.log('Respuesta de modificación:', respuesta);
            cerrarModal();
        }
    } catch (error) {
        console.error('Error al modificar la prueba: ', error);
    
        // Verificar si 'error.response' está definido antes de acceder a 'data'
        if (error.response && error.response.data) {
            console.log('Contenido del error:', error.response.data);
        } else {
            console.log('No se pudo obtener más información sobre el error');
        }
    }
        
}

function cerrarModal() {
    // Ocultar el modal
    document.getElementById('miModal').style.display = 'none';
}