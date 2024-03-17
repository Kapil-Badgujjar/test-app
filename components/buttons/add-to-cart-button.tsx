'use client'
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useSession } from "@/context/SessionContext";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
interface AddToCartButtonProps{
    id: string;
}

export const AddToCartButton = ({id}:AddToCartButtonProps) => {
    const router = useRouter();
    const { toast } = useToast();
    const { addToCart } = useCart();
    const {user} = useSession();
    const addInCart = async ()=>{
        const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/cart/add-to-cart`,{ method: "POST", body: JSON.stringify({productId: id, userId: user?.id})});
        if(result.ok){
            const data = await result.json();
            addToCart(data);
            console.log(data);
            toast({ title: "Added to cart", description: `${data.product.productName} is added to cart`});
        } else { 
            router.push('/auth/login');
        }
    }
    if(user?.role === 'SELLER') return (<>* Your are a seller. Login as user to add products to client!</>);
    return (
        <span>
            <Button 
            onClick={()=>{addInCart()}}
            >Add to Cart</Button>
            <Toaster />
        </span>
    )
}