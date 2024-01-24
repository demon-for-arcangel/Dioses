export async function obtenerDatos(email, password) {
    let data = {
        "email": email,
        "password": password,
    };

    try {
        let response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        } else {
            return response.json();
        }
    } catch (error) {
        throw error;
    }
}

 export function enviarSessionStorage(id, token){
    try {
      sessionStorage.setItem('id-usuario', id);
      sessionStorage.setItem('token', token);
      
    } catch (error) {
      console.error('Error al guardar datos en sessionStorage:', error);
    }
  }
 