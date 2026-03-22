"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StartupSequence({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<'booting' | 'complete'>('booting');

  useEffect(() => {
    // Lock body scroll during boot
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setStage('complete');
      document.body.style.overflow = "auto";
    }, 4000); // 4 Seconds total sequence time
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden">
      <AnimatePresence>
        {stage === 'booting' && (
          <motion.div 
            className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-[#020617]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} // Apple-like custom ease
          >
            {/* Ambient Deep Glows */}
            <motion.div 
              className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#1E2A66]/30 rounded-full blur-[100px]"
              animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.6, 0.8] }}
              transition={{ duration: 4, ease: "easeOut" }}
            />
            
            <motion.div 
              className="absolute w-[400px] h-[400px] bg-[#00E5FF]/10 rounded-full blur-[80px]"
              animate={{ scale: [0.5, 1.8, 1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Scanning Grid Layer */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]">
               <motion.div 
                 className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                 initial={{ y: -100, opacity: 0 }}
                 animate={{ y: [0, window.innerHeight], opacity: [0, 1, 0] }}
                 transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
               />
            </div>

            {/* Core AI Ring Element */}
            <motion.div 
               className="relative z-10 w-28 h-28 rounded-full border border-white/5 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl flex items-center justify-center shadow-[0_0_100px_rgba(0,229,255,0.15)]"
               initial={{ scale: 0, opacity: 0, rotate: -90 }}
               animate={{ 
                 scale: 1, 
                 opacity: 1, 
                 rotate: 0,
                 boxShadow: ["0 0 0px rgba(0,229,255,0)", "0 0 120px rgba(0,229,255,0.3)", "0 0 40px rgba(0,229,255,0.1)"] 
               }}
               transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            >
               {/* Pulsing Core */}
               <motion.div 
                 className="w-12 h-12 bg-white rounded-full blur-[2px] shadow-[0_0_30px_#fff]"
                 animate={{ scale: [1, 0.85, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               />
               
               {/* Rotating Outline */}
               <motion.div 
                  className="absolute inset-0 rounded-full border border-t-[rgba(0,229,255,0.8)] border-r-transparent border-b-transparent border-l-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               />
            </motion.div>

            {/* Boot Sequence Data Display */}
            <motion.div 
               className="mt-12 flex flex-col items-center relative z-10 w-[400px]"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
               <h1 className="text-white text-xs font-bold tracking-[0.4em] uppercase mb-6 opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Atlas AI Initializing</h1>
               
               <div className="relative h-6 w-full flex justify-center">
                  <LoadingText delay={1.0} text="Syncing scheduling matrices..." />
                  <LoadingText delay={1.8} text="Analyzing syllabus progression..." />
                  <LoadingText delay={2.6} text="Activating disruption intelligence..." />
                  <LoadingText delay={3.4} text="Bypassing cognitive locks..." />
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Dashboard Child Container - Employs Parallax & Depth */}
      <motion.div 
        className="w-full h-full relative z-0 bg-[#F8F9FA]"
        initial={{ filter: "blur(30px) brightness(0.2)", scale: 0.92, opacity: 0 }}
        animate={
           stage === 'booting' 
             ? { filter: "blur(30px) brightness(0.2)", scale: 0.92, opacity: 0 } 
             : { filter: "blur(0px) brightness(1)", scale: 1, opacity: 1 }
        }
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
      >
        {children}
      </motion.div>
    </div>
  );
}

function LoadingText({ delay, text }: { delay: number, text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
      animate={{ 
          opacity: [0, 1, 1, 0], 
          y: [15, 0, 0, -15], 
          filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"] 
      }}
      transition={{ 
          duration: 1.8, 
          delay, 
          ease: "easeInOut", 
          times: [0, 0.2, 0.8, 1] 
      }}
      className="text-[#00E5FF] text-[9px] font-bold tracking-[0.2em] uppercase absolute text-center w-full"
    >
      {text}
    </motion.div>
  );
}
