"use client"

import { cn } from "@/lib/utils"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

import registerPhoto from "@/assets/register-photo.webp"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

import {
  LoginInput,
  LoginOutput,
  loginSchema,
} from "@/lib/validators/auth.login"

import { login } from "@/services/auth/login.auth"
import Link from "next/link"

import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "../ui/field"
import PasswordField from "./PasswordField"
import PhoneInputField from "./PhoneInputField"
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils"

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectParam = searchParams.get("redirect")
  const form = useForm<LoginInput, unknown, LoginOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "+96541128440",
      password: "1234567",
    },
  })

  async function onSubmit(data: LoginOutput) {
    const payload = {
      phone: data.phone,
      password: data.password,
    }

    const result = await login(payload)

    if (!result.success) {
      toast.error(result.message || "Login failed. Please try again.")
      return
    }

    const role = result.data?.user?.role as UserRole | undefined
    if (!role) {
      toast.error("Login succeeded but user role is missing.")
      return
    }

    const destination =
      redirectParam && isValidRedirectForRole(redirectParam, role)
        ? redirectParam
        : getDefaultDashboardRoute(role)

    router.replace(destination)
    toast.success(
      "Login successful! Welcome, " + (result.data?.user?.fullName || "")
    )
    form.reset()
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Nafiya Mart account
                </p>
              </div>

              {/* Phone */}
              <PhoneInputField
                name="phone"
                label="Phone"
                control={form.control}
              />

              {/* Logic: type and showPassword state are passed correctly */}
              <PasswordField
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                control={form.control}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                placeholder="******"
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="cursor-pointer text-background"
              >
                {form.formState.isSubmitting ? "Loading..." : "Login"}
              </Button>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <Field className="pointer-events-none space-y-1">
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link href="/register">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          {/* Image */}

          <div className="relative hidden bg-muted md:block">
            <Image
              src={registerPhoto}
              width={300}
              height={300}
              placeholder="blur"
              alt="Image"
              priority
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
