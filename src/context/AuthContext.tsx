import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserI } from '../services/authService';
import { authService } from '../services/authService';
import type { AuthResponseI } from '../services/authService';

interface AuthContextType {
    user: UserI | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserI | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('auth_token');

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const userData = await authService.getCurrentUser();
                setUser(userData.data);
            } catch (error: AuthResponseI | any) {
                console.error("Failed to fetch user:", error);
                if (error.response?.status === 401) {
                    localStorage.removeItem('auth_token');
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password });

            if (response?.data?.access_token) {
                localStorage.setItem('auth_token', response.data.access_token);
                setUser(response.data.user);
            } else {
                throw new Error('No access token received');
            }
        } catch (error) {
            console.error("Login error:", error);
            localStorage.removeItem('auth_token');
            setUser(null);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setUser(null);
            localStorage.removeItem('auth_token');
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};