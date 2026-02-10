import React, { useState, useEffect } from 'react';
import { DollarSign, PieChart } from 'lucide-react';

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
    
    // Mortgage formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const mortgage = 
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    // Simple estimation for tax/insurance
    const taxAndIns = propertyPrice * 0.015 / 12; 
    
    const totalMonthlyCost = mortgage + taxAndIns;
    setMonthlyPayment(totalMonthlyCost);
    setCashFlow(rentalIncome - totalMonthlyCost);

  }, [propertyPrice, downPayment, interestRate, years, rentalIncome]);

  return (
    <div className="w-full glass-panel border border-gray-200 rounded-3xl p-6 md:p-8 bg-white/50">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-50 rounded-lg text-electricBlue">
          <DollarSign size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Investment Calculator</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Inputs */}
        <div className="space-y-6">
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-gray-500">Property Price</label>
              <span className="text-gray-900 font-mono font-bold">${propertyPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="100000" max="5000000" step="10000" 
              value={propertyPrice} onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-electricBlue"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-gray-500">Down Payment (%)</label>
              <span className="text-gray-900 font-mono font-bold">{downPayment}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="5" 
              value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-electricCyan"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <label className="text-gray-500">Est. Monthly Rent</label>
              <span className="text-gray-900 font-mono font-bold">${rentalIncome.toLocaleString()}</span>
            </div>
            <input 
              type="range" min="500" max="20000" step="100" 
              value={rentalIncome} onChange={(e) => setRentalIncome(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <label className="text-xs text-gray-500 block mb-1">Interest Rate %</label>
                <input 
                  type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-transparent text-gray-900 font-mono focus:outline-none"
                />
             </div>
             <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <label className="text-xs text-gray-500 block mb-1">Loan Term (Years)</label>
                <input 
                  type="number" value={years} onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-transparent text-gray-900 font-mono focus:outline-none"
                />
             </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center space-y-6">
           <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800 relative overflow-hidden text-white shadow-xl shadow-gray-300">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <PieChart size={100} />
             </div>
             
             <div className="relative z-10">
               <p className="text-gray-400 text-sm mb-1">Estimated Monthly Cost</p>
               <h3 className="text-4xl font-bold text-white mb-6">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</h3>
               
               <div className="h-px w-full bg-white/10 my-4" />
               
               <div className="flex justify-between items-center">
                 <p className="text-gray-400 text-sm">Est. Cash Flow</p>
                 <span className={`text-2xl font-bold ${cashFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                   {cashFlow >= 0 ? '+' : ''}${cashFlow.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                 </span>
               </div>
             </div>
           </div>
           
           <p className="text-xs text-gray-500 text-center">
             *Estimates include principal, interest, and ~1.5% for tax/insurance. Actual values may vary.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;