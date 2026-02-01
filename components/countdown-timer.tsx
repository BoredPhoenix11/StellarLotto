"use client";

import { useEffect, useState } from "react";

export function CountdownTimer() {
  const [time, setTime] = useState({ hours: 14, minutes: 2, seconds: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="relative">
      {/* Glassmorphism card */}
      <div className="relative backdrop-blur-xl bg-glass border border-glass-border rounded-2xl p-6 md:p-8 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-purple/5 pointer-events-none" />
        
        {/* Glow accent */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple/20 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <p className="text-muted-foreground text-sm font-medium tracking-wider uppercase mb-4 text-center">
            Next Draw
          </p>
          
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {/* Hours */}
            <TimeUnit value={formatNumber(time.hours)} label="HRS" />
            <Separator />
            {/* Minutes */}
            <TimeUnit value={formatNumber(time.minutes)} label="MIN" />
            <Separator />
            {/* Seconds */}
            <TimeUnit value={formatNumber(time.seconds)} label="SEC" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-secondary/50 rounded-xl px-4 py-3 md:px-6 md:py-4 border border-border/50">
        <span className="text-3xl md:text-4xl font-bold text-foreground font-mono tracking-wider">
          {value}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-2 tracking-wider">{label}</span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-2xl md:text-3xl font-bold text-cyan mb-6">:</span>
  );
}
