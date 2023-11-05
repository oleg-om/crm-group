import { createSlice } from '@reduxjs/toolkit';
import { EMessage } from '@enums/message';

interface InitialStateProps {
    type: EMessage;
    content: string;
}

const initialState: InitialStateProps = {
    type: EMessage.SUCCESS,
    content: '',
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        newMessage: (state, action) => {
            return action.payload;
        },
    },
});

export const { newMessage } = messageSlice.actions;

export default messageSlice.reducer;
