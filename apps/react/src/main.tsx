// Imports
// ========================================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';
import RootLayout from './layouts/RootLayout';
import RootProvider from './providers';

// Router
// ========================================================
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: 'about',
                element: <div>About</div>,
            },
            {
                path: 'login',
                element: <div>Login</div>,
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
