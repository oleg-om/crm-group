import React from 'react';
import { Button, Form, Space } from 'antd';
import SaveButton from '@components/ui/buttons/saveButton/SaveButton';

const SubmitForm: React.FC = () => {
    return (
        <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
            <Space>
                <SaveButton />
                <Button htmlType="reset">Сбросить</Button>
            </Space>
        </Form.Item>
    );
};

export default SubmitForm;
