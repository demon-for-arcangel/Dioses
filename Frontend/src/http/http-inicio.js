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
        console.log(pruebas)

        return pruebas;
    } catch (error){
        console.error('Error al mostrar las pruebas asignadas: ', error);
        throw error;
    }
}