import { useState } from "react"
import { accesoUsuario } from '../js/auth'

import { Button, Layout, Input, Typography, Flex, Image, Form, Checkbox } from 'antd'
import { LoginOutlined, MailOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

import { Notyf } from "notyf"
import 'notyf/notyf.min.css'

const { Content } = Layout;
const { Title } = Typography;

// Notificaciones
var notyf = new Notyf(
    {
        position: {
            x: 'right',
            y: 'top',
        }
    });

function validarCorreo(inputCorreo) {
    // Expresión regular para validar el formato del correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(inputCorreo)) {
        notyf.error('¡El correo electrónico ingresado no es válido!');
    }
}

function LogIn() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    return (
        <>
            <Content
                style={{
                    padding: '30px 0px 0px 0px',
                }}
            >
                <Flex justify='center' align='center' vertical>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 200,
                            background: '#691C32',
                            borderRadius: '15px',
                            color: '#FFF',
                            width: '40%'
                        }}
                    >

                        <Form
                            name="basic"                            
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={() => accesoUsuario(email, pass)}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, introduce tu correo!',
                                    },
                                ]}
                            >
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={(e) => validarCorreo(e.target.value)} 
                                    size="large"
                                    placeholder="Correo electrónico" prefix={<MailOutlined />}
                                />

                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor, introduce tu contraseña!',
                                    },
                                ]}
                            >
                                <Input.Password
                                size="large"
                                    placeholder="Contraseña"
                                    onChange={(e) => setPass(e.target.value)}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />

                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" block htmlType="submit">
                                    INGRESAR
                                </Button>
                            </Form.Item>
                        </Form>

                        <br />
                        <br />
                        <Flex justify='center' align='center' vertical>
                            <Title level={4}
                                style={{
                                    color: '#FFF'
                                }}
                            >JUNTOS POR LA TRANSFORMACIÓN</Title>

                        </Flex>

                    </div>
                </Flex>

            </Content>







        </>
    )
}

export default LogIn