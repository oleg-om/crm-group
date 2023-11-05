import {Express, Request, Response} from "express";
import userRoutes from "@routes/user.routes";
import employeeRoutes from "@routes/employee.routes";
import customerRoutes from "@routes/customer.routes";
import authRoutes from "@routes/auth.routes";
export function initRoutes(app: Express) {
    app.get("/", (req: Request, res: Response) => {
        res.json({message: "Welcome to application."});
    });
    userRoutes(app)
    employeeRoutes(app)
    customerRoutes(app)
    authRoutes(app)


}
