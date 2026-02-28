"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { authService } from "@/services/auth.service"

const otpSchema = z.object({
  otp: z.string().length(6, { message: "OTP must be exactly 6 digits" }),
})

type OtpFormValues = z.infer<typeof otpSchema>

function VerifyOtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [isLoading, setIsLoading] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
  })

  // Timer for resend
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
    } else {
      setResendDisabled(false)
    }
    return () => clearInterval(timer)
  }, [countdown])

  const handleResend = async () => {
    if (!email) return;
    setResendDisabled(true)
    setCountdown(60)
    try {
        // Implement resend logic if backend supports it
        console.log("Resending OTP to", email)
    } catch (error) {
        console.error("Resend failed", error)
    }
  }

  async function onSubmit(data: OtpFormValues) {
    if (!email) {
        setError("Email is missing. Please register again.")
        return
    }
    setIsLoading(true)
    setError(null)
    try {
      await authService.verifyOtp({
        email,
        otp: data.otp
      })
      // Redirect to login on success
      router.push("/login")
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Invalid OTP. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          We sent a 6-digit code to <strong>{email || "your email"}</strong>.
          Please enter it below to verify your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password</Label>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              maxLength={6}
              className="text-center text-2xl tracking-widest"
              {...register("otp")}
            />
            {errors.otp && (
              <p className="text-sm text-red-500">{errors.otp.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Code
          </Button>
          
          <div className="text-center text-sm">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendDisabled}
              className="text-blue-600 hover:underline disabled:text-slate-400 disabled:no-underline"
            >
              {resendDisabled ? `Resend in ${countdown}s` : "Resend"}
            </button>
          </div>

          <div className="text-center text-sm text-slate-500">
            <Link href="/login" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>}>
      <VerifyOtpForm />
    </Suspense>
  )
}
