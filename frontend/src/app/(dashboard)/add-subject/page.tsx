"use client";
import React from 'react';
import TopHeader from "@/components/layout/TopHeader";
import { X } from 'lucide-react';
import Link from 'next/link';

export default function AddSubjectPage() {
  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA]">
      <TopHeader title="Dashboard" subtitle="Academic Year 2024-25 • Semester 2" />

      {/* Modal Overlay */}
      <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center backdrop-blur-[2px]">
         <div className="bg-white w-[500px] rounded-xl overflow-hidden shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="bg-[#DA291C] px-6 py-4 flex justify-between items-center text-white">
               <h2 className="font-bold text-lg tracking-wide">Add New Subject</h2>
               <Link href="/" className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"><X className="w-5 h-5"/></Link>
            </div>
            
            <div className="p-6 space-y-5 font-sans">
               <div className="flex space-x-5">
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Subject Name</label>
                     <input type="text" placeholder="e.g. Data Structures" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm" />
                  </div>
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Subject Code</label>
                     <input type="text" placeholder="e.g. CS401" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm" />
                  </div>
               </div>

               <div className="flex space-x-5">
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Department</label>
                     <select className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-semibold text-gray-700">
                        <option>BTech CSE</option>
                        <option>BBA</option>
                        <option>LAW</option>
                     </select>
                  </div>
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Batch</label>
                     <input type="text" placeholder="e.g. 2023-A" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-semibold text-gray-700" />
                  </div>
               </div>
               
               <div className="flex space-x-5">
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Total Lectures</label>
                     <input type="number" defaultValue={45} className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm font-semibold" />
                  </div>
                  <div className="flex-1">
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Semester End</label>
                     <input type="date" className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-red-400 text-sm text-gray-500" />
                  </div>
               </div>

               <div className="flex justify-end space-x-3 mt-8 pt-5 border-t border-gray-100">
                  <Link href="/" className="px-6 py-2.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 shadow-sm transition-colors">Cancel</Link>
                  <Link href="/syllabus" className="px-6 py-2.5 text-sm font-bold text-white bg-[#DA291C] rounded-xl shadow-[0_4px_14px_0_rgba(218,41,28,0.39)] hover:bg-red-700 hover:shadow-[0_6px_20px_rgba(218,41,28,0.23)] transition-all flex items-center justify-center">Create Subject</Link>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
