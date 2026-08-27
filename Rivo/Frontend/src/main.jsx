import { createRoot } from "react-dom/client";

import { store } from "./app/app.store.js";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import router from "./app/app.routes.jsx";
import "./app/App.css";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
);
