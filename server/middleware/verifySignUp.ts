import {NextFunction, Request, Response} from "express";
import {ERoles} from "@enums/roles.enum";
import User from "@models/user.model";

export const ROLES_LIST = [ERoles.WASH, ERoles.TYRE_SERVICE, ERoles.USER]


const checkDuplicateEmail = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({
        email: req.body.email
    }).exec().then((findUser) => {
        if (findUser) {
            res.status(400).send({message: "Пользователь с таким эмейлом уже существует"});
            return;
        }

        next();
    }).catch((findError: Error) => {
        res.status(500).send({message: findError});
    })
};

const checkRolesExisted = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES_LIST.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateEmail,
    checkRolesExisted
};

export default verifySignUp;
