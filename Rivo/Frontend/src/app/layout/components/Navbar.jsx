import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { useTheme } from "../../theme/hooks/useTheme";

const Navbar = () => {
    const { mode, toggle } = useTheme();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About", path: "/about" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-sm transition-all duration-300 border-b border-outline-variant/20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Brand Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 group"
                    id="navbar-logo"
                >
                    <span className="material-symbols-outlined text-primary-fixed text-3xl transition-transform duration-300 group-hover:scale-110">
                        eco
                    </span>
                    <span className="text-2xl font-display font-extrabold tracking-tight text-on-surface">
                        Rivo
                    </span>
                </Link>

                {/* Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            id={`nav-link-${link.name.toLowerCase()}`}
                            className={`font-body tracking-wide font-medium transition-all duration-300 active:scale-95 cursor-pointer ${
                                isActive(link.path)
                                    ? "text-primary-fixed border-b-2 border-primary-fixed pb-1"
                                    : "text-on-surface-variant hover:text-primary-fixed"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggle}
                        aria-label="Toggle Theme"
                        id="theme-toggle-btn"
                        className="p-2.5 text-on-surface-variant hover:text-primary-fixed hover:bg-surface-container-low rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined">
                            {mode === "light" ? "dark_mode" : "light_mode"}
                        </span>
                    </button>

                    {/* Login */}
                    <Link
                        to="/login"
                        id="nav-login-btn"
                        className="font-body font-medium text-on-surface-variant hover:text-primary-fixed transition-colors duration-300 active:scale-95"
                    >
                        Login
                    </Link>

                    {/* Register */}
                    <Link
                        to="/register"
                        id="nav-register-btn"
                        className="font-body font-semibold bg-primary-fixed text-on-primary-fixed px-6 py-2.5 rounded-xl hover:bg-primary-fixed-dim transition-colors duration-300 shadow-sm active:scale-95"
                    >
                        Register
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggle}
                        aria-label="Toggle Theme"
                        className="p-2 text-on-surface-variant hover:text-primary-fixed rounded-lg transition-all duration-300"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {mode === "light" ? "dark_mode" : "light_mode"}
                        </span>
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                        id="mobile-menu-btn"
                        className="p-2 text-on-surface hover:bg-surface-container-low rounded-lg transition-all duration-300 flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined">
                            {mobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-surface border-t border-outline-variant/20 animate-in">
                    <div className="px-6 py-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block font-body font-medium py-2 transition-colors duration-300 ${
                                    isActive(link.path)
                                        ? "text-primary-fixed"
                                        : "text-on-surface-variant hover:text-primary-fixed"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <hr className="border-outline-variant/30" />
                        <Link
                            to="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block font-body font-medium text-on-surface-variant hover:text-primary-fixed py-2 transition-colors duration-300"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block font-body font-semibold bg-primary-fixed text-on-primary-fixed px-6 py-2.5 rounded-xl text-center hover:bg-primary-fixed-dim transition-colors duration-300 shadow-sm"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;