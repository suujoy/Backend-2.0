import axios from "axios";
import { config } from "../../../config/config";

const authApi = axios.create({
    baseURL: `${config.baseURL}/api/auth`,
    withCredentials: true,
});

export const registerUser = async ({ name, email, password, contact }) => {
    try {
        const { data } = await authApi.post("/register", {
            name,
            email,
            password,
            contact,
        });
        return data;
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

export const loginUser = async ({ identifier, password }) => {
    try {
        const { data } = await authApi.post("/login", {
            identifier,
            password,
        });
        return data;
    } catch (error) {
        console.error("Error logging in the user:", error);
    }
};
