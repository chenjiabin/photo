import React, { useState } from 'react';
import { Camera, Timer, RotateCcw, Zap, ZapOff } from 'lucide-react';

export const RemoteView: React.FC = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(true);

  const handleCapture = () => {
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        // Trigger actual capture logic here
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-black relative pb-20">
      {/* Live View Simulation */}
      <div className="flex-1 bg-slate-800 relative overflow-hidden">
        {/* Simulated Camera Feed */}
        <img 
           src="https://picsum.photos/800/1200?grayscale" 
           alt="Live Feed" 
           className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {countdown ? (
             <span className="text-9xl font-bold text-white animate-ping">{countdown}</span>
          ) : (
             <span className="px-4 py-2 bg-black/50 rounded-full text-xs text-white/70 backdrop-blur-sm">
               Live Preview
             </span>
          )}
        </div>
        
        {/* Overlays */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
           <button 
             onClick={() => setFlashEnabled(!flashEnabled)}
             className={`p-3 rounded-full backdrop-blur-md ${flashEnabled ? 'bg-yellow-500 text-black' : 'bg-black/40 text-white'}`}
           >
             {flashEnabled ? <Zap size={20} fill="black" /> : <ZapOff size={20} />}
           </button>
           <button className="p-3 rounded-full bg-black/40 text-white backdrop-blur-md">
             <Timer size={20} />
           </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-surface p-6 rounded-t-3xl -mt-6 z-10 border-t border-white/10">
        <div className="flex items-center justify-between gap-8">
           <button className="flex flex-col items-center text-slate-400 gap-1 active:scale-90 transition-transform">
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                <RotateCcw size={20} />
             </div>
             <span className="text-xs">Reset</span>
           </button>

           <button 
             onClick={handleCapture}
             className="w-20 h-20 rounded-full bg-white border-4 border-primary/50 relative flex items-center justify-center active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]"
           >
             <div className="w-16 h-16 rounded-full bg-primary border-2 border-white" />
           </button>
           
            <button className="flex flex-col items-center text-slate-400 gap-1 active:scale-90 transition-transform">
             <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/5">
                <div className="w-6 h-6 rounded bg-slate-600" />
             </div>
             <span className="text-xs">Last Shot</span>
           </button>
        </div>
      </div>
    </div>
  );
};