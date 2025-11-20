import React from 'react';
import { LayoutDashboard, Images, Smartphone, Settings } from 'lucide-react';
import { Tab } from '../types';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: Tab.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
    { id: Tab.GALLERY, label: 'Gallery', icon: Images },
    { id: Tab.REMOTE, label: 'Remote', icon: Smartphone },
    { id: Tab.SETTINGS, label: 'Config', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-white/10 pb-safe pt-2 px-4 z-50">
      <div className="flex justify-around items-center pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-16 h-14 transition-all duration-200 ${
                isActive ? 'text-primary scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};