import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OtpComponentProps } from "@/interfaces/interface";
import axiosUser from "@/service/axios/axiosUser"; 
import useAuthStore from "@/service/store/UserAuthStore"; // Import Zustand store
import { useRouter } from "next/navigation";

export const OTPVerification: React.FC<OtpComponentProps> = ({ values }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  const userLogin = useAuthStore((state) => state.userLogin); // Zustand function
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    const otpValue = otp.join("");
    const formData = {
      email: values.email,
      name: values.name,
      password: values.password,
      phone: values.phone,
      otp: otpValue,
    };


    try {
      const { data } = await axiosUser().post("/registerUser", formData);
      if (data.success) {
        toast.success("OTP verified successfully!");
        userLogin(data.user); 
        router.push('/dashboard');

      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Error verifying OTP. Please try again later.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await axiosUser().post("/resendOtp", { email: values.email });
      toast.success("OTP resent successfully!");
      setResendTimer(30);
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Error resending OTP. Please try again later.");
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  return (
    <div className="container flex min-h-[calc(100vh-3.5rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2 text-center">
            <CardTitle className="text-2xl">Email Verification</CardTitle>
            <CardDescription>
              We&apos;ve sent a verification code to your email address. Please enter it below.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="h-12 w-12 text-center text-lg"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                />
              ))}
            </div>
            <Button
              className="w-full"
              onClick={handleVerify}
              disabled={isVerifying || otp.some((digit) => !digit)}
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Verify Email
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
            <div className="text-center">
              <Button
                variant="link"
                className="text-sm text-muted-foreground"
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Didn't receive the code? Resend"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
