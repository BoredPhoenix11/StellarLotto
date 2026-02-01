"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hexagon, Bell, ChevronDown, LogOut, Loader2, Copy, ExternalLink, Check } from "lucide-react";
import { useWallet } from "@/contexts/wallet-context";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { isConnected, address, balance, connect, disconnect, isLoading } = useWallet();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");
  
  const shortAddress = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
  
  const handleConnect = async () => {
    await connect();
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to Stellar network.",
    });
  };
  
  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };
  
  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard.",
      });
    }
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Hexagon className="w-8 h-8 text-cyan fill-cyan/20" />
            <div className="absolute inset-0 blur-md bg-cyan/30 rounded-full" />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Stellar<span className="text-gold">Lotto</span>
          </span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {["Dashboard", "History", "Leaderboard", "Docs"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveNav(item);
                if (item !== "Dashboard") {
                  toast({
                    title: `${item} Coming Soon`,
                    description: `The ${item.toLowerCase()} feature is under development.`,
                  });
                }
              }}
              className={`text-sm font-medium transition-colors ${
                activeNav === item 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {isConnected && (
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gold rounded-full animate-pulse" />
            </Button>
          )}
          
          <div className="h-6 w-px bg-border/50 hidden sm:block" />
          
          {isConnected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="hidden sm:flex items-center gap-2 bg-secondary/50 border-border/50 hover:border-cyan/50 hover:bg-secondary transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-xs font-bold text-background">
                    {address?.charAt(0) || "A"}
                  </div>
                  <span className="text-sm font-mono text-foreground">{shortAddress}</span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border/50 backdrop-blur-xl">
                <div className="px-3 py-2">
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="text-sm font-semibold text-foreground">${balance.toLocaleString()} USDC</p>
                </div>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
                  {copied ? <Check className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
                  {copied ? "Copied!" : "Copy Address"}
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <a href={`https://stellar.expert/explorer/public/account/${address}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Explorer
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/50" />
                <DropdownMenuItem onClick={handleDisconnect} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={handleConnect}
              disabled={isLoading}
              className="hidden sm:flex bg-cyan hover:bg-cyan/90 text-background"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Wallet"
              )}
            </Button>
          )}
          
          {/* Mobile connect button */}
          {!isConnected && (
            <Button 
              onClick={handleConnect}
              disabled={isLoading}
              className="sm:hidden bg-cyan hover:bg-cyan/90 text-background"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect"}
            </Button>
          )}
          
          {/* Mobile wallet indicator */}
          {isConnected && (
            <Button 
              variant="outline"
              onClick={handleDisconnect}
              className="sm:hidden border-border/50 bg-transparent"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan to-purple" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
