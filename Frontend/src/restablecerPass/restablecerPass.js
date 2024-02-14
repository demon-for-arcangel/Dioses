import { encontrarEmail, restablecerPass } from "../http/http-restablecerPass.js";
import { patternMail, sendNotification } from "../utils/funciones.js";

let newPass = document.getElementById('btnPass');
let email = document.getElementById('email');

newPass.addEventListener('click', async () => {
    let emailValue = email.value;

    if (!patternMail.test(emailValue)) {
        sendNotification('El formato del correo electrónico no es válido', 'error');
        return;
    }

    let emailExistenteResponse = await encontrarEmail(JSON.stringify({ email: emailValue }));

    if (emailExistenteResponse == 400) {
        sendNotification('Error en la solicitud al servidor', 'error');
        return;
    }

    if (emailExistenteResponse.msg) {
        sendNotification(emailExistenteResponse.msg.email[0], 'error');
        return;
    }

    let restablecerPassResponse = await restablecerPass(JSON.stringify({ email: emailValue }));

    if (restablecerPassResponse == 400) {
        sendNotification('Error en la solicitud al servidor', 'error');
        return;
    }

    if (restablecerPassResponse.msg) {
        sendNotification(`Contraseña restablecida con éxito. Nueva contraseña: ${restablecerPassResponse.msg}`, 'success');
    }
});