import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
    title: "Register | HRMS Portal",
    description: "Create a new HRMS account"
};

const RegisterPage = () => {
  return <RegisterForm />;
}

export default RegisterPage