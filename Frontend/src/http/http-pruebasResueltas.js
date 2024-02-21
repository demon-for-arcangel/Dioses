export async function obtenerPruebasResueltas(token, id){
    try{
        console.log(id)
        console.log(token)
        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch(`http://127.0.0.1:8000/api/humano/pruebas-resueltas/${id}`, {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    }catch (error) {
        console.error('Error al obtener las pruebas resueltas: ', error);
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