import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { appConfig } from '@config/config';

const TAG = 'Employees';

export const employeesApi = createApi({
    reducerPath: 'employees',
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
        getEmployeesAll: builder.query({
            query: () => `/api/employee`,
            providesTags: [TAG],
        }),

        getEmployeeById: builder.mutation({
            query: id => `/api/employee/${id}`,
            invalidatesTags: [TAG],
        }),

        getEmployeesWithPagination: builder.query({
            query: payload => ({
                url: '/api/employee/list',
                method: 'POST',
                body: payload,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            providesTags: [TAG],
        }),
        deleteEmployee: builder.mutation({
            query: id => ({
                url: `/api/employee/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TAG],
        }),
        updateEmployee: builder.mutation({
            query: payload => ({
                url: `/api/employee/${payload.id}`,
                method: 'PATCH',
                body: payload.body,
            }),
            invalidatesTags: [TAG],
        }),
        createEmployee: builder.mutation({
            query: payload => ({
                url: `/api/employee`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: [TAG],
        }),
    }),
});

export const {
    useGetEmployeeByIdMutation,
    useGetEmployeesWithPaginationQuery,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
    useCreateEmployeeMutation,
} = employeesApi;
