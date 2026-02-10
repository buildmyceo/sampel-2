import React from 'react';
import { Home, PieChart, User, Globe, Wallet } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Discover', icon: <Globe size={18} /> },
    { id: 'insights', label: 'AI Insights', icon: <PieChart size={18} /> },
    { id: 'dashboard', label: 'Portfolio', icon: <User size={18} /> },
  ];

  return (
    <>
      {/* Desktop Navigation - Floating Island */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 p-1.5 rounded-full glass-card bg-white/80 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 transition-all duration-300 hover:ring-slate-900/10">
        
        {/* Logo Section */}
        <div className="pl-4 pr-6 flex items-center gap-2 border-r border-slate-200 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
             <span className="font-display font-bold text-white text-lg">N</span>
          </div>
          <span className="font-display font-bold text-slate-800 tracking-wide">NEXUS</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === item.id 
                  ? 'text-slate-900 bg-slate-100 shadow-sm ring-1 ring-slate-200' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 relative z-10">
                {item.icon}
                {item.label}
              </div>
            </button>
          ))}
        </div>

        {/* Wallet Connect */}
        <div className="pl-2 pr-1.5">
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
            <Wallet size={16} />
            <span>Connect</span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 glass-nav pb-safe border-t border-slate-200 bg-white/90">
        <div className="flex justify-around items-center p-4">
           {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                  activeTab === item.id ? 'text-primary' : 'text-slate-400'
                }`}
              >
                <div className={`p-2 rounded-xl ${activeTab === item.id ? 'bg-primary/10' : ''}`}>
                  {item.icon}
                </div>
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;