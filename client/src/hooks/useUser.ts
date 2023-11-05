import { useSelector } from 'react-redux';
import { IRootState } from '@store/index';
import { ECategory } from '@enums/category';

export const useUser = () => {
    const auth = useSelector((state: IRootState) => state.auth);

    const { userInfo } = auth;

    const roles = userInfo?.roles || [];

    const isWashRole = !!roles.find(role => role === ECategory.WASH);
    const isTireServiceRole = !!roles.find(role => role === ECategory.TIRE_SERVICE);

    return { isWashRole, isTireServiceRole };
};
