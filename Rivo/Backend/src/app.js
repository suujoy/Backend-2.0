import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import handleError from "./middlewares/error.middleware.js";

const app = express();

/**
 * Middleware
 */
app.use(morgan("dev"));
app.use(express.json());

/**
 * Routes
 */
app.use("/api/auth", authRouter);

/**
 * Health check
 */
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running",
    });
});

app.use(handleError);

export default app;
