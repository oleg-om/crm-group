import { Space, Switch, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { switchTheme } from '@store/slices/theme.slice';
import { ETheme } from '@enums/theme';
import { IRootState } from '@store/index';

const DarkModeSwitch = () => {
    const dispatch = useDispatch();
    const { mode } = useSelector((state: IRootState) => state.theme);
    const onSwitch = (darkTheme: boolean) => {
        dispatch(switchTheme(darkTheme ? ETheme.DARK : ETheme.LIGHT));
    };

    return (
        <Space direction="horizontal">
            <Typography.Text>Темная тема</Typography.Text>
            <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked={mode === ETheme.DARK}
                onChange={onSwitch}
            />
        </Space>
    );
};

export default DarkModeSwitch;
