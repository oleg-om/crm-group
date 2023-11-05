import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { ERoutes } from '@enums/routes';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '@store/actions/authActions';
import { IRootState } from '@store/index';
import { newMessage } from '@store/slices/message.slice';
import { EMessage } from '@enums/message';
import { useEffect } from 'react';

const Login = () => {
    const { loading, error } = useSelector((state: IRootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getErrorMessage = () => {
        return dispatch(
            newMessage({
                type: EMessage.ERROR,
                content: 'Неправильный логин или пароль',
            }),
        );
    };

    useEffect(() => {
        if (error) {
            getErrorMessage();
        }
    }, [error]);
    const onLogin = (values: any) => {
        dispatch(userLogin(values)).then(() => {
            navigate(ERoutes.Main);
        });
    };
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onLogin}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите логин!',
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Эмейл"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите пароль!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Пароль"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loading}
                >
                    Войти
                </Button>
                или{' '}
                <Link to={ERoutes.Main + ERoutes.Auth + ERoutes.Slash + ERoutes.Register}>
                    Зарегистрироваться
                </Link>
            </Form.Item>
        </Form>
    );
};

export default Login;
