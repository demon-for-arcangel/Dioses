import { obtenerPruebasAsignadas, guardarRespuesta, consultarHumano, obtenerIdHumano } from '../http/http-inicio.js';

const modal = document.querySelector('#modal');

let token = sessionStorage.getItem('token');
let userId = sessionStorage.getItem('id-usuario');

let nombreUsuario = sessionStorage.getItem('nombre');
document.getElementById('mensaje-bienvenida').textContent = `Bienvenido/a ${nombreUsuario}`;

const respuestaIdHumano = await obtenerIdHumano(userId, token);
const idHumano = respuestaIdHumano.id_humano;
consultarHumano(token, idHumano)
    .then(response => {
        const usuario = response.mens;
            obtenerPruebasAsignadas(userId, token)
                .then(pruebas => {
                    console.log('Pruebas antes del filtro:', pruebas);
                    const pruebasPendientes = pruebas.filter(prueba => !prueba.resultado);
                    console.log('Pruebas después del filtro:', pruebasPendientes);
                    let cardContainer = document.querySelector('.card-container');

                    pruebasPendientes.forEach(prueba => {
                        let card = document.createElement('div');
                        card.className = 'card individual-card';

                        let cardTitle = document.createElement('h4');
                        cardTitle.textContent = prueba.pregunta;
                        card.appendChild(cardTitle);

                        let cardDescription = document.createElement('p');
                        cardDescription.textContent = prueba.tipo;
                        card.appendChild(cardDescription);

                        let resolveButton = document.createElement('button');
                        resolveButton.textContent = 'Resolver';
                        resolveButton.addEventListener('click', () => {
                            while (modal.firstChild) {
                                modal.removeChild(modal.firstChild);
                            }

                            switch (prueba.tipo) {
                                case 'libre':
                                    let preguntaLibre = document.createElement('p');
                                    preguntaLibre.textContent = prueba.pregunta;
                                    modal.appendChild(preguntaLibre);

                                    let inputElement = document.createElement('input');
                                    inputElement.type = 'text';
                                    inputElement.placeholder = 'Introduce tu respuesta aquí';
                                    modal.appendChild(inputElement);

                                    let buttonContainer = document.createElement('div');
                                    buttonContainer.className = 'button-container';

                                    let enviarLibre = document.createElement('button');
                                    enviarLibre.textContent = 'Enviar';
                                    enviarLibre.prueba = prueba;
                                    enviarLibre.addEventListener('click', () => {
                                        let respuesta = inputElement.value;
                                        guardarRespuesta(idHumano, prueba.id, respuesta, token)
                                            .then(data => {
                                                modal.close();
                                                window.location.reload();
                                            })
                                            .catch(error => {
                                                console.error('Error al guardar la respuesta: ', error);
                                            });
                                    });
                                    modal.appendChild(enviarLibre);

                                    let cancelarLibre = document.createElement('button');
                                    cancelarLibre.textContent = 'Cancelar';
                                    cancelarLibre.addEventListener('click', () => {
                                        modal.close();
                                        window.location.reload();
                                    });
                                    buttonContainer.appendChild(enviarLibre);
                                    buttonContainer.appendChild(cancelarLibre);

                                    modal.appendChild(buttonContainer);
                                    break;
                                case 'eleccion':
                                    let preguntaEleccion = document.createElement('p');
                                    preguntaEleccion.textContent = prueba.pregunta;
                                    modal.appendChild(preguntaEleccion);

                                    let labelOpcion1 = document.createElement('label');
                                    let radioOpcion1 = document.createElement('input');
                                    radioOpcion1.type = 'radio';
                                    radioOpcion1.name = 'eleccion';
                                    radioOpcion1.value = prueba.opcion_1;
                                    labelOpcion1.appendChild(radioOpcion1);
                                    labelOpcion1.appendChild(document.createTextNode(prueba.opcion_1 || 'Opción 1'));
                                    modal.appendChild(labelOpcion1);

                                    let labelOpcion2 = document.createElement('label');
                                    let radioOpcion2 = document.createElement('input');
                                    radioOpcion2.type = 'radio';
                                    radioOpcion2.name = 'eleccion';
                                    radioOpcion2.value = prueba.opcion_2;
                                    labelOpcion2.appendChild(radioOpcion2);
                                    labelOpcion2.appendChild(document.createTextNode(prueba.opcion_2 || 'Opción 2'));
                                    modal.appendChild(labelOpcion2);

                                    let enviarEleccion = document.createElement('button');
                                    enviarEleccion.textContent = 'Enviar';
                                    enviarEleccion.addEventListener('click', () => {
                                        const radios = document.getElementsByName('eleccion');
                                        let respuesta;
                                        for (let i = 0; radios[i]; ++i) {
                                            if (radios[i].checked) {
                                                respuesta = radios[i].value;
                                                break;
                                            }
                                        }
                                        guardarRespuesta(idHumano, prueba.id, respuesta, token)
                                            .then(data => {
                                                modal.close();
                                                window.location.reload();
                                            })
                                            .catch(error => {
                                                console.error('Error al guardar la respuesta: ', error);
                                            });
                                    });
                                    modal.appendChild(enviarEleccion);

                                    let cancelarEleccion = document.createElement('button');
                                    cancelarEleccion.textContent = 'Cancelar';
                                    cancelarEleccion.addEventListener('click', () => {
                                        modal.close();
                                    });
                                    modal.appendChild(cancelarEleccion);
                                    break;
                                    case 'valoracion':
                                        let preguntaValoracion = document.createElement('p');
                                        preguntaValoracion.textContent = prueba.pregunta;
                                        modal.appendChild(preguntaValoracion);
                                    
                                        let numberInput = document.createElement('input');
                                        numberInput.type = 'number';
                                        numberInput.min = 1;
                                        numberInput.max = 5;
                                        numberInput.step = 1;
                                        modal.appendChild(numberInput);
                                    
                                        let enviarValoracion = document.createElement('button');
                                        enviarValoracion.textContent = 'Enviar';
                                        enviarValoracion.addEventListener('click', () => {
                                            const respuesta = numberInput.value;

                                            console.log(respuesta)
                                            guardarRespuesta(idHumano, prueba.id, respuesta, token)
                                                .then(data => {
                                                    modal.close();
                                                    window.location.reload();
                                                })
                                                .catch(error => {
                                                    console.error('Error al guardar la respuesta: ', error);
                                                });
                                        });
                                        modal.appendChild(enviarValoracion);
                                    
                                        let cancelarValoracion = document.createElement('button');
                                        cancelarValoracion.textContent = 'Cancelar';
                                        cancelarValoracion.addEventListener('click', () => {
                                            modal.close();
                                        });
                                        modal.appendChild(cancelarValoracion);
                                        break;
                            }

                            modal.showModal();
                        });
                        card.appendChild(resolveButton);

                        cardContainer.appendChild(card);
                    });
                })
                .catch(error => {
                    console.error('Error al mostrar las pruebas asignadas: ', error);
                });
    })
    .catch(error => {
        console.error('Error al obtener información del usuario:', error);
    });