export async function obtenerOraculos(token){
    try {
        const headersList = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };

        const response = await fetch('http://127.0.0.1:8000/api/dios/listar-humanos', {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los humanos : ', error);
        throw error;
    }
}