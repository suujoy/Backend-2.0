import axios from "axios";

const authApi = axios.create({
    baseURL: `/api/auth`,
    withCredentials: true,
});

export const registerUser = async ({
    name,
    email,
    password,
    contact,
    isSeller,
}) => {
    const { data } = await authApi.post("/register", {
        name,
        email,
        password,
        contact,
        isSeller,
    });
    return data;
};

export const loginUser = async ({ identifier, password }) => {
    const { data } = await authApi.post("/login", {
        identifier,
        password,
    });
    return data;
};

export const getMe = async () => {
    const { data } = await authApi.get("/me");
    return data;
};
