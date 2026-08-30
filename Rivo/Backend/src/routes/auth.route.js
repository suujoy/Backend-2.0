import { Router } from "express";
import {
    getMeUser,
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
 */
authRouter.post("/register", registerValidator, registerUser);

authRouter.post("/login", loginValidator, loginUser);

authRouter.get("/me", identifyUser, getMeUser);

export default authRouter;
