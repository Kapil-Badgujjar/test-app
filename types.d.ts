interface ProductType {
    id: string;
    image: string;
    productName: string;
    price: number;
    category: string;
    description: string;
    stocks: number;
    offer: number;
  }

interface Product {
    productName: string;
    price: number;
    description: string;
    stocks: number;
    offer: number;
    category: string;
    image: string; // Assuming downloadUrl is a string URL to the image
    sellerId: string;
    isActive: boolean;
    isAssured: boolean;
    otherSpecifications: Record<string, any>; // Use unknown if the value types are varied and not known in advance
}

interface CartProduct {
  id: string;
  quantity: number;
  product:{
      id:string;
      image:string;
      offer:number;
      price:number;
      productName:string;
      sellerId:string;
  }
}