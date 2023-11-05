import React, { useState } from 'react';
import { Select } from 'antd';
import { NotFoundContent } from '../ui/notFoundContent/NotFoundContent';
import './employee.scss';

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

interface EmployeeProps {
    value?: number;
    setValue: Function;
}

const Employee: React.FC<EmployeeProps> = () => {
    const [loading] = useState(true);

    return (
        <Select
            className="employee"
            size="large"
            loading={loading}
            showSearch
            notFoundContent={<NotFoundContent />}
            placeholder="Сотрудники"
            optionFilterProp="children"
            mode="multiple"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
                {
                    value: 'jack',
                    label: 'Jack',
                },
                {
                    value: 'lucy',
                    label: 'Lucy',
                },
                {
                    value: 'tom',
                    label: 'Tom',
                },
            ]}
        />
    );
};

export default Employee;
