import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import HomePage from '../../features/home/HomePage';
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityAddForm from "../../features/activities/form/ActivityAddForm";
import ActivityList from "../../features/activities/dashboard/ActivityList";
import ActivityEditForm from "../../features/activities/form/ActivityEditForm";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'errors', element: <TestErrors /> },
            { path: 'server-error', element: <ServerError /> },
            {
                path: 'activities',
                element: <ActivityDashboard />,
                children: [
                    { index: true, element: <ActivityList /> },
                    { path: ':id', element: <ActivityDetails /> },
                    { path: 'manage/:id', element: <ActivityEditForm /> },
                    { path: 'create', element: <ActivityAddForm /> },
                    { path: '*', element: <Navigate replace to='/not-found' /> }

                ]
            },
        ]
    },
    {
        path: '*', element: <Navigate replace to='/not-found' />
    }
]

export const router = createBrowserRouter(routes);