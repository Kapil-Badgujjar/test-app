import { AddToCartButton } from "@/components/buttons/add-to-cart-button";
import { ReadMoreComments } from "@/components/buttons/read-more-comments";
import { Product } from "@/components/product/product";
import productPrice from "@/utils/product-price";
import Image from "next/image";

const getData = async (): Promise<ProductType[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products/temp`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const getProduct = async ({ id }: { id: string }): Promise<ProductType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products/get-product/${id}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const currentProduct = await getProduct({ id });
  const products: ProductType[] = await getData();
  return (
    <div className="flex flex-col gap-16 p-8 bg-white ">
      <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-4 ">
        <div className="flex-1 md:flex min-w-fit">
          <Image className="mx-auto" src={currentProduct.image} alt="image" width={500} height={500} />
        </div>
        <div className="flex-1 flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-2 py-2">
            <h1 className="text-2xl text-[#3C6E71] font-semibold">
              {currentProduct.productName}
            </h1>
            <h1>{currentProduct.description}</h1>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Price: </h2>
            <h1 className="text-3xl font-semibold text-[#3C6E71]">
              &#8377; {productPrice(currentProduct.price, currentProduct.offer)}/-
            </h1>
            {currentProduct.offer > 0 && <p className="text-xl text-[#353535] font-bold line-through">
              &#8377; {JSON.stringify(Math.round(Number(currentProduct.price)))}/-
            </p>}
          </div>
          <AddToCartButton id={id} />
          <div className="flex flex-col gap-4 ">
            <div>
              <p>Ratings: 4/5</p>
            </div>
            <p>Top Comment</p>
            <div className="flex flex-col gap-2 max-w-[640px]">
              <div className=" border border-[#3C6E71] p-4 rounded-md shadow-md">
                <p>Name: Kapil</p>
                <p>Sample comment Text for the product</p>
              </div>
              <div className="w-fit ml-auto">
                <ReadMoreComments id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid flex-col gap-4 py-4 bg-white">
        <h1 className="text-2xl font-semibold">Related Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-2 md:gap-4">
          {products.map(
            (
              p: ProductType // Consistent type usage
            ) =>(
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
    </div>
  );
}
