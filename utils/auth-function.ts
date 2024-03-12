interface LoginFunctionProps{
    email: string;
    password: string;
}

interface SignupFunctionProps extends LoginFunctionProps{
    username: string;
    confirmPasssword: string;
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
    return { Error: "User not found!"}
}
export const signupFunction=async({username, email, password, confirmPasssword}: SignupFunctionProps) =>{
    return { message: 'signup'};
}

export const forgotPasswordFunction=async({email}:ForgotPasswordFunctionProps) => { 
    return { message: 'forgotPassword' };
}

export const getUserSession = async() => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth`);
    if(result.ok){
        const body = await result.json();
        return body
    }
    return undefined;
}
