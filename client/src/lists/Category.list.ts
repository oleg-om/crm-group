import { ECategory } from '@enums/category';
import { DefaultOption } from '@models/default-options';

export const CategoryList: Array<DefaultOption> = [
    {
        label: 'Автомойка',
        value: ECategory.WASH,
    },
    {
        label: 'Шиномонтаж',
        value: ECategory.TIRE_SERVICE,
    },
];
