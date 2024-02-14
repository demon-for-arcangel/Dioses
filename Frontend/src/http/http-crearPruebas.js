export async function crearPruebaLibre(datos, token){
    let bodyContent = JSON.stringify({
        "pregunta": datos.pregunta,
        "tipo": "libre",
        "cantidad_destino": datos.cantidad_destino,
        "palabra_clave": datos.palabra_clave
    });

    let headersList = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    let response = await fetch("http://127.0.0.1:8000/api/dios/crear-prueba", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });

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

export async function crearPruebaValoracion(datos, token){
    let bodyContent = JSON.stringify({
        "pregunta": datos.pregunta,
        "tipo": "valoracion",
        "cantidad_destino": datos.cantidad_destino,
        "valor_maximo": datos.valor_maximo
    });

    let headersList = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    let response = await fetch("http://127.0.0.1:8000/api/dios/crear-prueba", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });

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

export async function crearPruebaEleccion(datos, token){
    let bodyContent = JSON.stringify({
        "pregunta": datos.pregunta,
        "tipo": "eleccion",
        "cantidad_destino": datos.cantidad_destino,
        "opcion_1": datos.opcion_1,
        "opcion_2": datos.opcion_2
    });

    let headersList = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    let response = await fetch("http://127.0.0.1:8000/api/dios/crear-prueba", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });

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