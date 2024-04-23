import { useEffect, useState } from 'react'

// Componentes
import LogIn from './components/LogIn'
import Config from './components/Config';
import Formulario from './components/Formulario'
import MostrarSolicitudes from './components/MostrarSolicitudes'

// Base de Datos
import { app } from "./js/firebase"
import { db } from './js/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from "firebase/firestore";

// Diseño
import { Typography, Flex, Layout, Image } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
const { Header, Content, Footer } = Layout;
const { Text, Title } = Typography;

function App() {

  const [user, setUser] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [nombre, setNombre] = useState('')

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {

        setUser(user)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef); // Buscamos si existe el usuario en la BD por medio de su uid
        if (docSnap.exists()) {
          docSnap.data().rol === 'admin' ? setIsAdmin(true) : setIsAdmin(false) // Verifica que el usuario tenga un rol de administrador
          setNombre(docSnap.data().nombre)
        } else {
          console.log("registro no encontrado!");
        }

      }
    });
  }, [user])

  const salir = async () => {
    await signOut(auth)
    setUser('')
  }

  const DateTime = new Date()
  let fecha = DateTime.toLocaleString('es-mx', { weekday: "long", year: "numeric", month: "long", day: 'numeric' })

  if (!user) return <LogIn />

  return (
    <>

      <Layout>

        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            background: '#10312b',
            color: '#fff'
          }}
        >
          {/* Inicia el Contenido del Menu */}

          <Flex justify="space-between" align='center'>

            <Flex align='flex-start' justify="space-between">
              <Image width={60} src="/00.jpg" />
              <Title level={2} style={{color: '#DDC9A3'}} >Agenda de Líderes</Title>
            </Flex>

            {isAdmin ? <Config /> : ''} {/* // Si es admin mostrará esta información */}

            <Flex vertical align="flex-start">
              <Text style={{color: '#DDC9A3'}} ><UserOutlined /> <Text style={{color: '#DDC9A3'}} italic>{nombre}</Text></Text>
              <Text onClick={salir} type="danger"> <LogoutOutlined /> SALIR</Text>

            </Flex>

          </Flex>

          {/* Finaliza el Contenido del Menú */}

        </Header>

        {/* Inicia Contenido de la APP */}
        <Content
          style={{
            padding: '15px 30px',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: '#691C32',
              borderRadius: '15px',
              color: '#FFF'
            }}
          >
            {/* Renderizar el componente Formulario */}
            <p>Los campos marcados con * son obligatorios</p>
            <Formulario user={user} />
            <br /><br />
          </div>
        </Content>

        <Content
          style={{
            padding: '15px 30px',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: '#691C32',
              borderRadius: '15px',
              color: '#FFF'
            }}
          >
            {/* Renderizar el componente que muestra la tabla con información capturada */}
            <MostrarSolicitudes />
            <br /><br />
          </div>
        </Content>

        {/* Finaliza el Contenido de la APP */}

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Agenda de Lideres 0.1- {new Date().getFullYear()} Created by Pablo and ecThor
        </Footer>

      </Layout>

    </>
  )
}

export default App