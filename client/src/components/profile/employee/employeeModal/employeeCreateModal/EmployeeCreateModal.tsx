import { useCreateEmployeeMutation } from '@services/employeeApi';
import React, { useEffect } from 'react';
import { Form, Modal } from 'antd';
import ModalFooter from '@components/profile/ui/modalFooter/ModalFooter';
import EmployeeForm from '@components/profile/employee/employeeModal/employeeForm/EmployeeForm';
import { CategoryList } from '@lists/Category.list';
import { useMessage } from '@hooks/useMessage';

const EmployeeCreateModal: React.FC<{
    open: boolean;
    setOpen: Function;
}> = ({ open, setOpen }) => {
    const [form] = Form.useForm();
    const [createEmployee, { isLoading, isSuccess, isError }] = useCreateEmployeeMutation();
    const { errorMessage, successMessage } = useMessage();

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            form.resetFields();
            successMessage('Новый сотрудник создан!');
        } else if (isError) {
            errorMessage('Что-то пошло не так...');
        }
    }, [isSuccess, isError]);

    const handleOk = async () => {
        form.validateFields().then(e => {
            console.log(e);
        });
        createEmployee(form.getFieldsValue());
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const availableCategories = CategoryList.slice(1);
    const rolesAreDisabled = availableCategories?.length === 1;

    if (open)
        return (
            <Modal title={'Новый сотрудник'} open={open} onCancel={handleCancel} footer={[]}>
                <EmployeeForm
                    form={form}
                    rolesAreDisabled={rolesAreDisabled}
                    handleOk={handleOk}
                    footer={[
                        <ModalFooter
                            handleCancel={handleCancel}
                            loading={isLoading}
                            deleteButton={false}
                            handleOk={handleOk}
                        />,
                    ]}
                />
            </Modal>
        );
};

export default EmployeeCreateModal;
