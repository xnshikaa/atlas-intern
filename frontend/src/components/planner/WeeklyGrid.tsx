"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertCircle, Bookmark } from 'lucide-react';

const initialData = {
  Monday: [
    { id: '1', title: 'Corporate Finance', time: '08:00 - 09:30', type: 'lecture', attendance: '88%', dept: 'BBA', division: 'Div A' },
    { id: '2', title: 'Data Structures Lab', time: '10:00 - 12:00', type: 'lab', attendance: '92%', dept: 'UGDX', division: 'Batch 1' },
  ],
  Tuesday: [
    { id: '3', title: 'Machine Learning', time: '09:00 - 11:00', type: 'lecture', attendance: '85%', dept: 'UGDX', division: 'Batch 2' },
    { id: '4', title: 'Unit 1 CIA', time: '14:00 - 16:00', type: 'cia', attendance: '98%', alert: 'High Stress', dept: 'MBA', division: 'Marketing' },
  ],
  Wednesday: [
    { id: '5', title: 'Constitutional Law', time: '08:30 - 10:00', type: 'moot_court', attendance: '85%', dept: 'LAW', division: 'Year 2' },
  ],
  Thursday: [
    { id: '7', title: 'Business Strategy', time: '09:00 - 11:00', type: 'case_discussion', attendance: '82%', dept: 'MBA', division: 'Finance' },
  ],
  Friday: [
    { id: '9', title: 'Corporate Finance', time: '08:00 - 09:30', type: 'lecture', attendance: '70%', dept: 'BBA', division: 'Div A' },
  ],
};

const typeColors = {
  lecture: 'bg-[#E6F3FF] text-[#1E2A66] border-[#B3D4FF]',
  lab: 'bg-[#E5FCFF] text-[#008A99] border-[#B3F2FF]',
  cia: 'bg-[#FFE5E8] text-[#E7203A] border-[#FFB3BC]',
  moot_court: 'bg-[#F3E8FF] text-[#4C1D95] border-[#D8B4FE]',
  case_discussion: 'bg-[#FEF3C7] text-[#78350F] border-[#FDE68A]',
  admin: 'bg-[#F3F4F6] text-[#4B5563] border-[#D1D5DB]'
};

export default function WeeklyGrid() {
  const [schedule] = useState(initialData);
  const [simulationMode, setSimulationMode] = useState(false);

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      
      {/* Top Controls & Alerts */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Unified University Planner</h2>
          <p className="text-sm text-gray-500 mt-1">Cross-department visibility with intelligent CIA constraint detection.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2 mr-4">
             <button className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">UGDX</button>
             <button className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">BBA</button>
             <button className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">LAW</button>
             <button className="px-3 py-1.5 text-xs font-semibold bg-atlasPrimary text-white shadow-sm rounded-lg">MBA</button>
          </div>
          <div className="flex items-center p-2 px-3 rounded-xl bg-gray-50 border border-gray-200 shadow-inner">
            <span className={`text-sm font-semibold mr-3 transition-colors ${simulationMode ? 'text-atlasPrimary' : 'text-gray-400'}`}>
              What-If Sandbox
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={simulationMode} onChange={(e) => setSimulationMode(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-atlasCyan"></div>
            </label>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {simulationMode && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            className="bg-red-50 border-l-4 border-atlasRed p-4 rounded-xl flex items-start shadow-sm"
          >
            <AlertCircle className="w-5 h-5 text-atlasRed mr-3 mt-0.5" />
            <div>
              <h4 className="font-semibold text-atlasRed">CRITICAL: Block Placement Denied</h4>
              <p className="text-sm text-red-800 mt-1">Prerequisites incomplete. Module 2 must reach <span className="font-mono bg-red-100 px-1 rounded">COMPLETED</span> state before advancing MBA Marketing CIA.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-6 flex-1 items-start">
        {Object.entries(schedule).map(([day, blocks], index) => (
          <div key={day} className="flex flex-col space-y-4">
            <h3 className="text-center font-bold text-lg text-gray-700 pb-2 border-b-2 tracking-tight" style={{
              borderColor: index === 0 ? '#1E2A66' : index === 1 ? '#008A99' : index === 2 ? '#D97706' : index === 3 ? '#C2410C' : '#E7203A'
            }}>
              {day}
            </h3>
            
            <div className="flex flex-col space-y-3 min-h-[500px] p-2 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <AnimatePresence>
                {blocks.map((block) => (
                  <motion.div
                    key={block.id}
                    layoutId={block.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative p-3.5 rounded-xl border border-opacity-60 shadow-sm cursor-grab active:cursor-grabbing backdrop-blur-sm ${typeColors[block.type as keyof typeof typeColors]}`}
                  >
                    {simulationMode && block.type === 'cia' && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-atlasRed opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-atlasRed border-2 border-white shadow-sm"></span>
                      </span>
                    )}
                    
                    <div className="flex justify-between items-start mb-1.5">
                       <h4 className="font-bold text-sm leading-tight pr-2">{block.title}</h4>
                       {block.dept && (
                         <span className="text-[10px] font-extrabold uppercase bg-white/50 px-1.5 py-0.5 rounded text-gray-700 border border-gray-400/20">{block.dept}</span>
                       )}
                    </div>
                    
                    <div className="flex items-center text-xs opacity-80 mb-2 font-medium">
                      <Clock className="w-3 h-3 mr-1.5" />
                      {block.time} &bull; <span className="ml-1 font-semibold">{block.division}</span>
                    </div>
                    
                    {block.attendance && (
                      <div className="flex items-center justify-between text-[10px] font-bold mt-2 pt-2 border-t border-black/10">
                        <span className="opacity-70 uppercase tracking-widest">EMA Att.</span>
                        <span className={`${parseInt(block.attendance) < 75 ? 'text-atlasRed' : 'text-green-700'} flex items-center`}>
                          {block.attendance}
                        </span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <button className="flex items-center justify-center p-3 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 hover:border-atlasCyan hover:text-atlasCyan hover:bg-cyan-50/50 transition-all duration-200 group mt-2">
                <span className="text-xl mr-2 group-hover:scale-125 transition-transform">+</span> 
                <span className="text-sm font-semibold tracking-wide">New Request</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
