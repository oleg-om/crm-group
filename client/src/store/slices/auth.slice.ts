import { createSlice } from '@reduxjs/toolkit';
import { registerUser, userLogin } from '../actions/authActions';

// initialize accessToken from local storage
const accessToken = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null;

export interface IUser {
    username: string;
    email: string;
    roles: string[];
    password: string;
}
interface IUserState {
    loading: boolean;
    userInfo: IUser | null;
    accessToken: string | null;
    error: any;
    success: boolean;
}

const initialState: IUserState = {
    loading: false,
    userInfo: null, // for user object
    accessToken, // for storing the JWT
    error: null,
    success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            localStorage.clear();
            state.userInfo = null;
            state.accessToken = null;
        },
        setCredentials: (state, { payload }) => {
            state.userInfo = payload;
            state.loading = false;
        },
    },
    extraReducers: {
        // login reducer
        [userLogin.pending]: state => {
            state.loading = true;
            state.error = null;
        },
        [userLogin.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.userInfo = payload;
            state.accessToken = payload.accessToken;
        },
        [userLogin.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        // register reducer
        [registerUser.pending]: state => {
            state.loading = true;
            state.error = null;
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.success = true; // registration successful
        },
        [registerUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
