import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { appConfig } from '@config/config';

const TAG = 'Customers';

export const customersApi = createApi({
    reducerPath: 'customers',
    baseQuery: fetchBaseQuery({
        baseUrl: appConfig.BACKEND_URL,
        prepareHeaders: (headers, { getState }: any) => {
            const token = getState().auth.accessToken;
            if (token) {
                // include token in req header
                headers.set('x-access-token', `${token}`);
                return headers;
            }
        },
    }),
    tagTypes: [TAG],
    endpoints: builder => ({
        getCustomersAll: builder.query({
            query: () => `/api/customer`,
            providesTags: [TAG],
        }),

        getCustomerById: builder.mutation({
            query: id => `/api/customer/${id}`,
            invalidatesTags: [TAG],
        }),

        getCustomersWithPagination: builder.query({
            query: payload => ({
                url: '/api/customer/list',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            providesTags: [TAG],
        }),
        deleteCustomer: builder.mutation({
            query: id => ({
                url: `/api/customer/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TAG],
        }),
        updateCustomer: builder.mutation({
            query: payload => ({
                url: `/api/customer/${payload.id}`,
                method: 'PATCH',
                body: payload.body,
            }),
            invalidatesTags: [TAG],
        }),
        createCustomer: builder.mutation({
            query: payload => ({
                url: `/api/customer`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [TAG],
        }),
    }),
});

export const {
    useGetCustomerByIdMutation,
    useGetCustomersWithPaginationQuery,
    useDeleteCustomerMutation,
    useUpdateCustomerMutation,
    useCreateCustomerMutation,
} = customersApi;
