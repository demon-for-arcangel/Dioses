export async function crearUsuario(datos){
    let bodyContent = JSON.stringify({
        "nombre": datos.nombre,
        "email": datos.email,
        "password": datos.password,
    });

    let headersList = {
        "Content-Type": "application/json",
    };

    let response = await fetch("http://127.0.0.1:8000/api/registro", {
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