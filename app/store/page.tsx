'use client'
import React, { useEffect, useState } from 'react'
import { Product } from '@/components/product/product';
import { Container } from '@/components/container';

export default function StorePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  
  async function getData(){
    const result =  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/get-all-products`);
    if(result.ok){
      const body = await result.json();
      console.log(body);
      setProducts(body);
    }
  };

  useEffect(()=>{
    getData();
  },[]);

  return (
    <Container>
        <div className="grid flex-col gap-4 py-4 bg-white">
        <h1 className="text-center text-2xl font-semibold">All Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-2 md:gap-4">
        {products?.map(
            (
            p: ProductType // Consistent type usage
            ) => (
            <span key={p.id} className="w-full flex h-full">
                <Product
                    id={p.id}
                    title={p.productName}
                    price={p.price}
                    offer={p.offer}
                    imageSource={p.image} // Potential error handling for invalid image
                />
            </span>
            )
        )}
        </div>
    </div>
  </Container>
)
}
