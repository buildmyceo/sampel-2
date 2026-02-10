import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Sparkles, Map, TrendingUp } from 'lucide-react';
import { getMarketInsights } from '../services/geminiService';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

const AIInsights: React.FC = () => {
  const [insight, setInsight] = useState<string>('Initializing neural networks for market analysis...');

  useEffect(() => {
    getMarketInsights('Global Market').then(setInsight);
  }, []);

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 shadow-sm">
          <Sparkles className="text-primary" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">Market Intelligence</h2>
          <p className="text-slate-500">Predictive analytics powered by Gemini 3.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-[2rem] bg-white">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-green-500" />
              Appreciation Forecast
            </h3>
            <div className="flex bg-slate-100 rounded-lg p-1 border border-slate-200">
              {['1Y', '3Y', '5Y'].map((opt, i) => (
                <button key={opt} className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${i === 0 ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8" 
                  tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} 
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#94a3b8" 
                  tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', color: '#0f172a' }}
                  itemStyle={{ color: '#2563eb' }}
                  cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
           {/* Growth Heatmap (Visual Rep) */}
           <div className="glass-card p-6 rounded-[2rem] relative overflow-hidden h-56 group bg-white">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/400/300?grayscale')] bg-cover bg-center opacity-90 group-hover:scale-105 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center gap-2 text-white/90">
                  <Map size={18} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Hot Zone</h3>
                </div>
                
                <div>
                   <p className="text-xs text-white/70 mb-1">Highest Activity</p>
                   <p className="text-white font-display text-2xl font-bold">Neo City</p>
                   <p className="text-green-400 text-sm font-mono mt-1">+14.2% YoY</p>
                </div>
              </div>
           </div>

           {/* AI Summary */}
           <div className="glass-card p-8 rounded-[2rem] border-blue-100 bg-blue-50/50">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                 <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Gemini Live Output</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-light">
                {insight}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;