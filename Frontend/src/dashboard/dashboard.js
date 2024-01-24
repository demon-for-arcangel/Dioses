document.addEventListener('DOMContentLoaded', function() {
    // Recuperar el usuario del sessionStorage
    var usuario = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuario && usuario.nombre) {
        // Actualizar el contenido del elemento h2 con el nombre del usuario
        document.getElementById('mensaje-bienvenida').textContent += ' ' + usuario.nombre;
    }
});