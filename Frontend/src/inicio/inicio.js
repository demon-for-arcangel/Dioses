import { obtenerPruebasAsignadas } from '../http/http-inicio.js';

const modal = document.querySelector('#modal');

let token = sessionStorage.getItem('token');
let userId = sessionStorage.getItem('id-usuario');

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

obtenerPruebasAsignadas(userId, token).then(pruebas => {
    let cardContainer = document.querySelector('.card-container');

    pruebas.forEach(prueba => {
        let card = document.createElement('div');
        card.className = 'card individual-card';

        let cardTitle = document.createElement('h4');
        cardTitle.textContent = prueba.pregunta; 
        card.appendChild(cardTitle);

        let cardDescription = document.createElement('p');
        cardDescription.textContent = prueba.caracteristica;
        card.appendChild(cardDescription);

        let resolveButton = document.createElement('button');
        resolveButton.textContent = 'Resolver';
        resolveButton.addEventListener('click', () => {
            modal.showModal();
        });
        card.appendChild(resolveButton);

        cardContainer.appendChild(card);
    });

    document.querySelector('#close-button').addEventListener('click', () => {
        modal.close();
    });
}).catch(error => {
    console.error('Error al mostrar las pruebas asignadas: ', error);
});