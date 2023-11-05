import {NextFunction, Response} from "express";
import jwt from 'jsonwebtoken'
import Role, {RoleDocument} from "@models/role.model";
import User from "@models/user.model";
import config from "@config/auth.config";
import {ERoles} from "@enums/roles.enum";
import {Error} from "mongoose";
import {IUserRequest} from "@interfaces/user.request.i";

const verifyToken = (req: IUserRequest, res: Response, next: NextFunction) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({message: "No token provided!"});
    }

    jwt.verify(token as string,
        config.secret,
        (err, decoded ) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            if (decoded) {
                req.userId = decoded["id"];
            }

            next();
        });
};

const isWashAccess = (req: IUserRequest, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec().then((user) => {
        if (user) {
            Role.find(
                {
                    _id: {$in: user.roles}
                },
                (err: Error, roles: RoleDocument[]) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }

                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name === ERoles.WASH) {
                            next();
                            return;
                        }
                    }

                    res.status(403).send({message: "Require Wash Role!"});
                    return;
                }
            );
        }
    }).catch((err: Error) => {
        res.status(500).send({message: err});
    });
};

const isTireServiceAccess = (req: IUserRequest, res: Response, next: NextFunction) => {
    User.findById(req.userId).exec().then((user) => {
        if (user) {
            Role.find(
                {
                    _id: {$in: user.roles}
                },
                (err: Error, roles: RoleDocument[]) => {
                    if (err) {
                        res.status(500).send({message: err});
                        return;
                    }

                    for (let i = 0; i < roles.length; i++) {
                        if (roles[i].name === ERoles.TYRE_SERVICE) {
                            next();
                            return;
                        }
                    }

                    res.status(403).send({message: "Require Tire service Role!"});
                    return;
                }
            );
        }

    }).catch((err: Error) => {
        res.status(500).send({message: err});
    });
};

const authJwt = {
    verifyToken,
    isWashAccess,
    isTireServiceAccess
};


export default authJwt
