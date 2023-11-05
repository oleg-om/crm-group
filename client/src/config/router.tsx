import { createBrowserRouter, RouteObject } from 'react-router-dom';
import List from '@components/list/List';
import Service from '@components/service/Service';
import DashboardLayout from '@layouts/dashboardLayout/DashboardLayout';
import { ERoutes } from '@enums/routes';
import ServiceLayout from '@layouts/serviceLayout/ServiceLayout';
import MainLayout from '@layouts/mainLayout/MainLayout';
import Login from '@components/auth/login/Login';
import UnauthorizedLayout from '@layouts/unauthorizedLayout/UnauthorizedLayout';
import Register from '@components/auth/register/Register';
import AdminLayout from '@layouts/adminLayout/AdminLayout';
import NotFound from '@components/notFound/NotFound';
import Profile from '@components/profile/profile/Profile';
import Employee from '@components/profile/employee/employee/Employee';
import Customer from '@components/profile/customer/customer/Customer';

const routes: RouteObject[] = [
    {
        path: ERoutes.Main,
        element: <MainLayout />,
        children: [
            {
                path: ERoutes.Main,
                element: <AdminLayout />,
                children: [
                    {
                        path: ERoutes.Main,
                        element: <DashboardLayout />,
                        children: [
                            { path: ERoutes.Wash, element: <List /> },
                            {
                                path: ERoutes.Profile,
                                element: <Profile />,
                                children: [
                                    {
                                        path: ERoutes.Employee,
                                        element: <Employee />,
                                    },
                                    {
                                        path: ERoutes.Customers,
                                        element: <Customer />,
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: ERoutes.Wash,
                        element: <ServiceLayout />,
                        children: [
                            {
                                path: ERoutes.NewOrder,
                                element: <Service />,
                            },
                        ],
                    },
                ],
            },
            {
                path: ERoutes.Auth,
                element: <UnauthorizedLayout />,
                children: [
                    {
                        path: ERoutes.Login,
                        element: <Login />,
                    },
                    {
                        path: ERoutes.Register,
                        element: <Register />,
                    },
                ],
            },
        ],
    },
    {
        path: '*',
        element: <UnauthorizedLayout />,
        children: [
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);
