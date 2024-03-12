'use client'
import { Container } from "@/components/container";
import { CartProduct } from "@/components/product/cart-product";
import { useCart } from "@/context/CartContext";
import { useSession } from "@/context/SessionContext";
import { useEffect } from "react";

export default function Page() {
    const { user } = useSession();
    const { setCartItems, cartItems } = useCart();
    async function getCartData(id:string|undefined){
        const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cart/get-cart-data/${user?.id}`);
        if(result.ok){
            const data = await result.json();
            console.log(data);
            setCartItems(data);
        }
    }
    useEffect(()=>{
        if(user?.id) getCartData(user?.id);
    },[user]);
    if(!cartItems){
        return <div>No data found</div>
    }
  return (
    <Container>
        <div className="py-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:flex flex-col gap-4">
                {cartItems?.map((item:CartProduct,index:number)=>{
                    return(
                        <div key={`cartIndex-${index}`} className="bg-gray-100 p-2 shadow-md border border-gray-200 min-w-[220px]">
                            <CartProduct cartItem={item} />
                        </div>
                    )
                })}
            </div>
            <div>

            </div>
        </div>
    </Container>
  )
}
