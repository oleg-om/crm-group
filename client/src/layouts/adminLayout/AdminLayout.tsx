import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useGetUserDetailsQuery } from '@services/auth/authService';
import { setCredentials } from '@store/slices/auth.slice';
import LoadingScreen from '@components/loadingScreen/LoadingScreen';
import { ERoutes } from '@enums/routes';
import { IRootState } from '@store/index';

const AdminLayout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { accessToken } = useSelector((state: IRootState) => state.auth);

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery('userDetails', {
        pollingInterval: 900000, // 15mins,
        skip: !accessToken,
    });

    useEffect(() => {
        if (!isFetching) {
            if (!data) {
                navigate(ERoutes.Main + ERoutes.Auth + ERoutes.Slash + ERoutes.Login);
            }
            if (data) {
                dispatch(setCredentials(data));
            }
        }
    }, [isFetching, data, dispatch]);

    if (isFetching) {
        return <LoadingScreen />;
    }

    return <Outlet />;
};

export default AdminLayout;
