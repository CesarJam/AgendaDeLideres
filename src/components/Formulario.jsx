import React from 'react';
import { useState } from "react"
import { registrar } from "../js/crud.js"
import { Flex, Select, DatePicker, Input, InputNumber, Button } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined, SaveOutlined, HomeOutlined, ChromeOutlined, FacebookOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { Notyf } from "notyf"
import 'notyf/notyf.min.css'
const { Option } = Select;


// Notificaciones
var notyf = new Notyf(
  {
    position: {
      x: 'right',
      y: 'top',
    }
  });

function Formulario(userData) {

  // Definir estado para los valores de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [detalle, setDetalle] = useState('');
  const [numeroCelular, setNumeroCelular] = useState('');
  const [numeroFijo, setNumeroFijo] = useState('');
  const [paginaWeb, setPaginaWeb] = useState('');
  const [correo, setCorreo] = useState('');
  const [facebook, setFacebook] = useState('');
  const [direccion, setDireccion] = useState('');
  const [otroTipo, setOtroTipo] = useState('');


  const limpiarCampos = () => {
    setNombre('');
    setTipo('');
    setDetalle('');
    setNumeroCelular('');
    setNumeroFijo('');
    setPaginaWeb('');
    setCorreo('');
    setFacebook('');
    setDireccion('');
    setOtroTipo('');
  };

  // Función para manejar el cambio de fecha
  const onChange = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD'); // Formatear la fecha
    // console.log(date);
    // console.log(formattedDate);
    setFecha(formattedDate);
  };

  const onChangeFechaEvento = (date) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD'); // Formatear la fecha
    // console.log(date);
    // console.log(formattedDate);
    setFechaEvento(formattedDate);
  };


  // Función para manejar el clic del botón
  const handleClick = async (e) => {
    //alert('¡Hiciste clic en el botón!');
    e.preventDefault();
    // e.target.reset()

    // Verificar si algún campo está vacío
    if (!nombre || !numeroCelular) {
      notyf.error('Por favor, complete los campos marcados con *');
      return;
    }

    // Llamar a la función registrar y pasar el objeto con todos los datos
    try {
      //se construye el objeto
      const datosRegistro = {
        nombre: nombre,
        tipo: tipo,
        detalle: detalle,
        numeroCelular: numeroCelular,
        numeroFijo: numeroFijo,
        paginaWeb: paginaWeb,
        correo: correo,
        facebook: facebook,
        direccion: direccion
      };
      // Asigna el valor de 'otroTipo' a 'tipo' si 'tipo' es 'Otro'
      datosRegistro.tipo = datosRegistro.tipo === 'Otro' ? otroTipo : datosRegistro.tipo;

      // console.log(datosRegistro)
      await registrar(datosRegistro, "agenda");

      // Limpiar los campos del formulario
      limpiarCampos();

      // Resto del código...
    } catch (error) {
      // console.error("Error:", error);
      notyf.error(error)
      // Manejar el error de alguna manera
    }

  };

  return (
    <form>
      <span>*</span><Input size="large" placeholder="Nombre de la Persona / Lider / Organización / Asociación / Dependencia ..." value={nombre}
        onChange={(e) => setNombre(e.target.value)} />
      <br /><br /><br />
      <Flex gap="middle" horizontal>
        <Select
          size="large"
          showSearch
          style={{ width: '100%' }}
          placeholder="Selecciona un tipo"
          optionFilterProp=""
          onChange={(value) => setTipo(value)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          value={tipo}
        >
          <Option value="">Tipo</Option>
          <Option value="Otro">Otro</Option>
          <Option value="Lider de colonia">Lider de colonia</Option>
          <Option value="Asociación civil">Asociación civil</Option>
          <Option value="Presidente de Junta Vecinal">Presidente de Junta Vecinal</Option>
          <Option value="Líder Comunitario:">Líder Comunitario:</Option>
          <Option value="Coordinador de Organización Comunitaria">Coordinador de Organización Comunitaria</Option>
          <Option value="Director de Organización Sin Fines de Lucro">Director de Organización Sin Fines de Lucro</Option>
          <Option value="Representante de la Asociación de Padres y Maestros ">Representante de la Asociación de Padres y Maestros </Option>
          <Option value="Líder de Club Cívico">Líder de Club Cívico</Option>
          <Option value="Coordinador de Voluntariado">Coordinador de Voluntariado</Option>
          <Option value="Presidente de Consejo Consultivo Local">Presidente de Consejo Consultivo Local</Option>
          <Option value="Promotor de Desarrollo Comunitario">Promotor de Desarrollo Comunitario</Option>
          <Option value="Gerente de Recursos Comunitarios">Gerente de Recursos Comunitarios</Option>
        </Select>
      </Flex>
      {tipo === 'Otro' ?
        <Input size="large" placeholder="* Capture Otro" value={otroTipo}
          onChange={(e) => setOtroTipo(e.target.value)} />
        : ''}
      <br /><br />
      <Flex gap="middle" horizontal>
        <Input size="large" placeholder="Detalle" value={detalle}
          onChange={(e) => setDetalle(e.target.value)} />
      </Flex>
      <br /><br />
      <Flex gap="middle" horizontal>
        <Input
          type="tel"
          placeholder='* Telefono celular'
          value={numeroCelular}
          onChange={(e) => {
            const inputTelefono = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
            if (inputTelefono.length <= 10) { // Verifica que tenga máximo 10 dígitos
              setNumeroCelular(inputTelefono); // Actualiza el estado solo si cumple con la restricción
            }
          }}
          size="large"
          prefix={<PhoneOutlined />}
        />
        <Input
          type="tel"
          placeholder='Telefono fijo'
          value={numeroFijo}
          onChange={(e) => {
            const inputTelefono = e.target.value.replace(/\D/g, ''); // Elimina todos los caracteres no numéricos
            if (inputTelefono.length <= 10) { // Verifica que tenga máximo 10 dígitos
              setNumeroFijo(inputTelefono); // Actualiza el estado solo si cumple con la restricción
            }
          }}
          size="large"
          prefix={<PhoneOutlined />}
        />
      </Flex>
      <br /><br />
      <Flex gap="middle" horizontal>
        <Input size="large" placeholder="Website" value={paginaWeb} onChange={(e) => setPaginaWeb(e.target.value)} prefix={<ChromeOutlined />} />
        <Input type='email' defaultValue={correo} onChange={(e) => setCorreo(e.target.value)} onBlur={(e) => validarCorreo(e.target.value)} size="large" placeholder="Correo electrónico" prefix={<MailOutlined />} />
      </Flex>
      <br /><br />
      <Flex gap="middle" horizontal>
        <Input size="large" placeholder="Facebook" value={facebook}
          onChange={(e) => setFacebook(e.target.value)} prefix={<FacebookOutlined />} />
        <br /><br />
        <Input size="large" placeholder="Dirección" value={direccion}
          onChange={(e) => setDireccion(e.target.value)} prefix={<HomeOutlined />} />
      </Flex>
      <br /><br />
      <Flex gap="middle" horizontal style={{ justifyContent: 'flex-end' }}>
      <Button type="primary" icon={<SaveOutlined />} onClick={handleClick} >
        REGISTRAR
      </Button>
    </Flex>

      

    </form>

  );
}

function validarCorreo(inputCorreo) {
  // Expresión regular para validar el formato del correo electrónico
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(inputCorreo)) {
    //alert("¡El correo electrónico ingresado no es válido!");
    notyf.error('¡El correo electrónico ingresado no es válido!');
  }
}

export default Formulario;
