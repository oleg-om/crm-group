import { Segmented } from 'antd';
import React from 'react';

interface BoxProps {
    value: number;
    setValue: Function;
}
const Box: React.FC<BoxProps> = ({ value, setValue }) => {
    const onChange = (option: string | number): void => {
        setValue(option);
    };

    return (
        <Segmented
            size="large"
            block={true}
            options={[1, 2, 3, 4, 5]}
            value={value}
            onChange={onChange}
        />
    );
};
export default Box;
