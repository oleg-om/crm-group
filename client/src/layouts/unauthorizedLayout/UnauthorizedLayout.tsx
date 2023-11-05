import React, { useEffect } from 'react';
import { Layout, theme } from 'antd';
import './unauthorizedLayout.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ERoutes } from '@enums/routes';
import { useGetUserDetailsQuery } from '@services/auth/authService';
import { setCredentials } from '@store/slices/auth.slice';
import { IRootState } from '@store/index';

const { Content } = Layout;
const UnauthorizedLayout: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accessToken } = useSelector((state: IRootState) => state.auth);

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000, // 15mins
        skip: !accessToken,
    });

    useEffect(() => {
        if (!isFetching) {
            if (data) {
                dispatch(setCredentials(data));
                navigate(ERoutes.Main);
            }
        }
    }, [isFetching, data, dispatch]);

    return (
        <Layout className="auth-layout">
            <Content className="auth-layout__content">
                <div
                    className="auth-layout-content auth-layout__children"
                    style={{ background: colorBgContainer }}
                >
                    <Outlet />
                </div>
            </Content>
        </Layout>
    );
};

export default UnauthorizedLayout;
