"use client";

import { Wallet, TrendingUp, Percent, Sparkles, LogIn, ArrowDownToLine, Loader2 } from "lucide-react";
import { useWallet } from "@/contexts/wallet-context";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function UserStats() {
  const { isConnected, address, principal, tickets, yieldEarned, connect, withdraw, isLoading } = useWallet();
  const { toast } = useToast();
  
  const odds = tickets > 0 ? (54320 / (principal + 54320) * 100).toFixed(1) : "0";
  const oddsRatio = tickets > 0 ? Math.round(54320 / principal) : 0;
  const shortAddress = address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
  
  const handleConnect = async () => {
    await connect();
    toast({
      title: "Wallet Connected",
      description: "Successfully connected to Stellar network.",
    });
  };
  
  const handleWithdraw = async () => {
    const success = await withdraw();
    if (success) {
      toast({
        title: "Withdrawal Successful",
        description: "Your principal and yield have been returned to your wallet.",
      });
    } else {
      toast({
        title: "Withdrawal Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      label: "My Principal",
      value: isConnected ? `$${principal.toLocaleString()}` : "--",
      subValue: "USDC",
      icon: Wallet,
      color: "cyan" as const,
    },
    {
      label: "My Odds",
      value: isConnected && tickets > 0 ? `1 in ${oddsRatio}` : "--",
      subValue: isConnected ? `${tickets} tickets` : "No tickets",
      icon: Percent,
      color: "purple" as const,
    },
    {
      label: "Total Yield Earned",
      value: isConnected ? `$${yieldEarned.toFixed(2)}` : "--",
      subValue: "+5.1% APY",
      icon: TrendingUp,
      color: "gold" as const,
    },
  ];

  return (
    <div className="relative backdrop-blur-xl bg-glass border border-glass-border rounded-2xl p-6 overflow-hidden h-full">
      {/* Background effects */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-gold" />
          <h2 className="text-sm font-semibold text-foreground tracking-wider uppercase">
            Your Position
          </h2>
        </div>
        
        {!isConnected ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-secondary/50 border border-border/50 flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your wallet to view your position
            </p>
            <Button
              onClick={handleConnect}
              disabled={isLoading}
              className="bg-cyan hover:bg-cyan/90 text-background"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {stats.map((stat) => (
                <StatCard key={stat.label} {...stat} />
              ))}
            </div>
            
            {/* Withdraw button */}
            {principal > 0 && (
              <Button
                onClick={handleWithdraw}
                disabled={isLoading}
                variant="outline"
                className="w-full mt-5 border-border/50 hover:border-gold/50 hover:bg-gold/5 text-foreground bg-transparent"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ArrowDownToLine className="w-4 h-4 mr-2" />
                    Withdraw All
                  </>
                )}
              </Button>
            )}
            
            {/* Connection status */}
            <div className="mt-6 pt-5 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Connected to Stellar</span>
              </div>
              <p className="text-xs text-muted-foreground/70 mt-1 font-mono truncate">
                {shortAddress}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  subValue, 
  icon: Icon, 
  color 
}: { 
  label: string; 
  value: string; 
  subValue: string; 
  icon: typeof Wallet;
  color: "cyan" | "purple" | "gold";
}) {
  const colorClasses = {
    cyan: "text-cyan bg-cyan/10 border-cyan/20",
    purple: "text-purple bg-purple/10 border-purple/20",
    gold: "text-gold bg-gold/10 border-gold/20",
  };

  const glowClasses = {
    cyan: "shadow-[0_0_20px_var(--cyan-glow)]",
    purple: "shadow-[0_0_20px_var(--purple-glow)]",
    gold: "shadow-[0_0_20px_var(--gold-glow)]",
  };

  return (
    <div className="group p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-border/60 transition-all duration-300 hover:bg-secondary/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-bold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
        </div>
        <div className={`p-2.5 rounded-lg border ${colorClasses[color]} ${glowClasses[color]} opacity-60 group-hover:opacity-100 transition-opacity`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
