import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./components/home";
import Map from "./components/map";
import './index.css';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <p>Not Found</p>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/map",
                element: <Map />,
            },

        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);