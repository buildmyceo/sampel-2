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
      
      <div className={`min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-electricBlue selection:text-white pb-24 md:pb-0 transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="pt-20 md:pt-24 px-4 md:px-8 max-w-7xl mx-auto space-y-24">
          
          {activeTab === 'home' && (
            <div className="space-y-24 animate-fadeIn">
              <Hero />
              
              {/* Property Feed Section */}
              <section id="properties">
                <div className="flex justify-between items-end mb-8">
                  <div>
                     <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Investments</h2>
                     <p className="text-gray-500">Curated high-yield opportunities based on AI predictive models.</p>
                  </div>
                  <button className="hidden md:block text-electricBlue hover:text-blue-600 transition-colors text-sm font-semibold uppercase tracking-wider">
                    View All Listings
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                 <Calculator />
                 <div className="space-y-8">
                   <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-sm">
                     <h3 className="text-2xl font-bold mb-4 text-gray-900">Why Invest with Nexus?</h3>
                     <ul className="space-y-4">
                       {[
                         "Real-time appreciation forecasts",
                         "AI-generated rental yield analysis",
                         "Fractional ownership via blockchain (Coming Soon)",
                         "Seamless virtual tours from anywhere"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-3 text-gray-600">
                           <div className="w-2 h-2 rounded-full bg-electricBlue" />
                           {item}
                         </li>
                       ))}
                     </ul>
                   </div>
                   <div className="p-8 border border-gray-200 rounded-3xl bg-white shadow-sm">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Investor Success Story</h3>
                      <p className="text-gray-500 italic mb-4">"Nexus AI identified an up-and-coming neighborhood in Austin before the boom. My portfolio is up 45% in 8 months."</p>
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-full bg-gray-200" />
                         <div>
                           <p className="text-sm font-bold text-gray-900">Sarah Jenkins</p>
                           <p className="text-xs text-gray-500">Angel Investor</p>
                         </div>
                      </div>
                   </div>
                 </div>
              </section>
            </div>
          )}

          {activeTab === 'insights' && (
             <div className="animate-fadeIn pt-8">
               <AIInsights />
             </div>
          )}

          {activeTab === 'dashboard' && (
             <div className="animate-fadeIn pt-8">
               <Dashboard savedIds={savedPropertyIds} />
             </div>
          )}

        </main>

        {/* Footer */}
        <footer className="mt-24 border-t border-gray-200 bg-white py-12">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-electricBlue rounded flex items-center justify-center">
                   <span className="text-white font-bold text-xs">N</span>
                </div>
                <div className="flex flex-col">
                   <span className="font-bold text-gray-900 leading-none">NEXUS ESTATES</span>
                   <span className="text-[10px] text-gray-400 font-medium tracking-wide">Sample by buildmyceo.com</span>
                </div>
             </div>
             <p className="text-gray-500 text-sm">© 2024 Nexus Estates. The future of property.</p>
             <div className="flex gap-6 text-gray-500">
               <a href="#" className="hover:text-electricBlue transition-colors">Terms</a>
               <a href="#" className="hover:text-electricBlue transition-colors">Privacy</a>
               <a href="#" className="hover:text-electricBlue transition-colors">Contact</a>
             </div>
          </div>
        </footer>

        {/* Modals */}
        <VirtualTourModal property={selectedProperty} onClose={handleCloseTour} />

      </div>
    </>
  );
}

export default App;