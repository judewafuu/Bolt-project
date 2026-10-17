import { useState } from 'react';

interface IntroOverlayProps {
  onEnter: () => void;
}

export default function IntroOverlay({ onEnter }: IntroOverlayProps) {
  const [exiting, setExiting] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleClick = () => {
    if (shaking || exiting) return;
    setShaking(true);
    setTimeout(() => {
      setExiting(true);
      setTimeout(onEnter, 800);
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ${
        exiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backdropFilter: exiting ? 'blur(0px)' : 'blur(12px)',
        background: 'radial-gradient(ellipse at center, rgba(42,31,24,0.85) 0%, rgba(26,20,16,0.97) 100%)',
      }}
    >
      <div className="absolute inset-0 pixel-grid-bg opacity-20" />

      <div className="absolute top-[15%] left-[15%] w-6 h-6 animate-float opacity-60" style={{ backgroundColor: '#f0a830', animationDelay: '0s' }} />
      <div className="absolute top-[20%] right-[18%] w-8 h-8 animate-float-rev opacity-50" style={{ backgroundColor: '#8b6f54', animationDelay: '1s' }} />
      <div className="absolute bottom-[18%] left-[22%] w-5 h-5 animate-spin-slow opacity-50" style={{ backgroundColor: '#ffd966', animationDelay: '0.5s' }} />
      <div className="absolute bottom-[22%] right-[20%] w-7 h-7 animate-float opacity-40" style={{ backgroundColor: '#a8896a', animationDelay: '1.5s' }} />

      <div className="relative flex flex-col items-center gap-6 px-4">
        <div className={`text-center mb-2 ${exiting ? 'opacity-0 -translate-y-4' : 'opacity-100'} transition-all duration-500`}>
          <h1 className="font-pixel text-2xl sm:text-4xl text-[#ffd966] text-glow-amber mb-3 animate-pop">
            SHINSUKEE
          </h1>
          <p className="font-retro text-xl sm:text-2xl text-[#a8896a] animate-blink">
            &gt; TAP TO ENTER &lt;
          </p>
        </div>

        <button
          onClick={handleClick}
          className={`relative group no-select animate-pulse-glow ${shaking ? 'animate-shake' : ''} ${exiting ? 'scale-0 opacity-0' : 'animate-pop'}`}
          style={{ transition: exiting ? 'all 0.6s cubic-bezier(0.5,0,0.75,0)' : 'none' }}
        >
          <div className="relative flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 bg-[#2a1f18] pixel-border cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150">
            <svg
              width="56"
              height="56"
              viewBox="0 0 16 16"
              className="text-[#ffd966] group-hover:text-[#f0a830] transition-colors"
              shapeRendering="crispEdges"
            >
              <rect x="4" y="4" width="8" height="1" fill="currentColor" />
              <rect x="4" y="5" width="2" height="6" fill="currentColor" />
              <rect x="6" y="6" width="2" height="4" fill="currentColor" />
              <rect x="8" y="7" width="2" height="2" fill="currentColor" />
              <rect x="10" y="7" width="2" height="2" fill="currentColor" />
              <rect x="4" y="11" width="8" height="1" fill="currentColor" />
            </svg>
            <span className="font-pixel text-[8px] sm:text-[10px] text-[#f0a830] mt-2 group-hover:text-[#ffd966] transition-colors">
              START
            </span>
          </div>
        </button>

        <div className={`flex items-center gap-2 mt-2 ${exiting ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 animate-bounce-soft"
              style={{
                backgroundColor: i % 2 === 0 ? '#f0a830' : '#a8896a',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
