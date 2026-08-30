import { createBrowserRouter } from "react-router";
import Layout from "./layout/Layout";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/Dashboard";
import Protected from "../features/auth/components/Protected";
import Home from "../features/home/pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "dashboard",
                element: (
                    <Protected>
                        <Dashboard />
                    </Protected>
                ),
            },
        ],
    },
]);

export default router;
