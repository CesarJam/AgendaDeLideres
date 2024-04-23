import { db } from "./firebase"
import { doc, setDoc, collection, addDoc, getDocs } from "firebase/firestore"
import { Notyf } from "notyf"

// Notificaciones
var notyf = new Notyf(
    {
        position: {
            x: 'right',
            y: 'top'
        },
        types: [{
            type: 'warning',
            background: 'orange',
            duration: 3000,
            dismissible: true
        }]
    })

// setReg: Es un objeto con la información que se guardará en el documento
// colection: Es la colección donde se guardará la información (peticiones)

// Función para registrar una solicitud
const registrar = async (setReg, colection) => {
    try {
        const docRef = await addDoc(collection(db, colection), setReg);
        notyf.success('¡Registro exitoso!');
    } catch (e) {
        // console.error("Error adding document: ", e);
        notyf.error(error)
    }
}

// Función para registrar un usuario
const addUser = async (setReg, colection) => {
    try {
        await setDoc(doc(db, colection, setReg.uid), setReg);
        notyf.success('Registro exitoso!')
    } catch (error) {
        notyf.error(error)
    }
}

//Función para consultar registro
const obtenerDatos = async (coleccion) => {
    try {
      const querySnapshot = await getDocs(collection(db, coleccion));
      const datos = [];
      querySnapshot.forEach((doc) => {
        datos.push({
            colonia: doc.data().colonia,
            correo: doc.data().correo,
            edad: doc.data().edad,
            nombre: doc.data().nombre,
            otros: doc.data().otros,
            servicio: doc.data().servicio,
            telefono: doc.data().telefono
          });
      });
      return datos;
    } catch (error) {
      console.error("Error al obtener los documentos: ", error);
      return [];
    }
  };

export {
    registrar,
    addUser,
    obtenerDatos
}