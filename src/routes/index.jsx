import React, {useState, useEffect} from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '@/pages/App'
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';

export default function Router() {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
      setIsAuth(localStorage.getItem('isAuth'))
    }, [])


    const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>
        },
        {
            path: "/dashboard",
            element: isAuth ? <Dashboard/> : <Navigate to="/login"/>
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "*",
            element: <div>404 Page Not Found</div>
        }
    ])

    return <RouterProvider router={router}/>
}
