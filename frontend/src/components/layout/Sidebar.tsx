"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Calendar, Edit3, Target, TrendingUp, Bot, Bell, Plus, Activity } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { section: 'WORKSPACE', items: [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
      { name: 'Syllabus Tracker', href: '/syllabus', icon: BookOpen },
      { name: 'Weekly Schedule', href: '/planner', icon: Calendar },
      { name: 'Lecture Logs', href: '/logs', icon: Edit3 },
      { name: 'CIA Planner', href: '/cia-planner', icon: Target, badge: 2 },
      { name: 'Predictions', href: '/predictions', icon: TrendingUp },
    ]},
    { section: 'AI TOOLS', items: [
      { name: 'AI Assistant', href: '/ai-assistant', icon: Bot, badgeText: 'Live' },
      { name: 'Smart Alerts', href: '/alerts', icon: Bell, badge: 3 },
    ]},
    { section: 'ADMIN', items: [
      { name: 'Add Subject', href: '/add-subject', icon: Plus },
      { name: 'Log Lecture', href: '/logs', icon: Activity },
    ]}
  ];

  const [userName, setUserName] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [userDepts, setUserDepts] = useState("");

  useEffect(() => {
    const loadProfile = () => {
      if (typeof window !== 'undefined') {
        const storedName = localStorage.getItem('atlasUserName');
        const storedDepts = localStorage.getItem('atlasDepts');
        
        if (storedName) {
           setUserName(storedName);
           const parts = storedName.trim().split(' ');
           if(parts.length > 1) setUserInitials((parts[0][0] + parts[1][0]).toUpperCase());
           else setUserInitials(storedName.substring(0, 2).toUpperCase());
        }
        
        if (storedDepts) {
           try {
              const depts = JSON.parse(storedDepts);
              if (Array.isArray(depts) && depts.length > 0) setUserDepts(depts.join(', '));
           } catch(e) {}
        }
      }
    };
    
    loadProfile();
    window.addEventListener('atlas_update', loadProfile);
    return () => window.removeEventListener('atlas_update', loadProfile);
  }, []);

  return (
    <div className="w-[260px] bg-[#1E2A66] text-white flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-50">
      <div className="p-6 flex items-center mb-2">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center rotate-45 mr-4 flex-shrink-0 shadow-sm">
           <div className="w-5 h-5 bg-[#1E2A66] rotate-45 rounded-sm"></div>
        </div>
        <div>
          <h1 className="font-extrabold text-lg leading-tight tracking-wide">ATLAS</h1>
          <p className="text-[10px] uppercase font-semibold opacity-90 leading-tight mt-0.5 tracking-wider">Faculty Command<br/>Centre</p>
        </div>
      </div>
      
      <div className="mx-5 bg-black/20 shadow-inner rounded-xl p-3 flex items-center space-x-3 mb-6">
         <div className="w-10 h-10 bg-white text-[#1E2A66] rounded-full flex items-center justify-center font-black text-sm shadow-sm flex-shrink-0">{userInitials}</div>
         <div className="overflow-hidden">
           <p className="text-sm font-bold truncate">{userName}</p>
           <p className="text-[10px] opacity-80 leading-tight mt-0.5 truncate border-t border-white/20 pt-1">{userDepts}</p>
         </div>
      </div>

      <div className="flex-1 px-3 space-y-6 pb-10">
        {navItems.map((section, idx) => (
          <div key={idx}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-white/50 mb-2">{section.section}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link href={item.href} key={item.name} className={`flex items-center space-x-3 px-4 py-3 rounded-l-full transition-all ${isActive ? 'bg-[#F8F9FA] text-[#1E2A66] font-bold translate-x-3 shadow-[-4px_0_10px_rgba(0,0,0,0.1)]' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                    <item.icon className={`w-4 h-4 mr-1 flex-shrink-0 ${isActive ? 'text-[#1E2A66]' : 'opacity-80'}`} />
                    <span className="flex-1 truncate">{item.name}</span>
                    {(item as any).badge && (
                       <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isActive ? 'bg-[#DA291C] text-white' : 'bg-[#DA291C] text-white shadow-sm'}`}>{(item as any).badge}</span>
                    )}
                    {(item as any).badgeText && (
                       <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ring-1 ring-white/50 text-white ${isActive ? 'bg-[#DA291C] ring-0' : 'bg-transparent'}`}>{(item as any).badgeText}</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
