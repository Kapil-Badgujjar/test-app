'use client'
import React, { useEffect, useState } from 'react'
import { Product } from '@/components/product/product';
import { group } from 'console';

interface ProductsGroupProps {
  groupName: string;
  category?: string;
}

export default function ProductsGroup({groupName, category}:ProductsGroupProps) {
  const [products, setProducts] = useState<ProductType[]>([]);
  
  async function getData(){
    let result
    if(groupName === "Poupular Products") result =  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/get-popular-products`);
    else if(groupName === "Related Products") result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/get-related-products`,{method: 'POST', body: JSON.stringify({category})});
    else if(groupName === "New Arrivals") result = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/new-arrivals`);
    else result =  await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/get-popular-products`);
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
    <div className="grid flex-col gap-4 py-4 bg-white">
    <h1 className="text-2xl font-semibold">{groupName}</h1>
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
)
}
