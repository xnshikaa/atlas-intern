"use client";
import React, { useState, useEffect } from 'react';
import { BrainCircuit, AlertTriangle, Clock, Calendar as CalendarIcon, BookOpen, Bell, TrendingUp, CheckCircle2, Loader2, Info, X, Bot, Activity, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);
  const [showAbout, setShowAbout] = useState(false);
  const [userName, setUserName] = useState("");
  const [subjects, setSubjects] = useState<any[]>([
     { name: "Data Structures & Algorithms", pct: 55, color: "bg-[#DA291C]" },
     { name: "Database Management Systems", pct: 76, color: "bg-[#2F855A]" },
     { name: "Operating Systems", pct: 65, color: "bg-[#2B6CB0]" },
     { name: "Computer Networks", pct: 70, color: "bg-[#B7791F]" }
  ]);

  useEffect(() => {
      const loadData = () => {
        if (typeof window !== 'undefined') {
          const storedName = localStorage.getItem('atlasUserName');
          if (storedName) {
             setUserName(storedName);
          }

          const storedSubs = localStorage.getItem('atlasSubjects');
          const storedProg = localStorage.getItem('atlasProgress');
          
          if (storedSubs) {
             try {
               const subArr = JSON.parse(storedSubs);
               const progObj = storedProg ? JSON.parse(storedProg) : {};
               const colors = ["bg-[#DA291C]", "bg-[#2F855A]", "bg-[#2B6CB0]", "bg-[#B7791F]", "bg-[#00B4C8]"];
               const newSubjects = subArr.map((name: string, i: number) => ({
                  name,
                  pct: progObj[name] || 0,
                  color: colors[i % colors.length]
               }));
               if (newSubjects.length > 0) setSubjects(newSubjects);
             } catch(e) {}
          }
        }
      };

      loadData();
      window.addEventListener('atlas_update', loadData);
      return () => window.removeEventListener('atlas_update', loadData);
  }, []);

  const handleResolveAlert = async (id: string, resolutionType: string) => {
    setResolvingId(id);
    try {
      // Simulate backend DB mutation latency
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const res = await fetch('http://localhost:8000/academic/resolve-alert', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "resolve", target_id: id, details: { resolution: resolutionType } })
      });
      const data = await res.json();
      
      if(data.status === "success") {
         setResolvedIds(prev => [...prev, id]);
      }
    } catch (e) {
      console.warn("Backend unreachable. Mocking success for demo...", e);
      setResolvedIds(prev => [...prev, id]);
    } finally {
      setResolvingId(null);
    }
  };
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans px-2">
      
      {/* 1. Top Section */}
      <header className="flex justify-between items-end pb-4 border-b border-gray-200 relative z-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Good Morning{userName ? `, ${userName}` : ''}.</h1>
          <p className="text-sm font-semibold text-gray-500 mt-1.5 flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" /> Monday, 17 March 2025 • Week 4 • Semester 2
          </p>
        </div>
        <div className="flex items-center space-x-3">
           <button onClick={() => setShowAbout(true)} className="px-4 py-2.5 text-gray-700 font-bold text-sm hover:text-[#00B4C8] hover:bg-cyan-50 border border-gray-200 hover:border-cyan-200 bg-white shadow-sm rounded-xl transition-all flex items-center">
              <Info className="w-4 h-4 mr-2" /> About Me
           </button>
           <Link href="/ai-assistant" className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center shadow-md transition-all">
             <BrainCircuit className="w-4 h-4 mr-2" /> Open AI Assistant
           </Link>
        </div>
      </header>

      {/* About App Modal */}
      {showAbout && (
        <div className="fixed inset-0 z-[999] bg-[#020617]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative animate-[fadeIn_0.2s_ease-out]">
            <button onClick={() => setShowAbout(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-black text-gray-900 mb-2 flex items-center">
              <BrainCircuit className="w-7 h-7 mr-3 text-[#00B4C8]" />
              Atlas AI Faculty Command Center
            </h2>
            <p className="text-gray-500 font-medium mb-6 leading-relaxed">An AI-powered academic system that helps faculty plan, track, and optimize teaching — reducing manual effort and improving academic outcomes.</p>

            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
               🚀 Key Capabilities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 hover:border-blue-300 transition-colors flex items-start">
                <BookOpen className="w-5 h-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-extrabold text-blue-900 mb-0.5 text-sm">Syllabus Intelligence</h4>
                   <p className="text-xs text-blue-800/80 leading-relaxed font-medium">Tracks progress and predicts completion timelines.</p>
                </div>
              </div>

              <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 hover:border-purple-300 transition-colors flex items-start">
                <CalendarIcon className="w-5 h-5 text-purple-600 mr-3 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-extrabold text-purple-900 mb-0.5 text-sm">Smart Scheduling</h4>
                   <p className="text-xs text-purple-800/80 leading-relaxed font-medium">Plans lectures and CIAs while avoiding conflicts and overload.</p>
                </div>
              </div>

              <div className="bg-red-50/50 p-4 rounded-xl border border-red-100 hover:border-red-300 transition-colors flex items-start">
                <Activity className="w-5 h-5 text-[#DA291C] mr-3 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-extrabold text-red-900 mb-0.5 text-sm">Holiday-Aware Planning</h4>
                   <p className="text-xs text-red-800/80 leading-relaxed font-medium">Automatically adjusts schedules based on academic disruptions.</p>
                </div>
              </div>

              <div className="bg-yellow-50/50 p-4 rounded-xl border border-yellow-100 hover:border-yellow-300 transition-colors flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-extrabold text-yellow-900 mb-0.5 text-sm">Risk Detection</h4>
                   <p className="text-xs text-yellow-800/80 leading-relaxed font-medium">Identifies low attendance and scheduling issues in advance.</p>
                </div>
              </div>

              <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 hover:border-green-300 transition-colors flex items-start md:col-span-2">
                <Zap className="w-5 h-5 text-green-600 mr-3 shrink-0 mt-0.5" />
                <div>
                   <h4 className="font-extrabold text-green-900 mb-0.5 text-sm">AI-Powered Actions</h4>
                   <p className="text-xs text-green-800/80 leading-relaxed font-medium">Instantly fix issues with intelligent recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Key Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Subjects", value: subjects.length.toString(), icon: BookOpen, color: "text-blue-600" },
          { label: "Avg. Progress", value: `${Math.round(subjects.reduce((a, b) => a + b.pct, 0) / (subjects.length || 1))}%`, icon: TrendingUp, color: "text-green-600" },
          { label: "Today's Lectures", value: "3", icon: Clock, color: "text-purple-600" },
          { label: "Open Alerts", value: "2", icon: Bell, color: "text-[#DA291C]" }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
             <div className={`p-3.5 rounded-xl bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" strokeWidth={2.5} />
             </div>
             <div>
               <p className="text-2xl font-black text-gray-800 leading-none">{stat.value}</p>
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">{stat.label}</p>
             </div>
          </div>
        ))}
      </div>

      {/* 3. Main Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (PRIMARY FOCUS) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* A. Alerts Panel (MOST IMPORTANT) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-extrabold text-gray-800 flex items-center">
                <AlertTriangle className="w-5 h-5 text-[#DA291C] mr-2" /> Critical Action Items
              </h3>
              <Link href="/alerts" className="text-xs font-bold text-gray-400 hover:text-gray-800 transition-colors uppercase tracking-wider">View All</Link>
            </div>
            
            <div className="space-y-4">
               <div className="bg-red-50/50 border border-red-100 p-4 rounded-xl flex items-center justify-between group hover:border-red-200 transition-colors">
                 <div className="flex items-start">
                   <div className="w-2 h-2 rounded-full bg-[#DA291C] mr-3 mt-1.5 flex-shrink-0"></div>
                   <div>
                     <h4 className="font-bold text-red-900 text-sm">Module 3 Dependency Blocked (Marketing CIA)</h4>
                     <p className="text-xs font-medium text-red-800/80 mt-1">Need 2 more validated lecture logs to safely advance the syllabus.</p>
                   </div>
                 </div>
                 {resolvedIds.includes('mod3') ? (
                    <button disabled className="px-4 py-2 bg-green-50 text-green-700 font-bold text-xs rounded-lg shadow-sm border border-green-200 ml-4 flex-shrink-0 flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/> Resolved</button>
                 ) : (
                    <button onClick={() => handleResolveAlert('mod3', 'fixed')} disabled={resolvingId === 'mod3'} className="px-4 py-2 bg-white text-[#DA291C] font-bold text-xs rounded-lg shadow-sm border border-red-200 hover:bg-red-50 transition-colors ml-4 flex-shrink-0 flex items-center justify-center min-w-[100px]">
                      {resolvingId === 'mod3' ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : "Resolve Fix"}
                    </button>
                 )}
               </div>

               <div className="bg-yellow-50/50 border border-yellow-100 p-4 rounded-xl flex items-center justify-between group hover:border-yellow-200 transition-colors">
                 <div className="flex items-start">
                   <div className="w-2 h-2 rounded-full bg-yellow-500 mr-3 mt-1.5 flex-shrink-0"></div>
                   <div>
                     <h4 className="font-bold text-yellow-900 text-sm">Attendance Risk: Tomorrow 8:00 AM</h4>
                     <p className="text-xs font-medium text-yellow-800/80 mt-1">EMA baseline drop to 62% expected due to post-holiday proximity.</p>
                   </div>
                 </div>
                 {resolvedIds.includes('att1') ? (
                    <button disabled className="px-4 py-2 bg-green-50 text-green-700 font-bold text-xs rounded-lg shadow-sm border border-green-200 ml-4 flex-shrink-0 flex items-center"><CheckCircle2 className="w-3.5 h-3.5 mr-1"/> Adjusted</button>
                 ) : (
                    <button onClick={() => handleResolveAlert('att1', 'adjusted')} disabled={resolvingId === 'att1'} className="px-4 py-2 bg-white text-yellow-700 font-bold text-xs rounded-lg shadow-sm border border-yellow-200 hover:bg-yellow-50 transition-colors ml-4 flex-shrink-0 flex items-center justify-center min-w-[100px]">
                      {resolvingId === 'att1' ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : "Adjust Plan"}
                    </button>
                 )}
               </div>
            </div>
          </div>

          {/* B. Subject Progress Panel */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-extrabold text-gray-800 mb-6">Subject Progress Overview</h3>
            <div className="space-y-5">
              {subjects.map((sub, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700">{sub.name}</span>
                    <span className="text-xs font-bold text-gray-500">{sub.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${sub.color}`} style={{ width: `${sub.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (SECONDARY) */}
        <div className="space-y-6">
           
           {/* A. Today's Schedule */}
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-extrabold text-gray-800">Today's Agenda</h3>
                <Link href="/planner" className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md uppercase tracking-wider">Full Week</Link>
              </div>
              <div className="space-y-3">
                 <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-[10px] font-black text-[#DA291C] uppercase tracking-wider mb-1.5 flex items-center"><Clock className="w-3 h-3 mr-1" /> 08:00 AM - 09:30 AM</p>
                    <p className="font-bold text-gray-800 text-sm">Corporate Finance</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Lecture • A101</p>
                 </div>
                 <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer">
                    <p className="text-[10px] font-black text-[#2B6CB0] uppercase tracking-wider mb-1.5 flex items-center"><Clock className="w-3 h-3 mr-1" /> 10:00 AM - 12:00 PM</p>
                    <p className="font-bold text-gray-800 text-sm">Data Structures Lab</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Practical • B104</p>
                 </div>
                 <div className="border border-gray-100 rounded-xl p-3.5 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer opacity-70">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-wider mb-1.5 flex items-center"><Clock className="w-3 h-3 mr-1" /> 14:00 PM - 16:00 PM</p>
                    <p className="font-bold text-gray-800 text-sm">Faculty Meeting</p>
                    <p className="text-xs text-gray-500 font-medium mt-1">Admin • Boardroom</p>
                 </div>
              </div>
           </div>

           {/* B. AI Assistant Panel (Minimal) */}
           <div className="bg-gradient-to-br from-[#1E2A66] to-[#151D48] rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF] opacity-20 rounded-full blur-[40px]"></div>
               <div className="relative z-10">
                 <div className="flex items-center justify-between mb-3">
                   <h3 className="font-extrabold flex items-center text-sm tracking-wide">
                     <BrainCircuit className="w-4 h-4 mr-2 text-[#00E5FF]" /> AI Assistant Active
                   </h3>
                   <span className="flex items-center text-[9px] font-bold uppercase tracking-widest bg-[#00E5FF]/20 text-[#00E5FF] px-2 py-0.5 rounded-md">
                     Live
                   </span>
                 </div>
                 <p className="text-xs text-blue-100/80 font-medium leading-relaxed mb-4">
                   Monitoring your syllabus and processing attendance drops in the background. Ready to answer contextual queries.
                 </p>
                 <Link href="/ai-assistant" className="inline-block text-[10px] font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors border border-white/10 uppercase tracking-wider">
                   Ask Question &rarr;
                 </Link>
               </div>
           </div>

        </div>

      </div>
    </div>
  );
}
