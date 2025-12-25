"use client";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useResetPassword } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Spinner } from "../ui/spinner";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
      newPassword: "",
    },
  });

  const { mutate: resetPassword, isPending } = useResetPassword();

  const onSubmit = (data: any) => {
    resetPassword({ ...data, email });
  };

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Set New Password
        </CardTitle>
        <CardDescription className="text-center">
          We sent a code to{" "}
          <span className="font-semibold text-primary">{email}</span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 flex flex-col items-center">
            <Label htmlFor="otp">Verification Code</Label>
            <Controller
              name="otp"
              control={control}
              rules={{
                required: "OTP is required",
                minLength: { value: 6, message: "Enter full code" },
              }}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {errors.otp && (
              <p className="text-xs text-red-500">{errors.otp.message}</p>
            )}
          </div>

          {/* New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="pl-9"
                {...register("newPassword", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                Updating...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-primary inline-flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
