import React, { useState } from 'react';
import { registraUsuario } from '../js/auth'

import { Typography, Radio, Modal, Input } from 'antd';
import { UserOutlined, MailOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

import { Notyf } from "notyf"
import 'notyf/notyf.min.css'

const { Text, Title } = Typography;
var notyf = new Notyf(
  {
      position: {
          x: 'right',
          y: 'top',
      }
  });

const RegistraUsers = () => {

  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [rol, setRol] = useState('user');

  const onChangeRol = (e) => {
    setRol(e.target.value);
  };

  function validarCorreo(inputCorreo) {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(inputCorreo)) {
      notyf.error('¡El correo electrónico ingresado no es válido!');
    }
  }

  return (
    <>
      <span>  <Text onClick={() => setOpen(true)} ><UserOutlined /> Agregar usuarios</Text> </span>

      <Modal
        centered
        open={open}
        onOk={() => registraUsuario(nombre, email, pass, rol)}
        onCancel={() => setOpen(false)}
        width={400}
      >
        <Title level={2}>Registro de usuarios</Title>
        <Input size="large" placeholder="Nombre" value={nombre}
          onChange={(e) => setNombre(e.target.value)} prefix={<UserOutlined />} />
        <br /><br />

        <Input defaultValue={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => validarCorreo(e.target.value)} required size="large" placeholder="Correo electrónico" prefix={<MailOutlined />} />
        <br /><br />

        <Input.Password
          size="large"
          placeholder="Contraseña"
          onChange={(e) => setPass(e.target.value)}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <br /><br />

        <Radio.Group onChange={onChangeRol} value={rol}>
          <Radio value={'admin'}>Administrador</Radio>
          <Radio value={'user'}>User</Radio>
        </Radio.Group>

      </Modal>
    </>
  );
};
export default RegistraUsers;