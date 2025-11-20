import React from 'react';
import { Printer, Users, CreditCard, Activity, Wifi, AlertTriangle, Zap, ArrowUpRight } from 'lucide-react';
import { BoothStatus } from '../types';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    <div className="p-5 space-y-6 pb-28 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 p-6 rounded-3xl shadow-lg shadow-indigo-200 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
             <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                Booth #042
             </span>
             <Wifi size={18} className="text-white/80" />
          </div>
          <h2 className="text-2xl font-bold mb-1">Good Afternoon! ☀️</h2>
          <p className="text-indigo-100 text-sm">The booth is running smoothly.</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
           <Zap size={120} />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Paper Level */}
        <div className="bg-white p-5 rounded-3xl shadow-soft border border-slate-50 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start relative z-10">
             <div className="p-3 bg-pink-50 rounded-2xl text-primary group-hover:scale-110 transition-transform">
               <Printer size={22} />
             </div>
             {status.paperLevel < 20 && <AlertTriangle size={18} className="text-amber-500 animate-bounce" />}
          </div>
          <div className="mt-6 relative z-10">
            <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{status.paperLevel}<span className="text-xl text-slate-400">%</span></span>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Paper Level</p>
          </div>
          {/* Decorative background bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-100">
            <div 
              className={`h-full rounded-r-full transition-all duration-1000 ${status.paperLevel < 20 ? 'bg-red-500' : 'bg-gradient-to-r from-primary to-pink-400'}`} 
              style={{ width: `${status.paperLevel}%` }} 
            />
          </div>
        </div>

        {/* Session Count */}
        <div className="bg-white p-5 rounded-3xl shadow-soft border border-slate-50 flex flex-col justify-between group hover:shadow-lg transition-all duration-300">
          <div className="flex justify-between items-start">
             <div className="p-3 bg-blue-50 rounded-2xl text-blue-500 group-hover:scale-110 transition-transform">
               <Users size={22} />
             </div>
             <div className="flex items-center text-green-500 bg-green-50 px-2 py-1 rounded-full">
               <ArrowUpRight size={12} />
               <span className="text-[10px] font-bold ml-0.5">+12%</span>
             </div>
          </div>
          <div className="mt-6">
            <span className="text-4xl font-extrabold text-slate-800 tracking-tight">{status.sessionCount}</span>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Sessions</p>
          </div>
        </div>
      </div>
      
      {/* Revenue Card */}
      <div className="bg-white p-5 rounded-3xl shadow-soft border border-slate-50 flex items-center justify-between group">
         <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-500 group-hover:rotate-12 transition-transform">
              <CreditCard size={24} />
            </div>
            <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
               <p className="text-2xl font-extrabold text-slate-800 mt-0.5">${status.revenue.toFixed(2)}</p>
            </div>
         </div>
         <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
            <Activity size={20} />
         </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-3xl shadow-soft border border-slate-50">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Activity Trend</h3>
            <select className="text-xs bg-slate-50 border-none rounded-lg px-2 py-1 text-slate-500 font-medium focus:ring-0">
                <option>Today</option>
                <option>Week</option>
            </select>
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                dy={10}
              />
              <Tooltip 
                cursor={{fill: '#f8fafc'}}
                content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                    return (
                        <div className="bg-slate-800 text-white text-xs p-2 rounded-lg shadow-xl border-none">
                        <p className="font-bold">{`${payload[0].value} photos`}</p>
                        </div>
                    );
                    }
                    return null;
                }}
              />
              <Bar 
                dataKey="photos" 
                fill="#f43f5e" 
                radius={[6, 6, 6, 6]} 
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};