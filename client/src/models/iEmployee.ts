import { ECategory } from '@enums/category';

export interface IEmployee {
    name: string;
    surname: string;
    roles: ECategory[];
    percent: number;
    _id?: string;
}
