import React from 'react';
import { Layout, theme } from 'antd';
import './ServiceLayout.scss';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;
const ServiceLayout: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Content className="layout__content">
                <div
                    className="site-layout-content layout__children"
                    style={{ background: colorBgContainer }}
                >
                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
};

export default ServiceLayout;
