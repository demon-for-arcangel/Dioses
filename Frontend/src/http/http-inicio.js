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

export async function guardarRespuesta(humano_id, prueba_id, respuesta, token) {
    try {
        let headersList = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }

        let response = await fetch(`http://127.0.0.1:8000/api/humano/guardar-respuesta`, {
            method: "POST",
            headers: headersList,
            body: JSON.stringify({
                humano_id: humano_id,
                prueba_id: prueba_id,
                resultado: respuesta
            })
        });

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            return data;
        } else {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error al mostrar las pruebas asignadas: ', error.message); 
        throw error;
    }
}