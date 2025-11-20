import React, { useState, useEffect } from 'react';
import { Tab, BoothStatus, Photo } from './types';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { GalleryView } from './components/GalleryView';
import { RemoteView } from './components/RemoteView';
import { SettingsView } from './components/SettingsView';

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
    <div className="min-h-screen bg-dark text-slate-50 font-sans selection:bg-primary/30">
      <div className="max-w-md mx-auto bg-dark min-h-screen shadow-2xl relative">
        {/* Top Bar / Header - Hidden on Remote for full immersion */}
        {activeTab !== Tab.REMOTE && (
            <header className="sticky top-0 z-40 bg-dark/80 backdrop-blur-md border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="font-bold text-white text-lg">P</span>
                    </div>
                    <h1 className="font-bold text-lg tracking-tight">PixelBooth</h1>
                </div>
                <div className="flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-fast shadow-[0_0_10px_#22c55e]" />
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