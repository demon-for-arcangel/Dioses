export async function encontrarEmail(bodyContent){ 
    let headersList = {
        "Content-Type": "application/json"
    };
    try{
        let response = await fetch('http://127.0.0.1:8000/api/email-existente', {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        });
        
        if(response.ok==400){
            return response.status
        }
        if (!response.ok) {
            let errorResponse = await response.text();
            return errorResponse
        } else {
            let data = await response.json();
            return data;
        }
    }catch(error){
        console.log(error)
    }
}

export async function restablecerPass(bodyContent){ 
    let headersList = {
        "Content-Type": "application/json"
    };
    try{
        let response = await fetch('http://127.0.0.1:8000/api/restablecer-pass', {
            method: "POST",
            body: bodyContent,
            headers: headersList,
        });
        
        if(response.ok==400){
            return response.status
        }
        if (!response.ok) {
            let errorResponse = await response.text();
            return errorResponse
        } else {
            let data = await response.json();
            return data;
        }
    }catch(error){
        console.log(error)
    }
}