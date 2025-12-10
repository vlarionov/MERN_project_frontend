import { createContext } from "react";
import type { User } from "../types/index"
import { apiClient } from "../clients/api";

interface AuthContextType {
    user: User | null;
    setUser: (user: User) => void;
    logIn: (username: string, password: string) => void;
    register: (username: string, email: string, password: string) => void;
    logOut: () => void;
    token: string | null;
    setToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
