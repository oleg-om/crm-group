import React, { ChangeEventHandler } from 'react';
import { InputNumber, Select } from 'antd';
import { regexOnlyNumbers } from '@lib/utils/regex';

const { Option } = Select;

const selectBefore = (
    <Select defaultValue="+7" style={{ width: 60 }}>
        <Option value="add">+7</Option>
        <Option value="minus">+375</Option>
    </Select>
);
export const PhoneInput: React.FC<{
    placeholder: string;
    tempValue: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ placeholder, tempValue, value, onChange }) => {
    const phoneFormatter = (value: string | undefined) => {
        return `$ ${value}`.replace(regexOnlyNumbers, ',');
    };

    return (
        <InputNumber
            addonBefore={selectBefore}
            placeholder={placeholder}
            value={tempValue}
            name="phone"
            status={value && 'warning'}
            formatter={phoneFormatter}
            parser={value => value!.replace(/\$\s?|(,*)/g, '')}
        />
    );
};
