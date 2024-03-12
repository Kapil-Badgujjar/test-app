"use client";

import Image from "next/image";
import { Button } from "../ui/button";

export const CartProduct = ({ cartItem }: { cartItem: CartProduct }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Image
        className="hidden lg:block"
        src={cartItem.product.image}
        alt="product image"
        width={80}
        height={80}
      />
      <Image
        className="lg:hidden mx-auto"
        src={cartItem.product.image}
        alt="product image"
        width={180}
        height={180}
      />
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-2 w-full content-between lg:content-start items-center h-full">
        <div>
          <h1 className="text-xl font-semibold text-gray-500">
            {cartItem.product.productName}
          </h1>
          <p className="hidden lg:block text-gray-700">Quantity: {cartItem.quantity}</p>
        </div>
        <div className="border-y-2 border-gray-400 lg:border-none">
          <p>Price:</p>
          <div className="flex gap-4 lg:grid grid-cols-4 gap-[0px]">
            <div>
              &#8377; {Math.round(
                cartItem.product.price * (1 - cartItem.product.offer / 100)
              )}{" "}
            </div>
            <div>
            x {cartItem.quantity} 
            </div>
            <div>
             ={" "}
            </div>
            <div className="text-lg font-semibold">
              &#8377; {Math.round(
              cartItem.quantity *
                cartItem.product.price *
                (1 - cartItem.product.offer / 100)
            )}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex justify-between items-center gap-4">
          <p className="text-gray-500 lg:hidden text-center text-xl font-semibold">Quantity: {cartItem.quantity} </p>
            <span className="cursor-pointer border-2 border-gray-500 py-2 px-4 rounded-md hover:bg-gray-200"> - </span>
            <span className="cursor-pointer border-2 border-gray-500 py-2 px-4 rounded-md hover:bg-gray-200"> + </span>
          </div>
          <Button className="w-full">Remove</Button>
        </div>
      </div>
    </div>
  );
};
