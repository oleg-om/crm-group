import {Request, Response} from "express";
import User from "@models/user.model";
import {IUserRequest} from "@interfaces/user.request.i";

export const allAccess = (req: Request, res: Response) => {
    res.status(200).send("Public Content.");
};

export const userBoard = (req: Request, res: Response) => {
    console.log('rec', req)
    res.status(200).send("User Content.");
};

export const adminBoard = (req: Request, res: Response) => {
    res.status(200).send("Admin Content.");
};

export const moderatorBoard = (req: Request, res: Response) => {
    res.status(200).send("Moderator Content.");
};

export const getUser = (req: IUserRequest, res: Response) => {
    User.findById(req.userId).exec().then((user) => {
        res.status(200).send(user);
    }).catch((err) => {
        res.status(500).send({message: err});
    });
};

 const userController = {
    allAccess, userBoard, adminBoard, moderatorBoard, getUser
}

export default userController
