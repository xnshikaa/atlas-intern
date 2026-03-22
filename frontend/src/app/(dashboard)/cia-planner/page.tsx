"use client";
import React, { useState } from 'react';
import TopHeader from "@/components/layout/TopHeader";
import { Plus, CheckCircle2 } from 'lucide-react';

export default function CIAPlannerPage() {
  const [cards, setCards] = useState([
    { type: "CIA 2", title: "Data Structures & Algorithms", date: "Apr 8", aiResponse: "✓ AI agrees", aiColor: "text-green-700 bg-green-50", typeColor: "bg-[#FCE8E8] text-[#D43434]", completion: "88%", barColor: "bg-green-600 w-[88%]" },
    { type: "CIA 2", title: "Database Management Systems", date: "Apr 12", aiResponse: "AI: Apr 10", aiColor: "text-green-700 bg-green-50", typeColor: "bg-[#E6F8F1] text-[#2F855A]", completion: "76%", barColor: "bg-yellow-600 w-[76%]" },
    { type: "ASSIGNMENT", title: "Operating Systems", date: "Mar 28", aiResponse: "✓ AI agrees", aiColor: "text-green-700 bg-green-50", typeColor: "bg-[#EBF4FF] text-[#2B6CB0]", completion: "65%", barColor: "bg-yellow-600 w-[65%]" },
    { type: "CIA 2", title: "Computer Networks", date: "Apr 18", aiResponse: "AI: Apr 15", aiColor: "text-green-700 bg-green-50", typeColor: "bg-[#FEF6D8] text-[#B7791F]", completion: "70%", barColor: "bg-yellow-600 w-[70%]" },
    { type: "ASSIGNMENT", title: "Data Structures & Algorithms", date: "Mar 25", aiResponse: "✓ AI agrees", aiColor: "text-green-700 bg-green-50", typeColor: "bg-[#EBF4FF] text-[#2B6CB0]", completion: "74%", barColor: "bg-yellow-600 w-[74%]" },
    { type: "PRESENTATION", title: "Database Management Systems", date: "Apr 22", aiResponse: "AI: Apr 20", aiColor: "text-green-700 bg-green-50", typeColor: "bg-[#E6F8F1] text-[#2F855A]", completion: "95%", barColor: "bg-green-600 w-[95%]" },
  ]);

  const [toast, setToast] = useState(false);

  const handleScheduleCIA = () => {
    const newEvent = { 
      type: "CIA 3", 
      title: "Advanced Machine Learning", 
      date: "May 02", 
      aiResponse: "✓ Optimal timeframe", 
      aiColor: "text-green-700 bg-green-50", 
      typeColor: "bg-[#FCE8E8] text-[#D43434]", 
      completion: "100%", 
      barColor: "bg-blue-600 w-[100%]" 
    };
    setCards([newEvent, ...cards]);
    setToast(true);
    setTimeout(() => setToast(false), 3500);
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA] relative">
      <TopHeader title="CIA Planner" subtitle="Academic Year 2024-25 • Semester 2" />
      
      <div className="px-8 flex-1 pb-10">
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-500 font-medium">AI-suggested CIA dates based on syllabus progress</h3>
          <button onClick={handleScheduleCIA} className="px-5 py-2.5 bg-[#DA291C] text-white rounded-xl shadow-md font-bold text-sm hover:shadow-lg transition-all flex items-center hover:bg-red-700 active:scale-95">
            <Plus className="w-4 h-4 mr-1.5" /> Schedule CIA
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {cards.map((card, idx) => (
             <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
                <span className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-widest mb-4 shadow-sm ${card.typeColor}`}>
                  {card.type}
                </span>
                
                <h4 className="text-lg font-bold text-gray-800 mb-6 leading-tight pr-4">{card.title}</h4>
                
                <div className="flex items-center space-x-3 mb-6">
                  <span className="flex items-center text-sm font-bold text-gray-700">
                     <div className="w-3.5 h-3.5 bg-blue-100 rounded mr-2 grid place-items-center"><div className="w-1.5 h-1.5 bg-blue-500 rounded-sm"></div></div>
                     {card.date}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${card.aiColor}`}>
                    {card.aiResponse}
                  </span>
                </div>
                
                <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-2">
                   <span>Syllabus by this date</span>
                   <span>{card.completion}</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                   <div className={`h-full rounded-full ${card.barColor} transition-all duration-1000 ease-out`}></div>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Success Toast */}
      {toast && (
        <div className="fixed bottom-10 right-10 bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-green-400" />
          <span className="font-bold text-sm">New CIA Scheduled via AI Constraints Engine!</span>
        </div>
      )}
    </div>
  );
}
