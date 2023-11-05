import { Button, Form, Input } from 'antd';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ERoutes } from '@enums/routes';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@store/actions/authActions';
import { IRootState } from '@store/index';
import { regexEmail, regexValidatePassword } from '@lib/utils/regex';
import { newMessage } from '@store/slices/message.slice';
import { EMessage } from '@enums/message';
import { useEffect } from 'react';

const Register = () => {
    const { loading, error, success } = useSelector((state: IRootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getErrorMessage = () => {
        return dispatch(
            newMessage({
                type: EMessage.ERROR,
                content: error,
            }),
        );
    };

    const getSuccessMessage = () => {
        return dispatch(
            newMessage({
                type: EMessage.SUCCESS,
                content: 'Вы успешно зарегистрировались!',
            }),
        );
    };

    useEffect(() => {
        if (error) {
            getErrorMessage();
        }
        if (success) {
            navigate(ERoutes.Main + ERoutes.Auth + ERoutes.Slash + ERoutes.Login);
            getSuccessMessage();
        }
    }, [error]);

    interface iRegisterUser {
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
    }

    const [form] = Form.useForm();

    const onFinish = (data: iRegisterUser) => {
        dispatch(registerUser(data));
    };

    const passwordValidator = async (rule: any, value: string) => {
        const isOk = regexValidatePassword.test(value);

        if (!isOk) {
            throw new Error('Something wrong!');
        } else {
            return false;
        }
    };

    const emailValidator = async (rule: any, value: any) => {
        const isOk = regexEmail.test(value);

        if (!isOk) {
            throw new Error('Something wrong!');
        } else {
            return false;
        }
    };

    form.setFieldsValue({
        email: 'olegoriginal@yandex.ru',
        username: 'Oleg',
        password: '30081993ArroW!',
        confirmPassword: '30081993ArroW!',
    });

    return (
        <Form name="normal_login" className="login-form" onFinish={onFinish} form={form}>
            <Form.Item
                name="email"
                validateDebounce={1000}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите эмейл!',
                    },
                    { validator: emailValidator, message: 'Некорректный эмейл' },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Эмейл"
                />
            </Form.Item>
            <Form.Item name="username">
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Имя"
                />
            </Form.Item>
            <Form.Item
                name="password"
                validateDebounce={1000}
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите пароль!',
                    },
                    {
                        validator: passwordValidator,
                        message:
                            'Пароль должен содержать минимум 6 символов, включая как минимум одну строчную букву, одну заглавную букву, одну цифру и один специальный символ.',
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
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
                            return Promise.reject(new Error('Пароли не совпадают'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Введите пароль повторно"
                />
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loading}
                >
                    Зарегистрироваться
                </Button>
                или{' '}
                <Link to={ERoutes.Main + ERoutes.Auth + ERoutes.Slash + ERoutes.Login}>Войти</Link>
            </Form.Item>
        </Form>
    );
};

export default Register;
