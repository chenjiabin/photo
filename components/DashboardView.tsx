import React from 'react';
import { Printer, Users, CreditCard, Activity, Wifi, AlertTriangle } from 'lucide-react';
import { BoothStatus } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardViewProps {
  status: BoothStatus;
}

const data = [
  { name: '10am', photos: 4 },
  { name: '11am', photos: 12 },
  { name: '12pm', photos: 25 },
  { name: '1pm', photos: 18 },
  { name: '2pm', photos: 30 },
  { name: '3pm', photos: 22 },
];

export const DashboardView: React.FC<DashboardViewProps> = ({ status }) => {
  return (
    <div className="p-4 space-y-6 pb-24 animate-fade-in">
      {/* Header Status */}
      <div className="flex items-center justify-between bg-surface p-4 rounded-2xl border border-white/5 shadow-lg">
        <div>
          <h2 className="text-lg font-bold text-white">Booth #042</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`w-2 h-2 rounded-full ${status.isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs text-slate-400">{status.isOnline ? 'Online & Ready' : 'Offline'}</span>
          </div>
        </div>
        <div className="bg-slate-900/50 p-2 rounded-xl">
          <Wifi size={20} className={status.isOnline ? 'text-primary' : 'text-slate-600'} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface p-4 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-5 rotate-12">
             <Printer size={80} />
          </div>
          <div className="flex justify-between items-start">
             <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
               <Printer size={20} />
             </div>
             {status.paperLevel < 20 && <AlertTriangle size={16} className="text-yellow-500" />}
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-white">{status.paperLevel}%</span>
            <p className="text-xs text-slate-400 mt-1">Paper Remaining</p>
          </div>
          <div className="w-full bg-slate-700 h-1 mt-3 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${status.paperLevel < 20 ? 'bg-red-500' : 'bg-purple-500'}`} 
              style={{ width: `${status.paperLevel}%` }} 
            />
          </div>
        </div>

        <div className="bg-surface p-4 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute -right-4 -top-4 opacity-5 rotate-12">
             <Users size={80} />
          </div>
          <div className="flex justify-between items-start">
             <div className="p-2 bg-primary/20 rounded-lg text-primary">
               <Users size={20} />
             </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-white">{status.sessionCount}</span>
            <p className="text-xs text-slate-400 mt-1">Sessions Today</p>
          </div>
        </div>
      </div>
      
      <div className="bg-surface p-4 rounded-2xl border border-white/5 flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
              <CreditCard size={20} />
            </div>
            <div>
               <p className="text-sm text-slate-400">Total Revenue</p>
               <p className="text-xl font-bold text-white">${status.revenue.toFixed(2)}</p>
            </div>
         </div>
         <Activity size={20} className="text-slate-600" />
      </div>

      {/* Chart */}
      <div className="bg-surface p-4 rounded-2xl border border-white/5">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">Activity Trend</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                itemStyle={{ color: '#f8fafc' }}
                cursor={{fill: '#334155', opacity: 0.4}}
              />
              <Bar dataKey="photos" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};