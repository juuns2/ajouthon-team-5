// Imports
// ========================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';

import App from './App';
import MessageInput from './MessageInput';
import './index.css';
import RootLayout from './layouts/RootLayout';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import RootProvider from './providers';

// Router
// ========================================================
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <App />,
                children: [
                    {
                        path: '/bubble/create',
                        element: <MessageInput />,
                    },
                ],
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
]);

// Render
// ========================================================
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RootProvider>
            <RouterProvider router={router} />
        </RootProvider>
    </React.StrictMode>,
);
