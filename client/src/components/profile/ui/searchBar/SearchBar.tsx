import { Button, Collapse, Flex, Input, Space, theme, Tooltip } from 'antd';
import React, { ChangeEventHandler, useState } from 'react';
import { IFilter } from '@models/iFilter';
import {
    CaretRightOutlined,
    ClearOutlined,
    SearchOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { useMessage } from '@hooks/useMessage';
import './search-bar.scss';
import { PhoneInput } from '@components/profile/ui/searchBar/phoneInput/PhoneInput';

type TFilters = 'name' | 'surname' | 'phone';
interface ISearch {
    filters: TFilters[];
    loading: boolean;
    search: IFilter;
    setSearch: Function;
    setPage: Function;
    open?: boolean;
}

const FilterInput: React.FC<{
    filter: TFilters;
    onChange: ChangeEventHandler<HTMLInputElement>;
    search: IFilter;
    tempSearch: IFilter;
}> = ({ filter, onChange, search, tempSearch }) => {
    const getPlaceHolder = (): string => {
        switch (filter) {
            case 'name':
                return 'Поиск по имени';
            case 'surname':
                return 'Поиск по фамилии';
            case 'phone':
                return 'Поиск по телефону';
            default:
                return 'Поиск';
        }
    };

    const placeholder = getPlaceHolder();

    const value = search[filter] || '';
    const tempValue = tempSearch[filter] || '';

    if (filter === 'phone') {
        return (
            <PhoneInput
                value={value as string}
                tempValue={tempValue as string}
                placeholder={placeholder}
                onChange={onChange}
            />
        );
    }

    return (
        <Input
            placeholder={placeholder}
            value={tempValue}
            onChange={onChange}
            name={filter}
            status={value && 'warning'}
        />
    );
};

export const SearchBar: React.FC<ISearch> = ({ filters, loading, search, setSearch, setPage }) => {
    const [tempSearch, setTempSearch] = useState<IFilter>({});
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setTempSearch((prevState: IFilter) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const { warningMessage } = useMessage();
    const submit = () => {
        if (!!Object.keys(tempSearch)?.length) {
            setPage(1);
            setSearch(tempSearch);
        } else {
            warningMessage('Ни одно поле поиска не заполнено');
        }
    };

    const onClear = () => {
        setSearch({});
        setTempSearch({});
        setPage(1);
    };

    if (filters) {
        return (
            <Flex justify="space-between" className="search-bar">
                <Space className="search-bar__row">
                    {filters.map(filter => (
                        <FilterInput
                            filter={filter}
                            key={filter}
                            onChange={onChange}
                            tempSearch={tempSearch}
                            search={search}
                        />
                    ))}
                </Space>
                <Space className="search-bar__row">
                    <Button
                        onClick={submit}
                        loading={loading}
                        icon={<SearchOutlined />}
                        className="search-bar__button"
                    >
                        Поиск
                    </Button>
                    <Button
                        className="search-bar__button"
                        onClick={onClear}
                        loading={loading}
                        icon={<ClearOutlined />}
                        disabled={!Object.keys(search)?.length}
                        danger
                        ghost
                    >
                        Сбросить
                    </Button>
                </Space>
            </Flex>
        );
    }
};

const CollapseSearchBar: React.FC<ISearch> = ({
    filters,
    loading,
    search,
    setSearch,
    setPage,
    open,
}) => {
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
        marginBottom: '10px',
    };

    const genExtra = () => {
        if (!!Object.keys(search)?.length) {
            return (
                <Tooltip placement="right" title="Применен поиск. Показаны не все результаты">
                    <WarningOutlined />
                </Tooltip>
            );
        }
    };

    return (
        <Collapse
            bordered={false}
            defaultActiveKey={open ? ['search'] : []}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            style={{ background: token.colorBgContainer }}
            items={[
                {
                    key: 'search',
                    label: 'Поиск',
                    children: (
                        <SearchBar
                            filters={filters}
                            loading={loading}
                            search={search}
                            setSearch={setSearch}
                            setPage={setPage}
                        />
                    ),
                    style: panelStyle,
                    extra: genExtra(),
                },
            ]}
        />
    );
};

export default CollapseSearchBar;
