import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from '@enums/routes';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate(ERoutes.Main);
    };
    return (
        <Result
            status="404"
            title="404"
            subTitle="Похоже, такой страницы не существует"
            extra={
                <Button onClick={onClick} type="primary">
                    На главную
                </Button>
            }
        />
    );
};

export default NotFound;
