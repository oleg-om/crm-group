import Customer from "@models/customer.model";
import crudController from "@services/default.controller";

const defaultController = crudController(Customer)

const create = defaultController.create
const update = defaultController.update
const remove = defaultController.remove
const getOne = defaultController.getOne
const getAll = defaultController.getAll


const customerController = {
    create,
    update,
    remove,
    getOne,
    getAll
};

export default customerController;
