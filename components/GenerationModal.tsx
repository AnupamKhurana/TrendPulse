
import React, { useEffect, useState, useRef } from 'react';
import { Loader2, Terminal, CheckCircle2, Cpu, Search, Database, Globe, Zap } from 'lucide-react';

interface GenerationModalProps {
  currentStep: string;
  logs: string[];
}

export const GenerationModal: React.FC<GenerationModalProps> = ({ currentStep, logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-black/90 border border-emerald-500/30 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[600px]">
        
        {/* Header */}
        <div className="bg-gray-900 px-4 py-3 border-b border-emerald-500/20 flex items-center justify-between">
          <div className="flex items-center text-emerald-500 font-mono text-sm font-bold">
            <Terminal className="w-4 h-4 mr-2" />
            TRENDPULSE_AGENT_V2.1
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
        </div>

        {/* Main Visualization Area */}
        <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black border-b border-gray-800 relative overflow-hidden">
           {/* Animated Background Grid */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           {/* Central Icon */}
           <div className="relative z-10 mb-6">
             <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse"></div>
             <div className="w-20 h-20 bg-gray-900 border-2 border-emerald-500/50 rounded-full flex items-center justify-center relative">
                <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                
                {/* Orbiting Icons */}
                <div className="absolute -top-6 left-1/2 -ml-3 animate-bounce delay-75"><Globe className="w-6 h-6 text-blue-500 opacity-50" /></div>
                <div className="absolute top-1/2 -right-8 -mt-3 animate-bounce delay-150"><Search className="w-6 h-6 text-purple-500 opacity-50" /></div>
                <div className="absolute -bottom-6 left-1/2 -ml-3 animate-bounce delay-300"><Database className="w-6 h-6 text-orange-500 opacity-50" /></div>
                <div className="absolute top-1/2 -left-8 -mt-3 animate-bounce delay-500"><Cpu className="w-6 h-6 text-emerald-500 opacity-50" /></div>
             </div>
           </div>

           <h3 className="text-emerald-400 font-bold text-lg text-center relative z-10 tracking-widest uppercase animate-pulse">
              {currentStep || "Initializing..."}
           </h3>
           <p className="text-gray-500 text-xs mt-2 relative z-10">Processing real-time market signals...</p>
        </div>

        {/* Terminal Log Output */}
        <div className="bg-black p-4 font-mono text-xs h-48 overflow-y-auto" ref={scrollRef}>
            <div className="space-y-2">
                {logs.map((log, i) => (
                    <div key={i} className="flex items-start text-gray-300 animate-in slide-in-from-left-2 duration-300">
                        <span className="text-emerald-600 mr-2 opacity-70">[{new Date().toLocaleTimeString([], {hour12: false, hour: "2-digit", minute: "2-digit", second:"2-digit"})}]</span>
                        <span className="mr-2">➜</span>
                        <span className={i === logs.length - 1 ? "text-white font-bold" : "text-gray-400"}>
                            {log}
                        </span>
                        {i < logs.length - 1 && <CheckCircle2 className="w-3 h-3 ml-auto text-emerald-800" />}
                    </div>
                ))}
                <div className="flex items-center text-emerald-500/50 animate-pulse">
                    <span className="mr-2">_</span>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900 px-4 py-2 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-500 font-mono">
            <div className="flex items-center">
                <Zap className="w-3 h-3 mr-1 text-yellow-600" />
                <span>High-Bandwidth Connection</span>
            </div>
            <div>MEM: 64% | CPU: 32%</div>
        </div>

      </div>
    </div>
  );
};
