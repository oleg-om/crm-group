import { MenuProps } from 'antd';
import { EProfileMenu } from '@enums/profileMenu';
import { ECategory } from '@enums/category';
import { useUser } from '@hooks/useUser';
import { Link } from 'react-router-dom';
import { ERoutes } from '@enums/routes';

const getProfileList = (key: string, label: string, enabled: boolean) => {
    return {
        key,
        label,
        icon: '',
        disabled: !enabled,
        children: [
            {
                key: `${key}-settings`,
                label: 'Настройки',
                disabled: !enabled,
            },
            {
                key: `${key}-services`,
                label: 'Услуги',
                disabled: !enabled,
            },
            {
                key: `${key}-materials`,
                label: 'Материалы',
                disabled: !enabled,
            },
        ],
    };
};

const profileMenuList = (isWashRole: boolean, isTireServiceRole: boolean): MenuProps['items'] => [
    {
        key: EProfileMenu.SETTINGS,
        label: 'Настройки',
        disabled: true,
    },
    getProfileList(ECategory.WASH, 'Автомойка', isWashRole),
    getProfileList(ECategory.TIRE_SERVICE, 'Шиномонтаж', isTireServiceRole),
    {
        key: ERoutes.Employee,
        label: (
            <Link to={ERoutes.Main + ERoutes.Profile + ERoutes.Slash + ERoutes.Employee}>
                Сотрудники
            </Link>
        ),
    },
    {
        key: 'customers',
        label: (
            <Link to={ERoutes.Main + ERoutes.Profile + ERoutes.Slash + ERoutes.Customers}>
                Клиенты
            </Link>
        ),
    },
];

export const profileMenu = () => {
    const { isWashRole, isTireServiceRole } = useUser();
    return profileMenuList(isWashRole, isTireServiceRole);
};
