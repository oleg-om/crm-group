import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { useEffect } from 'react';
import { newMessage } from '@store/slices/message.slice';
import { EMessage } from '@enums/message';

export const useMessage = () => {
    const storeMessage = useSelector((state: IRootState) => state.message);
    const { content, type } = storeMessage;
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();

    const messageApiOpen = () => {
        messageApi.open({
            type,
            content,
        });
    };

    const errorMessage = (content: string) => {
        return dispatch(
            newMessage({
                type: EMessage.ERROR,
                content,
            }),
        );
    };

    const successMessage = (content: string) => {
        return dispatch(
            newMessage({
                type: EMessage.SUCCESS,
                content,
            }),
        );
    };

    const warningMessage = (content: string) => {
        return dispatch(
            newMessage({
                type: EMessage.WARNING,
                content,
            }),
        );
    };

    useEffect(() => {
        if (storeMessage?.content) {
            messageApiOpen();
        }
    }, [storeMessage]);

    return { contextHolder, errorMessage, successMessage, warningMessage };
};
