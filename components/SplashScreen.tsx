import React, { useEffect, useState } from 'react';
import { Home } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 700); // Wait for transition to finish before unmounting
    }, 2500); // Display time

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center animate-bounce-slight">
        <div className="w-20 h-20 bg-electricBlue rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 mb-6 animate-pulse-slow">
           <Home className="text-white w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">NEXUS ESTATES</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-electricBlue to-electricCyan rounded-full mb-8" />
        
        <p className="text-gray-400 text-sm font-medium tracking-widest uppercase">
          Sample by buildmyceo.com
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;