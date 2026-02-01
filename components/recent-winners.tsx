"use client";

import { Trophy, ExternalLink } from "lucide-react";

const winners = [
  { address: "GCXZ...P2QR", prize: "$42,150", time: "2h ago", txHash: "abc123def456" },
  { address: "GBNH...K9LM", prize: "$38,920", time: "1d ago", txHash: "ghi789jkl012" },
  { address: "GDVW...T5XY", prize: "$51,340", time: "3d ago", txHash: "mno345pqr678" },
];

export function RecentWinners() {
  return (
    <div className="relative backdrop-blur-xl bg-glass border border-glass-border rounded-2xl p-5 overflow-hidden">
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-gold" />
          <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">
            Recent Winners
          </h3>
        </div>
        
        <div className="space-y-3">
          {winners.map((winner, i) => (
            <a
              key={i}
              href={`https://stellar.expert/explorer/public/tx/${winner.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30 group hover:border-gold/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-purple/20 flex items-center justify-center border border-gold/20">
                  <span className="text-xs font-bold text-gold">#{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-mono text-foreground">{winner.address}</p>
                  <p className="text-xs text-muted-foreground">{winner.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gold">{winner.prize}</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
