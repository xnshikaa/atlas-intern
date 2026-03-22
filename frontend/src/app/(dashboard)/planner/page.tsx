"use client";
import React, { useState } from 'react';
import TopHeader from "@/components/layout/TopHeader";
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PlannerPage() {
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekString = () => {
    if (weekOffset === 0) return "Week of 17-21 March 2025";
    if (weekOffset === -1) return "Week of 10-14 March 2025";
    if (weekOffset === 1) return "Week of 24-28 March 2025";
    return `Week structured +${weekOffset} from current`;
  };

  const prevWeek = () => setWeekOffset(o => o - 1);
  const nextWeek = () => setWeekOffset(o => o + 1);
  const today = () => setWeekOffset(0);

  const times = [
    "9:00-\n10:00", "10:00-\n11:00", "11:00-\n12:00", 
    "12:00-\n13:00", "13:00-\n14:00", "14:00-\n15:00", 
    "15:00-\n16:00", "16:00-\n17:00"
  ];
  
  const blocks = {
    Monday: {
      0: { title: "DSA", type: "Lecture • A101", color: "bg-[#FCE8E8] text-[#D43434] border-[#F4C2C2]" },
      2: { title: "DBMS", type: "Lecture • A102", color: "bg-[#E6F8F1] text-[#2F855A] border-[#C6F6D5]" },
      5: { title: "CN", type: "Lecture • A103", color: "bg-[#FEF6D8] text-[#B7791F] border-[#FCE68A]" },
    },
    Tuesday: {
      0: { title: "OS", type: "Lecture • B201", color: "bg-[#EBF4FF] text-[#2B6CB0] border-[#BEE3F8]" },
      5: { title: "DBMS", type: "Lecture • A102", color: "bg-[#E6F8F1] text-[#2F855A] border-[#C6F6D5]" },
    },
    Wednesday: {
      0: { title: "CN", type: "Lecture • A103", color: "bg-[#FEF6D8] text-[#B7791F] border-[#FCE68A]" },
      2: { title: "OS", type: "Lecture • B201", color: "bg-[#EBF4FF] text-[#2B6CB0] border-[#BEE3F8]" },
    },
    Thursday: {
      0: { title: "DSA", type: "Lecture • A101", color: "bg-[#FCE8E8] text-[#D43434] border-[#F4C2C2]" },
      2: { title: "CN", type: "Lecture • A103", color: "bg-[#FEF6D8] text-[#B7791F] border-[#FCE68A]" },
      5: { title: "OS", type: "Lecture • B201", color: "bg-[#EBF4FF] text-[#2B6CB0] border-[#BEE3F8]" },
    },
    Friday: {
      0: { title: weekOffset === 0 ? "DBMS" : "Holiday", type: weekOffset === 0 ? "CIA 2 Prep • A102" : "No Class Blocked", color: weekOffset === 0 ? "bg-[#DA291C] text-white border-[#C52217] shadow-sm" : "bg-gray-100 text-gray-500 border-gray-200 border-dashed" },
      1: { title: "DSA", type: "Lecture • A101", color: "bg-[#FCE8E8] text-[#D43434] border-[#F4C2C2]" },
      5: { title: "CN", type: "Assignment Due • A103", color: "bg-[#FEF6D8] text-[#B7791F] border-[#FCE68A]" },
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA]">
      <TopHeader title="Weekly Schedule" subtitle="Academic Year 2024-25 • Semester 2" />
      
      <div className="px-8 flex-1 pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col p-6 transition-all duration-300">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 transition-all">{getWeekString()}</h2>
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button onClick={prevWeek} className="px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center border-r border-gray-200 transition-colors"><ChevronLeft className="w-4 h-4 mr-1"/> Prev</button>
              <button onClick={today} className={`px-6 py-2 text-sm font-bold border-r border-gray-200 transition-all ${weekOffset === 0 ? 'bg-[#DA291C] text-white shadow-inner' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>Today</button>
              <button onClick={nextWeek} className="px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center transition-colors">Next <ChevronRight className="w-4 h-4 ml-1"/></button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden flex flex-1 w-full bg-white relative">
            <div className={`absolute inset-0 bg-white/50 z-10 transition-opacity duration-300 pointer-events-none ${weekOffset !== 0 ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="flex flex-col w-full h-full">
               <div className="flex w-full bg-[#DA291C] text-white font-bold h-12">
                  <div className="w-20 flex-shrink-0 border-r border-[#C52217]/50"></div>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => (
                    <div key={day} className={`flex-1 flex items-center justify-center text-[13px] tracking-wide ${idx < 4 ? 'border-r border-[#C52217]/50' : ''}`}>{day}</div>
                  ))}
               </div>

               <div className="flex flex-col w-full bg-white">
                  {times.map((time, rowIdx) => (
                     <div key={time} className="flex w-full min-h-[85px] border-b border-gray-100 last:border-0 relative">
                        <div className="w-20 flex-shrink-0 text-center flex flex-col items-center justify-center text-[11px] text-gray-400 font-medium border-r border-gray-100 p-2 whitespace-pre-line leading-tight">
                           {time}
                        </div>

                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, colIdx) => {
                           // @ts-ignore
                           const block = blocks[day]?.[rowIdx];
                           return (
                             <div key={colIdx} className={`flex-1 border-r border-gray-100 last:border-0 p-1.5 relative transition-colors hover:bg-gray-50`}>
                               {block && (
                                  <div className={`w-full h-full rounded-lg border px-3 py-2 flex flex-col justify-center transition-transform hover:-translate-y-0.5 hover:shadow-sm cursor-pointer ${block.color}`}>
                                    <h4 className="font-bold text-[13px] tracking-tight">{block.title}</h4>
                                    <p className="text-[10px] mt-0.5 opacity-90">{block.type}</p>
                                  </div>
                               )}
                             </div>
                           )
                        })}
                     </div>
                  ))}
               </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 mt-6 px-4">
             <div className="flex items-center text-[13px] font-semibold text-gray-500"><div className="w-3.5 h-3.5 rounded bg-[#FCE8E8] mr-2 shadow-sm"></div> Lectures</div>
             <div className="flex items-center text-[13px] font-semibold text-gray-500"><div className="w-3.5 h-3.5 rounded bg-[#EBF4FF] mr-2 shadow-sm"></div> Practicals</div>
             <div className="flex items-center text-[13px] font-semibold text-gray-500"><div className="w-3.5 h-3.5 rounded bg-[#DA291C] mr-2 shadow-sm"></div> CIA/Exam</div>
             <div className="flex items-center text-[13px] font-semibold text-gray-500"><div className="w-3.5 h-3.5 rounded bg-[#FEF6D8] mr-2 shadow-sm"></div> Assignment</div>
          </div>

        </div>
      </div>
    </div>
  );
}
