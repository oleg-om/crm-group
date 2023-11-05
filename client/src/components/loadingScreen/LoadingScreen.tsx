import { Spin, theme } from 'antd';
import './loading-screen.scss';

const LoadingScreen = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div className="loading-screen" style={{ background: colorBgContainer }}>
            <div className="loading-screen__wrapper">
                <Spin tip="Загрузка" size="large" spinning={true}>
                    <div className="loading-screen__content" />
                </Spin>
            </div>
        </div>
    );
};

export default LoadingScreen;
