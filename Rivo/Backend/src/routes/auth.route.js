import { Router } from "express";
import passport from "passport";

import {
    getMeUser,
    googleCallback,
    loginUser,
    registerUser,
} from "../controllers/auth.controller.js";
import {
    loginValidator,
    registerValidator,
} from "../validation/auth.validation.js";
import { identifyUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * 
 * class name {
    constructor(parameters) {
        
    }
 }
 *
 */
authRouter.post("/register", registerValidator, registerUser);

authRouter.post("/login", loginValidator, loginUser);

authRouter.get("/me", identifyUser, getMeUser);

// Route to initiate Google OAuth flow
authRouter.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    }),
);

authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
    }),
    googleCallback,
);
export default authRouter;
