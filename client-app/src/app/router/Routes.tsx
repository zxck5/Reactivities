import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import HomePage from '../../features/home/HomePage';
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityAddForm from "../../features/activities/form/ActivityAddForm";
import ActivityList from "../../features/activities/dashboard/ActivityList";
import ActivityEditForm from "../../features/activities/form/ActivityEditForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: 'activities',
                element: <ActivityDashboard />,
                children: [
                    { index: true, element: <ActivityList /> },
                    { path: 'create', element: <ActivityAddForm /> },
                    { path: ':id', element: <ActivityDetails /> },
                    { path: 'manage/:id', element: <ActivityEditForm /> }

                ]

            }
        ]
    }
]

export const router = createBrowserRouter(routes);