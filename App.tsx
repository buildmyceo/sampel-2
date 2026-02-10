import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import AIInsights from './components/AIInsights';
import Calculator from './components/Calculator';
import VirtualTourModal from './components/VirtualTourModal';
import Dashboard from './components/Dashboard';
import SplashScreen from './components/SplashScreen';
import { MOCK_PROPERTIES } from './constants';
import { Property } from './types';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);

  const handleOpenTour = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleCloseTour = () => {
    setSelectedProperty(null);
  };

  const toggleSaveProperty = (id: string) => {
    setSavedPropertyIds(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  return (
    <>
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}
      
      <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary selection:text-white pb-24 md:pb-0 transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="max-w-[1400px] mx-auto space-y-32 mb-32 px-4 md:px-8">
          
          {activeTab === 'home' && (
            <div className="space-y-32 animate-fade-in-up">
              <Hero />
              
              {/* Property Feed Section */}
              <section id="properties" className="scroll-mt-24">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div className="max-w-xl">
                     <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Curated Opportunities</h2>
                     <p className="text-slate-500 text-lg font-light">High-yield assets selected by predictive AI models, updated hourly.</p>
                  </div>
                  <button className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-white hover:shadow-md transition-all text-slate-900 text-sm font-bold uppercase tracking-wider bg-white/50">
                    View All 42 Listings
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                  {MOCK_PROPERTIES.map((property) => (
                    <PropertyCard 
                      key={property.id} 
                      property={property} 
                      onOpenTour={handleOpenTour}
                      onSave={toggleSaveProperty}
                      isSaved={savedPropertyIds.includes(property.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Feature Section: AI & Calculator */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">
                 <Calculator />
                 <div className="space-y-12 pt-8">
                   <div className="relative">
                     <div className="absolute -left-8 -top-8 w-20 h-20 bg-blue-100 blur-3xl rounded-full"></div>
                     <h3 className="text-4xl font-display font-bold text-slate-900 mb-8 relative z-10">Why The Top 1% Use Nexus</h3>
                     
                     <div className="space-y-6">
                       {[
                         { title: "Predictive ROI", desc: "Machine learning models forecast appreciation with 94% historical accuracy." },
                         { title: "Fractional Liquidity", desc: "Tokenize assets to exit positions in seconds, not months." },
                         { title: "Immersive Due Diligence", desc: "Virtual reality tours and drone photogrammetry for every listing." }
                       ].map((item, i) => (
                         <div key={i} className="flex gap-6 group">
                           <div className="mt-1 w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                             <div className="h-full w-0 bg-primary group-hover:w-full transition-all duration-500"></div>
                           </div>
                           <div>
                             <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                             <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="glass-card p-10 rounded-[2rem] border-l-4 border-l-primary relative overflow-hidden bg-white/60">
                      <div className="absolute top-0 right-0 p-12 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full"></div>
                      <p className="text-xl text-slate-700 italic font-light mb-6 relative z-10">"The AI identified the waterfront district before the re-zoning announcement. My portfolio outperformed the S&P 500 by 3x last quarter."</p>
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 border-2 border-white shadow-md"></div>
                         <div>
                           <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">Alex V.</p>
                           <p className="text-xs text-slate-500">Crypto Fund Manager</p>
                         </div>
                      </div>
                   </div>
                 </div>
              </section>
            </div>
          )}

          {activeTab === 'insights' && (
             <div className="animate-fade-in-up pt-12">
               <AIInsights />
             </div>
          )}

          {activeTab === 'dashboard' && (
             <div className="animate-fade-in-up pt-12">
               <Dashboard savedIds={savedPropertyIds} />
             </div>
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-20">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-12">
             <div className="space-y-6 max-w-sm">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                     <span className="text-white font-bold font-display">N</span>
                  </div>
                  <span className="font-display font-bold text-slate-900 text-xl tracking-wide">NEXUS</span>
               </div>
               <p className="text-slate-500 text-sm leading-relaxed">
                 Pioneering the intersection of artificial intelligence and real estate wealth generation. Built for the next era of investors.
               </p>
             </div>
             
             <div className="flex gap-16 text-sm">
               <div className="space-y-4">
                 <h4 className="font-bold text-slate-900 uppercase tracking-wider">Platform</h4>
                 <div className="flex flex-col gap-2 text-slate-500">
                   <a href="#" className="hover:text-primary transition-colors">Marketplace</a>
                   <a href="#" className="hover:text-primary transition-colors">AI Engine</a>
                   <a href="#" className="hover:text-primary transition-colors">Tokenization</a>
                 </div>
               </div>
               <div className="space-y-4">
                 <h4 className="font-bold text-slate-900 uppercase tracking-wider">Company</h4>
                 <div className="flex flex-col gap-2 text-slate-500">
                   <a href="#" className="hover:text-primary transition-colors">About</a>
                   <a href="#" className="hover:text-primary transition-colors">Careers</a>
                   <a href="#" className="hover:text-primary transition-colors">Legal</a>
                 </div>
               </div>
             </div>
          </div>
          <div className="max-w-[1400px] mx-auto px-8 mt-12 pt-8 border-t border-slate-100 flex justify-between text-xs text-slate-400">
             <p>© 2024 Nexus Estates. All rights reserved.</p>
             <p>Sample by buildmyceo.com</p>
          </div>
        </footer>

        {/* Modals */}
        <VirtualTourModal property={selectedProperty} onClose={handleCloseTour} />

      </div>
    </>
  );
}

export default App;