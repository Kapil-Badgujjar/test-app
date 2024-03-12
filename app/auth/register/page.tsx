import { AuthCard } from "@/components/auth/auth-card"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthFormField } from "@/components/auth/auth-form-field"
export default function Register(){
  return (
    <div>
        <AuthCard 
            title="Register"
            message="Create a new Account!"
            link_href="/auth/login"
            linkTitle="Already have an account? Go to Login ->"
        >
            <AuthForm
            buttonTitle="Register"
            authFunctionId={2}
            >
            <div className="flex flex-col gap-2">
                <AuthFormField 
                label="Username"
                id="username"
                type="text"
                placeholder="Username"
                name="username"
                />
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
                <AuthFormField 
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                />
            </div>

            </AuthForm>
        </AuthCard>
    </div>
  )
}
