export async function crearHumano(datos, token) {
    let bodyContent = JSON.stringify({
        "nombre": datos.nombre,
        "email": datos.email,
        "password": datos.password,
        "sabiduria": datos.sabiduria,
        "nobleza": datos.nobleza,
        "virtud": datos.virtud,
        "maldad": datos.maldad,
        "audacia": datos.audacia,
    });

    let headersList = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
    };

    let response = await fetch("http://127.0.0.1:8000/api/dios/crear-usuario", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    });

    if (!response.ok) {
        let errorMessage = `An error haÇ s occurred: ${response.status}`;
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
