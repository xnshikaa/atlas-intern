"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import OnboardingFlow, { OnboardingData } from './OnboardingFlow';

export default function CinematicTransition({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<'onboarding' | 'booting' | 'complete'>('onboarding');
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    if (stage === 'booting') {
       const timer = setTimeout(() => {
         setStage('complete');
         document.body.style.overflow = "auto";
       }, 5600); 
       return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    if (typeof window !== 'undefined') {
       localStorage.setItem('atlasUserName', data.name);
       localStorage.setItem('atlasDepts', JSON.stringify(data.department));
       localStorage.setItem('atlasSubjects', JSON.stringify(data.subjects));
       localStorage.setItem('atlasProgress', JSON.stringify(data.progress));
       window.dispatchEvent(new Event('atlas_update'));
    }
    setStage('booting');
  };

  const logs = [
    "[SYNC] Schedule matrix loaded. Validating constraints...",
    "[SCAN] Syllabus vectors analyzed. 4 subjects mapped.",
    "[OPTIMIZE] Dynamic timeline recolibrated for upcoming CIA.",
    "[READY] Hardware handoff complete. Engaging command center."
  ];

  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden [perspective:1400px]">
      {/* ONBOARDING FLOW */}
      <AnimatePresence>
        {stage === 'onboarding' && (
          <motion.div key="onboarding" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
             <OnboardingFlow onComplete={handleOnboardingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'booting' && (
          <motion.div 
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617] origin-center"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {/* PHASE 0: Deep Red Liquid Wash (Wipes Left to Right revealing the dashboard finish) */}
            <motion.div 
               className="absolute inset-0 z-[200] bg-[#D32B2B] shadow-[20px_0_50px_rgba(211,43,43,0.5)]"
               initial={{ x: "-100%" }}
               animate={{ x: "0%" }}
               transition={{ duration: 0.8, ease: "circIn", delay: 4.8 }}
            />

            {/* PHASE 5: Time Warp Collapse container */}
            <motion.div
               className="relative w-full h-full flex items-center justify-center flex-col origin-center"
               animate={{ 
                  scale: [1, 1, 1.15, 0], 
                  filter: ["blur(0px)", "blur(0px)", "blur(0px)", "blur(40px)"],
                  opacity: [1, 1, 1, 0]
               }}
               transition={{ 
                  duration: 5.6, 
                  times: [0, 0.85, 0.92, 1], // 0s->4.76s (phases 1-4), 4.76s->5.15s (tension pause & swell inward), 5.15->5.6s (collapse drop)
                  ease: "easeInOut"
               }}
            >
               {/* PHASE 1: Reality Distortion */}
               <motion.div
                 className="absolute inset-0 z-0 bg-transparent mix-blend-overlay"
                 animate={{ 
                   x: [0, -4, 4, -2, 2, 0, 0],
                   y: [0, 2, -3, 3, -1, 0, 0],
                   scale: [1, 1.05, 1.02, 1.06, 1]
                 }}
                 transition={{ duration: 1.8, times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 1] }}
               />

               {/* PHASE 3: Holographic Grid & Scan */}
               <motion.div 
                  className="absolute inset-0 z-0 opacity-0 bg-[linear-gradient(rgba(0,229,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"
                  initial={{ opacity: 0, scale: 1.8, rotateX: 60, y: 150 }}
                  animate={{ opacity: [0, 1, 1], scale: 1, rotateX: 0, y: 0 }}
                  transition={{ duration: 3.5, delay: 1.2, ease: "circOut" }}
               >
                  <motion.div 
                    className="w-full h-[2px] bg-[#00E5FF] shadow-[0_0_30px_#00E5FF]"
                    animate={{ y: [0, window.innerHeight] }}
                    transition={{ duration: 1.4, ease: "linear", repeat: 3, delay: 1.2 }}
                  />
               </motion.div>

               {/* PHASE 2: Core Ignition */}
               <motion.div 
                  className="relative z-10 w-36 h-36 rounded-full border border-[#00E5FF]/40 bg-gradient-to-br from-[#00E5FF]/20 to-transparent backdrop-blur-3xl flex items-center justify-center shadow-[0_0_150px_rgba(0,229,255,0.4)]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.3, 1], 
                    opacity: [0, 1, 1] 
                  }}
                  transition={{ duration: 2.8, delay: 0.5, times: [0, 0.3, 1], ease: "easeOut" }}
               >
                  <motion.div 
                    className="w-20 h-20 bg-white rounded-full blur-[3px] shadow-[0_0_60px_#fff]"
                    animate={{ scale: [1, 0.9, 1.15, 1] }}
                    transition={{ duration: 3.5, delay: 0.5, times: [0, 0.2, 0.5, 1] }}
                  />
               </motion.div>

               {/* PHASE 2 & 3: Typography */}
               <motion.div 
                  className="mt-12 flex flex-col items-center relative z-20 h-44"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
               >
                  <h1 className="text-white text-3xl font-black tracking-[0.4em] uppercase mb-4 drop-shadow-[0_0_20px_rgba(0,229,255,1)]">
                     <Typewriter text={`WELCOME, ${onboardingData?.name?.split(' ')[0].toUpperCase() || 'FACULTY'}`} delay={1.0} speed={60} />
                  </h1>
                  <h2 className="text-[#00E5FF] w-full text-center text-xs font-bold tracking-[0.5em] uppercase mb-8 opacity-90">
                     <Typewriter text="ATLAS AI COMMAND CENTER" delay={1.8} speed={30} />
                  </h2>
               </motion.div>

               {/* PHASE 4: Multi-Layer Assembly (3D Illusion) */}
               <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                  {/* Left Fragment */}
                  <motion.div 
                    className="absolute left-[2%] top-[15%] w-[400px] h-[550px] bg-white/[0.01] border border-white/10 backdrop-blur-2xl rounded-3xl"
                    initial={{ x: -900, rotateY: 70, opacity: 0, scale: 0.5, filter: "blur(40px)" }}
                    animate={{ x: 0, rotateY: 15, opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2.5, delay: 2.0, ease: "easeOut" }}
                  />
                  {/* Right Fragment */}
                  <motion.div 
                    className="absolute right-[2%] bottom-[10%] w-[450px] h-[400px] bg-[#00E5FF]/[0.015] border border-[#00E5FF]/20 backdrop-blur-3xl rounded-3xl"
                    initial={{ x: 900, rotateY: -70, opacity: 0, scale: 0.5, filter: "blur(40px)" }}
                    animate={{ x: 0, rotateY: -15, opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2.5, delay: 2.2, ease: "easeOut" }}
                  />
                  {/* Top Data Strip */}
                  <motion.div 
                    className="absolute top-[6%] w-[900px] h-[70px] bg-white/[0.02] border border-white/15 backdrop-blur-3xl rounded-2xl"
                    initial={{ y: -400, rotateX: 70, opacity: 0, filter: "blur(30px)" }}
                    animate={{ y: 0, rotateX: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 2.5, delay: 2.4, ease: "easeOut" }}
                  />
               </div>
            </motion.div>

            {/* Flash Effect on the exact moment of collapse transition */}
            <motion.div 
               className="absolute inset-0 z-[110] bg-white mix-blend-overlay"
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 0.25, delay: 5.4, ease: "circIn" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ONBOARDING FLOW */}
      <AnimatePresence>
        {stage === 'onboarding' && (
          <motion.div key="onboarding" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
             <OnboardingFlow onComplete={handleOnboardingComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 6: Dashboard Reveal */}
      <motion.div 
        className="w-full h-full relative z-0 bg-[#F8F9FA] flex flex-col items-center justify-center"
        initial={{ filter: "blur(60px) brightness(0.0)", scale: 0.2, y: 0, opacity: 0 }}
        animate={
           stage === 'complete' 
             ? { filter: "blur(0px) brightness(1)", scale: 1, opacity: 1 }
             : { filter: "blur(60px) brightness(0.0)", scale: 0.2, opacity: 0 } 
        }
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} 
      >
        {children}
      </motion.div>
    </div>
  );
}

// Micro-Component for organic typewriter effect
function Typewriter({ text, delay, speed = 40 }: { text: string, delay: number, speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return <span>{displayedText}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>█</motion.span></span>;
}
