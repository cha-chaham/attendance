import React, {useState, useEffect} from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from '@/pages/App'
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import { setAxiosConfig } from '@/utils/axiosWithConfig';

export default function Router() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

    useEffect(() => {
      setIsAuth(localStorage.getItem('isAuth'))
      setAxiosConfig("", import.meta.env.VITE_BASE_URL);
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
