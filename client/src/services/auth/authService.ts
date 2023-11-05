// app/services/auth/authService.js
// React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { appConfig } from '@config/config';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        // base url of backend API
        baseUrl: appConfig.BACKEND_URL,
        // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
        prepareHeaders: (headers, { getState }: any) => {
            const token = getState().auth.accessToken;
            if (token) {
                // include token in req header
                headers.set('x-access-token', `${token}`);
                return headers;
            }
        },
    }),
    endpoints: builder => ({
        getUserDetails: builder.query({
            query: () => ({
                url: 'api/user/profile',
                method: 'GET',
            }),
        }),
    }),
});

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = authApi;
