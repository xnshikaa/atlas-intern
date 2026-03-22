import React from 'react';
import { Zap } from 'lucide-react';
import Link from 'next/link';

interface TopHeaderProps {
  title: string;
  subtitle: string;
}

export default function TopHeader({ title, subtitle }: TopHeaderProps) {
  return (
    <div className="flex justify-between items-center bg-white px-8 py-5 border-b border-gray-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] sticky top-0 z-10 w-full mb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/holidays" className="px-5 py-2.5 bg-white border border-gray-200 text-[#DA291C] font-black text-sm rounded-xl hover:bg-red-50 hover:border-red-200 transition-colors shadow-sm flex items-center">
          Holiday+
        </Link>
        <Link href="/logs" className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
          Log Lecture
        </Link>
        <Link href="/ai-assistant" className="px-5 py-2.5 bg-[#DA291C] text-white font-bold text-sm rounded-xl hover:bg-red-700 transition-colors shadow-md flex items-center">
          <Zap className="w-4 h-4 mr-2" fill="currentColor" /> Run AI Agent
        </Link>
      </div>
    </div>
  );
}
