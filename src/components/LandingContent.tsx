import { useState, useEffect } from 'react';
import { ShoppingBag, Send } from 'lucide-react';

interface LandingContentProps {
  onEnterShop: () => void;
  onEnterTelegram: () => void;
}

export default function LandingContent({ onEnterShop, onEnterTelegram }: LandingContentProps) {
  const [totalVisitors, setTotalVisitors] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedTotal = localStorage.getItem('shinsukee_total_visitors');
    const lastVisit = localStorage.getItem('shinsukee_last_visit');
    
    // Starts at 0, then the +1 logic makes it 1 on the first visit.
    let currentTotal = savedTotal ? parseInt(savedTotal, 10) : 57; 

    if (lastVisit !== today) {
      currentTotal += 1;
      localStorage.setItem('shinsukee_total_visitors', currentTotal.toString());
      localStorage.setItem('shinsukee_last_visit', today);
    }

    setTotalVisitors(currentTotal);
  }, []);

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-8">
      
      {/* --- TOP RIGHT: ONLINE & VISITOR COUNTER (Same Format) --- */}
      <div className="absolute top-4 right-4 flex flex-col items-end gap-1 animate-reveal delay-500">
        
        {/* ONLINE */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#5fbf6f] rounded-full animate-pulse" />
          <span className="font-retro text-sm text-[#a8896a]">ONLINE</span>
        </div>

        {/* VISITORS */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#5fbf6f] rounded-full animate-pulse" />
          <span className="font-retro text-sm text-[#a8896a]">
            VISITORS: {totalVisitors !== null ? totalVisitors.toLocaleString() : '...'}
          </span>
        </div>

      </div>

      {/* --- HEADER --- */}
      <div className="text-center mb-10 animate-reveal">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="grid grid-cols-4 gap-0">
            <div className="w-3 h-3 bg-[#f0a830]" />
            <div className="w-3 h-3 bg-[#ffd966]" />
            <div className="w-3 h-3 bg-[#f0a830]" />
            <div className="w-3 h-3" />
            <div className="w-3 h-3 bg-[#ffd966]" />
            <div className="w-3 h-3 bg-[#f0a830]" />
            <div className="w-3 h-3 bg-[#ffd966]" />
            <div className="w-3 h-3 bg-[#8b6f54]" />
            <div className="w-3 h-3 bg-[#f0a830]" />
            <div className="w-3 h-3 bg-[#ffd966]" />
            <div className="w-3 h-3 bg-[#f0a830]" />
            <div className="w-3 h-3" />
            <div className="w-3 h-3" />
            <div className="w-3 h-3 bg-[#8b6f54]" />
            <div className="w-3 h-3" />
            <div className="w-3 h-3" />
          </div>
        </div>
        <h1 className="font-pixel text-2xl sm:text-4xl text-[#ffd966] text-shadow-pixel text-glow-amber">
          SHINSUKEE
        </h1>
        <p className="font-retro text-lg sm:text-xl text-[#a8896a] mt-2">
          // index ui designed by shinn
        </p>
      </div>

      {/* --- BUTTONS --- */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={onEnterShop}
          className="group relative no-select animate-reveal delay-200"
        >
          <div className="relative flex items-center gap-4 px-10 py-6 sm:px-14 sm:py-7 bg-[#2a1f18] pixel-border cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 animate-bounce-soft">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 30px rgba(240, 168, 48, 0.5)' }} />
            <ShoppingBag className="w-7 h-7 sm:w-9 sm:h-9 text-[#ffd966] group-hover:text-[#f0a830] transition-colors" strokeWidth={2.5} />
            <span className="font-pixel text-sm sm:text-lg text-[#ffd966] group-hover:text-[#f0a830] transition-colors">
              SHOP
            </span>
            <span className="font-pixel text-sm sm:text-lg text-[#f0a830] animate-blink group-hover:text-[#ffd966] transition-colors">
              &gt;
            </span>
          </div>
        </button>

        <div className="flex flex-col items-center gap-1 animate-reveal delay-300">
          <div className="w-1.5 h-1.5 bg-[#6b5240]" />
          <div className="w-1.5 h-1.5 bg-[#8b6f54]" />
          <div className="w-1.5 h-1.5 bg-[#a8896a]" />
        </div>

        <button
          onClick={onEnterTelegram}
          className="group relative no-select animate-reveal delay-400"
        >
          <div className="relative flex items-center gap-4 px-10 py-6 sm:px-14 sm:py-7 bg-[#2a1f18] pixel-border-thick cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 animate-bounce-soft delay-200">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: '0 0 30px rgba(95, 191, 111, 0.4)' }} />
            <Send className="w-7 h-7 sm:w-9 sm:h-9 text-[#5fbf6f] group-hover:text-[#7dd97d] transition-colors" strokeWidth={2.5} />
            <span className="font-pixel text-xs sm:text-base text-[#a8896a] group-hover:text-[#f5e6c8] transition-colors">
              TELEGRAM CHANNEL
            </span>
            <span className="font-pixel text-sm sm:text-lg text-[#5fbf6f] animate-blink group-hover:text-[#7dd97d] transition-colors">
              &gt;
            </span>
          </div>
        </button>
      </div>

      {/* --- DECORATIONS --- */}
      <div className="absolute bottom-6 left-4 sm:left-8 animate-float no-select hidden sm:block">
        <div className="grid grid-cols-5 gap-0 opacity-60">
          <div className="w-3 h-3" /><div className="w-3 h-3 bg-[#f0a830]" /><div className="w-3 h-3 bg-[#f0a830]" /><div className="w-3 h-3 bg-[#f0a830]" /><div className="w-3 h-3" />
          <div className="w-3 h-3 bg-[#f0a830]" /><div className="w-3 h-3 bg-[#ffd966]" /><div className="w-3 h-3 bg-[#ffd966]" /><div className="w-3 h-3 bg-[#ffd966]" /><div className="w-3 h-3 bg-[#f0a830]" />
          <div className="w-3 h-3 bg-[#8b6f54]" /><div className="w-3 h-3 bg-[#f5e6c8]" /><div className="w-3 h-3 bg-[#f5e6c8]" /><div className="w-3 h-3 bg-[#f5e6c8]" /><div className="w-3 h-3 bg-[#8b6f54]" />
          <div className="w-3 h-3" /><div className="w-3 h-3 bg-[#523d2e]" /><div className="w-3 h-3 bg-[#523d2e]" /><div className="w-3 h-3 bg-[#523d2e]" /><div className="w-3 h-3" />
        </div>
      </div>

      <div className="absolute bottom-6 right-4 sm:right-8 animate-float-rev no-select hidden sm:block">
        <div className="grid grid-cols-5 gap-0 opacity-60">
          <div className="w-3 h-3" /><div className="w-3 h-3 bg-[#e87d8b]" /><div className="w-3 h-3 bg-[#e87d8b]" /><div className="w-3 h-3 bg-[#e87d8b]" /><div className="w-3 h-3" />
          <div className="w-3 h-3 bg-[#e87d8b]" /><div className="w-3 h-3 bg-[#f5e6c8]" /><div className="w-3 h-3 bg-[#f5e6c8]" /><div className="w-3 h-3 bg-[#f5e6c8]" /><div className="w-3 h-3 bg-[#e87d8b]" />
          <div className="w-3 h-3 bg-[#a8896a]" /><div className="w-3 h-3" /><div className="w-3 h-3" /><div className="w-3 h-3" /><div className="w-3 h-3 bg-[#a8896a]" />
          <div className="w-3 h-3" /><div className="w-3 h-3 bg-[#523d2e]" /><div className="w-3 h-3 bg-[#523d2e]" /><div className="w-3 h-3 bg-[#523d2e]" /><div className="w-3 h-3" />
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-reveal delay-700">
        <p className="font-retro text-sm text-[#6b5240] whitespace-nowrap">
          ▓▒░ shinsukee v1.0 ░▒▓
        </p>
      </div>
    </div>
  );
}
