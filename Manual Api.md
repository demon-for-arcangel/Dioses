# Documentación de la API

Este documento proporciona una breve descripción general y una guía de uso para la API. La API está diseñada para el registro de usuarios, autenticación y gestión de usuarios y pruebas. Está implementada en el framework Laravel PHP.

## Tabla de Contenidos
- [Registro](#registro)
- [Inicio de Sesión](#inicio-de-sesión)
- [Cierre de Sesión](#cierre-de-sesión)
- [Restablecer Contraseña](#restablecer-contraseña)
- [Verificar Existencia de Correo Electrónico](#verificar-existencia-de-correo-electrónico)
- [Acceso No Autenticado](#acceso-no-autenticado)
- [Rutas para Usuarios Humanos](#rutas-para-usuarios-humanos)
- [Rutas para Usuarios "Dios"](#rutas-para-usuarios-dios)

## Registro
### `POST /registro`
Registra un nuevo usuario.

Parámetros:
- `name` (cadena): Nombre del usuario.
- `email` (cadena): Correo electrónico del usuario.
- `password` (cadena): Contraseña del usuario.

## Inicio de Sesión
### `POST /login`
Inicia sesión para un usuario.

Parámetros:
- `email` (cadena): Correo electrónico del usuario.
- `password` (cadena): Contraseña del usuario.

## Cierre de Sesión
### `POST /cerrarSesion/{id}`
Cierra la sesión de un usuario.

Parámetros:
- `id` (entero): ID del usuario.

## Restablecer Contraseña
### `POST /restablecer-pass`
Restablece la contraseña del usuario.

Parámetros:
- `email` (cadena): Correo electrónico del usuario.

## Verificar Existencia de Correo Electrónico
### `POST /email-existente`
Verifica si un correo electrónico ya está registrado.

Parámetros:
- `email` (cadena): Correo electrónico del usuario.

## Acceso No Autenticado
### `GET /`
Devuelve una respuesta indicando que el usuario no ha iniciado sesión.

## Rutas para Usuarios Humanos
### `GET /humano/pruebas-asignadas/{userId}`
Recupera las pruebas asignadas para un usuario específico.

## Rutas para Usuarios "Dios"
### `GET /dios/listar-humanos`
Recupera una lista de todos los usuarios.

### `POST /dios/crear-usuario`
Crea un nuevo usuario.

### `PUT /dios/modificar-humano/{id}`
Modifica un usuario existente.

### `GET /dios/mostrar-pruebas`
Recupera una lista de todas las pruebas.

### `POST /dios/crear-prueba`
Crea una nueva prueba.

### `PUT /dios/modificar-prueba/{id}`
Actualiza una prueba existente.

### `DELETE /dios/eliminar-prueba/{id}`
Elimina una prueba.

### `POST /dios/asignar-oraculo`
Asigna una prueba a un usuario.

## Middlewares
- `cors`: Maneja el intercambio de recursos entre dominios (CORS).
- `auth:sanctum`: Asegura la autenticación del usuario.
- `HumanoMid`: Middleware para rutas accesibles solo para usuarios humanos.
- `DiosMid`: Middleware para rutas accesibles solo para usuarios "dios".

Siéntete libre de explorar y utilizar estas rutas de la API según las funcionalidades descritas. Asegúrate de utilizar una autenticación y autorización adecuadas para un uso seguro de la API.
