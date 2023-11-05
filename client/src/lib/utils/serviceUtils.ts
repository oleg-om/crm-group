import { IService } from '../../components/servicesTable/ServicesTable';

export const transformPriceList = (price: IService[], chosen: IService[]): IService[] => {
    if (price && chosen) {
        return price.reduce((acc: IService[], rec) => {
            const isExist = chosen.find(item => item?.name === rec?.name);
            if (isExist) {
                return [...acc, { ...rec, ...isExist }];
            }
            return [...acc, { ...rec, quantity: 0 }];
        }, []);
    }
    return price;
};

export const serviceIsExist = (value: IService[], service: IService) =>
    value.find(item => item?.name === service?.name) as IService;

export const editService = (
    data: IService[],
    service: IService,
    name: string,
    value: string | number,
): IService[] => {
    if (data && service) {
        return data.reduce((acc: IService[], rec) => {
            if (rec?.name === service?.name) {
                return [...acc, { ...rec, [name]: value }];
            } else return [...acc, rec];
        }, []);
    } else {
        return data;
    }
};
