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
    <div className="h-screen flex flex-col bg-black relative">
      {/* Live View Simulation */}
      <div className="flex-1 bg-slate-900 relative overflow-hidden rounded-b-3xl shadow-2xl z-10">
        {/* Simulated Camera Feed */}
        <img 
           src="https://picsum.photos/800/1200?grayscale" 
           alt="Live Feed" 
           className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {countdown ? (
             <span className="text-9xl font-black text-white animate-bounce-slow drop-shadow-2xl">{countdown}</span>
          ) : (
             <div className="px-4 py-2 bg-black/30 rounded-full backdrop-blur-md border border-white/20">
                <span className="text-xs text-white font-bold tracking-wider uppercase">Live Preview • 4K</span>
             </div>
          )}
        </div>
        
        {/* Overlays */}
        <div className="absolute top-6 right-6 flex flex-col gap-3">
           <button 
             onClick={() => setFlashEnabled(!flashEnabled)}
             className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg ${flashEnabled ? 'bg-yellow-400 text-yellow-900' : 'bg-white/20 text-white'}`}
           >
             {flashEnabled ? <Zap size={20} className="fill-current" /> : <ZapOff size={20} />}
           </button>
           <button className="w-12 h-12 rounded-full flex items-center justify-center bg-white/20 text-white backdrop-blur-md transition-all hover:bg-white/30">
             <Timer size={20} />
           </button>
        </div>
      </div>

      {/* Controls - White and Clean */}
      <div className="bg-white pt-10 pb-28 px-8 -mt-6 relative z-0">
        <div className="flex items-center justify-between gap-8 max-w-xs mx-auto">
           <button className="flex flex-col items-center gap-2 group">
             <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-active:scale-95 transition-all text-slate-500 group-hover:text-slate-800">
                <RotateCcw size={22} />
             </div>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Reset</span>
           </button>

           <button 
             onClick={handleCapture}
             className="w-24 h-24 rounded-full bg-white border-[6px] border-slate-100 relative flex items-center justify-center active:scale-90 transition-all shadow-glow group"
           >
             <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-pink-600 border-4 border-white shadow-inner" />
           </button>
           
            <button className="flex flex-col items-center gap-2 group">
             <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-active:scale-95 transition-all overflow-hidden">
                <img src="https://picsum.photos/100/100" className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
             </div>
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gallery</span>
           </button>
        </div>
      </div>
    </div>
  );
};