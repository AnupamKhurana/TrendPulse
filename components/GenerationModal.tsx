
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white border border-gray-200 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[600px] ring-1 ring-black/5">
        
        {/* Header */}
        <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-emerald-700 font-mono text-sm font-bold tracking-tight">
            <Terminal className="w-4 h-4 mr-2" />
            TRENDPULSE_AGENT_V2.1
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80 border border-red-500/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80 border border-yellow-500/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 border border-green-500/20"></div>
          </div>
        </div>

        {/* Main Visualization Area */}
        <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 relative overflow-hidden">
           {/* Animated Background Grid */}
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           {/* Central Icon */}
           <div className="relative z-10 mb-6">
             <div className="absolute inset-0 bg-emerald-100 blur-xl rounded-full animate-pulse"></div>
             <div className="w-20 h-20 bg-white border border-emerald-100 shadow-sm rounded-full flex items-center justify-center relative">
                <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                
                {/* Orbiting Icons */}
                <div className="absolute -top-6 left-1/2 -ml-3 animate-bounce delay-75"><Globe className="w-6 h-6 text-blue-500" /></div>
                <div className="absolute top-1/2 -right-8 -mt-3 animate-bounce delay-150"><Search className="w-6 h-6 text-purple-500" /></div>
                <div className="absolute -bottom-6 left-1/2 -ml-3 animate-bounce delay-300"><Database className="w-6 h-6 text-orange-500" /></div>
                <div className="absolute top-1/2 -left-8 -mt-3 animate-bounce delay-500"><Cpu className="w-6 h-6 text-emerald-500" /></div>
             </div>
           </div>

           <h3 className="text-gray-900 font-bold text-lg text-center relative z-10 tracking-widest uppercase animate-pulse">
              {currentStep || "Initializing..."}
           </h3>
           <p className="text-gray-500 text-xs mt-2 relative z-10 font-medium">Processing real-time market signals...</p>
        </div>

        {/* Terminal Log Output */}
        <div className="bg-gray-50/50 p-5 font-mono text-xs h-48 overflow-y-auto border-t border-gray-100" ref={scrollRef}>
            <div className="space-y-3">
                {logs.map((log, i) => (
                    <div key={i} className="flex items-start text-gray-600 animate-in slide-in-from-left-2 duration-300 leading-relaxed">
                        <span className="text-emerald-600 mr-2 font-bold text-[10px] mt-0.5">[{new Date().toLocaleTimeString([], {hour12: false, hour: "2-digit", minute: "2-digit", second:"2-digit"})}]</span>
                        <span className="mr-2 text-gray-400">➜</span>
                        <span className={i === logs.length - 1 ? "text-gray-900 font-bold bg-white px-1 rounded border border-gray-200 shadow-sm" : "text-gray-600"}>
                            {log}
                        </span>
                        {i < logs.length - 1 && <CheckCircle2 className="w-3 h-3 ml-auto text-emerald-500" />}
                    </div>
                ))}
                <div className="flex items-center text-emerald-500 animate-pulse pl-1">
                    <span className="mr-2 font-bold">_</span>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="bg-white px-5 py-2 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-medium">
            <div className="flex items-center">
                <Zap className="w-3 h-3 mr-1.5 text-amber-500 fill-amber-500" />
                <span className="text-gray-500">High-Bandwidth Connection</span>
            </div>
            <div className="font-mono text-gray-400">MEM: 64% | CPU: 32%</div>
        </div>

      </div>
    </div>
  );
};
