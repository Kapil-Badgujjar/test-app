import { AuthCard } from "@/components/auth/auth-card"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthFormField } from "@/components/auth/auth-form-field"
import { PasswordInput } from "@/components/password-input"
import Link from "next/link"
export default function Login(){
  return (
    <div className="h-full flex jusitfy-center items-center">
        <AuthCard 
            title="Login"
            message="Welcome back!"
            link_href="/auth/register"
            linkTitle="Don't have an account? Register now! ->"
        >
            <AuthForm
            buttonTitle="Login"
            authFunctionId={1}
            >
            <div className="flex flex-col gap-2">
                <AuthFormField 
                label="Email"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                />
                <AuthFormField 
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                />
                <Link className="text-sm text-blue-500 underline hover:text-blue-300 active:text-blue-700" href="/auth/forgot-password">Forgot password</Link>
            </div>

            </AuthForm>
        </AuthCard>
    </div>
  )
}
