import { DATABASE } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { firbaseStorage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';




async function uploadImage(imageFile: any, cryptoCode: string) {
  try {
    const fileName = cryptoCode + imageFile.name;
    const metadata = { contentType: imageFile.type };

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageRef = ref(firbaseStorage, 'images/' + fileName);
    const uploadTask = await uploadBytes(imageRef, buffer, metadata);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; 
  }
}

export const POST = async (request: NextRequest) => {


  try {
    const formData = await request.formData();
    const file : File | null  = formData.get('productImage') as unknown as File;
    let productData:any = {};
    formData.forEach(function(value, key){
        if(key !== 'productImage')
        productData[key] = value;
    });
    

    // console.log(productData);


    const imageUrl = await uploadImage(file, productData.cryptoCode);
    const tempProductDetails = productData;
    const product:Product = {
      productName: tempProductDetails.productName,
      price: Number(tempProductDetails.price),
      description: tempProductDetails.description,
      stocks: Number(tempProductDetails.stocks),
      offer: Number(tempProductDetails.offer),
      category: tempProductDetails.category,
      image: imageUrl,
      sellerId: tempProductDetails.sellerId,
      isActive: true,
      isAssured: false,
      otherSpecifications: {}
    }

    for( const key in product ){
        delete tempProductDetails[key];
    }
    delete tempProductDetails['cryptoCode'];
    for( const key in tempProductDetails){
      if(tempProductDetails[key]==='') delete tempProductDetails[key];
    }

    product.otherSpecifications = { ...tempProductDetails  };
    const response = await DATABASE.product.create({data: product});

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error('Error creating product:', err);
    const errorMessage = 'An error occurred while creating the product.';
    return new NextResponse(
      JSON.stringify({ message: errorMessage }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}