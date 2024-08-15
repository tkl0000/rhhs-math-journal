import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
    authToken: string | null;
    isLoggedIn: () => boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('token'));

    const isLoggedIn = () => {
        return authToken !== null;
    };

    const login = (token: string) => {
        setAuthToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setAuthToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ authToken, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider