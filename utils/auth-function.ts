interface LoginFunctionProps{
    email: string;
    password: string;
}

interface SignupFunctionProps extends LoginFunctionProps{
    username: string;
    confirmPasssword: string;
    role: string;
}

interface ForgotPasswordFunctionProps {
    email: string;
}

export const loginFunction=async({ email, password}: LoginFunctionProps) =>{
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/login`,{ method: 'POST', body: JSON.stringify({ email: email, password: password})});
    if(result.ok){
        const body = await result.json();
        return body;
    }
    throw new Error("User not found");
}
export const signupFunction=async({username, email, password, confirmPasssword, role}: SignupFunctionProps) =>{
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register`,{ method: 'POST', body: JSON.stringify({ name:username, email, password, confirmPasssword, role})});
    if(result.ok){
        const body = await result.json();
        return body;
    }
    throw new Error("Registration failed");
}

export const forgotPasswordFunction=async({email}:ForgotPasswordFunctionProps) => { 
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/forgot-password`,{ method: 'POST', body: JSON.stringify({email})});
    if(result.ok){
        const body = await result.json();
        return body;
    }
    throw new Error("Not found");
}

export const getUserSession = async() => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth`);
    if(result.ok){
        const body = await result.json();
        return body
    }
    return undefined;
}
