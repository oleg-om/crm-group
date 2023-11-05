import {Express} from "express";

import authJwt from "@middleware/authJwt";
import controller from "@controllers/employee.controller";

export default function employeeRoutes(app: Express) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/employee",
        [authJwt.verifyToken],
        controller.create
    );

    app.get(
        "/api/employee/:id",
        [authJwt.verifyToken],
        controller.getOne
    );

    app.patch(
        "/api/employee/:id",
        [authJwt.verifyToken],
        controller.update
    );

    app.delete(
        "/api/employee/:id",
        [authJwt.verifyToken],
        controller.remove
    );

    app.post(
        "/api/employee/list",
        [authJwt.verifyToken],
        controller.getAll
    );

};
