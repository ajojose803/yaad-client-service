"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import axiosAdmin from "@/service/axios/axiosAdmin";
import useAdminAuthStore from "@/service/store/AdminAuthStore";
import { LoginFormValues } from "@/interfaces/interface";
import { toast } from "react-toastify";

// Validation schema
const AdminLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

export function AdminLoginForm() {
  const router = useRouter();
  const adminLogin = useAdminAuthStore((state) => state.adminLogin);
  const loggedIn = useAdminAuthStore((state) => state.loggedIn);
  const checkAuth = useAdminAuthStore((state) => state.checkAuth);

  // On mount, run checkAuth once to update the store (if there's persisted state)
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Separate effect: whenever loggedIn becomes true, redirect to dashboard
  useEffect(() => {
    console.log("LoggedIn state:", loggedIn);
    if (loggedIn) {
      router.replace("/admin/dashboard");
    }
  }, [loggedIn, router]);

  const handleSubmit = async (values: LoginFormValues, { setSubmitting, setFieldError }: any) => {
    try {
      console.log("Submitting login with values:", values);
      const { data } = await axiosAdmin().post("/loginAdmin", values);
      console.log("Login response:", data);
      
      if (data.message === "Success") {
        console.log("Login successful, setting state with:", data.name, data.token);
        adminLogin(data.name);
        
        // Add a small delay to ensure state is updated
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log("Current auth state:", useAdminAuthStore.getState());
        toast.success("Login success!");
        router.replace("/admin/dashboard");
      } else {
        console.log("Login failed:", data);
        toast.error("Invalid credentials. Please try again.");
        setFieldError("email", "Invalid email or password.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      console.error("Error response:", error.response);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };
  // Render nothing if logged in (the redirect will fire)
  if (loggedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section: Form */}
      <div className="w-1/3 bg-white flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-muted">
                <Briefcase className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={AdminLoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
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
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>

      {/* Right Section: Abstract Design */}
      <div className="w-2/3 flex items-center justify-center bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 text-white relative">
        <div className="px-8 text-center z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome Back Admin!</h1>
          <p className="text-lg text-gray-200">Log in to manage your vendor account and grow your business.</p>
        </div>
      </div>
    </div>
  );
}
