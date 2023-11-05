import cors from "cors";
import {Express} from "express";

export const initCORS = (app: Express) => {
    app.use(
        cors({
            origin: [`https://${process.env.HOST}`, `http://${process.env.HOST}`, `${process.env.HOST}`, 'http://localhost:8080'],
            methods: ["GET", "POST", "PUT", "OPTIONS", "PATCH", "DELETE"],
            credentials: true, // enable set cookie
        })
    );
}
