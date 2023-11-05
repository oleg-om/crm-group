import React from 'react';
import { Alert, Button, Form, Input, InputNumber, Space, Switch, Typography } from 'antd';
import { numberValidator } from '@lib/validators';

const Settings: React.FC = () => {
    const [form] = Form.useForm();

    const showBoxes = form.getFieldValue('showBoxes');

    console.log('show', showBoxes);
    return (
        <Form form={form} name="settings" autoComplete="off" layout="vertical">
            <Alert
                message=" Try modify `Password2` and then modify `Password`"
                type="info"
                showIcon
            />

            <Form.Item label="Отображать материалы" name="showMaterials">
                <Switch />
            </Form.Item>

            <Form.Item label="Отображать боксы" name="showBoxes">
                <Switch />
            </Form.Item>

            <Form.Item
                label="Количество боксов"
                name="boxesAmount"
                dependencies={['showBoxes']}
                rules={[{ validator: numberValidator, message: 'Только цифры' }]}
            >
                <InputNumber disabled={showBoxes} key={showBoxes} />
            </Form.Item>

            {/* Field */}
            <Form.Item
                label="Confirm Password"
                name="password2"
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error('The new password that you entered do not match!'),
                            );
                        },
                    }),
                ]}
            >
                <Input />
            </Form.Item>

            {/* Render Props */}
            <Form.Item noStyle dependencies={['showBoxes']}>
                {() => (
                    <Typography>
                        <p>
                            Only Update when <code>password2</code> updated:
                        </p>
                        <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                        <pre> {JSON.stringify(form.getFieldValue('showBoxes'))}</pre>
                    </Typography>
                )}
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 12 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="reset">reset</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default Settings;
