import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layouts/Layout';
import Profile from '../Pages/Profile';
import { Settings } from 'lucide-react';
import Upgrade from '../Pages/Upgrade';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/profile" replace />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/upgrade',
                element: <Upgrade />
            }
        ]
    }
]);