import { List } from 'antd';
import ServiceTableRow from './serviceTableRow/ServiceTableRow';
import React, { useEffect, useState } from 'react';
import { editService, serviceIsExist, transformPriceList } from '../../lib/utils/serviceUtils';
import { EServicePriceType } from '@enums/servicePriceType';
import './servicesTable.scss';
import { NotFoundContent } from '@components/ui/notFoundContent/NotFoundContent';
// import { NotFoundContent } from '@components/ui/notFoundContent/NotFoundContent';

export interface IService {
    name: string;
    quantity?: number;
    price?: number;
    priceType: EServicePriceType;
}

const data: Array<IService> = [
    {
        name: 'Экспресс-мойка',
        price: 300,
        priceType: EServicePriceType.DEFAULT,
    },
    {
        name: 'Мойка с пеной',
        price: 0,
        priceType: EServicePriceType.PROMO,
    },
    {
        name: 'Демо',
        price: 20,
        priceType: EServicePriceType.CHANGEABLE,
    },
    {
        name: 'Экспресс-мойка',
        price: 300,
        priceType: EServicePriceType.DEFAULT,
    },
    {
        name: 'Мойка с пеной',
        price: 0,
        priceType: EServicePriceType.PROMO,
    },
    {
        name: 'Демо',
        price: 20,
        priceType: EServicePriceType.CHANGEABLE,
    },
    {
        name: 'Экспресс-мойка',
        price: 300,
        priceType: EServicePriceType.DEFAULT,
    },
    {
        name: 'Мойка с пеной',
        price: 0,
        priceType: EServicePriceType.PROMO,
    },
    {
        name: 'Демо',
        price: 20,
        priceType: EServicePriceType.CHANGEABLE,
    },
];

interface ServicesTableProps {
    title: string;
    value: Array<IService>;
    setValue: Function;
}

const ServicesTable: React.FC<ServicesTableProps> = ({ title, value, setValue }) => {
    const [priceList, setPriceList] = useState<Array<IService>>([]);

    useEffect(() => {
        setPriceList(transformPriceList(data, value));

        return () => {};
    }, [value]);

    const removeService = (service: IService) => {
        setValue((prevState: Array<IService>) =>
            prevState.filter(item => item?.name !== service?.name),
        );
    };

    const updateService = (service: IService, name: string, value: string | number) => {
        setValue((prevState: Array<IService>) => editService(prevState, service, name, value));
    };

    const addService = (service: IService, isExist = serviceIsExist(value, service)) => {
        if (!isExist) {
            setValue((prevState: Array<IService>) => [...prevState, { ...service, quantity: 1 }]);
        } else {
            const quantity = (service?.quantity || 0) + 1;
            updateService(service, 'quantity', quantity);
        }
    };

    const changeService = (service: IService) => {
        const isExist = serviceIsExist(value, service);
        if (!isExist) {
            addService(service, isExist);
        } else {
            removeService(service);
        }
    };

    return (
        <List
            header={<div>{title}</div>}
            bordered
            dataSource={priceList}
            className="service-table"
            locale={{ emptyText: <NotFoundContent /> }}
            renderItem={item => (
                <ServiceTableRow
                    item={item}
                    changeService={changeService}
                    addService={addService}
                    removeService={removeService}
                    updateService={updateService}
                />
            )}
        />
    );
};

export default ServicesTable;
