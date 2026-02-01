"use client";

import { useEffect, useState } from "react";

export function PrizePot() {
  const [displayAmount, setDisplayAmount] = useState(54320);
  
  // Subtle animation to make the number feel alive
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayAmount(prev => prev + Math.random() * 0.5);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Glow effects */}
      <div className="absolute inset-0 blur-3xl opacity-30 bg-gold rounded-full scale-150" />
      <div className="absolute inset-0 blur-xl opacity-20 bg-cyan rounded-full scale-125" />
      
      {/* Prize label */}
      <span className="text-muted-foreground text-sm font-medium tracking-[0.3em] uppercase mb-4">
        Prize Pot
      </span>
      
      {/* Main prize display */}
      <div className="relative">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gold drop-shadow-[0_0_30px_var(--gold-glow)]">
          ${displayAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </h1>
        <span className="absolute -right-16 md:-right-20 top-1/2 -translate-y-1/2 text-lg md:text-xl font-semibold text-gold/80">
          USDC
        </span>
      </div>
      
      {/* Decorative line */}
      <div className="mt-6 w-48 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
    </div>
  );
}
