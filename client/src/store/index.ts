import { configureStore } from '@reduxjs/toolkit';
import messageReducer from '@store/slices/message.slice';
import themeReducer from '@store/slices/theme.slice';
import authReducer from '@store/slices/auth.slice';
import { authApi } from '@services/auth/authService';
import { employeesApi } from '@services/employeeApi';
import { customersApi } from '@services/customerApi';

const store = configureStore({
    reducer: {
        message: messageReducer,
        theme: themeReducer,
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [employeesApi.reducerPath]: employeesApi.reducer,
        [customersApi.reducerPath]: customersApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(employeesApi.middleware)
            .concat(customersApi.middleware),
    devTools: true,
});

export type IRootState = ReturnType<typeof store.getState>;

export default store;
