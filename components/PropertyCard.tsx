import React, { useState } from 'react';
import { Property } from '../types';
import { Heart, TrendingUp, Maximize2, MapPin, ArrowRight } from 'lucide-react';
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
    <div className="group relative bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-electricBlue/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 shadow-sm">
      
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-40" />
        
        <div className="absolute top-4 right-4 flex gap-2">
           <button 
             onClick={() => onSave(property.id)}
             className={`p-2 rounded-full backdrop-blur-md border border-white/20 transition-colors ${isSaved ? 'bg-white text-red-500 shadow-md' : 'bg-black/30 text-white hover:bg-black/50'}`}
           >
             <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
           </button>
        </div>

        {property.isTrending && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-electricBlue text-xs font-bold rounded-full flex items-center gap-1 shadow-sm">
            <TrendingUp size={12} /> TRENDING
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
           <div>
             <h3 className="text-xl font-bold text-white drop-shadow-md">{property.title}</h3>
             <div className="flex items-center text-white/90 text-sm mt-1 drop-shadow-md">
               <MapPin size={14} className="mr-1" />
               {property.location}
             </div>
           </div>
           <button 
             onClick={() => onOpenTour(property)}
             className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white border border-white/20 transition-colors"
           >
             <Maximize2 size={18} />
           </button>
        </div>
      </div>

      {/* Stats */}
      <div className="p-5 space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Yield</p>
            <p className="text-electricBlue font-bold">{property.rentalYield}%</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Growth</p>
            <p className="text-green-600 font-bold">+{property.appreciation}%</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
            <p className="text-gray-900 font-bold">${(property.price / 1000).toFixed(0)}k</p>
          </div>
        </div>

        {/* AI Quick Insight */}
        <div className="relative">
          <button 
             onClick={handleAiAnalyze}
             className="w-full py-2 text-xs flex items-center justify-center gap-2 text-gray-500 hover:text-electricBlue transition-colors font-medium"
          >
             {loadingAdvice ? 'Analyzing...' : aiAdvice ? 'View Analysis' : 'Ask AI Advisor'}
             {!aiAdvice && !loadingAdvice && <ArrowRight size={12} />}
          </button>
          {aiAdvice && (
             <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-gray-600 leading-relaxed animate-fadeIn">
               <span className="text-electricBlue font-bold mr-1">AI:</span> {aiAdvice}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;