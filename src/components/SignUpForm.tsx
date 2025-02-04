"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "react-toastify";
import axiosUser from "@/service/axios/axiosUser";
import { SignupData } from "@/interfaces/interface";
import { OTPVerification } from "@/components/OtpVerification";
import { UnknownAction } from "@reduxjs/toolkit";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});

export function SignUpForm() {
  const [otpPage, setOtpPage] = useState<boolean | null>(null);
  const [userDetails, setUserDetails] = useState<{
    email: string;
    name: string;
  }>({
    email: "",
    name: "",
  });
  const [formValues, setFormValues] = useState<SignupData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    console.log("OTP Page Render Check:", otpPage);
  }, [otpPage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (values: SignupData, { setSubmitting }: any) => {
    try {
      console.log("Submitting Form:", values.email, values.name);
      setFormValues(values);
      await signupOtp(values.email, values.name);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error during signup:", err.message);
      } else {
        console.log(" An unkown error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const signupOtp = async (email: string, name: string): Promise<any> => {
    try {
      
      const { data } = await axiosUser().post("/signupOtp", {email, name});
      if (data.message === "success") {
        toast.success("OTP sent Successfully");
        setOtpPage(true);
      } else {
        toast.error(data.message );
      }
    } catch (error: any) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {otpPage ? (
        <OTPVerification values={formValues} />
      ) : (
        <div className="w-full lg:w-1/3 bg-white flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-muted">
                  {profileImage ? (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-muted-foreground" />
                  )}
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 hover:opacity-100">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <span className="text-xs text-white">Upload</span>
                  </label>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Formik
                initialValues={{
                  email: "",
                  name: "",
                  phone: "",
                  password: "",
                  confirmPassword: "",
                  image: null,
                }}
                validationSchema={SignUpSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email">Email</label>
                      <Field
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="w-full border rounded px-3 py-2"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="name">Name</label>
                      <Field
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        className="w-full border rounded px-3 py-2"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone">Phone</label>
                      <Field
                        id="phone"
                        name="phone"
                        placeholder="Enter your mobile phone"
                        className="w-full border rounded px-3 py-2"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <label htmlFor="password">Password</label>
                      <div className="relative">
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full border rounded px-3 py-2"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="space-y-2 relative">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <div className="relative">
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="w-full border rounded px-3 py-2"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </button>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white hover:bg-black/90"
                    >
                      {isSubmitting ? "Submitting..." : "Sign up"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="hidden lg:flex w-2/3 items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white relative">
        <div className="px-8 text-center z-10">
          <h1 className="text-4xl font-bold mb-4">
            "Your journey begins here"
          </h1>
          <p className="text-lg text-gray-200">
            Join us today and make every event unforgettable.
          </p>
        </div>
      </div>
    </div>
  );
}
