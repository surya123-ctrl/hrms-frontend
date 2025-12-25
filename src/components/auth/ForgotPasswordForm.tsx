"use client";
import { useForm } from "react-hook-form";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForgotPassword } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from '../ui/spinner';
const ForgotPasswordForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<{ email: string }>();
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const onSubmit = (data: { email: string }) => {
    forgotPassword(data);
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email to receive a 6-digit reset code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="pl-9"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner className="h-4 w-4 mr-2" /> : "Send OTP"}
          </Button>

          <Link href="/login" className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </form>
      </CardContent>
    </Card>
  )
}

export default ForgotPasswordForm
