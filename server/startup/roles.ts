import { Error } from "mongoose";
import Role from "@models/role.model";
import {ERoles} from "@enums/roles.enum";

export const initRoles = () => {
    Role.estimatedDocumentCount().then((count: number) => {
        if (count === 0) {
            new Role({
                name: ERoles.WASH
            }).save().then(() => {
                console.log("added 'wash' to roles collection")
            }).catch((err: Error) => {
                console.log("error", err);
            })

            new Role({
                name: ERoles.TYRE_SERVICE
            }).save().then(() => {
                console.log("added 'tire-service' to roles collection")
            }).catch((err: Error) => {
                console.log("error", err);
            })

            new Role({
                name: ERoles.USER
            }).save().then(() => {
                console.log("added 'user' to roles collection")
            }).catch((err: Error) => {
                console.log("error", err);
            })
        }
    })
}
