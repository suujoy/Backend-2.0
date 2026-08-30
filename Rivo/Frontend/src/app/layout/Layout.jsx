import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router";
import { useTheme } from "../theme/hooks/useTheme";
import { useAuthInit } from "../../features/auth/hooks/useAuthInit";

const Layout = () => {
    useAuthInit();
    const { mode } = useTheme();
    const location = useLocation();

    useEffect(() => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    const isAuthPage = ["/login", "/register"].includes(location.pathname);

    return (
        <div className="flex flex-col min-h-screen bg-background text-on-background transition-colors duration-300">
            <Navbar />
            <main className="flex-1 flex flex-col min-h-0">
                <Outlet />
            </main>
            {!isAuthPage && <Footer />}
        </div>
    );
};

export default Layout;
