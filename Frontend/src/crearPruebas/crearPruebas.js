function mostrarModal(tipoPrueba) {
    var modal = document.getElementById('myModal');
    var modalContent = document.getElementById('modalContent');

    // Limpia el contenido existente del modal
    modalContent.innerHTML = '';

    // Crear elementos del formulario según el tipo de prueba
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
    if (tipoPrueba === 'Crear Prueba Libre') {
        var palabraClaveInput = document.createElement('input');
        palabraClaveInput.setAttribute('type', 'text');
        palabraClaveInput.setAttribute('placeholder', 'Palabra clave');

        modalContent.appendChild(preguntaInput);
        modalContent.appendChild(palabraClaveInput);
    } else if (tipoPrueba === 'Crear Prueba Valoración') {
        var valoracionInput = document.createElement('input');
        valoracionInput.setAttribute('type', 'number');
        valoracionInput.setAttribute('placeholder', 'Valoración (1-5)');
        valoracionInput.setAttribute('min', '1');
        valoracionInput.setAttribute('max', '5');

        modalContent.appendChild(preguntaInput);
        modalContent.appendChild(valoracionInput);
    } else if (tipoPrueba === 'Crear Prueba Elección') {
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

    modalContent.appendChild(tipoInput);
    modalContent.appendChild(cantidadDestinoInput);

    // Mostrar el modal
    modal.style.display = 'block';
}

function cerrarModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
