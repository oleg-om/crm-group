import { Carbody } from '../enums/carbody';
import { DefaultOption } from '../models/default-options';

export const CarBodyList: Array<DefaultOption> = [
    {
        label: 'Седан',
        value: Carbody.Sedan,
    },
    {
        label: 'Кроссовер',
        value: Carbody.Crossover,
    },
    {
        label: 'Внедорожник',
        value: Carbody.Suv,
    },
    {
        label: 'Микроавтобус',
        value: Carbody.Minibus,
    },
    {
        label: 'Грузовой',
        value: Carbody.Truck,
    },
];
