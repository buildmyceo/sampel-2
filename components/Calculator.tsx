import React, { useState, useEffect } from 'react';
import { DollarSign, Activity } from 'lucide-react';

const Calculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(20); // percent
  const [interestRate, setInterestRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const [rentalIncome, setRentalIncome] = useState(3500); // monthly

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);

  useEffect(() => {
    const principal = propertyPrice * (1 - downPayment / 100);
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    
    // Mortgage formula
    const mortgage = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const taxAndIns = propertyPrice * 0.015 / 12; 
    
    const totalMonthlyCost = mortgage + taxAndIns;
    setMonthlyPayment(totalMonthlyCost);
    setCashFlow(rentalIncome - totalMonthlyCost);

  }, [propertyPrice, downPayment, interestRate, years, rentalIncome]);

  return (
    <div className="w-full glass-card rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group bg-white/70">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>

      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 text-primary shadow-sm">
          <DollarSign size={24} />
        </div>
        <div>
           <h2 className="text-3xl font-display font-bold text-slate-900">Profit Simulator</h2>
           <p className="text-slate-500 text-sm">Real-time mortgage & cashflow estimation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Controls */}
        <div className="space-y-8">
          
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-slate-500 text-sm font-medium">Acquisition Price</label>
              <span className="text-2xl font-mono font-bold text-slate-900">${propertyPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="100000" max="5000000" step="10000" 
              value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-slate-500 text-sm font-medium">Down Payment</label>
              <span className="text-2xl font-mono font-bold text-slate-900">{downPayment}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="5" 
              value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-slate-500 text-sm font-medium">Projected Rent</label>
              <span className="text-2xl font-mono font-bold text-green-600">${rentalIncome.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="500" max="20000" step="100" 
              value={rentalIncome} onChange={(e) => setRentalIncome(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="bg-white p-4 rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-2">Interest Rate</label>
                <div className="flex items-center">
                  <input 
                    type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-900 font-mono text-lg focus:outline-none"
                  />
                  <span className="text-slate-400">%</span>
                </div>
             </div>
             <div className="bg-white p-4 rounded-2xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-2">Loan Term</label>
                <div className="flex items-center">
                  <input 
                    type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-transparent text-slate-900 font-mono text-lg focus:outline-none"
                  />
                  <span className="text-slate-400">Yrs</span>
                </div>
             </div>
          </div>
        </div>

        {/* Results Display - Kept dark for contrast and "screen" look */}
        <div className="flex flex-col justify-center">
           <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 relative overflow-hidden shadow-2xl text-white">
             <div className="absolute top-0 right-0 p-8 opacity-10 text-white">
               <Activity size={120} />
             </div>
             
             <div className="relative z-10 space-y-8">
               <div>
                 <p className="text-slate-400 text-sm font-medium mb-2">Estimated Monthly Outflow</p>
                 <div className="flex items-baseline gap-1">
                   <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                   <span className="text-slate-500">/mo</span>
                 </div>
               </div>
               
               <div className="h-px w-full bg-slate-800" />
               
               <div>
                 <p className="text-slate-400 text-sm font-medium mb-2">Net Cash Flow</p>
                 <div className="flex items-center gap-3">
                   <span className={`text-4xl md:text-5xl font-bold tracking-tight ${cashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                     {cashFlow >= 0 ? '+' : ''}${cashFlow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </span>
                   <span className={`px-3 py-1 rounded-full text-xs font-bold border ${cashFlow >= 0 ? 'bg-green-400/10 border-green-400/20 text-green-400' : 'bg-red-400/10 border-red-400/20 text-red-400'}`}>
                     ROI {((cashFlow * 12) / (propertyPrice * (downPayment/100)) * 100).toFixed(1)}%
                   </span>
                 </div>
               </div>
             </div>
           </div>
           
           <p className="text-xs text-slate-500 text-center mt-6 max-w-sm mx-auto">
             *Calculations exclude HOA, detailed maintenance, and vacancy rates. Use AI Insights for deeper analysis.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;