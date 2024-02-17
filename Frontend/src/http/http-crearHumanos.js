export async function crearHumano(datos, token, id) {
    let bodyContent = JSON.stringify({
        "nombre": datos.nombre,
        "email": datos.correo,
        "password": datos.password,
    });

    console.log(bodyContent)

    let headersList = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    };

    let response = await fetch(`http://127.0.0.1:8000/api/dios/crear-usuario/${id}`, {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });

    console.log(response);

    if (!response.ok) {
        let errorMessage = `An error has occurred: ${response.status}`;
        throw new Error(errorMessage);
    }

    try {
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error parsing response JSON:", error);
        throw new Error("Error parsing response JSON");
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
