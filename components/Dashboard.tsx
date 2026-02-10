import React from 'react';
import { Property } from '../types';
import { MOCK_PROPERTIES } from '../constants';
import { Settings, Bell, Wallet } from 'lucide-react';

interface DashboardProps {
  savedIds: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ savedIds }) => {
  const savedProperties = MOCK_PROPERTIES.filter(p => savedIds.includes(p.id));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-8 rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-tr from-electricBlue to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-500/20">
            JD
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">John Doe</h1>
            <p className="text-gray-500">Premium Investor • Level 4</p>
          </div>
        </div>
        
        <div className="flex gap-3">
           <button className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
             <Bell size={20} />
           </button>
           <button className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors">
             <Settings size={20} />
           </button>
           <button className="flex items-center gap-2 px-6 py-3 bg-electricBlue text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors">
             <Wallet size={18} /> Wallet
           </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Total Saved Value</p>
            <h3 className="text-2xl font-bold text-gray-900">
              ${(savedProperties.reduce((acc, curr) => acc + curr.price, 0) / 1000000).toFixed(1)}M
            </h3>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Avg. Yield Potential</p>
            <h3 className="text-2xl font-bold text-electricBlue">
              {savedProperties.length > 0 
                ? (savedProperties.reduce((acc, curr) => acc + curr.rentalYield, 0) / savedProperties.length).toFixed(1) 
                : 0}%
            </h3>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">Watchlist Count</p>
            <h3 className="text-2xl font-bold text-gray-900">{savedProperties.length} Properties</h3>
         </div>
      </div>

      {/* Saved Properties List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Watchlist</h2>
        {savedProperties.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500">No properties saved yet. Start exploring!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map(property => (
               <div key={property.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm transition-shadow hover:shadow-md">
                  <img src={property.image} className="h-40 w-full object-cover" alt={property.title} />
                  <div className="p-4 flex-1 flex flex-col">
                     <h3 className="text-gray-900 font-bold">{property.title}</h3>
                     <p className="text-gray-500 text-sm">{property.location}</p>
                     <div className="mt-auto pt-4 flex justify-between items-center text-sm">
                        <span className="text-electricBlue font-semibold">${property.price.toLocaleString()}</span>
                        <span className="text-green-600">{property.rentalYield}% Yield</span>
                     </div>
                  </div>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;