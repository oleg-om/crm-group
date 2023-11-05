import Sider from 'antd/es/layout/Sider';
import { Grid, Layout, Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { profileMenu } from '@lists/ProfileMenu.list';
import { Outlet, useNavigate } from 'react-router-dom';
import { ERoutes } from '@enums/routes';

const Profile: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    const { pathname } = location;
    const navigate = useNavigate();

    const [menu, setMenu] = useState<string>('');

    useEffect(() => {
        if (pathname && pathname.split('/')?.length > 1) {
            setMenu(pathname.split('/')[2]);
        } else {
            navigate(ERoutes.Main + ERoutes.Profile + ERoutes.Slash + ERoutes.Employee);
        }
    }, [pathname]);

    const verticalMenu = profileMenu();

    return (
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
            {screens.md ? (
                <Sider style={{ background: colorBgContainer }} width={200}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[menu]}
                        selectedKeys={[menu]}
                        style={{ height: '100%' }}
                        items={verticalMenu}
                    />
                </Sider>
            ) : (
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={[menu]}
                    selectedKeys={[menu]}
                    items={verticalMenu}
                />
            )}
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Outlet />
            </Content>
        </Layout>
    );
};

export default Profile;
