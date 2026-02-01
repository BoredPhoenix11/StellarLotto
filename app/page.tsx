import { Header } from "@/components/header";
import { PrizePot } from "@/components/prize-pot";
import { CountdownTimer } from "@/components/countdown-timer";
import { UserStats } from "@/components/user-stats";
import { TicketPurchase } from "@/components/ticket-purchase";
import { RecentWinners } from "@/components/recent-winners";
import { PoolStats } from "@/components/pool-stats";
import { WalletProvider } from "@/contexts/wallet-context";
import { Toaster } from "@/components/ui/toaster";

export default function Dashboard() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Background gradients and effects */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Large ambient glow - top */}
          <div className="absolute -top-1/4 left-1/4 w-[800px] h-[800px] bg-purple/10 rounded-full blur-[150px]" />
          <div className="absolute -top-1/4 right-1/4 w-[600px] h-[600px] bg-cyan/10 rounded-full blur-[150px]" />
          
          {/* Large ambient glow - bottom */}
          <div className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] bg-cyan/5 rounded-full blur-[150px]" />
          <div className="absolute -bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px]" />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        
        <Header />
        
        <main className="relative z-10 pt-24 pb-12 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Pool Stats - Top Bar */}
            <div className="mb-8">
              <PoolStats />
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Sidebar - User Stats */}
              <div className="lg:col-span-3 order-2 lg:order-1">
                <UserStats />
              </div>
              
              {/* Center - Prize Pot & Timer */}
              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col">
                {/* Prize Pot */}
                <div className="flex-1 flex items-center justify-center py-12 md:py-16 lg:py-20">
                  <PrizePot />
                </div>
                
                {/* Countdown Timer */}
                <div className="max-w-md mx-auto w-full">
                  <CountdownTimer />
                </div>
              </div>
              
              {/* Right Sidebar - Get Tickets */}
              <div className="lg:col-span-3 order-3">
                <TicketPurchase />
              </div>
            </div>
            
            {/* Recent Winners - Bottom Section */}
            <div className="mt-8 max-w-2xl mx-auto">
              <RecentWinners />
            </div>
            
            {/* Footer note */}
            <div className="mt-12 text-center">
              <p className="text-xs text-muted-foreground">
                Powered by <span className="text-cyan">Stellar</span> Network • 
                Smart Contract: <span className="font-mono">CA7X...9TZQ</span>
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="text-xs text-muted-foreground/70 hover:text-muted-foreground cursor-pointer transition-colors">Terms</span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-xs text-muted-foreground/70 hover:text-muted-foreground cursor-pointer transition-colors">Privacy</span>
                <span className="text-muted-foreground/30">•</span>
                <span className="text-xs text-muted-foreground/70 hover:text-muted-foreground cursor-pointer transition-colors">Audit Report</span>
              </div>
            </div>
          </div>
        </main>
        <Toaster />
      </div>
    </WalletProvider>
  );
}
