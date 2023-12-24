
# Gestión de la Vida Humana
Aplicación diseñada para los grandes dioses de la antigua Grecia: **Zeus**, **Poseidón** y **Hades**.

Esta app servirá para realizar el registro de los humanos que nazcan en todo el mundo, se registrarán sus características y serán sometidos a pruebas, estas pruebas van a regir su destino final el cual puede ser:
- Los Campos Elíseos
- El Tártaro
## Logo para la aplicación
![Logo](https://seeklogo.com/images/O/olimpo-logo-B7735CCFD8-seeklogo.com.png)

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

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## Autor/es

- [@demon-for-arcangel](https://github.com/demon-for-arcangel)
## Requisitos
- Tener instalado NodeJS. Si no tenemos NodeJS en nuestro dispositivo:<br>
Lo instalaremos en la página oficial de <a href="https://nodejs.org/en">NodeJS</a>.
- Tener una cuenta en GitHub. Si no tenemos una cuenta de GitHub:<br>
Podremos crearnos una cuenta en GitHub en la pagina oficial de <a href="https://github.com">GitHub</a>.

- Tener instalado Visual Studio Code u otro IDE:<br>
Para poder instalarlo nos dirigiremos a la página oficial de <a href="https://code.visualstudio.com/download">Visual Studio Code</a>.
- Deberemos tener instalado xampp:<br>
Para poder gestionar la base de datos con xampp nos dirigiremos a la pagina oficial de xampp <a href="https://www.apachefriends.org/es/download.html"></a>.

## Manual para la API

### Manual para los Dioses

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


### Manual para los Humanos

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.

