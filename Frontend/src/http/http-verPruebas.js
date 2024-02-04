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
        // Asegurar que los campos nulos se envíen correctamente en la solicitud JSON
        const requestBody = {
            tipo: datos.tipo,
            pregunta: datos.pregunta,
            cantidad_destino: datos.cantidad_destino,
            palabra_clave: datos.palabra_clave || null,  // Convertir a null si es undefined
            valor_maximo: datos.valor_maximo || null,    // Convertir a null si es undefined
            opcion_1: datos.opcion_1 || null,            // Convertir a null si es undefined
            opcion_2: datos.opcion_2 || null             // Convertir a null si es undefined
        };

        const bodyContent = JSON.stringify(requestBody);
        console.log(bodyContent);

        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/dios/modificar-prueba/${id}`, {
            method: "PUT",
            headers: headersList,
            body: bodyContent
        });
        console.log(response);

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

