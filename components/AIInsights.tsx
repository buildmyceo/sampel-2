import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Sparkles, Map } from 'lucide-react';
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
  const [insight, setInsight] = useState<string>('Loading market analysis...');

  useEffect(() => {
    // Mocking an initial load of general market data
    getMarketInsights('Global Market').then(setInsight);
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-electricBlue" size={24} />
        <h2 className="text-2xl font-bold text-gray-900">AI Market Intelligence</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-gray-200 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium text-gray-700">Market Appreciation Trend</h3>
            <select className="bg-gray-50 text-xs text-gray-900 p-2 rounded-lg border border-gray-200 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
              <option>5 Years</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis stroke="#9ca3af" tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#111827' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-6">
           {/* Growth Heatmap (Visual Rep) */}
           <div className="glass-panel p-6 rounded-3xl border border-gray-200 bg-white relative overflow-hidden h-48 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-gray-700 relative z-10">
                <Map size={18} />
                <h3 className="text-sm font-medium">Growth Heatmap</h3>
              </div>
              <div className="absolute inset-0 top-12 opacity-50 bg-[url('https://picsum.photos/400/300?grayscale')] bg-cover bg-center mix-blend-overlay"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-500 rounded-full blur-[50px] opacity-20"></div>
              <div className="absolute bottom-4 left-4 right-4 z-10">
                 <p className="text-xs text-gray-500">High activity detected in:</p>
                 <p className="text-gray-900 font-bold">Neo City, Downtown Sector</p>
              </div>
           </div>

           {/* AI Summary */}
           <div className="glass-panel p-6 rounded-3xl border border-blue-100 bg-blue-50/50">
              <div className="flex items-center gap-2 mb-3">
                 <Sparkles size={16} className="text-electricBlue" />
                 <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">AI Forecast</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {insight}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;