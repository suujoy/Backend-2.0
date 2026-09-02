import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import handleError from "./middlewares/error.middleware.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";
import { config } from "./config/config.js";
import userModel from "./models/user.model.js";

const app = express();

/**
 * Middleware
 */
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());

// Configure Passport to use Google OAuth 2.0 strategy

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value?.toLowerCase();

                if (!email) {
                    return done(new Error("Google account email is not available"));
                }

                let user = await userModel.findOne({ email });

                if (!user) {
                    user = await userModel.create({
                        name: profile.displayName || email.split("@")[0],
                        email,
                        password: crypto.randomBytes(32).toString("hex"),
                        avatar: profile.photos?.[0]?.value || "",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        },
    ),
);

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
