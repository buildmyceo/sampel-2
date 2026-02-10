import React, { useState } from 'react';
import { Menu, X, Home, PieChart, User, Globe } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Discover', icon: <Globe size={18} /> },
    { id: 'insights', label: 'AI Insights', icon: <PieChart size={18} /> },
    { id: 'dashboard', label: 'Dashboard', icon: <User size={18} /> },
  ];

  return (
    <nav className="fixed bottom-4 left-4 right-4 md:top-0 md:bottom-auto md:left-0 md:right-0 z-50">
      {/* Desktop Nav */}
      <div className="hidden md:flex justify-between items-center px-8 py-4 glass-panel rounded-b-xl md:rounded-none md:border-b border-gray-200 bg-white/80">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-8 h-8 bg-electricBlue rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
             <Home className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">NEXUS</span>
        </div>

        <div className="flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                activeTab === item.id ? 'text-electricBlue' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <button className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200">
          Connect Wallet
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden glass-panel rounded-2xl px-6 py-4 flex justify-between items-center shadow-xl shadow-gray-200">
         {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                activeTab === item.id ? 'text-electricBlue' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {item.icon}
              <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
            </button>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;