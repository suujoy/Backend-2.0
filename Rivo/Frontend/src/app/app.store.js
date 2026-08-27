import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/state/auth.slice.js'
import themeReducer from './theme/state/theme.slice.js'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
    },
});
