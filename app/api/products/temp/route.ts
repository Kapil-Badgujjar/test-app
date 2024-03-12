import { DATABASE } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = [
      {
        id: '64da676a07e3a4595a860ec3',
        image: 'https://firebasestorage.googleapis.com/v0/b/ecommercesupermart.appspot.com/o/images%2F68d5b9cb-149c-406c-a9cf-6b84af925345.jpg?alt=media&token=66d94ba0-d619-4bb3-91e1-b014869b1fd9',
        productName: 'Smart Watch',
        price: 3499,
        category: 'Accessories',
        description: 'Best smart watch with ecg tracker and 7 days battery life. golden color. 2 inch display.',
        stocks: 100,
        offer: 5
      },
      {
        id: '64da685207e3a4595a860ec5',
        image: 'https://firebasestorage.googleapis.com/v0/b/ecommercesupermart.appspot.com/o/images%2Fe308d21d-1b70-4f7c-a2ae-116b6319d70c.jpg?alt=media&token=654fc086-4c1e-4fea-8572-7179fccd212c',
        productName: 'Denver Green deodorant',
        price: 180,
        category: 'Deodorants',
        description: 'Denver Deodorant Green. Best body spray for men.',
        stocks: 350,
        offer: 10
      },
      {
        id: '64db10c35839bc13b2421c8a',
        image: 'https://firebasestorage.googleapis.com/v0/b/ecommercesupermart.appspot.com/o/images%2F2caf8ec0-f3bb-4ffc-9260-de1b9b1c1800.webp?alt=media&token=df5f9054-14ca-4493-a09d-4042cfa0a980',
        productName: 'Boat Bluetooth Headphones',
        price: 1999,
        category: 'Accessories',
        description: 'Boat Bluetooth Headphones with 10mm Drivers for clear Sound.',
        stocks: 150,
        offer: 10
      },
      {
        id: '64db13295839bc13b2421c8b',
        image: 'https://firebasestorage.googleapis.com/v0/b/ecommercesupermart.appspot.com/o/images%2F9ff004d1-5f35-4a62-b408-4da4bd245881.jpg?alt=media&token=89e92a92-1249-46ab-833a-45e40fd6cc79',
        productName: 'OnePlus 10T',
        price: 41999,
        category: 'Mobile',
        description: 'OnePlus 10T Android smart phone. It is a flagship smartphone for pro users.',
        stocks: 10,
        offer: 5
      },
      {
        id: '64ded03526bdc7e8472d5aca',
        image: 'https://firebasestorage.googleapis.com/v0/b/ecommercesupermart.appspot.com/o/images%2F29cfa344-d32d-4223-ad77-45606259cfd4.jpg?alt=media&token=a8248339-d0aa-44b7-9acd-ebbd9d9c54ce',
        productName: 'Fogg Deodorant',
        price: 169,
        category: 'Deodorants',
        description: 'Fogg No Gas Deodorant',
        stocks: 130,
        offer: 5
      },
      {
        id: '65efb4f25db51137e125cb61',
        image: 'https://firebasestorage.googleapis.com/v0/b/ecommercesupermart.appspot.com/o/images%2Ff841f571-93a0-466b-acd1-928801725fdd.jpg?alt=media&token=5702482f-309c-438e-83f7-71e07173bbf9',
        productName: 'Wild Stone Perfume',
        price: 1499,
        category: 'Deodorants',
        description: 'Premium quality Perfume from Wild Stone',
        stocks: 10,
        offer: 5
      }
    ];
    // await DATABASE.product.findMany({
    //   select: {
    //     id: true,
    //     image: true,
    //     productName: true,
    //     price: true,
    //     category:true,
    //     description:true,
    //     stocks:true,
    //     offer:true,
    //   },
    // });
    // console.log(products);
    return new NextResponse(JSON.stringify(products),{status: 200});
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({message: "Something went wrong!"}),{status: 500});
  }
};