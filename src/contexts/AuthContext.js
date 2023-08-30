import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"; // we enter the data for the user in localStorije

export const AuthContext = createContext();

export const AuthProvider = ({   // go in App.js, so that the data is available everywhere
    children,   
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    
    const userLogin = (userData) => {
        setAuth(userData);
    };

    const userLogout = () => {
        setAuth({});
            localStorage.clear() 
          
        
    };

    return ( 
        <AuthContext.Provider value={{ 
            user: auth,
            userLogin,
            userLogout,
            isAuthenticated: !!auth.accessToken //!! true or false
        }}>
            {children}  
        </AuthContext.Provider>  
    );
};

// instead of typing everywhere
export const useAuthContext = () => { 
    const context = useContext(AuthContext);

    return context;
};
