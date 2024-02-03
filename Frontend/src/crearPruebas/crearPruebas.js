function mostrarModal(button) {
    var modal = document.getElementById('myModal');
    var modalContent = document.getElementById('modalContent');

    // Limpia el contenido existente del modal
    modalContent.innerHTML = '';

    // Obtén el tipo de prueba y otros datos desde el botón
    var tipoPrueba = button.getAttribute('data-options');
    var preguntaInput = document.createElement('input');
    preguntaInput.setAttribute('type', 'text');
    preguntaInput.setAttribute('placeholder', 'Introduce la pregunta');

    var tipoInput = document.createElement('input');
    tipoInput.setAttribute('type', 'hidden');
    tipoInput.setAttribute('value', tipoPrueba.toLowerCase()); // Tipo en minúsculas

    var cantidadDestinoInput = document.createElement('input');
    cantidadDestinoInput.setAttribute('type', 'text');
    cantidadDestinoInput.setAttribute('placeholder', 'Cantidad destino');

    // Agregar elementos específicos según el tipo de prueba
    if (tipoPrueba === 'crearPruebaLibre') {
        var palabraClaveInput = document.createElement('input');
        palabraClaveInput.setAttribute('type', 'text');
        palabraClaveInput.setAttribute('placeholder', 'Palabra clave');

        modalContent.appendChild(preguntaInput);
        modalContent.appendChild(palabraClaveInput);
    } else if (tipoPrueba === 'crearPruebaValoracion') {
        var valoracionInput = document.createElement('input');
        valoracionInput.setAttribute('type', 'number');
        valoracionInput.setAttribute('placeholder', 'Valoración (1-5)');
        valoracionInput.setAttribute('min', '1');
        valoracionInput.setAttribute('max', '5');

        modalContent.appendChild(preguntaInput);
        modalContent.appendChild(valoracionInput);
    } else if (tipoPrueba === 'crearPruebaEleccion') {
        var opcion1Input = document.createElement('input');
        opcion1Input.setAttribute('type', 'text');
        opcion1Input.setAttribute('placeholder', 'Opción 1');

        var opcion2Input = document.createElement('input');
        opcion2Input.setAttribute('type', 'text');
        opcion2Input.setAttribute('placeholder', 'Opción 2');

        modalContent.appendChild(preguntaInput);
        modalContent.appendChild(opcion1Input);
        modalContent.appendChild(opcion2Input);
    }

    modalContent.appendChild(cantidadDestinoInput);

    // Agregar Botón 1
    var crear = document.createElement('button');
    crear.textContent = 'Crear Prueba';
    crear.addEventListener('click', function () {
        // Lógica para el Botón 1
    });
    modalContent.appendChild(crear);

    // Agregar Botón 2 con una clase
    var cancelar = document.createElement('button');
    cancelar.textContent = 'Cancelar Creación Prueba';
    cancelar.classList.add('cancelar-button'); // Asignar la clase 'miClase2'
    cancelar.addEventListener('click', function () {
        cerrarModal(); // Cerrar el modal al hacer clic en Cancelar
    });
    modalContent.appendChild(cancelar);

    modalContent.appendChild(tipoInput);

    // Mostrar el modal
    modal.style.display = 'block';
}

function cerrarModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
