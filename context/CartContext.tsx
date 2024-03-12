// CartContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
// import { CartProduct } from './types'; // Import the CartProduct type

interface CartContextType {
  setCartItems: (products:CartProduct[])=>void
  cartItems: CartProduct[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
  updateQuntity: ({id,quantity}:{id:string,quantity:number}) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);

  const addToCart = (newItem: CartProduct) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === newItem.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const updateQuntity = ({id,quantity}:{id:string,quantity:number}) => {
    setCartItems((prevItems) => prevItems.map(item => item.id === id ? {...item, quantity} : item));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ updateQuntity, setCartItems, cartItems, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
