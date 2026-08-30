import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const identifyUser = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required",
        });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
