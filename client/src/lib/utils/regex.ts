export const regexOnlyNumbers = new RegExp(/^\d+$/);
export const regexValidatePassword = new RegExp(
    /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
);
export const regexEmail = new RegExp(/^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
