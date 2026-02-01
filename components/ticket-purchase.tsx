"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Ticket, ArrowRight, Shield, Info, Loader2, Wallet } from "lucide-react";
import { useWallet } from "@/contexts/wallet-context";
import { HowItWorksModal } from "./how-it-works-modal";
import { useToast } from "@/hooks/use-toast";

export function TicketPurchase() {
  const [amount, setAmount] = useState([500]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const { isConnected, balance, deposit, connect, isLoading } = useWallet();
  const { toast } = useToast();
  
  const ticketCount = Math.floor(amount[0] / 50);
  const estimatedOdds = (amount[0] / 54320 * 100).toFixed(2);
  const maxDeposit = isConnected ? Math.min(balance, 10000) : 10000;
  
  const handleDeposit = async () => {
    if (!isConnected) {
      await connect();
      toast({
        title: "Wallet Connected",
        description: "You can now deposit and enter the lottery.",
      });
      return;
    }
    
    if (amount[0] > balance) {
      toast({
        title: "Insufficient Balance",
        description: `You only have $${balance.toLocaleString()} USDC available.`,
        variant: "destructive",
      });
      return;
    }
    
    const success = await deposit(amount[0]);
    if (success) {
      toast({
        title: "Deposit Successful!",
        description: `You deposited $${amount[0].toLocaleString()} USDC and received ${ticketCount} tickets.`,
      });
      setAmount([500]);
    } else {
      toast({
        title: "Transaction Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative backdrop-blur-xl bg-glass border border-glass-border rounded-2xl p-6 overflow-hidden h-full">
      {/* Background effects */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-cyan/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Ticket className="w-4 h-4 text-cyan" />
          <h2 className="text-sm font-semibold text-foreground tracking-wider uppercase">
            Get Tickets
          </h2>
        </div>
        
        {/* Amount display */}
        <div className="text-center mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Deposit Amount
          </p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold text-foreground">
              ${amount[0].toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">USDC</span>
          </div>
        </div>
        
        {/* Slider */}
        <div className="mb-8 px-2">
          <Slider
            value={amount}
            onValueChange={setAmount}
            min={50}
            max={maxDeposit}
            step={50}
            className="w-full"
            disabled={isLoading}
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>$50</span>
            <span>$10,000</span>
          </div>
        </div>
        
        {/* Ticket info */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-secondary/40 border border-border/30 text-center">
            <p className="text-2xl font-bold text-cyan">{ticketCount}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Tickets</p>
          </div>
          <div className="p-3 rounded-xl bg-secondary/40 border border-border/30 text-center">
            <p className="text-2xl font-bold text-purple">{estimatedOdds}%</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Win Chance</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <Button 
          onClick={handleDeposit}
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-cyan via-cyan to-purple hover:opacity-90 text-background font-semibold rounded-xl shadow-[0_0_30px_var(--cyan-glow)] transition-all hover:shadow-[0_0_40px_var(--cyan-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : !isConnected ? (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          ) : (
            <>
              Deposit & Enter
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
        
        {/* Safety note */}
        <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-gold/5 border border-gold/10">
          <Shield className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-foreground font-medium">No Loss Guarantee</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Your principal is always safe. Only yield is at stake.
            </p>
          </div>
        </div>
        
        {/* Info tooltip */}
        <button 
          onClick={() => setShowHowItWorks(true)}
          className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
        >
          <Info className="w-3 h-3" />
          How does this work?
        </button>
        
        {/* Balance indicator when connected */}
        {isConnected && (
          <div className="mt-3 text-center">
            <p className="text-xs text-muted-foreground">
              Available: <span className="text-foreground font-medium">${balance.toLocaleString()} USDC</span>
            </p>
          </div>
        )}
      </div>
      
      <HowItWorksModal open={showHowItWorks} onOpenChange={setShowHowItWorks} />
    </div>
  );
}
