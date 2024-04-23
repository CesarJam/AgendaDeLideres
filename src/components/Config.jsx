import React from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Typography, Dropdown, Space } from 'antd';
import RegistraUsers from './RegistraUsers';

const { Text } = Typography;

const items = [
    {
        label: <RegistraUsers />,
        key: '0',
    },
    {
        label: <a href="https://google.com">2nd menu item</a>,
        key: '1',
        disabled: true,
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
        danger: true,
        disabled: true,
    },
];
const Config = () => (
    <Dropdown
        menu={{
            items,
        }}
        trigger={['click']}
    >
        <Text onClick={(e) => e.preventDefault()} type="success"> <SettingOutlined /> CONFIGURACIÓN</Text>
        
    </Dropdown>
);
export default Config;