import React from "react";

const Input = ({
    type = "text",
    name,
    placeholder,
    value,
    onChange,
    icon,
    error,
    rightElement,
    id,
    ...props
}) => {
    return (
        <div className="relative">
            {/* Left Icon */}
            {icon && (
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline-variant text-xl">
                        {icon}
                    </span>
                </div>
            )}

            {/* Input Field */}
            <input
                type={type}
                name={name}
                id={id || name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`block w-full ${icon ? "pl-12" : "pl-4"} ${
                    rightElement ? "pr-12" : "pr-4"
                } py-3.5 rounded-xl border bg-surface-bright text-on-surface placeholder-on-surface-variant/60 font-body text-sm transition-all duration-200 shadow-sm ${
                    error
                        ? "border-error focus:border-error focus:ring-error"
                        : "border-outline-variant/50 hover:border-outline focus:border-primary-fixed focus:ring-primary-fixed"
                }`}
                {...props}
            />

            {/* Right Element (e.g., password toggle) */}
            {rightElement && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    {rightElement}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <p className="mt-1.5 text-xs text-error font-body">{error}</p>
            )}
        </div>
    );
};

export default Input;
