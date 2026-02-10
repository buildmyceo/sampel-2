import React, { useState } from 'react';
import { Property } from '../types';
import { Heart, TrendingUp, Maximize2, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { getInvestmentAdvice } from '../services/geminiService';

interface PropertyCardProps {
  property: Property;
  onOpenTour: (property: Property) => void;
  onSave: (id: string) => void;
  isSaved: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onOpenTour, onSave, isSaved }) => {
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const handleAiAnalyze = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (aiAdvice) return;
    setLoadingAdvice(true);
    const advice = await getInvestmentAdvice(property.title, property.price, property.rentalYield);
    setAiAdvice(advice);
    setLoadingAdvice(false);
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1">
      
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-90" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
           {property.isTrending && (
             <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md border border-white/50 text-blue-600 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg">
               <TrendingUp size={12} /> <span className="tracking-wider">TRENDING</span>
             </div>
           )}
           <div className="ml-auto flex gap-2">
             <button 
               onClick={() => onSave(property.id)}
               className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 shadow-sm ${isSaved ? 'bg-white text-red-500 border-red-100' : 'bg-white/90 text-slate-700 border-white/50 hover:bg-white hover:text-red-500'}`}
             >
               <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
             </button>
             <button 
               onClick={() => onOpenTour(property)}
               className="w-10 h-10 rounded-full flex items-center justify-center bg-white/90 backdrop-blur-md border border-white/50 text-slate-700 hover:bg-white transition-all duration-300 shadow-sm"
             >
               <Maximize2 size={18} />
             </button>
           </div>
        </div>

        {/* Overlay Content */}
        <div className="absolute bottom-4 left-6 right-6">
           <div className="flex items-center text-white/90 text-xs font-medium uppercase tracking-wider mb-2">
             <MapPin size={12} className="mr-1 text-blue-400" />
             {property.location}
           </div>
           <h3 className="font-display text-2xl font-bold text-white mb-1 leading-tight">{property.title}</h3>
           <p className="text-white/80 text-sm">{property.beds} Beds • {property.baths} Baths • {property.sqft.toLocaleString()} sqft</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6 pt-4 space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center transition-colors group-hover:bg-blue-50/50">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Yield</p>
            <p className="text-blue-600 font-bold font-mono">{property.rentalYield}%</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center transition-colors group-hover:bg-blue-50/50">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Growth</p>
            <p className="text-green-600 font-bold font-mono">+{property.appreciation}%</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center transition-colors group-hover:bg-blue-50/50">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Ask</p>
            <p className="text-slate-900 font-bold font-mono">${(property.price / 1000).toFixed(0)}k</p>
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="relative group/ai">
          <button 
             onClick={handleAiAnalyze}
             className="w-full py-3 rounded-xl border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50 transition-all text-xs flex items-center justify-center gap-2 text-slate-500 hover:text-blue-600 font-medium"
          >
             <Sparkles size={14} className={loadingAdvice ? "animate-spin" : ""} />
             {loadingAdvice ? 'Processing Data...' : aiAdvice ? 'Update Analysis' : 'Generate AI Risk Assessment'}
          </button>
          
          {aiAdvice && (
             <div className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-xl animate-fade-in-up">
               <div className="flex items-start gap-3">
                 <div className="mt-1 min-w-[20px]">
                   <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                     <Sparkles size={10} className="text-primary" />
                   </div>
                 </div>
                 <p className="text-sm text-slate-600 leading-relaxed font-light">
                   <span className="font-bold text-slate-900 block mb-1">Gemini Analysis</span>
                   {aiAdvice}
                 </p>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;