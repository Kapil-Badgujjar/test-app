'use client'
// SessionContext.tsx

import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the shape of the session data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  profilePicture: string;
  phoneNumber: string;
}

interface SessionContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with a default value
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Define the props for the provider component
interface SessionProviderProps {
  children: ReactNode;
}

// Create a provider component
export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to simulate user login
  const login = (newUser: User) => {
    setUser(newUser);
  };

  // Function to simulate user logout
  const logout = () => {
    setUser(null);
  };

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

// Hook to use the session context
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
