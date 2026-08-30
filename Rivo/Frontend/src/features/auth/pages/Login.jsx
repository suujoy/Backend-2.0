import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";

const Login = () => {
    const { handleLogin, loading, error: authError } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        identifier: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.identifier.trim()) {
            newErrors.identifier = "Email or Username is required";
        }
        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await handleLogin({
                identifier: formData.identifier,
                password: formData.password,
            });
            setSuccessMessage("Login successful! Welcome back.");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="flex h-[calc(100vh-73px)] w-full overflow-hidden bg-surface-container-lowest">
            {/* Left Side: Stunning Hero Image (Responsive: Hidden on small screens, visible on lg screens) */}
            <div className="relative hidden w-1/2 lg:block bg-surface-dim">
                <img
                    alt="Fresh vegetables on a rustic table"
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/vegetables-hero.jpg"
                />
                {/* Dark overlay with soft warm/amber gradient tint for premium grocery feel */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 xl:p-12 text-left z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-fixed/90 text-on-primary-fixed mb-3 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-sm">
                            local_shipping
                        </span>
                        Fast Delivery & Quality Guaranteed
                    </span>
                    <h1 className="text-3xl xl:text-4xl font-headline font-black text-white leading-tight drop-shadow-md">
                        Welcome Back to <br />
                        Rivo Grocery
                    </h1>
                    <p className="mt-2 text-white/80 font-body text-sm max-w-sm drop-shadow-sm">
                        Login to access your personalized dashboard, track
                        orders, and grab exclusive member discounts.
                    </p>
                </div>
            </div>

            {/* Right Side: Clean Form Container (No scroll, perfectly centered) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-surface-container-lowest">
                <div className="w-full max-w-md space-y-5 py-2">
                    {/* Header */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-headline font-black text-on-surface tracking-tight">
                            Sign In
                        </h2>
                        <p className="mt-1 text-on-surface-variant font-body text-xs">
                            Access your Rivo account for fresh grocery shopping
                        </p>
                    </div>

                    {/* Success Message Banner */}
                    {successMessage && (
                        <div className="p-3 rounded-xl bg-secondary-container/30 text-secondary border border-secondary/20 font-body text-xs flex items-center gap-2 animate-pulse">
                            <span className="material-symbols-outlined text-base">
                                check_circle
                            </span>
                            {successMessage}
                        </div>
                    )}

                    {/* General Auth Error Alert */}
                    {authError && (
                        <div className="p-3 rounded-xl bg-error-container/20 text-error border border-error/20 font-body text-xs flex items-center gap-2">
                            <span className="material-symbols-outlined text-base font-bold">
                                warning
                            </span>
                            {authError}
                        </div>
                    )}

                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        noValidate
                    >
                        {/* Identifier Field */}
                        <Input
                            type="text"
                            name="identifier"
                            id="identifier"
                            placeholder="Email or Username"
                            icon="mail"
                            value={formData.identifier}
                            onChange={handleChange}
                            error={errors.identifier}
                            disabled={loading}
                        />

                        {/* Password Field */}
                        <div className="space-y-1">
                            <div className="flex justify-end items-center px-1">
                                <a
                                    href="#forgot"
                                    className="text-xs font-semibold text-primary-fixed hover:text-primary-fixed-dim transition-colors"
                                >
                                    Forgot Password?
                                </a>
                            </div>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                icon="lock"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                disabled={loading}
                                rightElement={
                                    <button
                                        type="button"
                                        tabIndex="-1"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="text-on-surface-variant/75 hover:text-primary-fixed focus:outline-none transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {showPassword
                                                ? "visibility_off"
                                                : "visibility"}
                                        </span>
                                    </button>
                                }
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            id="login-submit-btn"
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-headline font-bold text-on-primary-fixed bg-primary-fixed hover:bg-primary-fixed-dim focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-fixed disabled:opacity-50 transition-all duration-300 transform active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-on-primary-fixed border-t-transparent" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                        {/* google login */}

                        <a href="/api/auth/google">continue with google</a>
                    </form>

                    {/* Navigation Link to Register */}
                    <div className="text-center pt-1">
                        <p className="text-xs text-on-surface-variant font-body">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-bold text-primary-fixed hover:text-primary-fixed-dim transition-colors"
                            >
                                Register Now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
