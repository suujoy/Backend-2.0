import { config } from "./src/config/config.js";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

/**
 * Start the server
 */
const startServer = async () => {
    try {
        await connectDB(config.MONGO_URI);

        app.listen(config.PORT || 5000, () => {
            console.log(`Server listening on port ${config.PORT || 5000}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
