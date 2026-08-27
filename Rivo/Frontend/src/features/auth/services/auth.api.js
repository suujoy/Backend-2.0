import axios from "axios";

const authApi = axios.create({
    baseURL: `/api/auth`,
    withCredentials: true,
});

export const registerUser = async ({ name, email, password, contact, isSeller }) => {
    try {
        const { data } = await authApi.post("/register", {
            name,
            email,
            password,
            contact,
            isSeller
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
