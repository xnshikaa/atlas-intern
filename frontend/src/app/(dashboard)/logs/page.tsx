"use client";
import React, { useState } from 'react';
import TopHeader from "@/components/layout/TopHeader";
import { X, Plus, Clock, Users, CheckCircle2 } from 'lucide-react';

export default function LogsPage() {
  const [logs, setLogs] = useState([
    { id: 1, subject: "Data Structures & Algorithm", date: "2025-03-20", topics: "Graphs, BFS, DFS", duration: 55, attendance: 88, notes: "Students struggled with DFS recursion." },
    { id: 2, subject: "Database Management System", date: "2025-03-19", topics: "SQL Joins, Subqueries", duration: 60, attendance: 92, notes: "Good engagement on Outer Joins." }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLog, setNewLog] = useState({ subject: "Data Structures & Algorithm", date: "2025-03-22", topics: "", duration: 50, attendance: 85, notes: "" });

  const handleSave = () => {
    setLogs([{ id: Date.now(), ...newLog }, ...logs]);
    setIsModalOpen(false);
    setNewLog({ subject: "Data Structures & Algorithm", date: "2025-03-22", topics: "", duration: 50, attendance: 85, notes: "" });
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA]">
      <TopHeader title="Lecture Logs" subtitle="Academic Year 2024-25 • Semester 2" />
      
      <div className="px-8 flex-1 pb-10">
         <div className="flex justify-between items-center mb-6">
            <h3 className="text-gray-800 font-extrabold text-xl tracking-tight">Recent Execution History</h3>
            <button onClick={() => setIsModalOpen(true)} className="px-5 py-2.5 bg-[#DA291C] text-white rounded-xl shadow-[0_4px_14px_0_rgba(218,41,28,0.39)] font-bold text-sm hover:shadow-[0_6px_20px_rgba(218,41,28,0.23)] hover:bg-red-700 transition-all flex items-center">
               <Plus className="w-4 h-4 mr-2" /> Log Today's Lecture
            </button>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
               <thead className="bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <tr>
                     <th className="p-4 pl-6">Date</th>
                     <th className="p-4">Subject</th>
                     <th className="p-4 w-1/3">Topics Covered</th>
                     <th className="p-4 text-center">Metrics</th>
                     <th className="p-4 text-center">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {logs.map(log => (
                     <tr key={log.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-4 pl-6 font-semibold text-sm text-gray-700">{log.date}</td>
                        <td className="p-4 font-bold text-sm text-[#1E2A66]">{log.subject}</td>
                        <td className="p-4">
                           <p className="text-sm font-bold text-gray-800">{log.topics}</p>
                           <p className="text-xs text-gray-400 font-medium mt-1 truncate max-w-xs">{log.notes}</p>
                        </td>
                        <td className="p-4">
                           <div className="flex justify-center space-x-3 text-xs font-bold text-gray-500">
                              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1 text-blue-500" /> {log.duration}m</span>
                              <span className="flex items-center"><Users className="w-3.5 h-3.5 mr-1 text-green-500" /> {log.attendance}%</span>
                           </div>
                        </td>
                        <td className="p-4 text-center">
                           <span className="inline-flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"><CheckCircle2 className="w-3 h-3 mr-1" /> Logged</span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {isModalOpen && (
         <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center backdrop-blur-[2px]">
            <div className="bg-white w-[550px] rounded-xl overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
               <div className="bg-[#DA291C] px-6 py-4 flex justify-between items-center text-white">
                  <h2 className="font-bold text-lg tracking-wide">Log Today's Lecture</h2>
                  <button onClick={() => setIsModalOpen(false)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"><X className="w-5 h-5"/></button>
               </div>
               
               <div className="p-6 space-y-5 font-sans">
                  <div className="flex space-x-5">
                     <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Subject</label>
                        <select value={newLog.subject} onChange={e => setNewLog({...newLog, subject: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-semibold text-gray-700">
                           <option>Data Structures & Algorithm</option>
                           <option>Database Management System</option>
                        </select>
                     </div>
                     <div className="w-1/3">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Date</label>
                        <input type="date" value={newLog.date} onChange={e => setNewLog({...newLog, date: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-semibold text-gray-700" />
                     </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Topics Covered</label>
                    <input type="text" value={newLog.topics} onChange={e => setNewLog({...newLog, topics: e.target.value})} placeholder="e.g. AVL Trees, Red-Black Trees" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-semibold" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Lecture Notes</label>
                    <textarea rows={3} value={newLog.notes} onChange={e => setNewLog({...newLog, notes: e.target.value})} placeholder="Notes, observations..." className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 resize-none text-sm font-medium"></textarea>
                  </div>
                  
                  <div className="flex space-x-5">
                     <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Duration (Mins)</label>
                        <input type="number" value={newLog.duration} onChange={e => setNewLog({...newLog, duration: Number(e.target.value)})} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-bold text-blue-700" />
                     </div>
                     <div className="flex-1">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Attendance %</label>
                        <input type="number" value={newLog.attendance} onChange={e => setNewLog({...newLog, attendance: Number(e.target.value)})} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-bold text-green-700" />
                     </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-8 pt-5 border-t border-gray-100">
                     <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-colors">Cancel</button>
                     <button onClick={handleSave} className="px-6 py-2.5 text-sm font-bold text-white bg-[#DA291C] rounded-xl shadow-[0_4px_14px_0_rgba(218,41,28,0.39)] hover:bg-red-700 hover:shadow-[0_6px_20px_rgba(218,41,28,0.23)] transition-all">Save Log</button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
