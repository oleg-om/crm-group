import { Segmented } from 'antd';
import { CarBodyList } from '../lists/CarBody.list';
import React from 'react';

interface CarBodyProps {
    value: string;
    setValue: Function;
}
const CarBody: React.FC<CarBodyProps> = ({ value, setValue }) => {
    const onChange = (option: string | number): void => {
        setValue(option);
    };

    return (
        <Segmented
            size="large"
            block={true}
            options={CarBodyList}
            value={value}
            onChange={onChange}
        />
    );
};
export default CarBody;
