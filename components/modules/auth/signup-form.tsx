"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image"

import registerPhoto from "@/assets/register-photo.webp"

import InputFieldError from "@/components/shared/InputFieldError"

import { registerUser } from "@/services/auth/register.auth"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/dist/client/link"
import { useActionState, useState } from "react"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, isPending] = useActionState(registerUser, null)
  const [showPassword, setShowPassword] = useState(false)

  console.log(state)

  return (
    <div
      className={cn("flex flex-col md:gap-4 lg:gap-6", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={formAction} className="p-4 lg:p-8">
            <FieldGroup className="grid grid-cols-1 gap-2 text-sm lg:gap-4">
              <div className="flex flex-col items-center text-center lg:gap-2">
                <h1 className="text-xl font-bold">Create a new account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Register to get started
                </p>
              </div>

              {/* Full Name */}
              <Field>
                <FieldLabel htmlFor="fullName">
                  Full Name<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="John Doe"
                  required
                />
                <InputFieldError field="fullName" state={state} />
              </Field>

              {/* Phone */}
              <Field>
                <FieldLabel htmlFor="phone">
                  Phone<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="01*********"
                  required
                />
                <InputFieldError field="phone" state={state} />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">
                  Email
                  <span className="font-normal text-muted-foreground">
                    (Optional)
                  </span>
                </FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                />
                <InputFieldError field="email" state={state} />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">
                  Password<span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    // 2. Dynamically switch type
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    className="pr-10" // Add padding to the right so text doesn't overlap icon
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <InputFieldError field="password" state={state} />
              </Field>

              <Field>
                <Button disabled={isPending} type="submit" className="w-full">
                  Register Account
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field className="pointer-events-none gap-4">
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Sign up with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
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
