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
