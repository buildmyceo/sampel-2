import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        <div className="inline-block px-3 py-1 rounded-full border border-electricBlue/30 bg-blue-50 text-electricBlue text-xs font-semibold tracking-wider uppercase mb-4">
          AI-Powered Discovery v2.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
          Find Smart Investments.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electricBlue to-electricCyan">
            Not Just Properties.
          </span>
        </h1>
        
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light">
          The first marketplace that calculates ROI, appreciation, and rental yield in real-time using generative AI.
        </p>

        <div className="mt-10 w-full max-w-2xl mx-auto relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search by city, neighborhood, or investment strategy..." 
            className="w-full pl-12 pr-14 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electricBlue/50 transition-all shadow-xl shadow-gray-200/50"
          />
          <button className="absolute inset-y-2 right-2 p-2 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 text-gray-500 transition-colors">
            <SlidersHorizontal size={20} />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
           <button className="px-8 py-3 bg-electricBlue hover:bg-blue-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-500/30">
             Explore Properties
           </button>
           <button className="px-8 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold rounded-full transition-all shadow-sm">
             Calculate ROI
           </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;