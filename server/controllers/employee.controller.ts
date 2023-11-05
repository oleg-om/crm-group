import crudController from "@services/default.controller";
import Employee from "@models/employee.model";

const defaultController = crudController(Employee)

const create = defaultController.create
const update = defaultController.update
const remove = defaultController.remove
const getOne = defaultController.getOne
const getAll = defaultController.getAll


const employeeController = {
    create,
    update,
    remove,
    getOne,
    getAll
};

export default employeeController;
