"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  principal: number;
  tickets: number;
  yieldEarned: number;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  deposit: (amount: number) => Promise<boolean>;
  withdraw: () => Promise<boolean>;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: 0,
    principal: 0,
    tickets: 0,
    yieldEarned: 0,
  });

  const connect = useCallback(async () => {
    setIsLoading(true);
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setWallet({
      isConnected: true,
      address: "GCD5X7KFQP9YZ3M2NLVH8STRW4JE6A0BC1DG7UK4FQ",
      balance: 5000,
      principal: 2500,
      tickets: 50,
      yieldEarned: 127.43,
    });
    setIsLoading(false);
  }, []);

  const disconnect = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      balance: 0,
      principal: 0,
      tickets: 0,
      yieldEarned: 0,
    });
  }, []);

  const deposit = useCallback(async (amount: number): Promise<boolean> => {
    if (!wallet.isConnected) return false;
    if (amount > wallet.balance) return false;
    
    setIsLoading(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newTickets = Math.floor(amount / 50);
    setWallet(prev => ({
      ...prev,
      balance: prev.balance - amount,
      principal: prev.principal + amount,
      tickets: prev.tickets + newTickets,
    }));
    setIsLoading(false);
    return true;
  }, [wallet.isConnected, wallet.balance]);

  const withdraw = useCallback(async (): Promise<boolean> => {
    if (!wallet.isConnected || wallet.principal <= 0) return false;
    
    setIsLoading(true);
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setWallet(prev => ({
      ...prev,
      balance: prev.balance + prev.principal + prev.yieldEarned,
      principal: 0,
      tickets: 0,
      yieldEarned: 0,
    }));
    setIsLoading(false);
    return true;
  }, [wallet.isConnected, wallet.principal]);

  return (
    <WalletContext.Provider value={{ ...wallet, connect, disconnect, deposit, withdraw, isLoading }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
