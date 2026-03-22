"use client";
import React from 'react';
import TopHeader from "@/components/layout/TopHeader";

export default function SmartAlertsPage() {
  const alerts = [
    { type: "Behind schedule", subject: "Computer Networks", desc: "You are 4 lectures behind. At current pace, syllabus finishes May 12, but semester ends April 30. Add 2 extra sessions/week.", time: "Today 9:14 AM", color: "bg-red-50/50 border-red-200", dot: "bg-red-500" },
    { type: "CIA conflict", subject: "DBMS CIA 2", desc: "CIA 2 scheduled Apr 12 but only 72% syllabus covered. AI suggests Apr 15 for better preparedness.", time: "Today 9:14 AM", color: "bg-yellow-50/50 border-yellow-200", dot: "bg-yellow-500" },
    { type: "Low attendance predicted", subject: "Monday", desc: "Next Monday follows a Sunday holiday. Historical data shows 18% drop on post-holiday Mondays for this batch.", time: "Today 9:14 AM", color: "bg-yellow-50/50 border-yellow-200", dot: "bg-yellow-500" },
    { type: "Module completed", subject: "DSA Trees", desc: "You have fully covered the Trees module. Consider a quick revision before CIA 2 on April 8.", time: "Yesterday", color: "bg-blue-50/50 border-blue-200", dot: "bg-blue-500" },
  ];

  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA]">
      <TopHeader title="Smart Alerts" subtitle="Academic Year 2024-25 • Semester 2" />
      
      <div className="max-w-4xl mx-auto w-full px-8 pb-10 mt-2">
         
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-500 font-medium">4 active alerts • AI-generated</h3>
            <button className="px-5 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl shadow-sm font-bold text-sm hover:bg-gray-50 transition-colors">
              Mark all read
            </button>
         </div>

         <div className="space-y-4">
            {alerts.map((alert, idx) => (
               <div key={idx} className={`p-5 rounded-2xl border flex flex-col shadow-sm ${alert.color}`}>
                  <div className="flex items-center mb-1.5">
                     <span className={`w-2.5 h-2.5 rounded-full mr-3 ${alert.dot}`}></span>
                     <h4 className="font-extrabold text-gray-800 tracking-tight">{alert.type} — {alert.subject}</h4>
                  </div>
                  <p className="text-gray-700 text-sm ml-5.5 pl-5">{alert.desc}</p>
                  <p className="text-xs text-gray-400 font-medium ml-5.5 pl-5 mt-3">{alert.time}</p>
               </div>
            ))}
         </div>

      </div>
    </div>
  );
}
