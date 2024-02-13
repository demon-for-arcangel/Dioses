export async function consultarUser(token, id){
    try {
        let headersList = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        let response = await fetch(`http://127.0.0.1:8000/api/dios/consultar-user/${id}`, {
            method: "GET",    
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        let usuario = await response.json();

        return usuario;
    } catch (error) {
        console.error('Error al obtener la información del usuario: ', error);
        throw error;
    }
}