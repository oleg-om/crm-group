import { Form, Modal } from 'antd';
import ModalFooter from '@components/profile/ui/modalFooter/ModalFooter';
import EmployeeForm from '@components/profile/employee/employeeModal/employeeForm/EmployeeForm';
import React, { useEffect } from 'react';
import { useMessage } from '@hooks/useMessage';
import { CategoryList } from '@lists/Category.list';
import {
    useDeleteEmployeeMutation,
    useGetEmployeeByIdMutation,
    useUpdateEmployeeMutation,
} from '@services/employeeApi';
import Loading from '@components/ui/loading/Loading';

const EmployeeUpdateModal: React.FC<{
    open: boolean;
    setOpen: Function;
    id: string;
}> = ({ open, setOpen, id }) => {
    const { errorMessage, successMessage } = useMessage();
    const [form] = Form.useForm();

    const [getEmployee, { data: employee, isLoading: employeeLoading, isError: employeeError }] =
        useGetEmployeeByIdMutation();

    useEffect(() => {
        if (id && open) {
            getEmployee(id);
        }
    }, [id, open]);

    useEffect(() => {
        if (employee?.data) {
            form.setFieldsValue(employee.data);
        }
        if (employeeError) {
            errorMessage('Сотрудник не найден');
        }
    }, [employee, employeeLoading, employeeError]);

    const [updateEmployee, { isLoading, isSuccess, isError }] = useUpdateEmployeeMutation();

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            successMessage('Данные обновлены!');
        } else if (isError) {
            errorMessage('Что-то пошло не так...');
        }
    }, [isSuccess, isError]);

    const handleOk = async () => {
        updateEmployee({
            id,
            body: form.getFieldsValue(),
        });
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const [deleteEmployee, { isLoading: deleteLoading }] = useDeleteEmployeeMutation();

    const handleDelete = () => {
        deleteEmployee(id).then((res: any) => {
            if (res?.data?.status === 'ok') {
                setOpen(false);
                successMessage('Сотрудник удален!');
            } else {
                errorMessage('Что-то пошло не так...');
            }
        });
    };

    const availableCategories = CategoryList;
    //.slice(1);
    const rolesAreDisabled = availableCategories?.length === 1;

    if (open)
        return (
            <Modal
                title={'Редактировать сотрудника'}
                open={open}
                onCancel={handleCancel}
                footer={[]}
            >
                {employeeLoading ? (
                    <Loading />
                ) : (
                    <EmployeeForm
                        form={form}
                        rolesAreDisabled={rolesAreDisabled}
                        handleOk={handleOk}
                        footer={[
                            <ModalFooter
                                handleOk={handleOk}
                                handleCancel={handleCancel}
                                loading={isLoading}
                                deleteButton={true}
                                handleDelete={handleDelete}
                                deleteLoading={deleteLoading}
                            />,
                        ]}
                    />
                )}
            </Modal>
        );
};

export default EmployeeUpdateModal;
