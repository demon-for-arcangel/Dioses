import { eliminarHumano, modificarHumano, obtenerHumanosProtegidos, obtenerIdDios } from "../http/http-verHumanosAsignados.js";

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

let token = sessionStorage.getItem('token');
let id_usuario = sessionStorage.getItem('id-usuario');
console.log(id_usuario)
let tablaHumanos = document.getElementById('tabla-humanos');

let modalContainer = document.createElement('div');
modalContainer.id = 'modal-container';
document.body.appendChild(modalContainer);

async function init() {
    try {
        const respuestaIdDios = await obtenerIdDios(id_usuario, token);
        const idDios = respuestaIdDios.id_dios;

        let respuesta = await obtenerHumanosProtegidos(token, idDios);

        if (respuesta && respuesta.humanosProtegidos) {
            let humanos = respuesta.humanosProtegidos;
            ObtencionHumanos(humanos);
        } else {
            console.error('La respuesta de la API no contiene la lista de humanos bajo tu protección');
        }
    } catch (error) {
        console.error('Error al obtener los humanos bajo tu protección: ', error);
    }
}
init(); 
async function ObtencionHumanos(respuesta) {
    try {
        console.log(respuesta);

        if (respuesta) {
            const humanos = respuesta;

            humanos.forEach(humano => {
                let row = document.createElement('tr');

                let nombreCell = document.createElement('td');
                nombreCell.textContent = humano.nombre_usuario; // Corrige a la propiedad correcta
                row.appendChild(nombreCell);

                let accionesCell = document.createElement('td');

                let buttonEditar = document.createElement('button');
                buttonEditar.addEventListener('click', () => {
                    abrirModalEditar(humano.id, humano.nombre, humano.sabiduria, humano.nobleza, humano.virtud, humano.maldad, humano.audacia);
                });
                let imgEditar = document.createElement('img');
                imgEditar.src = '../assets/editar.png';
                imgEditar.alt = 'Editar Prueba';
                imgEditar.style.width = '35px';

                buttonEditar.appendChild(imgEditar);
                accionesCell.appendChild(buttonEditar);

                let buttonBorrar = document.createElement('button');
                buttonBorrar.setAttribute('data-id', humano.id);
                buttonBorrar.addEventListener('click', async function () {
                    try {
                        const id = this.getAttribute('data-id');
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
        } else {
            console.error('La respuesta de la API no contiene la lista de humanos bajo tu proteccion');
        }
    } catch (error) {
        console.error('Error al manejar la obtención de humanos: ', error);
    }
}
/* async function ObtencionHumanos(respuesta) {
    try {
        if (respuesta && respuesta.humanosProtegidos && Array.isArray(respuesta.humanosProtegidos)) {
            const humanos = respuesta.humanosProtegidos;

            humanos.forEach(humano => {
                let row = document.createElement('tr');

                let nombreCell = document.createElement('td');
                nombreCell.textContent = humano.nombre;
                row.appendChild(nombreCell);

                let accionesCell = document.createElement('td');

                let buttonEditar = document.createElement('button');
                buttonEditar.addEventListener('click', () => {
                    abrirModalEditar(humano.id, humano.nombre, humano.sabiduria, humano.nobleza, humano.virtud, humano.maldad, humano.audacia);
                });
                let imgEditar = document.createElement('img');
                imgEditar.src = '../assets/editar.png';
                imgEditar.alt = 'Editar Prueba';
                imgEditar.style.width = '35px';

                buttonEditar.appendChild(imgEditar);
                accionesCell.appendChild(buttonEditar);

                let buttonBorrar = document.createElement('button');
                buttonBorrar.setAttribute('data-id', humano.id);
                buttonBorrar.addEventListener('click', async function () {
                    try {
                        const id = this.getAttribute('data-id');
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
        } else {
            console.error('La respuesta de la API no contiene la lista de humanos bajo tu proteccion');
        }
    } catch (error) {
        console.error('Error al manejar la obtención de humanos: ', error);
    }
}*/
function abrirModalEditar(id, nombreActual, emailActual, passwordActual, sabiduriaActual, noblezaActual, virtudActual, maldadActual, audaciaActual) {
    const modalHTML = `
        <div id="miModal" class="modal">
            <div class="modal-content">
                <label for="nuevoNombre">Nombre:</label>
                <input type="text" id="nuevoNombre" value="${nombreActual}">
                <label for="nuevoEmail">Email:</label>
                <input type="email" id="nuevoEmail" value="${emailActual}">
                <label for="nuevaPassword">Password:</label>
                <input type="password" id="nuevaPassword" value="${passwordActual}">
                <label for="nuevaSabiduria">Sabiduria:</label>
                <input type="text" id="nuevaSabiduria" value="${sabiduriaActual}">
                <label for="nuevaNobleza">Nobleza:</label>
                <input type="text" id="nuevaNobleza" value="${noblezaActual}">
                <label for="nuevaVirtud">Virtud:</label>
                <input type="text" id="nuevaVirtud" value="${virtudActual}">
                <label for="nuevaMaldad">Maldad:</label>
                <input type="text" id="nuevaMaldad" value="${maldadActual}">
                <label for="nuevaAudacia">Audacia:</label>
                <input for="text" id="nuevaAudacia" value="${audaciaActual}">
                <button id="btnModificarHumano">Modificar Humano</button>
                <button id="btnCancelarModificacion">Cancelar Modificación</button>
            </div>
        </div>
    `;

    modalContainer.innerHTML = modalHTML;

    document.getElementById('miModal').style.display = 'block';

    document.getElementById('btnModificarHumano').addEventListener('click', () => editarHumano(id));
    document.getElementById('btnCancelarModificacion').addEventListener('click', cerrarModal);
}

async function editarHumano(id) {
    const nuevoNombre = document.getElementById('nuevoNombre').value;
    const nuevaSabiduria = document.getElementById('nuevaSabiduria').value;
    const nuevaNobleza = document.getElementById('nuevaNobleza').value;
    const nuevaVirtud = document.getElementById('nuevaVirtud').value;
    const nuevaMaldad = document.getElementById('nuevaMaldad').value;
    const nuevaAudacia = document.getElementById('nuevaAudacia').value;

    let datos = {
        nombre: nuevoNombre,
        sabiduria: nuevaSabiduria,
        nobleza: nuevaNobleza,
        virtud: nuevaVirtud,
        maldad: nuevaMaldad,
        audacia: nuevaAudacia
    };

    try {
        const respuesta = await modificarHumano(datos, id, token);
    console.log(respuesta)
        if (respuesta.error) {
            console.error('Error al modificar el humano:', respuesta.error);
        } else {
            console.log('Respuesta de modificación:', respuesta);
            cerrarModal();
            window.location.reload();
        }
    } catch (error) {
        console.error('Error al modificar el humano: ', error);
    
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
