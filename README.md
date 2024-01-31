
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
## Manual para la API

#### Registro 

```http
  POST 
  /api/registro
```

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `nombre` | `string` | Nombre del usuario con el que queremos registrarnos. | 
| `email` | `string` | Correo electronico para el usuario.  |
| `password` | `string` | Contraseña para poder acceder. |

#### Login 

```http
  POST 
  /api/login
```

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Requerido**.  |
| `password` | `string` | **Requerido**. |

#### Encontrar Usuario por Email

```http
  POST
  /api/email-existente
```

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Requerido**.  |

#### Recuperación de contraseña
```http
  POST
  /api/restablecer-pass
```

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Requerido**.  |


### Manual para los Dioses
#### Get item

```http
  GET /api/items/${id}
```

| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


### Manual para los Humanos

#### Get all items

```http
  GET /api/items
```

| Parametro | Tipo     | Descripción                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

