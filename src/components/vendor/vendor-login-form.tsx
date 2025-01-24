"use client"

import { useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

// Validation schema
const VendorLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})

export function VendorLoginForm() {
  const router = useRouter()

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log("Login values:", values)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitting(false)
    router.push("/vendor/dashboard")
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
              validationSchema={VendorLoginSchema}
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
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-black/90"
                  >
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
          <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-lg text-gray-200">Log in to manage your vendor account and grow your business.</p>
        </div>
      </div>
    </div>
  )
}
