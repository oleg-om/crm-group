import { regexOnlyNumbers } from '@lib/utils/regex';

export const numberValidator = async (rule: any, value: string) => {
    const isOk = regexOnlyNumbers.test(value);

    if (!isOk && value) {
        throw new Error('Something wrong!');
    } else {
        return false;
    }
};
