'use client'
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useSession } from "@/context/SessionContext";
interface AddToCartButtonProps{
    id: string;
}

export const AddToCartButton = ({id}:AddToCartButtonProps) => {
    const { setCartItems, cartItems, addToCart, removeFromCart, clearCart, totalItems } = useCart();
    const {user} = useSession();
    const addInCart = async ()=>{
        const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cart/add-to-cart`,{ method: "POST", body: JSON.stringify({productId: id, userId: user?.id})});
        if(result.ok){
            const data = await result.json();
            addToCart(data);
            console.log(data);
        }
    }
    return (
        <span>
            <Button 
            onClick={()=>{addInCart()}}
            >Add to Cart</Button>
        </span>
    )
}