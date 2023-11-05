import React, { useEffect, useMemo, useState } from 'react';
import { Button, PaginationProps, Popconfirm, Table, Tag, Typography, Flex, Space } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { ECategory } from '@enums/category';
import { CategoryList } from '@lists/Category.list';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { useDeleteEmployeeMutation } from '@services/employeeApi';
import EmployeeUpdateModal from '@components/profile/employee/employeeModal/employeeUpdateModal/EmployeeUpdateModal';
import EmployeeCreateModal from '@components/profile/employee/employeeModal/employeeCreateModal/EmployeeCreateModal';
import { useMessage } from '@hooks/useMessage';
import { IEmployee } from '@models/iEmployee';
import { ISortModel } from '@models/sort-model';
import { transformSorterModel, transformTableFilterToApi } from '@lib/utils/profileUtils';
import { IFilter } from '@models/iFilter';
import SearchBar from '@components/profile/ui/searchBar/SearchBar';
import { useGetCustomersWithPaginationQuery } from '@services/customerApi';

interface DataType extends IEmployee {
    _id: string;
    key: string;
}

const EditButton: React.FC<{ id: any }> = ({ id }) => {
    const [open, setOpen] = useState(false);

    const onClick = () => {
        setOpen(true);
    };

    return (
        <>
            <EmployeeUpdateModal id={id} open={open} setOpen={setOpen} />
            <Button type="primary" ghost onClick={onClick} icon={<EditFilled />}></Button>
        </>
    );
};

const DeleteButton: React.FC<{ id: any }> = ({ id }) => {
    const [deleteEmployee, { isLoading: deleteLoading }] = useDeleteEmployeeMutation();
    const { errorMessage, successMessage } = useMessage();

    const handleDelete = () => {
        return deleteEmployee(id).then((res: any) => {
            if (res?.data?.status === 'ok') {
                successMessage('Сотрудник удален!');
            } else {
                errorMessage('Что-то пошло не так...');
            }
        });
    };

    return (
        <Popconfirm
            title="Вы уверены? Данные будут удалены"
            onConfirm={handleDelete}
            okText="Да"
            cancelText="Нет"
            okButtonProps={{ loading: deleteLoading }}
        >
            <Button danger icon={<DeleteFilled />}></Button>
        </Popconfirm>
    );
};

const getColumns = (filter: any): ColumnsType<DataType> => [
    {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
    },
    {
        title: 'Фамилия',
        dataIndex: 'surname',
        key: 'surname',
        sorter: true,
    },
    {
        title: 'Категория',
        key: 'roles',
        dataIndex: 'roles',
        filters: CategoryList.map(category => ({
            text: category.label,
            value: category.value,
        })),
        defaultFilteredValue: filter?.roles,
        render: (_, { roles }) => (
            <>
                {CategoryList.map(category => {
                    let color = 'green';
                    if (category.value === ECategory.WASH) {
                        color = 'volcano';
                    }
                    const currentCategory = roles?.find(option => option === category.value);
                    if (currentCategory)
                        return (
                            <Tag color={color} key={category.value}>
                                {category.label.toUpperCase()}
                            </Tag>
                        );
                })}
            </>
        ),
    },
    {
        title: 'Действия',
        key: 'action',
        render: (_, record: { key: React.Key; _id: string }) => (
            <Flex justify="flex-end" gap="small">
                <EditButton id={record._id} />
                <DeleteButton id={record._id} />
            </Flex>
        ),
        fixed: 'right',
        width: '90px',
    },
];

const Customer: React.FC = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [count, setCount] = useState(0);
    const [sort, setSort] = useState<ISortModel>({});
    const [search, setSearch] = useState<IFilter>({});

    const [filter, setFilter] = useState<IFilter>({
        roles: [],
    });

    const filterModel = useMemo(() => {
        return transformTableFilterToApi(filter, search);
    }, [filter, search]);

    const { data, isFetching } = useGetCustomersWithPaginationQuery({
        page,
        limit,
        sort,
        filter: filterModel,
    });

    useEffect(() => {
        setCount(data?.total || 0);
    }, [data, page]);

    const [openModal, setOpenModal] = useState(false);
    const onNew = () => {
        setOpenModal(true);
    };

    // pagination
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setLimit(pageSize);
        setPage(current);
    };

    const onPageChange: PaginationProps['onChange'] = pageNumber => {
        setPage(pageNumber);
    };

    const pagination = {
        defaultCurrent: 1,
        current: page,
        total: count,
        showSizeChanger: true,
        onShowSizeChange,
        onChange: onPageChange,
    };

    const columns = getColumns(filter);

    const onTableChange: TableProps<DataType>['onChange'] = (paginationConfig, filters, sorter) => {
        if (sorter) {
            setSort(transformSorterModel(sorter));
        }
        if (filters) {
            setFilter(filters as IFilter);
        }
    };

    return (
        <div>
            <Typography.Title>Клиенты</Typography.Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                <SearchBar
                    filters={['name', 'surname', 'phone']}
                    loading={isFetching}
                    search={search}
                    setSearch={setSearch}
                    setPage={setPage}
                />
                <Table
                    columns={columns}
                    dataSource={data?.data ? [...data.data] : []}
                    loading={isFetching}
                    pagination={{ ...pagination }}
                    onChange={onTableChange}
                    bordered
                    size="small"
                />
                <Button icon={<PlusOutlined />} onClick={onNew}>
                    Добавить сотрудника
                </Button>
            </Space>
            <EmployeeCreateModal setOpen={setOpenModal} open={openModal} />
        </div>
    );
};

export default Customer;
