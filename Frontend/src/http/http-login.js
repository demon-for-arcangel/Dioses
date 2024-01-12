export async function inicioSesion(datos) {
    let bodyContent = JSON.stringify({
        "email": datos.email,
        "password": datos.password,
    });

    let headersList = {
        "Content-Type": "application/json",
    };

    try {
        let response = await fetch("http://127.0.0.1:8000/api/inicioSesion", {
            method: "POST",
            headers: headersList,
            body: bodyContent,
        });

        if (!response.ok) {
            let errorData = await response.json();
            throw new Error(`Error en la solicitud: ${response.status} - ${errorData.message}`);
        }

        let data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}