import React from 'react';
import { LayoutDashboard, Images, Smartphone, Settings } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: Tab.DASHBOARD, label: 'Overview', icon: LayoutDashboard, color: 'text-primary' },
    { id: Tab.GALLERY, label: 'Gallery', icon: Images, color: 'text-purple-500' },
    { id: Tab.REMOTE, label: 'Remote', icon: Smartphone, color: 'text-amber-500' },
    { id: Tab.SETTINGS, label: 'Config', icon: Settings, color: 'text-slate-600' },
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50 border border-white/50">
      <div className="flex justify-around items-center h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300 relative group ${
                isActive ? '' : 'hover:bg-slate-50'
              }`}
            >
              {/* Active Indicator Blob */}
              {isActive && (
                  <span className="absolute inset-0 bg-slate-100 rounded-2xl scale-75 animate-pulse opacity-50" />
              )}
              
              <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'text-slate-400'}`}>
                 <Icon 
                    size={isActive ? 26 : 24} 
                    strokeWidth={isActive ? 2.5 : 2}
                    className={isActive ? item.color : 'text-slate-300 group-hover:text-slate-400'}
                 />
              </div>
              
              <span className={`text-[10px] mt-1.5 font-bold transition-all duration-300 ${
                  isActive ? `opacity-100 translate-y-0 text-slate-800` : 'opacity-0 -translate-y-2 absolute bottom-2'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};