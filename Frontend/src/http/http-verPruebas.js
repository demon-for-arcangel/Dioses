export async function obtenerOraculos(token){
    try {
        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch('http://127.0.0.1:8000/api/dios/mostrar-pruebas', {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los oráculos con pruebas: ', error);
        throw error;
    }
}

export async function eliminarOraculo(id, token){
    try {
        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/dios/eliminar-prueba/${id}`, {
            method: "DELETE",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los oráculos con pruebas: ', error);
        throw error;
    }
}

export async function modificarPrueba(datos, id, token) {
    try {
        const requestBody = {
            tipo: datos.tipo,
            pregunta: datos.pregunta,
            cantidad_destino: datos.cantidad_destino,
        };

        if (datos.palabra_clave) {
            requestBody.palabra_clave = datos.palabra_clave;
        }
        if (datos.valor_maximo) {
            requestBody.valor_maximo = datos.valor_maximo;
        }
        if (datos.opcion_1) {
            requestBody.opcion_1 = datos.opcion_1;
        }
        if (datos.opcion_2) {
            requestBody.opcion_2 = datos.opcion_2;
        }

        const bodyContent = JSON.stringify(requestBody);

        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/dios/modificar-prueba/${id}`, {
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
        console.error('Error al modificar la prueba: ', error);
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

export async function asignarPrueba(token, dios_id, oraculo_id, datos) {
    if (!datos || !Array.isArray(datos.humanos_ids) || datos.humanos_ids.length === 0) {
        throw new Error('Los datos de humanos_ids son inválidos o no se proporcionaron.');
    }

    try {
        const bodyContent = JSON.stringify({
            "humano_ids": datos.humanos_ids,
        });

        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/dios/asignar-oraculos/${dios_id}/${oraculo_id}`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al asignar pruebas: ', error);
        throw error;
    }
}