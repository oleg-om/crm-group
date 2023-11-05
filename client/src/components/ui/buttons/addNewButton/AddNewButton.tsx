import React from 'react';
import { FloatButton } from 'antd';
import { Link } from 'react-router-dom';
import { ERoutes } from '@enums/routes';

const AddNewButton: React.FC = () => {
    return (
        <Link to={ERoutes.Main + ERoutes.Wash + ERoutes.Slash + ERoutes.NewOrder}>
            <FloatButton tooltip={<div>Новый заказ</div>} />
        </Link>
    );
};

export default AddNewButton;
