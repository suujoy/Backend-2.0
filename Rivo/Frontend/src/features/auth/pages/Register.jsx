import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";

const PasswordRequirement = ({ valid, text }) => {
    return (
        <div
            className={`flex items-center gap-1 ${
                valid
                    ? "text-secondary"
                    : "text-on-surface-variant/60"
            }`}
        >
            <span className="material-symbols-outlined text-sm">
                {valid ? "check_circle" : "radio_button_unchecked"}
            </span>

            <span>{text}</span>
        </div>
    );
};


const Register = () => {
    const { handleRegister, loading, error: authError } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        password: "",
        confirmPassword: "",
        isSeller: false,
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear field-specific error when user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.contact.trim()) {
            newErrors.contact = "Contact number is required";
        } else if (!/^\+?[\d\s-]{10,15}$/.test(formData.contact.trim())) {
            newErrors.contact =
                "Please enter a valid contact number (10-15 digits)";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/[A-Z]/.test(formData.password)) {
            newErrors.password = "Password must contain a capital letter";
        } else if (!/[0-9]/.test(formData.password)) {
            newErrors.password = "Password must contain a number";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
            newErrors.password = "Password must contain a special character";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await handleRegister({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                contact: formData.contact,
                isSeller: formData.isSeller,
            });
            setSuccessMessage("Account created successfully! Redirecting...");
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            console.error("Registration failed:", err);
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
                            workspace_premium
                        </span>
                        100% Organic & Fresh
                    </span>
                    <h1 className="text-3xl xl:text-4xl font-headline font-black text-white leading-tight drop-shadow-md">
                        Fresh from Farm <br />
                        to Your Table
                    </h1>
                    <p className="mt-2 text-white/80 font-body text-sm max-w-sm drop-shadow-sm">
                        Experience the premium taste of naturally grown
                        ingredients delivered directly to your doorstep.
                    </p>
                </div>
            </div>

            {/* Right Side: Clean Form Container (No scroll, perfectly centered) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-surface-container-lowest">
                <div className="w-full max-w-md space-y-5 py-2">
                    {/* Header */}
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-headline font-black text-on-surface tracking-tight">
                            Create Account
                        </h2>
                        <p className="mt-1 text-on-surface-variant font-body text-xs">
                            Join Rivo for fresh grocery delivery and premium
                            experience
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

                    {/* Registration Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3.5"
                        noValidate
                    >
                        {/* Name Field */}
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            icon="person"
                            value={formData.name}
                            onChange={handleChange}
                            error={errors.name}
                            disabled={loading}
                        />

                        {/* Email Field */}
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            icon="mail"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            disabled={loading}
                        />

                        {/* Contact Field */}
                        <Input
                            type="tel"
                            name="contact"
                            id="contact"
                            placeholder="Contact Number"
                            icon="phone"
                            value={formData.contact}
                            onChange={handleChange}
                            error={errors.contact}
                            disabled={loading}
                        />

                        {/* Password Field */}
                        <div className="space-y-2">
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

                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 px-1 text-[11px]">
                                    <PasswordRequirement
                                        valid={formData.password.length >= 6}
                                        text="6+ characters"
                                    />

                                    <PasswordRequirement
                                        valid={/[A-Z]/.test(formData.password)}
                                        text="Capital letter"
                                    />

                                    <PasswordRequirement
                                        valid={/[0-9]/.test(formData.password)}
                                        text="Number"
                                    />

                                    <PasswordRequirement
                                        valid={/[!@#$%^&*(),.?":{}|<>]/.test(
                                            formData.password,
                                        )}
                                        text="Special character"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            icon="lock"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={errors.confirmPassword}
                            disabled={loading}
                            rightElement={
                                <button
                                    type="button"
                                    tabIndex="-1"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword,
                                        )
                                    }
                                    className="text-on-surface-variant/75 hover:text-primary-fixed focus:outline-none transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {showConfirmPassword
                                            ? "visibility_off"
                                            : "visibility"}
                                    </span>
                                </button>
                            }
                        />

                        {/* isSeller Checkbox */}
                        <div className="flex items-start py-1">
                            <div className="flex items-center h-5">
                                <input
                                    id="isSeller"
                                    name="isSeller"
                                    type="checkbox"
                                    checked={formData.isSeller}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="h-4.5 w-4.5 rounded border-outline-variant/60 bg-surface-bright text-primary-fixed focus:ring-primary-fixed cursor-pointer transition-all duration-200"
                                />
                            </div>
                            <div className="ml-2.5 text-xs">
                                <label
                                    htmlFor="isSeller"
                                    className="font-semibold text-on-surface select-none cursor-pointer hover:text-primary-fixed transition-colors duration-200"
                                >
                                    I want to sell on Rivo
                                </label>
                                <p className="text-[11px] text-on-surface-variant/70 mt-0.5 leading-tight">
                                    Register as a merchant to sell produce.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            id="register-submit-btn"
                            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-headline font-bold text-on-primary-fixed bg-primary-fixed hover:bg-primary-fixed-dim focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-fixed disabled:opacity-50 transition-all duration-300 transform active:scale-[0.98]"
                        >
                            {loading ? (
                                <>
                                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-on-primary-fixed border-t-transparent" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Navigation Link to Login */}
                    <div className="text-center pt-1">
                        <p className="text-xs text-on-surface-variant font-body">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-bold text-primary-fixed hover:text-primary-fixed-dim transition-colors"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
