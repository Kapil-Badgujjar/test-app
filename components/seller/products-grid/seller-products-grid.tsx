'use client'
import { SellerProduct } from "@/components/seller/seller-product";
import { Button } from "@/components/ui/button";
import { useSession } from "@/context/SessionContext";
import { useEffect, useRef, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog"
import { AddNewProduct } from "../add-new-product";
  

export const SellerProductsGrid = () => {
    const btnRef = useRef<HTMLButtonElement>(null)
    const { user } = useSession();
    const [products, setProducts] = useState<ProductType[]>([]);
    const getData = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/get-all-products`, {
          cache: "no-store",
        });
      
        if (res.ok) {
            const data =  await res.json();
            console.log(data);
            setProducts(data);
        }
      };

    useEffect(()=>{
        if(user) getData();
    },[user]);


  return (
    <div className="grid flex-col gap-4 p-4 bg-white">
        {/* <h1 className="text-2xl font-semibold">Related Products</h1> */}
        <div>
            <Dialog>
                <DialogTrigger><div className="bg-[#0f172a] hover:opacity-[0.85] text-white px-4 py-2 rounded-md">Add new product</div></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Add a new product</DialogTitle>
                    <DialogDescription>
                        <AddNewProduct closeAction={()=>{ btnRef.current?.click()}} />
                    </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button className="hidden" ref={btnRef} type="button">
                            Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 md:gap-4">
          {products.map(
            (
              p: ProductType // Consistent type usage
            ) => (
              <span key={p.id} className="w-full flex h-full">
                <SellerProduct
                  id={p.id}
                  title={p.productName}
                  price={p.price}
                  imageSource={p.image} // Potential error handling for invalid image
                />
              </span>
            )
          )}
        </div>
        
        {}
      </div>
  )
}
