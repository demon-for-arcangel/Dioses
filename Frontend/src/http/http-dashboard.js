export async function obtenerHumanos(token) {
    try {
        let headersList = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        let response = await fetch(`http://127.0.0.1:8000/api/dios/listar-humanos`, {
            method: "GET",    
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        let humanos = await response.json();

        return humanos;
    } catch (error) {
        console.error('Error al obtener los humanos: ', error);
        throw error;
    }
}