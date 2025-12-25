export interface User {
    id: number;
    name: string;
    email: string;
    role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'HR';
}