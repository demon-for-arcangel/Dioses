import { obtenerOraculos, eliminarOraculo, modificarPrueba, obtenerHumanosProtegidos, obtenerIdDios, asignarPrueba } from "../http/http-verPruebas.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');
let id_usuario = sessionStorage.getItem('id-usuario');
console.log(id_usuario)
let tablaOraculos = document.getElementById('tabla-oraculos');

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

                let cantidadDestinoCell = document.createElement('td');
                cantidadDestinoCell.textContent = oraculo.cantidad_destino;
                row.appendChild(cantidadDestinoCell);

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
                accionesCell.appendChild(buttonEditar); 

                let buttonAsignar = document.createElement('button');
                buttonAsignar.addEventListener('click', async function() {
                    abrirModalConTabla(oraculo.id);
                });

                let imgAsignar = document.createElement('img');
                imgAsignar.src = '../assets/pruebas.png';
                imgAsignar.alt = 'Asignar Pruebas';
                imgAsignar.style.width = '35px';

                buttonAsignar.appendChild(imgAsignar);
                accionesCell.appendChild(buttonAsignar);

                let buttonBorrar = document.createElement('button');
                buttonBorrar.setAttribute('data-id', oraculo.id);
                buttonBorrar.addEventListener('click', async function() {
                    try {
                        const id = this.getAttribute('data-id');
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
                accionesCell.appendChild(buttonBorrar);

                row.appendChild(accionesCell); 

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

    modalContainer.innerHTML = modalHTML;

    document.getElementById('miModal').style.display = 'block';

    document.getElementById('btnModificarOraculo').addEventListener('click', () => modificarOraculo(id));
    document.getElementById('btnCancelarModificacion').addEventListener('click', cerrarModal);
}

function abrirModalValoracion(id, tipoActual, preguntaActual, cantidadDestinoActual, valorMaximoActual) {
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

    modalContainer.innerHTML = modalHTML;

    document.getElementById('miModal').style.display = 'block';

    document.getElementById('btnModificarOraculo').addEventListener('click', () => modificarOraculo(id));
    document.getElementById('btnCancelarModificacion').addEventListener('click', cerrarModal);
}

function abrirModalEleccion(id, tipoActual, preguntaActual, cantidadDestinoActual, opcion1Actual, opcion2Actual) {
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

    modalContainer.innerHTML = modalHTML;

    document.getElementById('miModal').style.display = 'block';

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

    try {
        const respuesta = await modificarPrueba(datos, id, token);
    console.log(respuesta)
        if (respuesta.error) {
            console.error('Error al modificar la prueba:', respuesta.error);
        } else {
            console.log('Respuesta de modificación:', respuesta);
            cerrarModal();
            window.location.reload();
        }
    } catch (error) {
        console.error('Error al modificar la prueba: ', error);
    
        if (error.response && error.response.data) {
            console.log('Contenido del error:', error.response.data);
        } else {
            console.log('No se pudo obtener más información sobre el error');
        }
    }
        
}

function cerrarModal() {
    document.getElementById('miModal').style.display = 'none';
}

async function abrirModalConTabla(oraculo_id) {
    const modalHTML = `
        <div id="miModal" class="modal">
            <div class="modal-content">
                <table id="tabla-humanos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-body-humanos">
                        <input type="checkbox" id="checkboxSeleccionarTodos">
                        <label for="checkboxSeleccionarTodos">Seleccionar Todos</label>
                        <!-- Filas de humanos se llenarán aquí -->
                    </tbody>
                </table>
                <button id="btnAsignar">Asignar</button>
                <button id="btnCancelarAsignacion">Cancelar</button>
                <p id="mensaje"></p>
            </div>
        </div>
    `;

    modalContainer.innerHTML = modalHTML;

    document.getElementById('miModal').style.display = 'block';
    document.getElementById('btnCancelarAsignacion').addEventListener('click', cerrarModal);

    const checkboxSeleccionarTodos = document.getElementById('checkboxSeleccionarTodos');
    checkboxSeleccionarTodos.addEventListener('change', seleccionarTodos);

    try {
        const respuestaIdDios = await obtenerIdDios(id_usuario, token);
        const idDios = respuestaIdDios.id_dios;
        await obtenerYllenarNombresEnTabla(idDios);
    } catch (error) {
        console.error('Error al obtener el ID del dios y llenar los nombres en la tabla: ', error);
    }

    const btnAsignar = document.getElementById('btnAsignar');
    btnAsignar.addEventListener('click', async function () {
        try {
            const respuestaIdDios = await obtenerIdDios(id_usuario, token);
            const idDios = respuestaIdDios.id_dios;

            const checkboxesSeleccionados = document.querySelectorAll('input[name="seleccionarHumano"]:checked');
            const idsHumanosSeleccionados = Array.from(checkboxesSeleccionados).map(checkbox => {
                return Number(checkbox.value);
            });

            const respuestaAsignacion = await asignarPrueba(token, idDios, oraculo_id, { humanos_ids: idsHumanosSeleccionados });
            console.log('Respuesta de asignación:', respuestaAsignacion);

            const mensajeElement = document.getElementById('mensaje');
            mensajeElement.textContent = 'Prueba asignada correctamente';
        } catch (error) {
            console.error('Error al asignar pruebas: ', error);

            const mensajeElement = document.getElementById('mensaje');
            mensajeElement.textContent = 'Error al asignar la prueba. Posiblemente algún humano ya tenga esta prueba asignada.';
        }
    });
}

async function obtenerYllenarNombresEnTabla(idDios) {
    try {
        const respuesta = await obtenerHumanosProtegidos(token, idDios);

        if (respuesta.humanosProtegidos && Array.isArray(respuesta.humanosProtegidos)) {
            const tablaBody = document.getElementById('tabla-body-humanos');

            respuesta.humanosProtegidos.forEach(humano => {
                const fila = document.createElement('tr');

                const checkboxCell = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = 'seleccionarHumano';
                checkbox.value = humano.id;
                checkboxCell.appendChild(checkbox);
                fila.appendChild(checkboxCell);

                const nombreCell = document.createElement('td');
                nombreCell.textContent = humano.nombre_usuario;
                fila.appendChild(nombreCell);

                checkbox.addEventListener('change', () => {
                    humano.seleccionado = checkbox.checked;
                });

                tablaBody.appendChild(fila);

                agregarEventosCheckboxes();
            });
        } else {
            console.error('La respuesta de la API no contiene la lista de humanos protegidos');
        }
    } catch (error) {
        console.error('Error al obtener y llenar los nombres en la tabla: ', error);
    }
}

function seleccionarTodos() {
    const checkboxes = document.querySelectorAll('input[name="seleccionarHumano"]');
    const checkboxSeleccionarTodos = document.getElementById('checkboxSeleccionarTodos');

    checkboxes.forEach(checkbox => {
        checkbox.checked = checkboxSeleccionarTodos.checked;
    });
}

function agregarEventosCheckboxes() {
    const checkboxesIndividuales = document.querySelectorAll('input[name="seleccionarHumano"]');

    checkboxesIndividuales.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const todosSeleccionados = Array.from(checkboxesIndividuales).every(checkbox => checkbox.checked);
            checkboxSeleccionarTodos.checked = todosSeleccionados;
        });
    });
}
