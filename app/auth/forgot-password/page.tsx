import { AuthCard } from "@/components/auth/auth-card"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthFormField } from "@/components/auth/auth-form-field"
export default function ForgotPassword(){
  return (
    <div>
        <AuthCard 
            title="Forgot Password"
            message="Forgot your password"
            link_href="/auth/login"
            linkTitle="Go to Login ->"
        >
            <AuthForm
            buttonTitle="Submit"
            authFunctionId={3}
            >
            <div className="flex flex-col gap-2">
                <AuthFormField 
                label="Email"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                />
            </div>
            </AuthForm>
        </AuthCard>
    </div>
  )
}
