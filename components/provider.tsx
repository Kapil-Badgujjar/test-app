'use client';
import React, { FC, ReactNode } from 'react';
import { SessionProvider } from '@/context/SessionContext';
interface ProviderProps {
  children: ReactNode;
}
const Provider: FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
export default Provider;
