"use client";
import React from "react";
import { Bell, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 backdrop-blur-xl bg-white/70 border-b border-gray-200 shadow-sm"
    >
      <div className="flex items-center bg-gray-100/80 rounded-full px-4 py-2 w-96 shadow-inner transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-atlasCyan">
        <Search className="w-4 h-4 text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search subjects, topics, or ask AI..." 
          className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
        />
        <div className="p-1.5 bg-gradient-to-r from-atlasCyan to-blue-500 rounded-full cursor-pointer ml-2 shadow-md hover:scale-105 transition-transform">
           <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="relative p-2 text-gray-500 hover:text-atlasPrimary transition-colors rounded-full hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-atlasRed rounded-full border border-white animate-pulse"></span>
        </button>
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-atlasPrimary flex items-center justify-center text-white font-semibold shadow-md border-2 border-transparent group-hover:border-atlasCyan transition-all duration-300">
            DR
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">Dr. Rajesh</p>
            <p className="text-xs text-gray-500">Computer Science</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
