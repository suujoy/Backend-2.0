import { config } from "../config/config.js";

const handleError = (err, req, res, next) => {
    const response = {
        message: err.message || "Something went wrong",
    };

    if (config.NODE_ENVIRONMENT === "development") {
        response.stack = err.stack;
    }

    res.status(err.statusCode || 500).json(response);
};

export default handleError;
