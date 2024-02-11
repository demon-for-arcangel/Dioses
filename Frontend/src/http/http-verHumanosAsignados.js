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
        console.error('Error al obtener los oráculos con pruebas: ', error);
        throw error;
    }
}

export async function modificarHumano(datos, id, token) {
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