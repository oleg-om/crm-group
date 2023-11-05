import { Button, Checkbox, Input, List, Tag, Tooltip, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { ChangeEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { regexOnlyNumbers } from '../../../lib/utils/regex';
import './serviceTableRow.scss';
import { newMessage } from '../../../store/slices/message.slice';
import { EMessage } from '../../../enums/message';
import { IService } from '../ServicesTable';
import { EServicePriceType } from '../../../enums/servicePriceType';

interface ServiceTableRowProps {
    item: IService;
    changeService: Function;
    addService: Function;
    removeService: Function;
    updateService: Function;
}

interface ServiceTableRowChangeablePriceProps {
    onChange: ChangeEventHandler<HTMLInputElement>;
    item?: IService;
}

const ServiceTableRowPromotion: React.FC<{ priceType: EServicePriceType }> = ({ priceType }) => {
    if (priceType === EServicePriceType.PROMO) return <Tag color="orange">АКЦИЯ</Tag>;
};

const ServiceTableRowChangeablePrice: React.FC<ServiceTableRowChangeablePriceProps> = ({
    onChange,
    item,
}) => {
    return (
        <Tooltip title="Цена" placement="left">
            <Input
                className="service-table-row__input"
                value={item?.price}
                onChange={onChange}
                name="price"
                placeholder="Цена"
                disabled={!item?.quantity}
            />
        </Tooltip>
    );
};

const ServiceTableRow: React.FC<ServiceTableRowProps> = ({
    item,
    changeService,
    addService,
    removeService,
    updateService,
}) => {
    const dispatch = useDispatch();

    const getWarningMessage = () => {
        dispatch(
            newMessage({
                type: EMessage.WARNING,
                content: 'Можно вводить только цифры',
            }),
        );
    };

    const onChange = () => {
        changeService(item);
    };

    const onAdd = () => {
        addService(item);
    };

    const onRemove = () => {
        removeService(item);
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        if (regexOnlyNumbers.test(value)) {
            return updateService(item, name, Number(value));
        } else {
            getWarningMessage();
        }
    };

    const isChecked = !!item?.quantity;

    return (
        <List.Item className="service-table-row" style={{ padding: 0 }}>
            <div className="service-table-row__name" onClick={onChange}>
                <Checkbox checked={isChecked}>
                    <Typography.Text mark={isChecked}>{item.name}</Typography.Text>
                </Checkbox>
            </div>

            <div className="service-table-row__info">
                <ServiceTableRowPromotion priceType={item?.priceType} />
                {item?.priceType !== EServicePriceType.CHANGEABLE ? (
                    <Typography.Text>{item.price} руб.</Typography.Text>
                ) : (
                    <ServiceTableRowChangeablePrice onChange={onChangeInput} item={item} />
                )}
                <div className="service-table-row__buttons">
                    <Button type="primary" danger icon={<MinusOutlined />} onClick={onRemove} />
                    <Input
                        className="service-table-row__input"
                        value={item.quantity}
                        onChange={onChangeInput}
                        disabled={!item.quantity}
                        name="quantity"
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={onAdd} />
                </div>
            </div>
        </List.Item>
    );
};

export default ServiceTableRow;
