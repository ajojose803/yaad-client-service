"use client"

import { useRouter } from "next/navigation"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Store } from "lucide-react"

// Validation schema
const VendorSignUpSchema = Yup.object().shape({
  businessName: Yup.string().required("Business name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
})

export function VendorSignUpForm() {
  const router = useRouter()

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    console.log("Form values:", values)

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
                <Store className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                businessName: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={VendorSignUpSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="businessName">Business Name</label>
                    <Field
                      id="businessName"
                      name="businessName"
                      placeholder="Enter your business name"
                      className="w-full border rounded px-3 py-2"
                    />
                    <ErrorMessage name="businessName" component="div" className="text-red-500 text-sm" />
                  </div>
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
                    <label htmlFor="phone">Phone</label>
                    <Field
                      id="phone"
                      name="phone"
                      placeholder="Enter your phone number"
                      className="w-full border rounded px-3 py-2"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
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
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="w-full border rounded px-3 py-2"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-black/90"
                  >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>

      {/* Right Section: Abstract Design */}
      <div className="w-2/3 flex items-center justify-center bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 text-white relative">
        <div className="px-8 text-center z-10">
          <h1 className="text-4xl font-bold mb-4">Welcome, Vendor!</h1>
          <p className="text-lg text-gray-200">Join us to connect with event hosts and grow your business.</p>
        </div>
      </div>
    </div>
  )
}
