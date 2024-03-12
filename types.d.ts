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

interface CartProduct {
  id: string;
  quantity: number;
  product:{
      id:string;
      image:string;
      offer:number;
      price:number;
      productName:string;
  }
}