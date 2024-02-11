export async function eliminarHumano(id, token){
    try {
        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/dios/eliminar-humano/${id}`, {
            method: "DELETE",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al eliminar el humano ', error);
        throw error;
    }
}

export async function modificarHumano(datos, id, token) {
    try {
        const requestBody = {};

        if (datos.nombre) {
            requestBody.nombre = datos.nombre;
        }

        if (datos.email) {
            requestBody.email = datos.email;
        }

        if (datos.sabiduria) {
            requestBody.sabiduria = datos.sabiduria;
        }
        if (datos.nobleza) {
            requestBody.nobleza = datos.nobleza;
        }
        if (datos.virtud) {
            requestBody.virtud = datos.virtud;
        }
        if (datos.maldad) {
            requestBody.maldad = datos.maldad;
        }
        if (datos.audacia) {
            requestBody.audacia = datos.audacia;
        }

        const bodyContent = JSON.stringify(requestBody);

        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/dios/modificar-humano/${id}`, {
            method: "PUT",
            headers: headersList,
            body: bodyContent
        });

        if (!response.ok) {
            console.error('Error en la respuesta:', response.status, response.statusText);
            const responseBody = await response.text();
            console.error('Cuerpo de la respuesta:', responseBody);
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al modificar el humano: ', error);
        throw error;
    }
}

export async function obtenerHumanosProtegidos(token, id){
    try {
        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/dios/listar-humanos-protegidos/${id}`, {
            method: "GET",
            headers: headersList
        });

        console.log(response); // Imprime la respuesta completa en la consola

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los humanos bajo tu protección: ', error);
        throw error;
    }
}

export async function obtenerIdDios(id, token){
    try {
        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
        console.log(id)

        const response = await fetch(`http://127.0.0.1:8000/api/dios/obtener-id-dios/${id}`, {
            method: "GET",
            headers: headersList
        });

        console.log(response)

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        console.log(data)
        return data;
    } catch (error) {
        console.error('Error al obtener el id del Dios: ', error);
        throw error;
    }
}
