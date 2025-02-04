import React from 'react'
import Browse from './Browse';
import Login from './auth/Login';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/browse",
            element: <Browse />
        }
        ]);

    return (
    <div>
        <RouterProvider router={appRouter} />
    </div>
  )
}

export default Body;