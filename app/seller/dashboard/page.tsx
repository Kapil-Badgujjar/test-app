'use client'

import { SellerProductsGrid } from "@/components/seller/products-grid/seller-products-grid";
import { useState } from "react"

export default function Dashboard() {
    const [route, setRoute] = useState('statistics');
  return (
    <div className="flex h-full">
        <div className="bg-blue-500 text-white p-4 h-full">
            <ul className="flex flex-col gap-4 text-xl">
                <li className={`cursor-pointer w-full hover:underline px-16 py-2 hover:shadow-sm rounded-md ${route==="statistics"? 'bg-red-500':'bg-blue-600'}`} onClick={()=>{setRoute('statistics')}}>Statistics</li>
                <li className={`cursor-pointer w-full hover:underline px-16 py-2 hover:shadow-sm rounded-md ${route==="products"? 'bg-red-500':'bg-blue-600'}`} onClick={()=>{setRoute('products')}}>Products</li>
                <li className={`cursor-pointer w-full hover:underline px-16 py-2 hover:shadow-sm rounded-md ${route==="orders"? 'bg-red-500':'bg-blue-600'}`} onClick={()=>{setRoute('orders')}}>Orders</li>
            </ul>
        </div>
        <div className="overflow-y-scroll">
            {route === 'products' && <SellerProductsGrid />}
        </div>
    </div>
  )
}
