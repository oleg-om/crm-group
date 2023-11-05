import React from 'react';
import { Button, Drawer, Space } from 'antd';
import DarkModeSwitch from '@components/ui/drawer/darkModeSwitch/DarkModeSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@store/slices/auth.slice';
import { IRootState } from '@store/index';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '@enums/routes';

interface NavbarDrawerProps {
    open: boolean;
    setOpen: Function;
}

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogout = () => {
        dispatch(logout());

        navigate(ERoutes.Main + ERoutes.Auth + ERoutes.Slash + ERoutes.Login);
    };
    return (
        <Button danger onClick={onLogout}>
            Выйти
        </Button>
    );
};
const NavbarDrawer: React.FC<NavbarDrawerProps> = ({ open, setOpen }) => {
    const { userInfo } = useSelector((state: IRootState) => state.auth);
    const onClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const goToDashBoard = () => {
        navigate(ERoutes.Main + ERoutes.Profile);
        setOpen(false);
    };

    return (
        <Drawer
            title={userInfo?.email}
            placement="right"
            onClose={onClose}
            open={open}
            footer={<Logout />}
            footerStyle={{ display: 'flex', padding: '10px', justifyContent: 'end' }}
        >
            <Space direction="vertical">
                <DarkModeSwitch />
                <Button onClick={goToDashBoard}>Панель администратора</Button>
            </Space>
        </Drawer>
    );
};

export default NavbarDrawer;
