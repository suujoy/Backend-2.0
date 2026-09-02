import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

const sendTokenResponse = (user, message, res, statusCode) => {
    const token = jwt.sign(
        {
            id: user._id,
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRES_IN,
        },
    );

    res.cookie("token", token);

    res.status(statusCode).json({
        message,
        success: true,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            role: user.role,
            avatar: user.avatar,
            addresses: user.addresses,
        },
    });
};

export const registerUser = async (req, res, next) => {
    const { name, email, password, contact } = req.body;

    try {
        const exixtingUser = await userModel.findOne({
            $or: [{ email }, { contact }],
        });

        if (exixtingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const user = await userModel.create({
            name,
            email,
            password,
            contact,
        });

        sendTokenResponse(user, "User registered successfully", res, 201);
    } catch (err) {
        next(err);
    }
};

export const loginUser = async (req, res, next) => {
    const { email, contact, password } = req.body;

    try {
        const user = await userModel
            .findOne({
                $or: [{ email }, { contact }],
            })
            .select("+password");

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }

        sendTokenResponse(user, "User logged in successfully", res, 200);
    } catch (err) {
        next(err);
    }
};

export const getMeUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contact: user.contact,
                role: user.role,
                avatar: user.avatar,
                addresses: user.addresses,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const googleCallback = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Google authentication failed",
            });
        }

        sendTokenResponse(req.user, "User logged in successfully", res, 200);
    } catch (error) {
        next(error);
    }
};
