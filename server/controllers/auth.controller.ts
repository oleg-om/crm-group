import { Request, Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import config from "@config/auth.config";
import User from "@models/user.model";
import Role from "@models/role.model";
import EmailService from "@services/email.service";
import { ERoles } from "@enums/roles.enum";

export const signup = (req: Request, res: Response) => {

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then((user) => {

        if (req.body.roles) {

            Role.find({
                name: {$in: req.body.roles}
            }).then((roles )=> {
                if (roles)
                user.roles = roles.map(role => role._id);
                user.save().then(() => {
                    res.send({message: "User was registered successfully!"});
                }).catch((err) => {
                    res.status(500).send({message: err});
                })
            }).catch((err)=> {
                res.status(500).send({message: err});
            })
        } else {
            Role.findOne({ name: ERoles.USER }).then((role)=> {
                if (role)
                user.roles = [role._id];
                user.save().then(() => {
                    res.send({message: "User was registered successfully!"});
                }).catch((err: Error) => {
                    res.status(500).send({message: 'Cant create user'+ err});
                })
            }).catch((er)=> {
                res.status(500).send({message: er});
            })
        }
    }).catch((err: Error) => {
        res.status(500).send({message: err + 'wtf'});
    })
};

export const signin = (req: Request, res: Response) => {
    User.findOne({
        email: req.body.email
    })
        .populate("roles", "-__v")
        .exec().then((user) => {
        if (!user) {
            return res.status(404).send({message: "User Not found."});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        const token = jwt.sign({ id: user.id },
            config.secret,
            {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: config.jwtExpiration,
            });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
            // @ts-ignore
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    }).catch((err: Error) => {
        res.status(500).send({message: err});
    });
};
export const verify = async (req: Request, res: Response) => {
    try {
        let token = req.headers["x-access-token"];
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.status(404).send({ message: "No user found with this email address." });
        }
        if (user.isVerified) {
            return res.status(400).send({
                message: "This account has already been verified. Please log in.",
            });
        }

        try {
            const email = EmailService.createVerificationEmail(user.email, token as string);
            await EmailService.sendEmail(email);

            return res.status(200).send({ message: `A verification email has been sent.` });
        } catch (error) {
            return res.status(503).send({
                message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
            });
        }
    } catch (error) {
        return res.status(500).send("An unexpected error occurred");
    }
};

export const getConfirmation = async (req: Request, res: Response) => {
    try {
        const token = req.params.token
        let userId

        await jwt.verify(token as string,
            config.secret,
            (err, decoded ) => {
                if (err) {
                    return res.status(401).send({
                        message: "Unable to find token...",
                    });
                }
                if (decoded) {
                     userId = decoded["id"];
                }

            });

        const user = await User.findOne({
            _id: userId
        })

        if (!user) {
            return res.status(404).send({ message: `We were unable to find a user for this token.` });
        }

        if (user.isVerified) {
            return res
                .status(400)
                .send({ message: "This user has already been verified. Please log in." });
        }


            await User.findOneAndUpdate(
                { email: req.body.email },
                { isVerified: true },
                {
                    new: true
                }
            ).then((data) => {
                if (data) {
                    return res.status(200).send({ message: "The account has been verified. Please log in." });
                } else {
                    res.status(404).json({
                        status: 'fail',
                        message: 'Not found'
                    })
                }
            }).catch((err: Error) => {
                res.status(500).send({message: err});
            })

    } catch (error) {
        return res.status(500).send("An unexpected error occurred");
    }
};
//
// export const loginForgot = async (req: Request, res: Response) => {
//     try {
//         const user = await User.findOne({
//             email: req.body.email
//         })
//
//         if (!user) return res.status(404).send({ message: "No user found with this email address." });
//
//         await UserService.saveUser(user);
//         await TokenService.saveToken(resetToken);
//
//         try {
//             const email = EmailService.createResetPasswordEmail(user.email, resetToken.token);
//             await EmailService.sendEmail(email);
//
//             return res
//                 .status(200)
//                 .send({ message: `A reset passowrd email has been sent to ${user.email}` });
//         } catch (error) {
//             LoggerService.log.error(error);
//
//             return res.status(503).send({
//                 message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
//             });
//         }
//     } catch (error) {
//         LoggerService.log.error(error);
//
//         return res.status(500).send({ message: "An unexpected error occurred" });
//     }
// };

const authController = {
    signup, signin, verify, getConfirmation
}

export default authController




