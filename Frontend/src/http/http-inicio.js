export async function obtenerPruebasAsignadas(user_id, token) {
    try {
        let headersList={
            "Content-Type": "application/json",
            "Authorization": "Bearer "+token
        }

        let response = await fetch(`http://127.0.0.1:8000/api/humano/pruebas-asignadas/${user_id}`,{
            method: "GET",    
            headers:headersList
        });

        if (!response.ok){
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        let pruebas = await response.json();
        return pruebas;
    } catch (error){
        console.error('Error al mostrar las pruebas asignadas: ', error);
        throw error;
    }
}

export async function consultarHumano(token, id){
    try{
        let headersList = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }

        let response = await fetch(`http://127.0.0.1:8000/api/humano/consultarHumano/${id}`,{
            method: "GET",    
            headers:headersList
        });

        if (!response.ok){
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        let humano = await response.json();
        return humano;
    } catch (error){
        console.error('Error al consultar el humano: ', error);
        throw error;
    }
}

export async function obtenerIdHumano(id, token){
    try {
        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/humano/obtener-id-humano/${id}`, {
            method: "GET",
            headers: headersList
        });


        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener el id del Humano: ', error);
        throw error;
    }
}


export async function guardarRespuesta(humano_id, prueba_id, respuesta, token) {
        console.log(respuesta)
        let headersList = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }

        let body = {
            "humano_id": parseInt(humano_id, 10),
            "prueba_id": parseInt(prueba_id, 10),
            "resultado": respuesta
        };

        console.log(body)

        let response = await fetch(`http://127.0.0.1:8000/api/humano/guardar-respuesta`, {
            method: "POST",
            headers: headersList,
            body: JSON.stringify(body)
        });

        console.log(response)

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error('Error en la solicitud: ', response);
            console.error('Contenido del error:', await response.text());  // Agrega esta línea
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

}