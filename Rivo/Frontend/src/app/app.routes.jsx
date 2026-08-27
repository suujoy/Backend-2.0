import { createBrowserRouter } from "react-router";
import Layout from "./layout/Layout";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <div>Home</div>,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
]);

export default router;
