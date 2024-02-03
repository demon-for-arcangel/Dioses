import { crearPruebaEleccion, crearPruebaLibre, crearPruebaValoracion } from "../http/http-crearPruebas.js";

document.addEventListener("DOMContentLoaded", function () {
    var token = sessionStorage.getItem("token");

    var modal = document.getElementById('myModal');
    var modalContent = document.getElementById('modalContent');

    var buttons = document.querySelectorAll('.prueba-button');

    buttons.forEach(function (button) {
        button.addEventListener('click', async function () {
            var tipoPrueba = button.getAttribute('data-options');

            modalContent.innerHTML = '';

            var preguntaInput = document.createElement('input');
            preguntaInput.setAttribute('type', 'text');
            preguntaInput.setAttribute('placeholder', 'Introduce la pregunta');

            var tipoInput = document.createElement('input');
            tipoInput.setAttribute('type', 'hidden');
            tipoInput.setAttribute('value', tipoPrueba.toLowerCase()); 

            var cantidadDestinoInput = document.createElement('input');
            cantidadDestinoInput.setAttribute('type', 'text');
            cantidadDestinoInput.setAttribute('placeholder', 'Cantidad destino');

            var palabraClaveInput, valoracionInput, opcion1Input, opcion2Input;

            if (tipoPrueba === 'crearPruebaLibre') {
                palabraClaveInput = document.createElement('input');
                palabraClaveInput.setAttribute('type', 'text');
                palabraClaveInput.setAttribute('placeholder', 'Palabra clave');

                modalContent.appendChild(preguntaInput);
                modalContent.appendChild(palabraClaveInput);
            } else if (tipoPrueba === 'crearPruebaValoracion') {
                valoracionInput = document.createElement('input');
                valoracionInput.setAttribute('type', 'number');
                valoracionInput.setAttribute('placeholder', 'Valoración (1-5)');
                valoracionInput.setAttribute('min', '1');
                valoracionInput.setAttribute('max', '5');

                modalContent.appendChild(preguntaInput);
                modalContent.appendChild(valoracionInput);
            } else if (tipoPrueba === 'crearPruebaEleccion') {
                opcion1Input = document.createElement('input');
                opcion1Input.setAttribute('type', 'text');
                opcion1Input.setAttribute('placeholder', 'Opción 1');

                opcion2Input = document.createElement('input');
                opcion2Input.setAttribute('type', 'text');
                opcion2Input.setAttribute('placeholder', 'Opción 2');

                modalContent.appendChild(preguntaInput);
                modalContent.appendChild(opcion1Input);
                modalContent.appendChild(opcion2Input);
            }

            modalContent.appendChild(cantidadDestinoInput);

            /* ---------Boton de crear y boton de cancelar ------------*/
            var crear = document.createElement('button');
            crear.textContent = 'Crear Prueba';
            crear.addEventListener('click', async function () {
                var datos = {
                    pregunta: preguntaInput.value,
                    cantidad_destino: cantidadDestinoInput.value,
                    palabra_clave: palabraClaveInput ? palabraClaveInput.value : null,
                    valor_maximo: valoracionInput ? valoracionInput.value : null,
                    opcion_1: opcion1Input ? opcion1Input.value : null,
                    opcion_2: opcion2Input ? opcion2Input.value : null
                };

                try {
                    if (tipoPrueba === 'crearPruebaLibre') {
                        const response = await crearPruebaLibre(datos, token);
                        console.log(response); 
                    } else if (tipoPrueba === 'crearPruebaValoracion') {
                        const response = await crearPruebaValoracion(datos, token);
                        console.log(response); 
                    } else if (tipoPrueba === 'crearPruebaEleccion') {
                        const response = await crearPruebaEleccion(datos, token);
                        console.log(response); 
                    }

                    cerrarModal();
                } catch (error) {
                    console.error('Error al crear la prueba:', error);
                }
            });
            modalContent.appendChild(crear);

            var cancelar = document.createElement('button');
            cancelar.textContent = 'Cancelar Creación Prueba';
            cancelar.classList.add('cancelar-button');
            cancelar.addEventListener('click', function () {
                cerrarModal();
            });
            modalContent.appendChild(cancelar);

            modalContent.appendChild(tipoInput);

            modal.style.display = 'block';
        });
    });
});

function cerrarModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

