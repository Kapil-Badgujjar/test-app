'use client'
import { Container } from "@/components/container";
import { Loading } from "@/components/loading";
import { OrderProduct } from "@/components/product/order-product";
import { useSession } from "@/context/SessionContext"
import { useEffect, useState } from "react";

export default function Orders() {
    const { user } = useSession();
    const [orders, setOrders] = useState<OrderProductType[]>([]);
    
    const getOrders = async () =>{
        const result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/fetch-orders/${user?.id}`);
        if(result.ok){
            const body = await result.json();
            console.log(body);
            setOrders(body)
        }
    }
    
    useEffect(()=>{
        if(user?.id) getOrders();
    },[user]);
    if(!user?.id) return (
        <div className="mx-auto h-full flex jusitfy-center items-center">
        <Container>
          <Loading />
        </Container>
      </div>
      )
  return (
    <div className="flex flex-col gap-4 p-2">
        {orders.map((item:OrderProductType)=>{
          return(
            <div key={item.id}>
              <OrderProduct {...item} />
            </div>
          )
        })}
    </div>
  )
}
