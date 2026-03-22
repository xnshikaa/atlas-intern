"use client";
import React, { useState, useRef, useEffect } from 'react';
import TopHeader from "@/components/layout/TopHeader";
import { ArrowUp, Lightbulb, BarChart2, Menu, BrainCircuit, Loader2, Sparkles, CheckCircle2, ChevronRight, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: "Hello Dr. Iyer! I have full context of your subjects, syllabus, and schedule. Ask me anything — I'll give you precise, data-driven answers." }
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isThinking) return;

    const newUserMessage = { id: Date.now(), type: 'user', text };
    const typingId = Date.now() + 1;
    const newMessages = [...messages, newUserMessage, { id: typingId, type: 'ai', text: "Thinking..." }];

    setMessages(newMessages);
    setInput("");
    setIsThinking(true);

    // Update the "Thinking..." message with a more detailed one
    setMessages(prev => prev.map(m => m.id === typingId ? { ...m, text: "Thinking... Querying Atlas clusters..." } : m));

    // Prepare messages for the API call, excluding the current "Thinking..." message
    const payloadMessages = newMessages.filter(m => m.id !== typingId).map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }));
    const contextStr = "- Tracking 4 Subjects: DSA, DBMS, OS, CN.\n- Alert: Module 3 in DBMS is blocked.\n- Warning: Attendance structural risk next Monday.";

    try {
       const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payloadMessages, context: contextStr })
       });
       const data = await res.json();
       
       let displayResponse = data.message || "I was unable to retrieve a response from the cognitive layer.";
       if (data.action && data.action !== "none") {
         displayResponse += `\n\n**Action:** \`${data.action.toUpperCase()}\``;
       }
       if (data.reasoning) {
         displayResponse += `\n\n**Reasoning:** ${data.reasoning}`;
       }
       if (data.suggested_changes && data.suggested_changes.length > 0) {
         displayResponse += `\n\n**Suggestions:**\n${data.suggested_changes.map((c: string) => `- ${c}`).join('\n')}`;
       }

       setMessages(prev => prev.map(m => m.id === typingId ? { ...m, text: displayResponse } : m));
    } catch (err) {
       setMessages(prev => prev.map(m => m.id === typingId ? { ...m, text: "Network error reaching /api/chat. Is the Next.js server running?" } : m));
    } finally {
       setIsThinking(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-full bg-[#F8F9FA]">
      <TopHeader title="AI Assistant" subtitle="Academic Year 2024-25 • Semester 2" />
      
      <div className="px-8 flex-1 pb-10 flex space-x-6 h-[calc(100vh-120px)] overflow-hidden">
         
         {/* Live Chat Interface */}
         <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden relative">
            
            <div className="bg-[#00B4C8] px-6 py-4 flex justify-between items-center text-white">
               <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold mr-3 backdrop-blur-sm shadow-inner">AI</div>
                  <div>
                    <h3 className="font-bold flex items-center tracking-wide">Atlas AI Assistant</h3>
                    <p className="text-xs opacity-90 mt-0.5">Powered by Claude • Context-aware</p>
                  </div>
               </div>
               <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,1)]"></div>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto w-full space-y-6">
               {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : ''} animate-[fadeIn_0.3s_ease-out]`}>
                     {msg.type === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-cyan-50 text-[#00B4C8] font-bold text-xs flex items-center justify-center mr-3 flex-shrink-0">AI</div>
                     )}
                     <div className={`border p-4 shadow-sm max-w-[80%] font-medium leading-relaxed
                        ${msg.type === 'ai' 
                           ? 'bg-white text-gray-700 border-gray-100 rounded-2xl rounded-tl-sm' 
                           : 'bg-[#00B4C8] text-white border-[#00B4C8] rounded-2xl rounded-tr-sm'}`}>
                        {msg.type === 'ai' ? (
                           <div className="prose prose-sm max-w-none text-gray-700 prose-p:leading-relaxed prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
                              <ReactMarkdown>{msg.text}</ReactMarkdown>
                           </div>
                        ) : (
                           msg.text
                        )}
                     </div>
                  </div>
               ))}
               <div ref={endRef} />
            </div>

            <div className="px-6 pb-6 pt-2 bg-gradient-to-t from-white via-white to-transparent">
               <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                  {["Am I on track?", "Best CIA date?", "Needs help?", "Friday attendance?"].map(q => (
                    <button key={q} onClick={() => handleSend(q)} className="flex-shrink-0 px-4 py-2 border border-gray-200 text-gray-500 rounded-full text-xs font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm bg-white">
                      {q}
                    </button>
                  ))}
               </div>
               
               <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                    placeholder="Ask your AI assistant..." 
                    className="w-full bg-white border border-gray-200 p-4 rounded-xl pr-14 outline-none focus:ring-2 focus:ring-[#00B4C8]/20 focus:border-[#00B4C8]/50 shadow-sm text-gray-700 font-medium placeholder:text-gray-400"
                  />
                  <button onClick={() => handleSend(input)} className="absolute right-2.5 w-9 h-9 bg-[#00B4C8] hover:bg-cyan-700 transition-colors text-white rounded-lg flex items-center justify-center shadow-md">
                     <ArrowUp className="w-4 h-4" strokeWidth={3} />
                  </button>
               </div>
            </div>
         </div>

         <div className="w-[320px] flex flex-col space-y-6 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h4 className="flex items-center text-sm font-bold text-gray-800 mb-4 tracking-tight">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" /> Suggested Questions
               </h4>
               <div className="space-y-2">
                 {["How many lectures left for OS?", "Summarise this week", "What to cover tomorrow?", "Generate CN catchup plan"].map(q => (
                    <div key={q} onClick={() => handleSend(q)} className="border border-gray-100 p-3 rounded-lg text-xs font-medium text-gray-500 cursor-pointer hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                       {q}
                    </div>
                 ))}
               </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
               <h4 className="flex items-center text-sm font-bold text-gray-800 mb-5 tracking-tight">
                  <BarChart2 className="w-4 h-4 mr-2 text-indigo-500" /> Context Given to AI
               </h4>
               <div className="space-y-3 text-sm font-medium">
                  <div className="flex justify-between items-center"><span className="text-gray-500">Subjects</span><span className="text-gray-800 font-extrabold">4</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500">Lecture logs</span><span className="text-gray-800 font-extrabold">38</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500">Topics covered</span><span className="text-gray-800 font-extrabold">62 / 98</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500">Holidays ahead</span><span className="text-gray-800 font-extrabold">3</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500">CIA events</span><span className="text-gray-800 font-extrabold">6</span></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
