import React from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20 md:pt-0 bg-slate-50">
      
      {/* Background Animation Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Animated Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-cyan-200/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
        
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* Noise Texture for Depth */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto space-y-8 flex flex-col items-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-100 bg-white/60 backdrop-blur-md mb-4 shadow-sm animate-fade-in-up hover:scale-105 transition-transform duration-300">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-slate-600 uppercase">Nexus AI v2.0 Live</span>
        </div>
        
        {/* Headline */}
        <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight text-slate-900 leading-[0.95] drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Wealth creation <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-cyan-500 animate-pulse-slow">
            reimagined by AI.
          </span>
        </h1>
        
        <p className="font-sans text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          The first decentralized marketplace that calculates ROI, appreciation, and rental yield in real-time using generative AI models.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl relative group mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 animate-tilt"></div>
          <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-2 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 transition-shadow">
            <div className="pl-4 text-slate-400">
              <Search size={22} />
            </div>
            <input 
              type="text" 
              placeholder="Search by city, strategy, or yield (e.g., 'Austin > 7% Yield')" 
              className="w-full bg-transparent text-slate-900 px-4 py-3 focus:outline-none placeholder-slate-400 font-medium"
            />
            <button className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-slate-900/10">
              <span>Search</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="pt-12 flex items-center justify-center gap-8 md:gap-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
           {['TechCrunch', 'Forbes', 'Bloomberg', 'Coindesk'].map(brand => (
             <span key={brand} className="text-sm font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors cursor-default">{brand}</span>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;