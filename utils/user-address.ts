
export const fetchAddress = async (userId: string) =>{
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/fetch-address/${userId}`);
    if(result.ok){
        const body = await result.json();
        return body;
    }
    throw new Error("Address not found!");
}

export const createNewAddress = async (userId:string, address:string) =>{
    const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/create-new-address`,{ method: 'POST', body: JSON.stringify({userId,address})});
    if(result.ok){
        const body = await result.json();
        return body;
    }
    throw new Error("Failed to create new address!");
}