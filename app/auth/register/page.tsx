import { AuthCard } from "@/components/auth/auth-card"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthFormField } from "@/components/auth/auth-form-field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
                required
                />
                <AuthFormField 
                label="Email"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                required
                />
                <AuthFormField 
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                required
                />
                <AuthFormField 
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                />
                <div className='flex-1 flex flex-col gap-2'>
                    <label className='text-black'>Register as:</label>
                    <Select name="role" required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USER">User</SelectItem>
                            <SelectItem value="SELLER">Seller</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                {/* <input className="hidden" type="text" id="role" name="role" value="USER" placeholder="role"/> */}
            </div>
            </AuthForm>
        </AuthCard>
    </div>
  )
}
