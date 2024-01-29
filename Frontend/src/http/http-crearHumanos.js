export async function crearUsuario(datos, token) {
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
        let message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    } else {
        let data = await response.json();
        return data;
    }
}