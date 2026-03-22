"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, GripVertical, CheckCircle2, Type, Image as ImageIcon, Code, AlignLeft } from 'lucide-react';

export default function BlockEditor() {
  const [blocks, setBlocks] = useState([
    { id: '1', type: 'h1', content: 'Web Development: React Fundamentals' },
    { id: '2', type: 'p', content: 'Today we covered the basics of React components and state management.' },
    { id: '3', type: 'todo', content: 'Assign lab work', checked: false }
  ]);

  const addBlock = () => {
    setBlocks([...blocks, { id: Date.now().toString(), type: 'p', content: '' }]);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-8 bg-white min-h-[600px] shadow-sm shadow-blue-900/5 rounded-2xl border border-gray-100 font-sans">
      <div className="mb-8">
        <input 
          type="text" 
          defaultValue="Lecture: React Fundamentals" 
          className="text-4xl font-extrabold text-atlasPrimary w-full outline-none placeholder:text-gray-300 tracking-tight"
        />
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-400 font-medium">
          <span className="flex items-center"><AlignLeft className="w-4 h-4 mr-1.5 text-gray-300"/> Logged: Today 10:00 AM</span>
          <span className="px-3 py-1 bg-atlasCyan/10 text-[#009fb3] rounded-full text-xs font-bold shadow-sm">Module 2</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <AnimatePresence>
          {blocks.map((block) => (
            <motion.div 
              key={block.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex items-start -ml-8 transition-colors hover:bg-gray-50/50 rounded-lg pr-4"
            >
              <div className="w-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pt-1.5 cursor-grab">
                <GripVertical className="w-4 h-4 text-gray-300 hover:text-atlasCyan transition-colors" />
              </div>
              <div className="flex-1 py-1">
                {block.type === 'h1' && (
                  <input type="text" defaultValue={block.content} className="text-2xl font-bold w-full outline-none text-gray-800 bg-transparent placeholder:text-gray-300" placeholder="Heading 1" />
                )}
                {block.type === 'p' && (
                  <textarea 
                    defaultValue={block.content} 
                    placeholder="Type '/' for commands"
                    className="w-full outline-none text-gray-600 resize-none overflow-hidden min-h-[28px] leading-relaxed bg-transparent" 
                    rows={1}
                    onInput={(e) => {
                      e.currentTarget.style.height = 'px';
                      e.currentTarget.style.height = (e.currentTarget.scrollHeight) + 'px';
                    }}
                  />
                )}
                {block.type === 'todo' && (
                  <div className="flex items-start mt-1">
                    <input type="checkbox" defaultChecked={block.checked} className="w-4 h-4 mr-3 mt-1.5 accent-atlasCyan rounded-sm border-gray-300 cursor-pointer" />
                    <input type="text" defaultValue={block.content} className={`w-full outline-none bg-transparent ${block.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`} placeholder="To-do" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center text-gray-300 hover:text-atlasPrimary transition-colors cursor-pointer w-max pl-1" onClick={addBlock}>
        <Plus className="w-5 h-5 mr-1 bg-gray-100 rounded text-gray-400 hover:bg-atlasCyan hover:text-white transition-all shadow-sm" />
        <span className="text-sm font-medium">Click to add block</span>
      </div>
    </div>
  );
}
