'use client'
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { Container } from "@/components/container";
import { Loading } from "@/components/loading";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FailedPage({
    params,
  }: {
    params: { id: string };
  }) {
    const { id } = params;
    const [status, setStatus] = useState(false);
    const confirmOrder = async () =>{
        const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/payment/success/${id}`);
        if(result.ok){
            const body = await result.json();
            setStatus(true);
            return body;
        }
        throw new Error("User not found!");
    }
    useEffect(()=>{
      confirmOrder();
    },[]);
    if(status === false) return (
      <div className="mx-auto h-full flex jusitfy-center items-center">
      <Container>
        <Loading />
      </Container>
    </div>
    )
    return (
      <div className="flex items-center w-full h-full">
        <Container>
          <div className="mx-auto h-full flex flex-col gap-16 jusitfy-center">
            <div className="w-full flex items-center gap-4 justify-center text-green-500 text-3xl my-8"><IoCheckmarkDoneCircle />Order Placed Successfully!</div>
            <p className="w-[320px] text-center mx-auto">Your order is successfully placed. Check orders section for tracking order status.</p>
            <Link className="w-full text-center text-xl text-blue-500 hover:underline" href="/">{'Go to homepage ->'}</Link>
          </div>
        </Container>
      </div>
    )
  }