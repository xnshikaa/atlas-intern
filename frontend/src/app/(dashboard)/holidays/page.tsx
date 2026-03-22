"use client";
import React, { useState } from 'react';
import TopHeader from "@/components/layout/TopHeader";
import { AlertTriangle, Map, Navigation, ShieldAlert, BarChart3, Activity, Calendar as CalendarIcon, CheckCircle2, Loader2, Zap } from 'lucide-react';

export default function HolidayPlusPage() {
  const [executing, setExecuting] = useState(false);
  const [planSuccess, setPlanSuccess] = useState(false);
  const [reschedulingId, setReschedulingId] = useState<number | null>(null);
  const [rescheduledIds, setRescheduledIds] = useState<number[]>([]);

  const handleExecutePlan = async () => {
    setExecuting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await fetch('http://localhost:8000/academic/execute-plan', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "execute_plan", target_id: "dbms_catchup", details: {} })
      });
      const data = await res.json();
      if(data.status === "success") setPlanSuccess(true);
    } catch (e) {
      console.warn("Backend unreachable. Mocking success for demo...", e);
      setPlanSuccess(true);
    } finally { setExecuting(false); }
  };

  const handleReschedule = async (idx: number) => {
    setReschedulingId(idx);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const res = await fetch('http://localhost:8000/academic/reschedule', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "reschedule", target_id: `holiday_block_${idx}`, details: {} })
      });
      const data = await res.json();
      if(data.status === "success") setRescheduledIds(prev => [...prev, idx]);
    } catch (e) {
      console.warn("Backend unreachable. Mocking success for demo...", e);
      setRescheduledIds(prev => [...prev, idx]);
    } finally { setReschedulingId(null); }
  };
  const timeline = [
    { date: "March 24-25", name: "Holi Break", lost: 4, delay: "3 Days", risk: "Medium", riskColor: "text-yellow-600 bg-yellow-50 border-yellow-200", effect: "Computer Networks Module 3 pushed to April 2. CIA 1 overlaps with catchup period." },
    { date: "April 10", name: "Eid al-Fitr", lost: 2, delay: "1 Day", risk: "Low", riskColor: "text-green-600 bg-green-50 border-green-200", effect: "Minor displacement for DSA." },
    { date: "April 18-21", name: "Easter Long Weekend", lost: 6, delay: "5 Days", risk: "Critical", riskColor: "text-[#DA291C] bg-red-50 border-red-200", effect: "Massive disruption to DBMS schedule. Syllabus completion date shifted dangerously close to Final Exams." }
  ];

  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA]">
      <TopHeader title="Holiday+" subtitle="Academic Disruption Intelligence & Resilience System" />
      
      <div className="px-8 flex-1 pb-10 space-y-6 max-w-7xl mx-auto w-full">
         
         {/* Top Level Summary Cards */}
         <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 relative overflow-hidden group hover:border-red-300 transition-colors">
               <div className="absolute -top-10 -right-10 w-32 h-32 bgGradientRedOpacity opacity-10 rounded-full blur-3xl group-hover:scale-110 transition-transform"></div>
               <h3 className="text-[10px] font-black text-[#DA291C] uppercase tracking-widest mb-1">Semester Impact</h3>
               <p className="text-4xl font-black text-gray-800 tracking-tighter">12 <span className="text-xl text-gray-400 font-bold tracking-tight">Lectures Lost</span></p>
               <p className="text-sm font-semibold text-gray-500 mt-3 flex items-start"><AlertTriangle className="w-4 h-4 mr-1.5 text-red-500 flex-shrink-0 mt-0.5" /> Core syllabus delayed by 9 cumulative days across departments.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-yellow-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500 opacity-10 rounded-full blur-2xl"></div>
               <h3 className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1">Attendance Risk Matrix</h3>
               <p className="text-4xl font-black text-gray-800 tracking-tighter">18% <span className="text-xl text-gray-400 font-bold tracking-tight">EMA Drop</span></p>
               <p className="text-sm font-semibold text-gray-500 mt-3 flex items-start"><BarChart3 className="w-4 h-4 mr-1.5 text-yellow-500 flex-shrink-0 mt-0.5" /> Predicted severe attendance drops on Mondays following long weekends.</p>
            </div>

            <div className="bg-gradient-to-br from-[#1E2A66] to-[#151D48] rounded-2xl p-6 shadow-lg border border-[#1E2A66] relative overflow-hidden text-white">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF] opacity-10 rounded-full blur-3xl"></div>
               <h3 className="text-[10px] font-black text-[#00E5FF] uppercase tracking-widest mb-1 flex items-center"><Map className="w-3 h-3 mr-1" /> AI Recovery Plan</h3>
               <p className="text-lg font-bold text-white mt-2 leading-snug">Substitute 2 generic labs for high-velocity DBMS theoretical catchup sessions.</p>
               {planSuccess ? (
                  <button disabled className="mt-4 px-4 py-2 bg-green-500/20 text-green-400 font-bold text-xs rounded-lg border border-green-500/30 flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Plan Active</button>
               ) : (
                  <button onClick={handleExecutePlan} disabled={executing} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-[#00E5FF] font-bold text-xs rounded-lg transition-colors border border-white/20 flex items-center justify-center min-w-[120px]">
                    {executing ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <><Zap className="w-3.5 h-3.5 mr-1"/> Execute Plan</>}
                  </button>
               )}
            </div>
         </div>

         {/* Detailed Disruption Timeline */}
         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-lg font-extrabold text-gray-800 mb-6 flex items-center border-b border-gray-100 pb-4">
               <Activity className="w-5 h-5 mr-2 text-[#DA291C]" /> Forward Timeline Analysis
            </h3>
            
            <div className="space-y-4">
               {timeline.map((item, idx) => (
                  <div key={idx} className="flex border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors shadow-sm bg-gray-50/30">
                     <div className="w-48 flex-shrink-0 border-r border-gray-100 pr-5">
                        <p className="text-sm font-black text-gray-800">{item.name}</p>
                        <p className="text-xs font-semibold text-gray-500 flex items-center mt-1"><CalendarIcon className="w-3 h-3 mr-1" /> {item.date}</p>
                        <span className={`inline-block mt-3 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${item.riskColor}`}>
                          {item.risk} Risk
                        </span>
                     </div>
                     <div className="flex-1 px-5 grid grid-cols-2 gap-4">
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Syllabus Impact</p>
                           <p className="text-sm font-bold text-gray-800">{item.lost} Classes lost</p>
                           <p className="text-sm font-bold text-[#DA291C]">Syllabus delayed by {item.delay}</p>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Cascade Effects</p>
                           <p className="text-sm font-semibold text-gray-600 leading-snug">{item.effect}</p>
                        </div>
                     </div>
                     <div className="w-40 flex-shrink-0 flex items-center justify-end border-l border-gray-100 pl-4">
                        {rescheduledIds.includes(idx) ? (
                            <button disabled className="px-4 py-2 bg-green-50 border border-green-200 text-green-700 font-bold text-xs rounded-lg shadow-sm flex items-center w-full justify-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/> Fixed</button>
                        ) : (
                            <button onClick={() => handleReschedule(idx)} disabled={reschedulingId === idx} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-lg shadow-sm hover:bg-gray-50 transition-colors w-full flex items-center justify-center">
                               {reschedulingId === idx ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : "Reschedule"}
                            </button>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>
         
      </div>
      <style dangerouslySetInnerHTML={{__html:`.bgGradientRedOpacity { background-color: rgba(218, 41, 28, 0.8); }`}}></style>
    </div>
  );
}
