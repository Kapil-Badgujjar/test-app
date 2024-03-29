'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import productPrice from "@/utils/product-price";

interface ProductProps {
  id: string;
  title: string;
  price: number;
  offer: number;
  imageSource: string;
}
export const Product = ({
  id,
  title,
  price,
  offer,
  imageSource,
}: ProductProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between w-full border border-gray-100 shadow-md rounded-sm p-4">
      <div>
        {/* Todo: Change image address to props imageSource */}
        <div className="cursor-pointer w-full flex justify-center" onClick={()=>{router.push(`/product/${id}`)}}>
          <Image
            className="object-cover transition ease-in-out duration-500 hover:scale-110"
            width={160}
            height={160}
            src={imageSource}
            alt={`Product ${id}`}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="mt-2 h-20">
          <h1>&#8377; {productPrice(price,offer)}/- </h1>
          <p className="text-sm md:text-lg font-semibold">{title}</p>
        </div>
        <div className="w-full" onClick={()=>{router.push(`/product/${id}`)}}>
          <Button
            size="sm"
            // className="w-full hover:bg-sky-400 hover:text-primary-foreground"
            className="w-full bg-gray-200 text-black hover:bg-blue-500 hover:text-white"
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};
