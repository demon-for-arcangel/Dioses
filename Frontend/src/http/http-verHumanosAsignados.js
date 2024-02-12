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

        console.log(response); 

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