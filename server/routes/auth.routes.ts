import {Express} from "express";
import verifySignUp from "@middleware/verifySignUp";
import authController from "@controllers/auth.controller";

export default function authRoutes (app: Express) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateEmail,
            verifySignUp.checkRolesExisted
        ],
        authController.signup
    );

    app.post("/api/auth/signin", authController.signin);
    app.post("/api/auth/send-confirmation", authController.verify);
    app.get("/api/auth/confirmation/:token", authController.getConfirmation);
};
