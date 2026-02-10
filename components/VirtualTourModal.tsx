import React from 'react';
import { X, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { Property } from '../types';

interface VirtualTourModalProps {
  property: Property | null;
  onClose: () => void;
}

const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ property, onClose }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-5xl bg-charcoalLight border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl shadow-black">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 bg-gradient-to-b from-black/60 to-transparent">
          <div>
            <h2 className="text-2xl font-bold text-white">{property.title}</h2>
            <p className="text-gray-300 flex items-center gap-1 text-sm">
              <Compass size={14} /> Virtual Tour Mode
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
            <X size={24} />
          </button>
        </div>

        {/* 360 Viewport Simulation */}
        <div className="w-full h-[60vh] md:h-[70vh] bg-gray-900 relative cursor-move group">
          <img 
            src={property.image} 
            alt="360 view" 
            className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-[10s] ease-linear"
          />
          
          {/* Navigation Overlay */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
             <div className="pointer-events-auto p-3 bg-black/40 rounded-full text-white hover:bg-black/60 cursor-pointer">
               <ChevronLeft size={32} />
             </div>
             <div className="pointer-events-auto p-3 bg-black/40 rounded-full text-white hover:bg-black/60 cursor-pointer">
               <ChevronRight size={32} />
             </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur px-4 py-2 rounded-full text-xs text-white pointer-events-none border border-white/10">
             Drag to look around
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTourModal;
