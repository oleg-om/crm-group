import React from 'react';
import { Popconfirm } from 'antd';

const DeletePopConfirm: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    return (
        <Popconfirm
            title="Удалить запись"
            description="Запись будет удалена. Вы уверены?"
            onConfirm={() => {}}
            onCancel={() => {}}
            okText="Да"
            cancelText="Нет"
        >
            {children}
        </Popconfirm>
    );
};
export default DeletePopConfirm;
