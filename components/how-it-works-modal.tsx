"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Wallet, Coins, Trophy, Shield } from "lucide-react";

interface HowItWorksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    icon: Wallet,
    title: "1. Deposit USDC",
    description: "Connect your Stellar wallet and deposit USDC. Your principal is locked in a secure smart contract.",
    color: "cyan" as const,
  },
  {
    icon: Coins,
    title: "2. Earn Yield",
    description: "Your deposit generates yield through DeFi protocols. This yield becomes the prize pool.",
    color: "gold" as const,
  },
  {
    icon: Trophy,
    title: "3. Win Prizes",
    description: "Each week, a random winner takes the entire prize pool. More tickets = better odds.",
    color: "purple" as const,
  },
  {
    icon: Shield,
    title: "4. Never Lose",
    description: "Even if you don't win, your principal is always safe. Withdraw anytime with no loss.",
    color: "cyan" as const,
  },
];

export function HowItWorksModal({ open, onOpenChange }: HowItWorksModalProps) {
  const colorClasses = {
    cyan: "text-cyan bg-cyan/10 border-cyan/20",
    purple: "text-purple bg-purple/10 border-purple/20",
    gold: "text-gold bg-gold/10 border-gold/20",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 backdrop-blur-xl max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            How No Loss Lottery Works
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            A revolutionary DeFi protocol where you can win without risking your funds.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {steps.map((step) => (
            <div key={step.title} className="flex gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30">
              <div className={`p-3 rounded-lg border ${colorClasses[step.color]} shrink-0 h-fit`}>
                <step.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-4 rounded-xl bg-gold/5 border border-gold/10">
          <p className="text-sm text-foreground font-medium mb-1">Current APY: 5.1%</p>
          <p className="text-xs text-muted-foreground">
            Yield is generated through audited DeFi protocols on Stellar network.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
