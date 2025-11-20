import React, { useState, useEffect } from 'react';
import { Tab, BoothStatus, Photo } from './types';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { GalleryView } from './components/GalleryView';
import { RemoteView } from './components/RemoteView';
import { SettingsView } from './components/SettingsView';
import { Sparkles } from 'lucide-react';

// Initial dummy data
const initialPhotos: Photo[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `photo-${i}`,
  url: `https://picsum.photos/400/600?random=${i}`,
  timestamp: new Date(Date.now() - i * 1000 * 60 * 15), // staggered by 15 mins
}));

const initialStatus: BoothStatus = {
  isOnline: true,
  paperLevel: 45,
  printerStatus: 'Ready',
  sessionCount: 142,
  revenue: 850.00
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [status, setStatus] = useState<BoothStatus>(initialStatus);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update status slightly
      setStatus(prev => ({
        ...prev,
        paperLevel: Math.max(0, prev.paperLevel - (Math.random() > 0.9 ? 1 : 0)),
        sessionCount: prev.sessionCount + (Math.random() > 0.95 ? 1 : 0)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDeletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD:
        return <DashboardView status={status} />;
      case Tab.GALLERY:
        return <GalleryView photos={photos} onDelete={handleDeletePhoto} />;
      case Tab.REMOTE:
        return <RemoteView />;
      case Tab.SETTINGS:
        return <SettingsView />;
      default:
        return <DashboardView status={status} />;
    }
  };

  return (
    <div className="min-h-screen bg-page text-slate-800 font-sans selection:bg-primary/20">
      <div className="max-w-md mx-auto bg-page min-h-screen relative shadow-2xl shadow-slate-200 overflow-hidden">
        
        {/* Decorative background blobs */}
        <div className="fixed top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="fixed bottom-20 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

        {/* Top Bar / Header - Hidden on Remote for full immersion */}
        {activeTab !== Tab.REMOTE && (
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-5 py-4 flex items-center justify-between transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-glow transform rotate-3">
                        <Sparkles className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <h1 className="font-extrabold text-xl tracking-tight text-slate-800">Pixel<span className="text-primary">Booth</span></h1>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manager</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                     <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400">STATUS</span>
                     </div>
                     <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse-fast shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                </div>
            </header>
        )}

        {/* Main Content Area */}
        <main className="relative z-0">
          {renderContent()}
        </main>

        {/* Navigation */}
        <BottomNav currentTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}