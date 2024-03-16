'use client'

import { useEffect, useState } from "react";

export default async function FailedPage({
    params,
  }: {
    params: { id: string };
  }) {
    const { id } = params;
    const [status, setStatus] = useState(false);
    async function confirmOrder(){

    }
    useEffect(()=>{
        confirmOrder();
    },[]);
    if(status === false) return <>Loading...</>
    return (
        <>
        Order Failed!
        </>
    )
  }