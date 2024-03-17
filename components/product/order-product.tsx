'use client'

import Image from "next/image"

export const OrderProduct = (props:OrderProductType) => {
  return (
    <div className="w-full flex justify-between p-4 shadow-md border border-gray-200 rounded-md">
        <div className="flex gap-4 items-center">
            <div>
                <Image src={props.product.image} alt="image" width={80} height={80}/>
            </div>
            <div>
                <h1 className="text-xl font-semibold">{props.product.productName}</h1>
                <h2>Order Status: {props.status.toUpperCase()}</h2>
                <h2 className="text-sm text-gray-400">Shipment Tracking ID: {props.shipmentTrackingId}</h2>
            </div>
            <div>
                <h2>Price: &#8377; {props.amount} /- </h2>
                <h2>Quantity: {props.quantity}</h2>
                <div></div>
            </div>
        </div>
        <div>

        </div>
    </div>
  )
}
