"use client";
import React, { FC, ReactNode } from "react";
import { SessionProvider } from "@/context/SessionContext";
import { CartProvider } from "@/context/CartContext";
interface ProviderProps {
  children: ReactNode;
}
const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
};
export default Provider;
