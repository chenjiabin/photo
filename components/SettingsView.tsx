import React, { useState } from 'react';
import { Monitor, Printer, Camera, Palette, ToggleLeft, ToggleRight, ChevronRight } from 'lucide-react';

const SettingSection: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2 mb-3 px-2">
      <Icon size={18} className="text-primary" />
      <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{title}</h3>
    </div>
    <div className="bg-surface rounded-xl border border-white/5 overflow-hidden divide-y divide-white/5">
      {children}
    </div>
  </div>
);

const ToggleRow: React.FC<{ label: string; value: boolean; onChange: () => void }> = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between p-4 active:bg-white/5 cursor-pointer" onClick={onChange}>
    <span className="text-slate-200 font-medium">{label}</span>
    {value ? (
      <ToggleRight size={28} className="text-primary" />
    ) : (
      <ToggleLeft size={28} className="text-slate-600" />
    )}
  </div>
);

const LinkRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between p-4 active:bg-white/5 cursor-pointer">
    <span className="text-slate-200 font-medium">{label}</span>
    <div className="flex items-center gap-2">
      {value && <span className="text-slate-400 text-sm">{value}</span>}
      <ChevronRight size={18} className="text-slate-500" />
    </div>
  </div>
);

export const SettingsView: React.FC = () => {
  const [config, setConfig] = useState({
    autoPrint: false,
    saveToCloud: true,
    showQrCode: true,
    beautyFilter: true,
    countdown: true,
  });

  const toggle = (key: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h2 className="text-2xl font-bold text-white mb-6 px-1">Configuration</h2>

      <SettingSection title="Workflow" icon={Monitor}>
        <ToggleRow label="Show QR Code" value={config.showQrCode} onChange={() => toggle('showQrCode')} />
        <ToggleRow label="Auto-Save to Cloud" value={config.saveToCloud} onChange={() => toggle('saveToCloud')} />
        <LinkRow label="Event Name" value="Summer Party '24" />
      </SettingSection>

      <SettingSection title="Hardware" icon={Printer}>
        <ToggleRow label="Auto Print" value={config.autoPrint} onChange={() => toggle('autoPrint')} />
        <LinkRow label="Printer Settings" value="Canon Selphy" />
        <LinkRow label="Camera Source" value="DSLR Main" />
      </SettingSection>

      <SettingSection title="Processing" icon={Palette}>
         <ToggleRow label="Apply Beauty Filter" value={config.beautyFilter} onChange={() => toggle('beautyFilter')} />
         <LinkRow label="Watermark Overlay" value="pixel_logo.png" />
      </SettingSection>
      
      <div className="mt-8 px-2">
        <button className="w-full py-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl font-semibold hover:bg-red-500/20 transition-colors">
            System Reboot
        </button>
        <p className="text-center text-xs text-slate-600 mt-4">Version 2.4.0 • Build 8821</p>
      </div>
    </div>
  );
};