"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LoginFormValues } from "@/interfaces/interface";
import axiosUser from "@/service/axios/axiosUser";
import useAuthStore from "@/service/store/UserAuthStore";

// Validation schema using Yup
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export function SignInForm() {
  const router = useRouter();
  const { loggedIn, userLogin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    if (loggedIn) {
      console.log("Redirecting to /dashboard...");
      router.replace("/dashboard"); // Use `replace` to avoid going back to login on reload
    } else {
      setLoading(false);
    }
  }, [loggedIn, router]);
  // Show loading indicator while verifying authentication
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const { data } = await axiosUser().post("/loginUser", values);

      if (data.accessToken) {
        // Store user session in Zustand
        userLogin(data);
        toast.success("Login success!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid credentials. Please try again.");
        setFieldError("email", "Invalid email or password.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section: Form */}
      <div className="w-1/3 bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center">
              <h2 className="text-xl font-semibold">Sign In</h2>
            </div>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={SignInSchema}
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
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password">Password</label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full border rounded px-3 py-2"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-black text-white hover:bg-black/90">
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                  Create one now
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section: Abstract Design */}
      <div className="w-2/3 flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 text-white relative">
        <div className="px-8 text-center z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg text-gray-200">
            Sign in to access your dashboard and manage your events.
          </p>
        </div>
      </div>
    </div>
  );
}
