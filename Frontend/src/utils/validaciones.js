let errores = ["Campo vacío", "Nombre incorrecto", "Email incorrecto", "Contraseña incorrecta", "Las contraseñas no coinciden"];
let validacionCorrecta = [];
let validacionIncorrecta = [];

export function empty(valor){
   if (valor == "") {
       return true;
   }else{
       return false;
   }
}

export function ERNombre(valor){
   let regex = /^[a-zA-Z\s]*$/;
   return regex.test(valor);
}

export function ERemail(valor){
   let regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
   return regex.test(valor);
}

export function ERpassword(valor){
   let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
   return regex.test(valor);
}

export function comprobarNombre(valorNombre){
    if (empty(valorNombre)) {
        validacionIncorrecta.push(errores[0])
    }else{
        if (ERNombre(valorNombre)) {
            // Si la validación es correcta, no hagas nada o agrega lógica adicional si es necesario
        }else{
            validacionIncorrecta.push(errores[1])
        }
    }
    validacionCorrecta.push(valorNombre);
  
    var rtnArray=[validacionCorrecta,validacionIncorrecta]
    
    return rtnArray;
  }
  
  export function comprobarEmail(valorEmail){
    if (empty(valorEmail)) {
        validacionIncorrecta.push(errores[2])
    }else{
        if (ERemail(valorEmail)) {
            // Si la validación es correcta, no hagas nada o agrega lógica adicional si es necesario
        }else{
            validacionIncorrecta.push(errores[3])
        }
    }
    validacionCorrecta.push(valorEmail);
  
    var rtnArray=[validacionCorrecta,validacionIncorrecta]
    
    return rtnArray;
  }
  
  export function comprobarPassword(valorPassword){
    if (empty(valorPassword)) {
        validacionIncorrecta.push(errores[4])
    }else{
        if (ERpassword(valorPassword)) {
            // Si la validación es correcta, no hagas nada o agrega lógica adicional si es necesario
        }else{
            validacionIncorrecta.push(errores[5])
        }
    }
    validacionCorrecta.push(valorPassword);
  
    var rtnArray=[validacionCorrecta,validacionIncorrecta]
    
    return rtnArray;
  }

  export function comprobarValidaciones(nombre, email, password, ) {
    let nombreValido = comprobarNombre(nombre);
    let emailValido = comprobarEmail(email);
    let passwordValida = comprobarPassword(password);
 
    return nombreValido && emailValido && passwordValida;
 }