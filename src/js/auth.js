import { addUser } from './crud'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Notyf } from "notyf"
import 'notyf/notyf.min.css'

// Notificaciones
let notyf = new Notyf(
    {        
        position: {
            x: 'right',
            y: 'top'
        },
        types: [{
            type: 'warning',
            background: 'orange',
            duration:3000,
            dismissible: true
        }]      
    })

const auth = getAuth();

//Registrar con correo y contraseña
const registraUsuario = async (nombre, email, pass, rol) => {
    await createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            const colection = 'users'
            const userData = {
                nombre,
                correo: user.email,
                uid: user.uid,
                rol
            }
            addUser(userData, colection)
            // ...
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorCode, errorMessage)
            notyf.error(errorMessage)
            // ..
        });
}

//Acceder con correo y constraseña
const accesoUsuario = async (email, pass)=>{
await signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        notyf.error(errorMessage)
    })
}

export {
    registraUsuario,
    accesoUsuario
}
