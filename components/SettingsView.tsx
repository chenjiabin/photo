import React, { useState } from 'react';
import { Monitor, Printer, Camera, Palette, ToggleLeft, ToggleRight, ChevronRight, Shield } from 'lucide-react';

const SettingSection: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
  <div className="mb-8">
    <div className="flex items-center gap-2 mb-4 px-2">
      <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
         <Icon size={16} />
      </div>
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
    </div>
    <div className="bg-white rounded-3xl shadow-soft border border-slate-50 overflow-hidden">
      {children}
    </div>
  </div>
);

const ToggleRow: React.FC<{ label: string; value: boolean; onChange: () => void }> = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 active:bg-slate-50 cursor-pointer transition-colors" onClick={onChange}>
    <span className="text-slate-700 font-bold text-sm">{label}</span>
    <div className={`relative transition-colors duration-300 ${value ? 'text-primary' : 'text-slate-300'}`}>
      {value ? (
         <ToggleRight size={36} className="fill-current" />
      ) : (
         <ToggleLeft size={36} className="fill-current" />
      )}
    </div>
  </div>
);

const LinkRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between p-5 border-b border-slate-50 last:border-0 active:bg-slate-50 cursor-pointer transition-colors">
    <span className="text-slate-700 font-bold text-sm">{label}</span>
    <div className="flex items-center gap-2">
      {value && <span className="text-slate-400 text-xs font-medium">{value}</span>}
      <ChevronRight size={18} className="text-slate-300" />
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
    <div className="p-5 pb-28 animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 px-1">Configuration</h2>

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
         <ToggleRow label="Magic Beauty Filter" value={config.beautyFilter} onChange={() => toggle('beautyFilter')} />
         <LinkRow label="Watermark Overlay" value="pixel_logo.png" />
      </SettingSection>
      
      <div className="mt-10 px-4 mb-8">
        <button className="w-full py-4 bg-white border-2 border-red-100 text-red-500 rounded-2xl font-bold text-sm hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm flex items-center justify-center gap-2">
            <Shield size={16} />
            System Reboot
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-6 font-medium tracking-widest uppercase">Version 2.4.0 • PixelBooth Inc</p>
      </div>
    </div>
  );
};