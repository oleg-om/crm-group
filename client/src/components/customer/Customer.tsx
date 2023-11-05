import React, { useState } from 'react';
import { Select, Typography } from 'antd';
import { NotFoundContent } from '../ui/notFoundContent/NotFoundContent';
import './customer.scss';

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};
const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

interface CustomerProps {
    value?: string;
    setValue: Function;
}

const Customer: React.FC<CustomerProps> = () => {
    const [loading] = useState(true);

    return (
        <div>
            <Typography.Title level={2} style={{ margin: 0 }}>
                Клиент
            </Typography.Title>
            <Select
                className="customer"
                size="large"
                loading={loading}
                showSearch
                notFoundContent={<NotFoundContent />}
                placeholder="Сотрудник"
                optionFilterProp="children"
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
        </div>
    );
};

export default Customer;
