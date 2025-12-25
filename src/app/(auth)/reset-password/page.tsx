import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
    title: "Reset Password | HRMS Portal",
    description: "Reset your password"
};

const ResetPasswordPage = () => {
  return <ResetPasswordForm />;
}

export default ResetPasswordPage