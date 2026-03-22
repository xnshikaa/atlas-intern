"use client";
import TopHeader from "@/components/layout/TopHeader";
import { TrendingUp, Users } from 'lucide-react';

export default function PredictionsPage() {
  const forecasts = [
    { title: "Data Structures & Algorithms", status: "On Track", statusColor: "bg-[#E6F8F1] text-[#2F855A]", progress: "72%", remaining: "6", needed: "13", weeks: "5w", finish: "Apr 28", finishColor: "text-[#00B4C8]" },
    { title: "Database Management Systems", status: "Behind", statusColor: "bg-[#FCE8E8] text-[#D43434]", progress: "58%", remaining: "9", needed: "17", weeks: "6w", finish: "May 12", finishColor: "text-[#D43434]" },
    { title: "Operating Systems", status: "On Track", statusColor: "bg-[#E6F8F1] text-[#2F855A]", progress: "65%", remaining: "7", needed: "11", weeks: "4w", finish: "Apr 15", finishColor: "text-[#00B4C8]" },
  ];

  const attendance = [
    { day: "Monday", pct: "74%", bar: "w-[74%] bg-[#DA291C]", alert: "⚠ Post-holiday drop predicted" },
    { day: "Tuesday", pct: "88%", bar: "w-[88%] bg-[#2F855A]", alert: null },
    { day: "Wednesday", pct: "85%", bar: "w-[85%] bg-[#2F855A]", alert: null },
    { day: "Thursday", pct: "91%", bar: "w-[91%] bg-[#2F855A]", alert: null },
    { day: "Friday", pct: "79%", bar: "w-[79%] bg-[#B7791F]", alert: null },
  ];

  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA]">
      <TopHeader title="Predictions & Forecasts" subtitle="Academic Year 2024-25 • Semester 2" />
      
      <div className="px-8 flex-1 pb-10 flex space-x-8">
         
         {/* Left Side: Completion Forecast */}
         <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-700 flex items-center mb-6">
               <TrendingUp className="w-4 h-4 mr-2 text-indigo-400" /> Syllabus Completion Forecast
            </h3>
            
            <div className="space-y-4">
               {forecasts.map((f, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                     <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                           <div className="w-4 h-4 grid grid-cols-2 gap-0.5 mr-3">
                              <div className="bg-green-400"></div><div className="bg-blue-400"></div>
                              <div className="bg-purple-400"></div><div className="bg-[#DA291C]"></div>
                           </div>
                           <h4 className="font-bold text-lg text-gray-800">{f.title}</h4>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ring-1 ring-inset ring-black/5 ${f.statusColor}`}>{f.status}</span>
                     </div>
                     
                     <div className="space-y-3 font-medium text-sm">
                        <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Progress</span><span className="text-gray-700 font-bold">{f.progress}</span></div>
                        <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Topics remaining</span><span className="text-gray-700 font-bold">{f.remaining}</span></div>
                        <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Lectures needed</span><span className="text-gray-700 font-bold">{f.needed}</span></div>
                        <div className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Estimated weeks</span><span className="text-gray-700 font-bold">{f.weeks}</span></div>
                        <div className="flex justify-between pt-1"><span className="text-gray-500">Predicted finish</span><span className={`font-bold ${f.finishColor}`}>{f.finish}</span></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Right Side: Attendance Prediction */}
         <div className="w-[450px]">
            <h3 className="text-sm font-bold text-gray-700 flex items-center mb-6">
               <Users className="w-4 h-4 mr-2 text-[#00B4C8]" /> Attendance Prediction (This Week)
            </h3>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col space-y-6">
               {attendance.map((day, idx) => (
                  <div key={idx} className="flex flex-col border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                     <div className="flex justify-between items-end mb-2">
                        <span className="font-semibold text-gray-700">{day.day}</span>
                        <span className={`text-xl font-bold tracking-tight ${day.pct === '74%' ? 'text-[#DA291C]' : 'text-[#2F855A]'}`}>{day.pct}</span>
                     </div>
                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mb-1.5">
                        <div className={`h-full rounded-full ${day.bar}`}></div>
                     </div>
                     {day.alert && (
                        <p className="text-[10px] text-[#DA291C] font-semibold">{day.alert}</p>
                     )}
                  </div>
               ))}
            </div>
         </div>

      </div>
    </div>
  );
}
