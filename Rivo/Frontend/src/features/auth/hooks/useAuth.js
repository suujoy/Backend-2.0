import { useDispatch, useSelector } from "react-redux";

import { setUser, setLoading, setError } from "../state/auth.slice.js";

import { loginUser, registerUser, getMe } from "../services/auth.api";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    const handleRegister = async ({
        name,
        email,
        password,
        contact,
        isSeller,
    }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const data = await registerUser({
                name,
                email,
                password,
                contact,
                isSeller,
            });
            const user = data?.user || null;
            dispatch(setUser(user));

            return user;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            dispatch(setError(message));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleLogin = async ({ identifier, password }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await loginUser({ identifier, password });
            const user = data?.user || null;
            dispatch(setUser(user));
            return user;
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            dispatch(setError(message));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await getMe();
            const user = data?.user || null;
            dispatch(setUser(user));
            return user;
        } catch (error) {
            dispatch(setUser(null));
            const message = error.response?.data?.message || error.message;
            dispatch(setError(message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { handleRegister, handleLogin, handleGetMe, user, loading, error };
};
