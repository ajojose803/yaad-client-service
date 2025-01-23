"use client"

import { useState } from "react"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isVerifying, setIsVerifying] = useState(false)

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple digits
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleVerify = async () => {
    setIsVerifying(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsVerifying(false)
    // Handle verification logic here
  }

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
            <Button className="w-full" onClick={handleVerify} disabled={isVerifying || otp.some((digit) => !digit)}>
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
              <Button variant="link" className="text-sm text-muted-foreground">
                Didn&apos;t receive the code? Resend
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

