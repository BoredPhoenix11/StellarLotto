"use client";

import { Users, Layers, Zap, TrendingUp } from "lucide-react";

const poolStats = [
  { label: "Total Deposited", value: "$1.24M", icon: Layers, trend: "+12.4%" },
  { label: "Active Players", value: "2,847", icon: Users, trend: "+156" },
  { label: "Current APY", value: "5.1%", icon: TrendingUp, trend: null },
  { label: "Draws Completed", value: "847", icon: Zap, trend: null },
];

export function PoolStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {poolStats.map((stat) => (
        <div 
          key={stat.label}
          className="relative backdrop-blur-xl bg-glass border border-glass-border rounded-xl p-4 overflow-hidden group hover:border-cyan/30 transition-colors"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-4 h-4 text-muted-foreground" />
              {stat.trend && (
                <span className="text-xs text-green-400 font-medium">{stat.trend}</span>
              )}
            </div>
            <p className="text-xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
