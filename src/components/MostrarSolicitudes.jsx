import { useEffect, useState } from "react"
import { db } from "../js/firebase.js";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

import { Table, Select } from 'antd'
const { Option } = Select;

function MostrarSolicitudes() {

    const [datos, setDatos] = useState([]);

    useEffect(() => {
        // Suscribirse a los cambios en la colección 'peticiones'
        const unsubscribe = onSnapshot(collection(db, "agenda"), (snapshot) => {
            // Actualizar el estado con los datos obtenidos
            const datosActualizados = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            // Ordenar los datos por el nombre de la colonia
            datosActualizados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            setDatos(datosActualizados);
        });

        // Devuelve una función de limpieza para cancelar la suscripción
        return () => unsubscribe();

    }, []); // Solo se suscribe una vez, al montar el componente


    //metodo que modifica el estatus
    const handleEstatusChange = async (id, newEstatus) => {
        try {
            await updateDoc(doc(db, "peticiones", id), {
                estatus: newEstatus
            });
            // Actualizar el estado local después de guardar en la base de datos
            setDatos(datos.map(item => item.id === id ? { ...item, estatus: newEstatus } : item));
        } catch (error) {
            console.error("Error actualizando estatus:", error);
        }
    };

    const data = datos.map((item) => ({
        key: item.id,
        ...item,
    }));


    return (
        <>
            <table border='1' width='100%'>
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>TIPO</th>
                        <th>DETALLE</th>
                        <th>NUM CEL</th>
                        <th>NUM FIJO</th>
                        <th>WEBSITE</th>
                        <th>CORREO</th>
                        <th>FB</th>
                        <th>DIREECION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datos.map(el => (
                            <tr key={el.id}>
                                <td>{el.nombre}</td>
                                <td>{el.tipo}</td>
                                <td>{el.detalle}</td>
                                <td>{el.numeroCelular}</td>
                                <td>{el.numeroFijo}</td>
                                <td>
                                    {el.paginaWeb ? (
                                        <a
                                            href={el.paginaWeb.startsWith('http') ? el.paginaWeb : `http://${el.paginaWeb}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {el.paginaWeb}
                                        </a>
                                    ) : (
                                        'No disponible' // En caso de que no haya un valor para paginaWeb
                                    )}
                                </td>

                                <td>{el.correo}</td>
                                <td>
                                    {el.facebook ? (
                                        <a
                                            href={el.facebook.startsWith('http') ? el.facebook : `http://${el.facebook}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {el.facebook}
                                        </a>
                                    ) : (
                                        'No disponible' // En caso de que no haya un valor para paginaWeb
                                    )}
                                </td>
                                <td>{el.direccion}</td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    )
}

export default MostrarSolicitudes