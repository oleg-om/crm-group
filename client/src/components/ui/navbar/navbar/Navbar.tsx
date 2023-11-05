import React, { useState } from 'react';
import { Avatar, Col, Layout, Menu, MenuProps, Row } from 'antd';
import './navbar.scss';
import { UserOutlined } from '@ant-design/icons';
import NavbarDrawer from '@components/ui/drawer/Drawer';
import { Link } from 'react-router-dom';
import { ERoutes } from '@enums/routes';

const items: MenuProps['items'] = [
    {
        label: <Link to={ERoutes.Main + ERoutes.Wash}>Автомойка</Link>,
        key: '/wash',
    },
];

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);

    const { pathname } = location;

    const showDrawer = () => {
        setOpen(true);
    };

    const { Header } = Layout;

    return (
        <>
            <NavbarDrawer open={open} setOpen={setOpen} />
            <Header className="navbar">
                <div className="demo-logo" />
                <Row gutter={16}>
                    <Col span={20}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[pathname]}
                            items={items}
                            key={pathname}
                        />
                    </Col>
                    <Col span={4} className="navbar__avatar">
                        <Avatar
                            className="navbar__avatar-image"
                            onClick={showDrawer}
                            icon={<UserOutlined />}
                        />
                    </Col>
                </Row>
            </Header>
        </>
    );
};

export default Navbar;
