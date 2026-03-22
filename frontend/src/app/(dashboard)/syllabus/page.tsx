"use client";
import React, { useState } from 'react';
import TopHeader from "@/components/layout/TopHeader";
import { Play, ShieldAlert, Activity, X } from 'lucide-react';

export default function SyllabusTrackerPage() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: "Data Structures & Algorithms", code: "CS401", active: true, color: "bg-[#DA291C]" },
    { id: 2, name: "Database Management Systems", code: "CS402", active: false, color: "bg-green-500" },
    { id: 3, name: "Operating Systems", code: "CS403", active: false, color: "bg-blue-500" },
    { id: 4, name: "Computer Networks", code: "CS404", active: false, color: "bg-yellow-600" }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSub, setNewSub] = useState({ name: "", code: "", dept: "BTech CSE", batch: "2023-A", lectures: 45 });

  const modules = [
    { title: "Module 1: Arrays & Linked Lists", progress: "5/5", pct: "100%", state: "COMPLETED" },
    { title: "Module 2: Trees", progress: "4/5", pct: "80%", state: "IN_PROGRESS" },
    { title: "Module 3: Graphs", progress: "2/5", pct: "40%", state: "IN_PROGRESS_LOW" },
    { title: "Module 4: Dynamic Programming", progress: "0/5", pct: "0%", state: "NOT_STARTED" },
  ];

  const handleAddSubject = () => {
    if(!newSub.name) return;
    setSubjects([...subjects.map(s => ({...s, active: false})), { id: Date.now(), name: newSub.name, code: newSub.code || "NEW", active: true, color: "bg-purple-500" }]);
    setIsModalOpen(false);
  };

  const activeSubject = subjects.find(s => s.active) || subjects[0];

  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA]">
      <TopHeader title="Syllabus Tracker" subtitle="Academic Year 2024-25 • Semester 2" />
      
      <div className="px-8 flex-1 pb-10 flex space-x-8">
        
        {/* Left Nav */}
        <div className="w-64 flex-shrink-0">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 ml-2">Your Subjects</h3>
           <div className="space-y-1.5">
             {subjects.map(sub => (
                <div 
                   key={sub.id} 
                   onClick={() => setSubjects(subjects.map(s => ({...s, active: s.id === sub.id})))}
                   className={`flex items-center px-4 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all ${sub.active ? 'bg-[#1E2A66] text-white shadow-md' : 'text-gray-600 hover:bg-white'}`}>
                   <div className={`w-2.5 h-2.5 rounded-full mr-3 border border-white/20 ${sub.active ? 'bg-white' : sub.color}`}></div>
                   <span className="truncate">{sub.name}</span>
                </div>
             ))}
             
             <button onClick={() => setIsModalOpen(true)} className="w-full mt-4 flex justify-center items-center py-3 border border-dashed border-[#1E2A66]/50 text-[#1E2A66] font-bold text-sm rounded-xl hover:bg-indigo-50 transition-colors bg-white/50">
               + New Subject
             </button>
           </div>
        </div>

        {/* Right Content */}
        <div className="flex-1">
           <div className="flex items-center mb-1">
             <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight mr-3">{activeSubject.name}</h2>
             <span className="bg-indigo-50 text-[#1E2A66] font-bold text-[10px] px-2 py-0.5 rounded shadow-sm">{activeSubject.code}</span>
           </div>
           
           <div className="flex space-x-6 text-sm text-gray-500 font-medium mb-5 mt-2">
             <span>11/20 topics</span>
             <span>32/45 lectures</span>
             <span>BTech-2023-A</span>
           </div>

           {/* Metrics specific to Holiday+ Requirement */}
           <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6 flex space-x-4 divide-x divide-gray-100">
               <div className="flex-1 px-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center"><Activity className="w-3 h-3 mr-1"/> Effective Days Left</p>
                  <p className="text-xl font-black text-gray-800">42 Days</p>
               </div>
               <div className="flex-1 px-4">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center"><ShieldAlert className="w-3 h-3 mr-1 text-red-500"/> Disruption Delay</p>
                  <p className="text-xl font-black text-red-600">-6 Lectures</p>
               </div>
               <div className="flex-[2] px-4">
                  <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1 flex items-center">✨ AI Recovery Plan</p>
                  <p className="text-xs font-bold text-blue-900 leading-tight mt-1.5 bg-blue-50 p-2 rounded-md">Compress Graph Theory into 2 sessions & add 1 weekend catchup.</p>
               </div>
           </div>

           <div className="w-full bg-white h-2 rounded-full mb-1.5 shadow-inner overflow-hidden border border-gray-100">
             <div className="h-full bg-blue-500 rounded-full w-[55%]"></div>
           </div>
           <p className="text-xs text-gray-500 font-bold mb-8 tracking-wide">55% complete overall</p>

           <div className="space-y-4">
              {modules.map((m, idx) => (
                 <div key={idx} className="flex justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
                   <div className="flex items-center text-gray-700 font-bold text-lg">
                      <Play className="w-3.5 h-3.5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors" fill="currentColor"/>
                      {m.title}
                   </div>
                   <div className="flex items-center space-x-4">
                     <span className="text-sm font-semibold text-gray-500">{m.progress}</span>
                     <span className={`px-3 py-1 rounded-md text-xs font-bold tracking-wide w-14 text-center shadow-sm 
                        ${m.state === 'COMPLETED' ? 'bg-[#E6F8F1] text-[#2F855A]' : 
                          m.state === 'IN_PROGRESS' ? 'bg-[#FEF6D8] text-[#B7791F]' :
                          m.state === 'IN_PROGRESS_LOW' ? 'text-red-700 bg-red-50' : 
                          'text-gray-400 bg-gray-50'}`}>
                        {m.pct}
                     </span>
                   </div>
                 </div>
              ))}
           </div>
        </div>

      </div>

      {/* Add Subject Modal built-in for instant state updates without routing problems */}
      {isModalOpen && (
         <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center backdrop-blur-[2px]">
            <div className="bg-white w-[500px] rounded-xl overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
               <div className="bg-[#DA291C] px-6 py-4 flex justify-between items-center text-white">
                  <h2 className="font-bold text-lg tracking-wide">Add New Subject</h2>
                  <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"><X className="w-5 h-5"/></button>
               </div>
               
               <div className="p-6 space-y-5 font-sans">
                  <div className="flex space-x-5">
                     <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Subject Name</label>
                        <input type="text" value={newSub.name} onChange={e => setNewSub({...newSub, name: e.target.value})} placeholder="e.g. Machine Learning" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-bold" />
                     </div>
                     <div className="w-1/3">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Code</label>
                        <input type="text" value={newSub.code} onChange={e => setNewSub({...newSub, code: e.target.value})} placeholder="CS501" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-bold" />
                     </div>
                  </div>
                  <div className="flex justify-end space-x-3 mt-8 pt-5 border-t border-gray-100">
                     <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-colors">Cancel</button>
                     <button onClick={handleAddSubject} className="px-6 py-2.5 text-sm font-bold text-white bg-[#DA291C] rounded-xl shadow-[0_4px_14px_0_rgba(218,41,28,0.39)] hover:bg-red-700 transition-all">Create Subject</button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
