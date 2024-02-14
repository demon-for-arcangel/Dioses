export function empty(texto) {
    return texto.length==0;
}

export function cleanValue(value){
    return (value.value="");
}

export function numChars(strValue){
    return strValue.length;
}

export function comprobarValores(value1, value2){
    return value1.value==value2.value;
}

export function comprobarLongitudValores(value1,value2){
    return value1.length==value2.length;
}

export function includes(arr,dato) {
    if (arr.includes(dato)) {
        return true
    }else{
        return false
    }
}

export let patternMail = /^[\w-\.]+@([\w-]+\.)+[a-z]{3,4}$/;

export function sendNotification(message, type) {
    let notification = document.getElementById("notification");
    let getNoti = document.getElementById("noti");
    let newP = null;
  
    if (!getNoti) {
      newP = document.createElement("p");
      newP.setAttribute("id", "noti");
    } else {
      newP = getNoti;
    }
    notification.setAttribute("class", type);
    newP.innerHTML = `<i class="bi bi-info-circle-fill"></i> ` + message;
    notification.appendChild(newP);
  }