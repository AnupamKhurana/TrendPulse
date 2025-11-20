
import React, { useState, useEffect } from 'react';
import { Settings, Server, Globe, X, Check, Terminal } from 'lucide-react';
import { AIProviderConfig } from '../types';
import { getAIConfig, setAIConfig } from '../services/geminiService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<AIProviderConfig>(getAIConfig());
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
        setConfig(getAIConfig());
        setIsSaved(false);
    }
  }, [isOpen]);

  const handleSave = () => {
    setAIConfig(config);
    setIsSaved(true);
    setTimeout(() => {
        setIsSaved(false);
        onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
           <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-emerald-600" /> AI Settings
           </h2>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
               <X className="w-5 h-5" />
           </button>
        </div>

        <div className="p-6 space-y-6">
            
            {/* Provider Selection */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">AI Provider</label>
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => setConfig({ ...config, provider: 'gemini' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                            config.provider === 'gemini' 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                        }`}
                    >
                        <Globe className="w-8 h-8 mb-2" />
                        <span className="font-bold text-sm">Google Gemini</span>
                        <span className="text-[10px] mt-1">Includes Live Search</span>
                    </button>
                    
                    <button 
                        onClick={() => setConfig({ ...config, provider: 'local' })}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                            config.provider === 'local' 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                            : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                        }`}
                    >
                        <Server className="w-8 h-8 mb-2" />
                        <span className="font-bold text-sm">Local / OpenAI</span>
                        <span className="text-[10px] mt-1">Ollama, Llama.cpp</span>
                    </button>
                </div>
            </div>

            {/* Configuration Forms */}
            {config.provider === 'gemini' ? (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                    <p className="flex items-start">
                        <span className="font-bold mr-2">Note:</span>
                        Gemini uses the API key from your environment variables. It supports live Google Search grounding for trend analysis.
                    </p>
                </div>
            ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800 mb-4">
                        <p className="flex items-start">
                            <span className="font-bold mr-2">Warning:</span>
                            Local models cannot browse the live web. Trend data will be simulated based on the model's internal knowledge.
                        </p>
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Base URL</label>
                        <div className="relative">
                            <Server className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                value={config.localBaseUrl}
                                onChange={(e) => setConfig({...config, localBaseUrl: e.target.value})}
                                placeholder="http://localhost:11434/v1"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Standard OpenAI-compatible endpoint.</p>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Model Name</label>
                        <div className="relative">
                            <Terminal className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                value={config.localModelName}
                                onChange={(e) => setConfig({...config, localModelName: e.target.value})}
                                placeholder="llama3"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">API Key (Optional)</label>
                        <input 
                            type="password" 
                            value={config.localApiKey || ''}
                            onChange={(e) => setConfig({...config, localApiKey: e.target.value})}
                            placeholder="sk-..."
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>
                </div>
            )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
                onClick={handleSave}
                className={`px-6 py-2 rounded-lg text-white font-bold text-sm transition-all flex items-center ${isSaved ? 'bg-green-500' : 'bg-gray-900 hover:bg-emerald-600'}`}
            >
                {isSaved ? <><Check className="w-4 h-4 mr-2" /> Saved</> : "Save Configuration"}
            </button>
        </div>

      </div>
    </div>
  );
};
