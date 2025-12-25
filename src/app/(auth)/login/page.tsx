import type { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
    title: "Login | HRMS Portal",
    description: "Login to your HRMS Portal account"
};

const LoginPage = () => {
  return <LoginForm />;
}

export default LoginPage