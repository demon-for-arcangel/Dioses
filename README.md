
# Gestión de la Vida Humana
Aplicación diseñada para los grandes dioses de la antigua Grecia: **Zeus**, **Poseidón** y **Hades**.

Esta app servirá para realizar el registro de los humanos que nazcan en todo el mundo, se registrarán sus características y serán sometidos a pruebas, estas pruebas van a regir su destino final el cual puede ser:
- Los Campos Elíseos
- El Tártaro
## Logo para la aplicación
<img src="Frontend/src/assets/logo1.png">

## Requisitos
- Tener instalado NodeJS. Si no tenemos NodeJS en nuestro dispositivo:<br>
Lo instalaremos en la página oficial de <a href="https://nodejs.org/en">NodeJS</a>.
- Tener una cuenta en GitHub. Si no tenemos una cuenta de GitHub:<br>
Podremos crearnos una cuenta en GitHub en la pagina oficial de <a href="https://github.com">GitHub</a>.

- Tener instalado Visual Studio Code u otro IDE:<br>
Para poder instalarlo nos dirigiremos a la página oficial de <a href="https://code.visualstudio.com/download">Visual Studio Code</a>.
- Deberemos tener instalado xampp:<br>
Para poder gestionar la base de datos con xampp nos dirigiremos a la pagina oficial de xampp <a href="https://www.apachefriends.org/es/download.html"></a>.
## Instalación

Para la instalación del proyecto nos dirigiremos a GitHub y usaremos el siguiente comando:

`git clone https://github.com/demon-for-arcangel/Dioses`.<br>

Después de la clonación del proyecto lo abriremos en nuestro IDE favorito y añadiremos el archivo `.env` en el directorio llamado Backend.

Iniciaremos Apache y MySQL desde Xampp y crearemos una base de datos llamada `dioses`.

Desde la terminal ejecutaremos el comando `npm install` asegurandonos de estar en el directorio correcto que sería el de Frontend y desde el directorio de Backend ejecutaremos el comando `composer update` y cuando haya finalizado habrá que ejecutar el script `.\script.bat` este nos realizara las migrations y los seeders en la base de datos.

Para arrancar el Backend usaremos el comando `php artisan serve` y para el Frontend usaremos primero el comando `npm run build` que nos creará el directorio llamado `dist` y para ejecutar webpack con su servidor ejecutamos el comando `npm run dev`.
## Autor/es

- [@demon-for-arcangel](https://github.com/demon-for-arcangel)

---
---

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
    - [Pruebas Asignadas]()
    - [Guardar Respuesta de Prueba]()
- [Rutas para Usuarios "Dios"](#rutas-para-usuarios-dios)
    - [Mostrar Pruebas Creadas]()
    - [Crear Usuario]()
    - [Crear Pruebas]()
    - [Modificar Prueba]()
    - [Eliminar Prueba]()
    - [Asignar Prueba]()


## Registro
### `POST api/registro`
Registra un nuevo usuario.

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | Nombre del usuario con el que queremos registrarnos. | 
| `email` | `string` | Correo electronico para el usuario.  |
| `password` | `string` | Contraseña para poder acceder. |

## Inicio de Sesión
### `POST api/login`
Inicia sesión para un usuario.

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Requerido**.  |
| `password` | `string` | **Requerido**. |

## Cierre de Sesión **HACER**
### `POST api/cerrarSesion/{id}`
Cierra la sesión de un usuario.

Parámetros:
- `id` (entero): ID del usuario.

## Restablecer Contraseña
### `POST /restablecer-pass`
Restablece la contraseña del usuario.

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Requerido**.  |

## Verificar Existencia de Correo Electrónico
### `POST /email-existente`
Verifica si un correo electrónico ya está registrado.

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Requerido**.  |

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
