import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { loginValidator, registerValidator } from "../validation/auth.validation.js";

const authRouter = Router();

/**
 * 
 */
authRouter.post('/register',registerValidator,registerUser)

authRouter.post('/login',loginValidator,loginUser)

export default authRouter;