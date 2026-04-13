import SignupForm from "@/components/forms/signup-form"

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm />
      </div>
    </div>
  )
}
