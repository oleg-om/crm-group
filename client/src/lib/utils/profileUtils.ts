import { ISortModel } from '@models/sort-model';
import { IFilter } from '@models/iFilter';

export const removeEmptyFilterFields = (filter: IFilter = {}) => {
    let cleanObj = {};

    Object.keys(filter).forEach(val => {
        const newVal = filter[val];
        cleanObj = newVal && newVal?.length ? { ...cleanObj, [val]: newVal } : cleanObj;
    });
    return cleanObj as IFilter;
};

export const transformSorterModel = (sorter: any) => {
    if (sorter && sorter?.field) {
        return {
            field: sorter?.field,
            order: sorter?.order,
        } as ISortModel;
    } else return {} as ISortModel;
};

export const transformTableFilterToApi = (filter: IFilter = {}, search: IFilter = {}) => {
    const filterModel = removeEmptyFilterFields(filter);
    const searchModel = removeEmptyFilterFields(search);

    const modifyObject = (obj: IFilter, match: 'full' | 'contains', type: 'array' | 'string') => {
        return Object.entries(obj).map(([key, val]) => {
            if (val && val?.length) {
                return {
                    field: key,
                    value: val,
                    match,
                    type,
                };
            }
        });
    };

    return [
        ...modifyObject(filterModel, 'full', 'array'),
        ...modifyObject(searchModel, 'contains', 'string'),
    ];
};
