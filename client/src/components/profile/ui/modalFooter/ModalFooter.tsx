import React, { MouseEventHandler } from 'react';
import { Button, Form, Popconfirm } from 'antd';
import './modalFooter.scss';

const ModalFooter: React.FC<{
    handleCancel: MouseEventHandler;
    handleOk: MouseEventHandler;
    handleDelete?: MouseEventHandler;
    deleteLoading?: boolean;
    deleteButton: boolean;
    loading: boolean;
}> = ({ handleCancel, loading, deleteButton, handleDelete, deleteLoading }) => {
    return (
        <Form.Item className="modal-footer">
            <Button key="back" className="modal-footer__button" onClick={handleCancel}>
                Отмена
            </Button>
            {deleteButton && (
                <Popconfirm
                    title="Вы уверены? Данные будут удалены"
                    // @ts-ignore
                    onConfirm={handleDelete}
                    okText="Да"
                    cancelText="Нет"
                    okButtonProps={{ loading: deleteLoading }}
                >
                    <Button danger type="primary" className="modal-footer__button">
                        Удалить
                    </Button>
                </Popconfirm>
            )}
            <Button
                key="submit"
                type="primary"
                className="modal-footer__button"
                loading={loading}
                htmlType="submit"
            >
                Сохранить
            </Button>
        </Form.Item>
    );
};

export default ModalFooter;
