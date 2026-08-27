import { useDispatch, useSelector } from "react-redux";

import { toggleTheme } from "../state/theme.slice";

export const useTheme = () => {
    const dispatch = useDispatch();

    const mode = useSelector((state) => state.theme.mode);

    const toggle = () => {
        dispatch(toggleTheme());
    };

    return {
        mode,
        toggle,
    };
};
