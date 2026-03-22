"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BrainCircuit, Sparkles, CheckCircle2, Bot, Calendar, AlertTriangle, Target, Activity, Zap, Plus, X, Clock, Layers, Users, BookOpen, Upload, FileSignature } from 'lucide-react';

export interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  type: string;
}

export interface OnboardingData {
  name: string;
  department: string[];
  subjects: string[];
  timetable: TimetableEntry[];
  batches: string;
  batchNames: string[];
  syllabusStructure: string;
  progress: Record<string, number>;
  constraints: string[];
  optimizationGoal: string[];
}

export default function OnboardingFlow({ onComplete }: { onComplete: (data: OnboardingData) => void }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    department: [],
    subjects: [],
    timetable: [],
    batches: '',
    batchNames: [],
    syllabusStructure: '',
    progress: {},
    constraints: [],
    optimizationGoal: []
  });

  // Ephemeral state for compound steps
  const [tempSubject, setTempSubject] = useState('');
  const [tempBatch, setTempBatch] = useState('');
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [ttDay, setTtDay] = useState('Mon');
  const [ttTime, setTtTime] = useState('');
  const [ttSubj, setTtSubj] = useState('');
  const [ttType, setTtType] = useState('Lecture');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) setTimeout(() => inputRef.current?.focus(), 100);
  }, [step]);

  // Sync progress dict size with subjects length
  useEffect(() => {
    if (step === 7) {
       setData(prev => {
          const newProg = { ...prev.progress };
          prev.subjects.forEach(sub => { if (newProg[sub] === undefined) newProg[sub] = 0; });
          return { ...prev, progress: newProg };
       });
    }
  }, [step]);

  const update = (key: keyof OnboardingData, val: any) => setData(prev => ({ ...prev, [key]: val }));

  const handleNext = () => {
    if (step < 11) setStep(prev => prev + 1);
  };

  const finishFlow = () => {
    onComplete(data);
  };

  useEffect(() => {
    if (step === 11) finishFlow();
  }, [step]);

  const addTimetableEntry = () => {
     if (ttTime && ttSubj) {
        update('timetable', [...data.timetable, { day: ttDay, time: ttTime, subject: ttSubj, type: ttType }]);
        setTtTime('');
     }
  };

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      if (p >= 100) {
        setUploadProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          update('subjects', Array.from(new Set([...data.subjects, 'Data Structures & Algorithms', 'Database Management', 'Computer Networks'])));
          update('timetable', [
             { day: 'Mon', time: '10:00 AM', subject: 'Data Structures & Algorithms', type: 'Lecture' },
             { day: 'Tue', time: '02:00 PM', subject: 'Database Management', type: 'Lab' },
             { day: 'Wed', time: '09:00 AM', subject: 'Computer Networks', type: 'Lecture' },
             { day: 'Thu', time: '11:00 AM', subject: 'Database Management', type: 'Lecture' },
             { day: 'Fri', time: '01:00 PM', subject: 'Data Structures & Algorithms', type: 'CIA' },
          ]);
          update('batches', 'Yes');
          update('batchNames', ['Div A', 'Div B']);
        }, 1000);
      } else {
        setUploadProgress(p);
      }
    }, 300);
  };

  const pageVariants: any = {
    initial: { opacity: 0, y: 30, filter: "blur(12px)", scale: 0.98 },
    animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -30, filter: "blur(12px)", scale: 1.02, transition: { duration: 0.6, ease: [0.77, 0, 0.175, 1] } }
  };

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center overflow-x-hidden overflow-y-auto font-sans transition-colors duration-1000 ${step === 11 ? 'bg-[#0a1128]' : 'bg-[#F8F9FA]'}`}>
      
      {/* Background Ambient Glows */}
      {step < 11 && (
         <>
           <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-red-50/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
           <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-red-50/60 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
         </>
      )}

      <div className="w-full max-w-2xl px-8 relative z-10 py-24 min-h-screen flex flex-col">
        <div className="my-auto w-full pb-32">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <motion.div key="step1" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <BrainCircuit className="w-10 h-10 text-[#DA291C] mb-8" />
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
                Welcome to Atlas.<br/>
                <TypewriterCursor text="What should I call you?" />
              </h1>
              <div className="relative group mt-4">
                <input 
                  ref={inputRef} type="text" value={data.name} 
                  onChange={(e) => update('name', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && data.name.trim().length >= 2 && handleNext()}
                  placeholder="Type your name..."
                  className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#DA291C] outline-none py-4 text-3xl font-bold text-gray-800 placeholder:text-gray-300 transition-colors shadow-[0_1px_0_0_transparent] focus:shadow-[0_2px_15px_rgba(218,41,28,0.2)]"
                />
                {data.name.trim().length >= 2 && (
                  <motion.button 
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#DA291C] hover:bg-red-700 p-3 rounded-full text-white shadow-[0_0_20px_rgba(218,41,28,0.3)] transition-all"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: DEPARTMENT */}
          {step === 2 && (
            <motion.div key="step2" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                Nice to meet you, {data.name}.<br/>What do you teach?
              </h1>
              <p className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">Select Department(s)</p>
              
              <div className="flex flex-wrap gap-4 mb-10">
                {['ISME', 'ISDI', 'UGDX', 'LAW'].map(dept => {
                   const isSelected = data.department.includes(dept);
                   return (
                   <button 
                     key={dept} onClick={() => {
                         if (isSelected) update('department', data.department.filter(d => d !== dept));
                         else update('department', [...data.department, dept]);
                     }}
                     className={`px-6 py-4 rounded-full border-2 font-bold text-sm transition-all ${isSelected ? 'border-[#DA291C] bg-red-50 text-[#DA291C] shadow-[0_0_25px_rgba(218,41,28,0.2)]' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-400 hover:shadow-md'}`}
                   >
                     {dept}
                   </button>
                )})}
              </div>

              {data.department.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 flex justify-end">
                  <button onClick={handleNext} className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center transition-colors">
                     Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 3: SUBJECTS */}
          {step === 3 && (
            <motion.div key="step3" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                Which subjects are you teaching this semester?
              </h1>
              
              {!isUploading && data.subjects.length === 0 ? (
              <>
              <input type="file" className="hidden" ref={fileInputRef} onChange={(e) => { if (e.target.files && e.target.files.length > 0) handleSimulatedUpload(); }} accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,image/*" />
              <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="w-full bg-white border-2 border-dashed border-gray-300 hover:border-[#DA291C] rounded-2xl p-8 mb-8 flex flex-col items-center justify-center cursor-pointer group transition-all"
              >
                 <Upload className="w-10 h-10 text-gray-400 group-hover:text-[#DA291C] mb-4 group-hover:-translate-y-1 transition-transform" />
                 <h3 className="font-bold text-gray-700 group-hover:text-[#DA291C]">AI Timetable Auto-Extract</h3>
                 <p className="text-xs text-gray-500 mt-2 text-center max-w-sm">Upload your Timetable (PDF or Excel) and ATLAS Vision will instantly map your subjects, schedule, and batches.</p>
              </div>
              </>
              ) : isUploading ? (
              <div className="w-full bg-red-50 border-2 border-[#DA291C] rounded-2xl p-8 mb-8 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(218,41,28,0.15)] relative overflow-hidden">
                 <motion.div animate={{ left: ['-100%', '100%'] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-white/20 blur-md pointer-events-none" />
                 <FileSignature className="w-10 h-10 text-[#DA291C] mb-4 animate-pulse relative z-10" />
                 <h3 className="font-bold text-[#DA291C] mb-4 relative z-10">Extracting Academic Matrix...</h3>
                 <div className="w-64 bg-red-200 h-2 rounded-full overflow-hidden relative z-10">
                    <div className="bg-[#DA291C] h-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                 </div>
                 <p className="text-xs font-bold text-[#DA291C] mt-3 uppercase tracking-widest relative z-10">{Math.round(uploadProgress)}%</p>
              </div>
              ) : null}

              {data.subjects.length === 0 && !isUploading && (
              <div className="flex items-center space-x-4 mb-6">
                 <div className="flex-1 h-px bg-gray-200"></div>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest bg-[#F8F9FA] px-2 text-center">Or enter manually</span>
                 <div className="flex-1 h-px bg-gray-200"></div>
              </div>
              )}

              <div className="relative group mb-6">
                <input 
                  ref={inputRef} type="text" value={tempSubject} 
                  onChange={(e) => setTempSubject(e.target.value)}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && tempSubject.trim()) {
                        if (!data.subjects.includes(tempSubject.trim())) update('subjects', [...data.subjects, tempSubject.trim()]);
                        setTempSubject('');
                     }
                  }}
                  placeholder="e.g. Data Structures & Algorithms..."
                  className="w-full bg-transparent border-b-2 border-gray-200 focus:border-[#DA291C] outline-none py-4 text-2xl font-bold text-gray-800 placeholder:text-gray-300 transition-colors shadow-[0_1px_0_0_transparent] focus:shadow-[0_2px_15px_rgba(218,41,28,0.2)]"
                />
                <button 
                   onClick={() => {
                      if (tempSubject.trim() && !data.subjects.includes(tempSubject.trim())) {
                         update('subjects', [...data.subjects, tempSubject.trim()]);
                         setTempSubject('');
                      }
                   }}
                   className="absolute right-0 top-1/2 -translate-y-1/2 text-[#DA291C] font-bold text-sm bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 transition-colors"
                >
                   ADD <Plus className="w-4 h-4 inline ml-1" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-10">
                 {data.subjects.map(sub => (
                    <span key={sub} className="bg-[#1E2A66] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center shadow-md">
                       {sub}
                       <button onClick={() => update('subjects', data.subjects.filter(s => s !== sub))} className="ml-2 bg-white/20 p-0.5 rounded-full hover:bg-white/40 transition">
                          <X className="w-3 h-3" />
                       </button>
                    </span>
                 ))}
              </div>

              {data.subjects.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex justify-end">
                  <button onClick={() => {
                     if (data.subjects.length > 0) {
                        setTtSubj(data.subjects[0]); // preset for next step
                        handleNext();
                     }
                  }} className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center transition-colors">
                     Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 4: TIMETABLE SETUP */}
          {step === 4 && (
            <motion.div key="step4" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                Let’s set up your weekly schedule.
              </h1>
              
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8">
                 {/* Day */}
                 <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                       <button key={day} onClick={() => setTtDay(day)} className={`px-4 py-2 rounded-full font-bold text-sm transition-colors shrink-0 ${ttDay === day ? 'bg-[#1E2A66] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                          {day}
                       </button>
                    ))}
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Time */}
                    <div>
                       <label className="text-xs font-bold text-gray-400 uppercase">Time</label>
                       <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mt-1 focus-within:border-[#DA291C]">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <input type="text" value={ttTime} onChange={e => setTtTime(e.target.value)} placeholder="09:00 AM" className="bg-transparent outline-none w-full font-bold text-gray-700" />
                       </div>
                    </div>
                    {/* Subject */}
                    <div>
                       <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
                       <select value={ttSubj} onChange={e => setTtSubj(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 mt-1 font-bold text-gray-700 outline-none focus:border-[#DA291C]">
                          {data.subjects.map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </div>
                    {/* Type */}
                    <div>
                       <label className="text-xs font-bold text-gray-400 uppercase">Type</label>
                       <select value={ttType} onChange={e => setTtType(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 mt-1 font-bold text-gray-700 outline-none focus:border-[#DA291C]">
                          <option>Lecture</option><option>Lab</option><option>CIA</option>
                       </select>
                    </div>
                 </div>

                 <button onClick={addTimetableEntry} disabled={!ttTime} className="w-full bg-red-50 hover:bg-red-100 text-[#DA291C] font-bold py-3 rounded-xl transition disabled:opacity-50">
                    Add Class configuration
                 </button>
              </div>

              {/* Mini List */}
              <div className="max-h-40 overflow-y-auto space-y-2 mb-8 pr-2">
                 {data.timetable.map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white border border-gray-100 p-3 rounded-lg shadow-sm">
                       <div className="flex items-center space-x-3">
                          <span className="bg-[#1E2A66]/10 text-[#1E2A66] font-bold text-xs px-2 py-1 rounded">{t.day}</span>
                          <span className="font-bold text-sm text-gray-700">{t.time}</span>
                          <span className="text-sm font-medium text-gray-500 truncate max-w-[150px]">{t.subject}</span>
                       </div>
                       <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold uppercase text-gray-400">{t.type}</span>
                          <button onClick={() => update('timetable', data.timetable.filter((_, i) => i !== idx))}><X className="w-4 h-4 text-gray-300 hover:text-red-500" /></button>
                       </div>
                    </div>
                 ))}
              </div>

              {data.timetable.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                  <button onClick={handleNext} className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center transition-colors">
                     Confirm Schedule <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 5: BATCHES */}
          {step === 5 && (
            <motion.div key="step5" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                Do you teach multiple batches?
              </h1>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                 {[
                   { id: 'Yes', icon: Layers },
                   { id: 'No', icon: Target }
                 ].map(opt => (
                   <button 
                      key={opt.id} onClick={() => update('batches', opt.id)}
                      className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center space-y-3 ${data.batches === opt.id ? 'border-[#DA291C] bg-red-50 text-[#DA291C] shadow-md' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                   >
                      <opt.icon className="w-8 h-8" />
                      <span className="font-bold text-lg">{opt.id}</span>
                   </button>
                 ))}
              </div>

              {data.batches === 'Yes' && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Input Batch Names</p>
                    <div className="flex space-x-2">
                       <input 
                         type="text" value={tempBatch} onChange={e => setTempBatch(e.target.value)}
                         onKeyDown={(e) => {
                            if (e.key === 'Enter' && tempBatch.trim()) {
                               if (!data.batchNames.includes(tempBatch.trim())) update('batchNames', [...data.batchNames, tempBatch.trim()]);
                               setTempBatch('');
                            }
                         }}
                         placeholder="e.g. Section A, Shift 1..."
                         className="flex-1 bg-white border-2 border-gray-200 focus:border-[#DA291C] outline-none px-4 py-3 rounded-xl font-bold text-gray-800 transition-colors"
                       />
                       <button onClick={() => {
                            if (tempBatch.trim() && !data.batchNames.includes(tempBatch.trim())) {
                               update('batchNames', [...data.batchNames, tempBatch.trim()]);
                               setTempBatch('');
                            }
                       }} className="bg-gray-800 text-white px-5 rounded-xl font-bold shadow-md"><Plus className="w-5 h-5"/></button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                       {data.batchNames.map(b => (
                          <span key={b} className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center">
                             {b} <button onClick={() => update('batchNames', data.batchNames.filter(x => x !== b))} className="ml-2 hover:text-red-500"><X className="w-3 h-3"/></button>
                          </span>
                       ))}
                    </div>
                 </motion.div>
              )}

              {data.batches && (data.batches === 'No' || data.batchNames.length > 0) && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end mt-4">
                  <button onClick={handleNext} className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center transition-colors">
                     Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 6: SYLLABUS STRUCTURE */}
          {step === 6 && (
            <motion.div key="step6" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                How is your syllabus organized?
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                 {['Module-based', 'Topic-based'].map(opt => (
                   <button 
                     key={opt} onClick={() => update('syllabusStructure', opt)}
                     className={`p-6 rounded-2xl border-2 transition-all font-bold text-lg flex items-center ${data.syllabusStructure === opt ? 'border-[#DA291C] bg-red-50 text-[#DA291C] shadow-md' : 'border-gray-200 bg-white text-gray-500 hover:border-[#1E2A66]'}`}
                   >
                     {opt === 'Module-based' ? <BookOpen className="w-6 h-6 mr-3" /> : <Activity className="w-6 h-6 mr-3" />}
                     {opt}
                   </button>
                 ))}
              </div>
              
              {data.syllabusStructure && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                  <button onClick={handleNext} className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center transition-colors">
                     Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 7: CURRENT PROGRESS */}
          {step === 7 && (
            <motion.div key="step7" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                How much syllabus have you completed so far?
              </h1>
              
              <div className="space-y-6 mb-10">
                 {data.subjects.map(sub => (
                    <div key={sub} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                       <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-gray-800">{sub}</h3>
                          <span className="bg-red-50 text-[#DA291C] px-3 py-1 rounded-full text-sm font-bold shadow-sm">{data.progress[sub] || 0}%</span>
                       </div>
                       <input 
                         type="range" min="0" max="100" 
                         value={data.progress[sub] || 0} 
                         onChange={e => update('progress', { ...data.progress, [sub]: parseInt(e.target.value) })}
                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#DA291C]"
                       />
                    </div>
                 ))}
              </div>

              <motion.div className="flex justify-end">
                  <button onClick={handleNext} className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center transition-colors">
                     Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
              </motion.div>
            </motion.div>
          )}

          {/* STEP 8: CONSTRAINTS */}
          {step === 8 && (
            <motion.div key="step8" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                What challenges do you face?
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                 {[
                   { id: 'Running out of time', icon: Clock },
                   { id: 'Low attendance', icon: Users },
                   { id: 'CIA scheduling issues', icon: Target },
                   { id: 'Holiday disruptions', icon: Calendar }
                 ].map(opt => {
                   const isSelected = data.constraints.includes(opt.id);
                   return (
                   <button 
                     key={opt.id} 
                     onClick={() => {
                        if (isSelected) update('constraints', data.constraints.filter(c => c !== opt.id));
                        else update('constraints', [...data.constraints, opt.id]);
                     }}
                     className={`p-5 text-left rounded-2xl border-2 transition-all flex items-center space-x-4 ${isSelected ? 'border-[#DA291C] bg-red-50 text-[#DA291C] shadow-[0_0_20px_rgba(218,41,28,0.15)]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                   >
                     <opt.icon className={`w-6 h-6 shrink-0 ${isSelected ? 'text-[#DA291C]' : 'text-gray-400'}`} />
                     <span className={`font-bold ${isSelected ? 'text-[#DA291C]' : 'text-gray-700'}`}>{opt.id}</span>
                   </button>
                 )})}
              </div>

              {data.constraints.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                  <button onClick={handleNext} className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center transition-colors">
                     Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 9: AI PREFERENCE */}
          {step === 9 && (
            <motion.div key="step9" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                What should I optimize for?
              </h1>
              <p className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">Select up to 2 priorities</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                 {[
                   { id: 'Syllabus completion', icon: BookOpen },
                   { id: 'Balanced workload', icon: BrainCircuit },
                   { id: 'Attendance', icon: Users },
                   { id: 'Scheduling', icon: Calendar }
                 ].map(opt => {
                   const isSelected = data.optimizationGoal.includes(opt.id);
                   return (
                   <button 
                     key={opt.id} 
                     onClick={() => {
                        let newGoals = [...data.optimizationGoal];
                        if (isSelected) newGoals = newGoals.filter(g => g !== opt.id);
                        else {
                           newGoals.push(opt.id);
                           if (newGoals.length > 2) newGoals.shift(); // Remove oldest
                        }
                        update('optimizationGoal', newGoals);
                     }}
                     className={`text-left p-5 rounded-2xl border-2 transition-all flex items-center space-x-4 ${isSelected ? 'border-[#00B4C8] bg-cyan-50 shadow-[0_0_20px_rgba(0,180,200,0.15)]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
                   >
                     <opt.icon className={`w-6 h-6 shrink-0 ${isSelected ? 'text-[#00B4C8]' : 'text-gray-400'}`} />
                     <span className={`font-extrabold ${isSelected ? 'text-[#00B4C8]' : 'text-gray-700'}`}>{opt.id}</span>
                   </button>
                 )})}
              </div>

              {data.optimizationGoal.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
                  <button onClick={handleNext} className="bg-[#1E2A66] hover:bg-[#151D48] text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center transition-colors">
                     Review Output <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STEP 10: SUMMARY */}
          {step === 10 && (
            <motion.div key="step10" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="flex flex-col">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-8">
                Academic Profile Verification.
              </h1>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  { label: 'Identity', val: data.name },
                  { label: 'Depts', val: data.department.join(', ') },
                  { label: 'Subjects', val: data.subjects.join(', ') },
                  { label: 'Timetable', val: `${data.timetable.length} Classes Logged` },
                  { label: 'Tracking', val: `${data.syllabusStructure} • ${data.batches === 'Yes' ? 'Multi-batch' : 'Single'}` },
                  { label: 'AI Optimization', val: data.optimizationGoal.join(' & ') }
                ].map((item, idx) => (
                  <motion.div 
                     key={item.label}
                     initial={{ opacity: 0, scale: 0.9, y: 20 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                     className="bg-green-50/50 border-2 border-dashed border-green-200 p-4 rounded-xl flex items-center"
                  >
                     <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                     <div className="truncate pr-2 w-full">
                        <p className="text-[10px] uppercase font-bold text-green-700/60 tracking-wider mb-0.5">{item.label}</p>
                        <p className="text-sm font-bold text-green-900 truncate w-full">{item.val}</p>
                     </div>
                  </motion.div>
                ))}
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-end">
                 <button onClick={handleNext} className="bg-[#DA291C] hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black shadow-[0_10px_30px_rgba(218,41,28,0.4)] flex items-center transition-all w-full justify-center text-lg">
                    Launch Atlas System <Zap className="w-5 h-5 ml-2" />
                 </button>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
        </div>
      </div>

      {/* Progress Dots */}
      {step < 11 && (
        <div className="fixed bottom-12 flex space-x-3 z-20">
          {[1,2,3,4,5,6,7,8,9,10].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-[#DA291C]' : step > i ? 'w-3 bg-red-200' : 'w-3 bg-gray-200'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

function TypewriterCursor({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return <span>{displayed}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.4 }} className="text-[#DA291C] ml-1">▋</motion.span></span>;
}
