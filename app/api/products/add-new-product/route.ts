import { DATABASE } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as path from 'node:path';
import fs from 'fs/promises'; // Import for promise-based file system operations
import { firbaseStorage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

async function uploadImage(imageFile: any, cryptoCode: string) {
  try {
    const fileName = cryptoCode + imageFile.name;
    const metadata = { contentType: imageFile.type };

    // Convert the File object to a Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const imageRef = ref(firbaseStorage, 'images/' + fileName);
    const uploadTask = await uploadBytes(imageRef, buffer, metadata);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw the error to be handled in the calling function
  }
}


// async function uploadImage( imageFile: any, cryptoCode: string){
//     const fileName = cryptoCode + imageFile.name;
//     const metadata = {
//         contentType: imageFile.type
//     }
//     const arrayBuffer = await imageFile.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const imageRef = ref(firbaseStorage, 'images/' + fileName);
//     const uploadTask = await uploadBytes(imageRef, buffer, metadata);
//     const downloadUrl = await getDownloadURL(uploadTask.ref);
//     return downloadUrl;
// }

// async function saveFile(imageFile:any) {
//   const fileName = imageFile.name; // Get the original filename
//   const filePath = path.join('public/', fileName); // Construct the path

//   try {
//     const arrayBuffer = await imageFile.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     await fs.writeFile(filePath, buffer); // Write the file to the public folder
//     console.log(`File saved successfully: ${filePath}`);
//   } catch (error) {
//     console.error(`Error saving file: ${error}`);
//     // Handle errors appropriately, e.g., return an error response
//   }
// }

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('productImage');
    // console.log("form data >> ",formData );
    let productData:any = {};
    formData.forEach(function(value, key){
        if(key !== 'productImage')
        productData[key] = value;
    });
    
    console.log(productData);
    const imageUrl = await uploadImage(file, productData.cryptoCode)
    // const body = await request.json();
    // console.log(imageUrl);
    // const imageUrl = "tempurl";
    // saveFile(file);
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
        console.log("Product >> ",product);
        const response = await DATABASE.product.create({data: product});
        console.log("Response >>",response)
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err); // Implement detailed error handling/logging in production
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
