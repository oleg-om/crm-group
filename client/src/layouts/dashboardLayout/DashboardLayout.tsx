import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';
import './DashboardLayout.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import AddNewButton from '@components/ui/buttons/addNewButton/AddNewButton';
import Navbar from '@components/ui/navbar/navbar/Navbar';
import { ERoutes } from '@enums/routes';

const { Content, Footer } = Layout;

const DashboardLayout: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === ERoutes.Main) {
            navigate(ERoutes.Main + ERoutes.Wash);
        }
    }, []);

    return (
        <Layout className="layout-dashboard">
            <Navbar />
            <Content className="layout-dashboard__content">
                <div
                    className="site-layout-content layout-dashboard__children"
                    style={{ background: colorBgContainer }}
                >
                    <Outlet />
                </div>
            </Content>
            <AddNewButton />
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    );
};

export default DashboardLayout;
