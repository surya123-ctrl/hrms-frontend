"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { LoginInput, RegisterInput } from "@/types/auth";
import { toast } from "sonner";
const useLogin = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation<any, Error, LoginInput>({
        mutationFn: async (credentials) => {
            const { data } = await api.post<any>('auth/login', credentials);
            return data;
        },
        onSuccess: (data) => {
            toast.success("Login Successful", {
                description: "Welcome back to HRMS!",
            })
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
            router.push('/');
        },
        onError: (error: any) => {
            toast.error("Login Failed", {
                description: error.response?.data?.message || "Invalid credentials",
            });
        }
    })
}

const useRegister = () => {
    const router = useRouter();
    return useMutation<any, Error, RegisterInput>({
        mutationFn: async (userData) => {
            const { data } = await api.post<any>('auth/register', {
                ...userData
            });
            return data;
        },
        onSuccess: (data) => {
            toast.success("Account Created Successfully", {
                description: "Please Log in now",
            })
            router.push('/login');
        },
        onError: (error: any) => {
            toast.error("Account Creation Failed", {
                description: error.response?.data?.message || "Something went wrong",
            });
        }
    })
}

const useForgotPassword = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: { email: string }) => {
            const response = await api.post('auth/forgot-password', data);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("OTP Sent", {
                description: "Please check your email for the 6-digit code.",
            });
            console.log(data)
            router.push(`/reset-password?email=${data.data.email || ""}`);
        },
        onError: (error: any) => {
            toast.error("Error", {
                description: error.response?.data?.message || "Failed to send OTP",
            });
        }
    })
}

const useResetPassword = () => {
    const router = useRouter();
    return useMutation({
        mutationFn: async (data: { email: string, otp: string, newPassword: string }) => {
            const response = await api.post('auth/reset-password', data);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success("Password Reset Successful", {
                description: "Please log in with your new password.",
            });
            router.push('/login');
        },
        onError: (error: any) => {
            toast.error("Reset Failed", {
                description: error.response?.data?.message || "Invalid OTP or request",
            });
        }
    })
}

export { useLogin, useRegister, useForgotPassword, useResetPassword};