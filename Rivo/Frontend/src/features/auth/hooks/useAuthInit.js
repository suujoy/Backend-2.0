import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useAuthInit = () => {
    const { handleGetMe } = useAuth();

    useEffect(() => {
        handleGetMe();
    }, []);
};
