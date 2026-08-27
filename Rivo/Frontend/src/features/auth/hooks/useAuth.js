import { useDispatch, useSelector } from "react-redux";

import { setUser, setLoading, setError } from "../state/auth.slice.js";

import { loginUser, registerUser } from "../services/auth.api";

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    const register = async ({ name, email, password, contact, isSeller }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));

            const { user } = await registerUser({
                name,
                email,
                password,
                contact,
                isSeller
            });
            dispatch(setUser(user));

            return user;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const login = async ({ identifier, password }) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const { user } = await loginUser({ identifier, password });
            dispatch(setUser(user));
            return user;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { register, login, user, loading, error };
};
