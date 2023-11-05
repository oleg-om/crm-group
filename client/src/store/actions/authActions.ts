import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUserDto } from '@models/iUserDto';
import { appConfig } from '@config/config';

export const registerUser: any = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }: IUserDto, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            await axios.post(
                `${appConfig.BACKEND_URL}/api/auth/signup`,
                { username, email, password },
                config,
            );
        } catch (error: any) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const userLogin: any = createAsyncThunk(
    'auth/login',
    async ({ email, password }: IUserDto, { rejectWithValue }) => {
        try {
            // configure header's Content-Type as JSON
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.post(
                `${appConfig.BACKEND_URL}/api/auth/signin`,
                { email, password },
                config,
            );
            // store user's token in local storage
            localStorage.setItem('accessToken', data.accessToken);
            return data;
        } catch (error: any) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);
