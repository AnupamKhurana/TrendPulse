import React, { useEffect, useState, useRef } from 'react';
import { Loader2, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm p-4 animate-in fade-in duration-500">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col ring-1 ring-black/5 transform transition-all scale-100">
        
        {/* Elegant Header */}
        <div className="bg-gradient-to-r from-emerald-50 to-white px-8 py-6 border-b border-gray-50">
           <div className="flex items-center justify-center mb-6">
             <div className="relative">
                <div className="absolute inset-0 bg-emerald-200 rounded-full opacity-20 animate-ping"></div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-emerald-100 relative z-10">
                    <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse" />
                </div>
             </div>
           </div>
           
           <h2 className="text-center text-xl font-bold text-gray-900 mb-2">
              Crafting Your Next Opportunity
           </h2>
           <p className="text-center text-gray-500 text-sm">
              {currentStep || "Starting research agent..."}
           </p>
        </div>

        {/* Step Progress List */}
        <div className="px-8 py-6 bg-white min-h-[200px]" ref={scrollRef}>
            <div className="space-y-5 relative">
                {/* Connecting Line */}
                <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gray-100 z-0"></div>

                {logs.map((log, i) => {
                    const isLast = i === logs.length - 1;
                    return (
                        <div key={i} className="relative z-10 flex items-start animate-in slide-in-from-bottom-2 duration-500">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                                isLast 
                                ? 'bg-white border-emerald-500 text-emerald-500' 
                                : 'bg-emerald-500 border-emerald-500 text-white'
                            }`}>
                                {isLast ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                            </div>
                            <div className="ml-4 pt-0.5">
                                <p className={`text-sm font-medium ${isLast ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {log}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Footer Note */}
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400 font-medium flex items-center justify-center">
                Powered by TrendPulse AI Intelligence <ArrowRight className="w-3 h-3 ml-1 opacity-50" />
            </p>
        </div>

      </div>
    </div>
  );
};