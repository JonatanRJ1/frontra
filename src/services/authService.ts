import api from './api';

export interface LoginDataI {
    email: string;
    password: string;
}

export interface UserI {
    id: number;
    name: string;
    email: string;
}

export interface AuthResponseI {
    status: boolean;
    message: string;
    data: {
        user: UserI;
        access_token: string;
    };
}

export interface UserResponseI {
    status: boolean;
    message: string;
    data: UserI;
}

class AuthService {
    private static instance: AuthService;

    private constructor() { }

    static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(credentials: LoginDataI): Promise<AuthResponseI> {
        const response = await api.post<AuthResponseI>('/login', credentials);
        return response.data;
    }

    async logout(): Promise<void> {
        await api.post('/logout');
        localStorage.removeItem('auth_token');
    }

    async getCurrentUser(): Promise<UserResponseI> {
        const response = await api.get<UserResponseI>('/user');
        return response.data;
    }
}

export const authService = AuthService.getInstance();