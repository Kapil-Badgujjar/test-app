'use client'
import { Button } from "@/components/ui/button";
interface AddToCartButtonProps{
    id: string;
}
export const AddToCartButton = ({id}:AddToCartButtonProps) => {
    return (
        <span>
            <Button 
            onClick={()=>{}}
            >Add to Cart</Button>
        </span>
    )
}