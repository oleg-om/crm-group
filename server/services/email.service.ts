import nodemailer  from "nodemailer";
import path from "path";
import hbs, {NodemailerExpressHandlebarsOptions} from 'nodemailer-express-handlebars'


const {HOST} = process.env


type TContext = {
    [key: string]: string | undefined
}
interface MailInterface {
    from?: string;
    to?: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    template?: string;
    subject?: string;
    text?: string;
    html?: string;
    context?: TContext;
}

let transporter = nodemailer.createTransport({
    service: 'yandex',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    }
});

// point to the template folder
const handlebarOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

const mailOptions: MailInterface = {
    from: '"My Company" <my@company.com>', // sender address
    template: "email", // the name of the template file, i.e., email.handlebars
    to: 'olegoriginal@yandex.ru',
    subject: `Welcome to My Company, oleg`,
    context: {
        name: 'artem',
        company: 'my company'
    },
};

export const createResetPasswordEmail = (
        receiverEmail: string,
    resetTokenValue: string
): MailInterface => {
    return {
        ...mailOptions,
        to: receiverEmail,
        subject: 'Reset password link',
        context: {
            host: HOST,
            resetTokenValue,
        }

    };
};

export const createResetConfirmationEmail = (receiverEmail: string): MailInterface  => {
    return {
        ...mailOptions,
        to: receiverEmail,
        subject: 'Reset password link',
        context: {
            receiverEmail,
        }

    };
};

export const createVerificationEmail = (
        receiverEmail: string,
    verificationTokenValue: string
): MailInterface => {
    const subject= 'Email Verification'
    return {
        ...mailOptions,
        to: receiverEmail,
        subject,
        context: {
            receiverEmail,
            subject,
            host: HOST,
            verificationTokenValue
        }

    };
};

export const sendEmail = async (mailOptions: MailInterface) =>    await transporter.sendMail(mailOptions);

export default {
    createResetPasswordEmail,
    createResetConfirmationEmail,
    createVerificationEmail,
    sendEmail,
};
