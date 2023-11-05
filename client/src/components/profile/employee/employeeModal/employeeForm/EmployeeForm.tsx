import { Divider, Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { CategoryList } from '@lists/Category.list';
import { numberValidator } from '@lib/validators';
import React from 'react';

const EmployeeForm: React.FC<{
    form: FormInstance;
    rolesAreDisabled: boolean;
    handleOk: any;
    footer: React.ReactNode;
}> = ({ form, rolesAreDisabled, handleOk, footer }) => {
    return (
        <Form form={form} name="employees" layout="vertical" autoComplete="off" onFinish={handleOk}>
            <Form.Item name="roles" label="Категория">
                <Select
                    disabled={rolesAreDisabled}
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Категория"
                    defaultValue={[]}
                    options={CategoryList}
                />
            </Form.Item>
            <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="surname" label="Фамилия" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="percent"
                label="Процент от выручки"
                rules={[
                    { required: false },
                    {
                        validator: numberValidator,
                        message: 'Только цифры',
                    },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Divider />
            {footer}
        </Form>
    );
};

export default EmployeeForm;
