export async function consultarUser(token, id) {
    try {
        console.log(token)
        console.log(id)
        let headersList = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        let response = await fetch(`http://127.0.0.1:8000/api/humano/consultar-user/${id}`, {
            method: "GET",
            headers: headersList
        });

        const responseBody = await response.text();

        const usuario = JSON.parse(responseBody);

        return usuario;
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        throw error;
    }
}


export async function subirImagenS3(ruta){
    let response = await fetch("http://127.0.0.1:8000/api/subirImagen", { 
      method: "POST",
      body: ruta
    });
    
    if (!response.ok) {
     throw new Error('Error')
   }else{
     let data = await response.json();
     
     return data;          
   }
}

export async function actualizarImg(datos){
   let headersList = {
     "Content-Type": "application/json"
    }
    
    let bodyContent = datos;
    
    let response = await fetch("http://127.0.0.1:8000/api/actualizarImagen", { 
      method: "PUT",
      body: bodyContent,
      headers: headersList
    });
    
    let data = await response.text();
    console.log(data);
}

export async function modificarContra(newPassword, id, oldPassword) {
    try {
        let headersList = {
            "Content-Type": "application/json",
        };

        let bodyContent = JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword
        });

        let response = await fetch(`http://127.0.0.1:8000/api/modificar-password/${id}`, {
            method: "PUT",
            headers: headersList,
            body: bodyContent
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
        }

        let data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al modificar la contraseña: ', error);
        throw error;
    }
}
