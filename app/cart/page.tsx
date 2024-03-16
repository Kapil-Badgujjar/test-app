"use client";
import { Container } from "@/components/container";
import { CartProduct } from "@/components/product/cart-product";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { useSession } from "@/context/SessionContext";
import productPrice from "@/utils/product-price";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { createNewAddress, fetchAddress } from "@/utils/user-address";
import { makePayment } from "@/utils/make-payment";
import { useRouter } from "next/navigation";

type addressListType = {
  id: string;
  userId: string;
  address: string;
  defaultAddress: boolean;
};

export default function Page() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const { user } = useSession();
  const { setCartItems, cartItems } = useCart();
  const [address, setAddress] = useState<string>("");
  const [addressList, setAddressList] = useState<addressListType[]>([]);
  const [defaultAddress, setDefaultAddress] = useState("");
  async function getCartData(id: string | undefined) {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/cart/get-cart-data/${user?.id}`
    );
    if (result.ok) {
      const data = await result.json();
      console.log(data);
      setCartItems(data);
    }
  }

  async function fetchUserAddresses(id: string) {
    const response = await fetchAddress(id);
    setAddressList(response);
    setDefaultAddress(
      response.filter(
        (item: addressListType) => item.defaultAddress === true
      )[0].address
    );
    console.log(response);
  }

  const paymentFun = async (id:string) => {
    const crypto = uuidv4().toString();
    const result = await makePayment(id, address, crypto);
    router.replace(result.url);
  }

  useEffect(() => {
    if (user?.id) {
      getCartData(user?.id);
      fetchUserAddresses(user?.id);
    }
  }, [user]);
  if (!cartItems) {
    return <div>No data found</div>;
  }
  if(!user?.id){
    return <div>Loading...</div>
  }
  return (
    <Container>
      <div className="h-full flex flex-col justify-between py-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:flex flex-col gap-4">
          {cartItems?.map((item: CartProduct, index: number) => {
            return (
              <div
                key={`cartIndex-${index}`}
                className="bg-gray-100 p-2 shadow-md border border-gray-200 min-w-[220px]"
              >
                <CartProduct cartItem={item} />
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 p-4 lg:mx-32 mb:mb-4 shadow-md rounded-md border border-gray-300">
          <div className="flex justify-between">
            <h1>Total</h1>
            <p>
              &#8377;{" "}
              {cartItems.reduce(
                (acc, item) =>
                  acc +
                  item.quantity *
                    productPrice(item.product.price, item.product.offer),
                0
              )}{" "}
              /-
            </p>
          </div>
          <hr />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full flex flex-col md:flex-row items-center gap-4">
              <Select
                name="role"
                value={defaultAddress}
                onValueChange={(value) => {
                  setDefaultAddress(value);
                }}
                required
              >
                <SelectTrigger className="w-full md:w-2/3">
                  <SelectValue placeholder="Address" />
                </SelectTrigger>
                <SelectContent>
                  {addressList.map((item) => (
                    <SelectItem key={item.id} value={item.address}>
                      {item.address}
                    </SelectItem>
                  ))}
                  {/* // <SelectItem value="SELLER">Seller</SelectItem> */}
                </SelectContent>
              </Select>
              <Dialog>
                <DialogTrigger className="w-full md:w-fit">
                  <div className="w-full bg-[#0f172a] hover:opacity-[0.85] text-white px-4 py-2 rounded-md text-nowrap">Create new address</div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create new address</DialogTitle>
                    <DialogDescription>
                      <div className="flex flex-col gap-4 w-full mt-4">
                        <Textarea
                          className="w-full"
                          value={address}
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                        {user?.id ? (
                          <Button
                            className="w-full"
                            onClick={() => {
                              createNewAddress(user.id, address);
                              btnRef.current?.click();
                            }}
                          >
                            Create new address
                          </Button>
                        ) : (
                          <p>First login to your account!</p>
                        )}
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button className="hidden" ref={btnRef} type="button">
                        close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="w-full flex justify-end items-center">
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                    paymentFun(user.id)
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
