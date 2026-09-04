"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/lib/firebase"; // We will use this when Firebase is configured
// import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
  isAdmin: boolean;
  login: (pin: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Session is now memory-only for testing the password prompt.
    // To require a PIN on every refresh.
  }, []);

  const login = (pin: string) => {
    if (pin === "7777") {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
