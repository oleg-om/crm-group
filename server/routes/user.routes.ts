import {Express} from "express";
import authJwt from "@middleware/authJwt";
import controller from "@controllers/user.controller";

export default function userRoutes (app: Express) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess);

    app.get("/api/user/profile", [authJwt.verifyToken], controller.getUser);

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isTireServiceAccess],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isWashAccess],
        controller.adminBoard
    );
};
