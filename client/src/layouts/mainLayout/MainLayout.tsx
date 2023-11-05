import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { useMessage } from '@hooks/useMessage';
import { useSelector } from 'react-redux';
import { IRootState } from '@store/index';
import { ETheme } from '@enums/theme';
import ruRu from 'antd/locale/ru_RU';

const MainLayout: React.FC = () => {
    const { mode } = useSelector((state: IRootState) => state.theme);
    const { contextHolder } = useMessage();

    return (
        <ConfigProvider
            theme={{
                algorithm: mode === ETheme.LIGHT ? theme.defaultAlgorithm : theme.darkAlgorithm,
            }}
            locale={ruRu}
        >
            {contextHolder}
            <Outlet />
        </ConfigProvider>
    );
};

export default MainLayout;
