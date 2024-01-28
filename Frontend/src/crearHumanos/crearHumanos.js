import { crearUsuario } from './http-crearHumanos.js';

document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('crearHumanoForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        let formData = new FormData(form);
        let datos = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            password: formData.get('password'),

            sabiduria: formData.get('sabiduria'),
            nobleza: formData.get('nobleza'),
            virtud: formData.get('virtud'),
            maldad: formData.get('maldad'),
            audacia: formData.get('audacia'),
        };

        let token = sessionStorage.getItem('token');

        try {
            let response = await crearUsuario(datos, token);
            console.log('Usuario creado exitosamente:', response);
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    });
});