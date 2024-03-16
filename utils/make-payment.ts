export const makePayment = async (userId: string, address:string, crypto:string) =>{
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payment`,{ method:"POST", body:JSON.stringify({userId,address,crypto})});
    if(result.ok){
        const body = await result.json();
        return body;
    }
    throw new Error("User not found!");
}