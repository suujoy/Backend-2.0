import "./App.css";
import Layout from "./layout/Layout";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useEffect } from "react";


const App = () => {
    const auth = useAuth();

    useEffect(() => {
        auth.handleGetMe();
    }, []);
    
    
    return (
        <Layout>
            
        </Layout>
    );
};

export default App;
