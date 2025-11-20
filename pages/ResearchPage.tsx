
import React, { useState } from 'react';
import { Search, Sparkles, FileText, BarChart, CheckCircle, XCircle, AlertTriangle, Users } from 'lucide-react';
import { generateResearchReport } from '../services/geminiService';
import { ResearchReport } from '../types';

export const ResearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [report, setReport] = useState<ResearchReport | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsSearching(true);
        setReport(null);
        setError(null);

        try {
            const result = await generateResearchReport(query);
            if (result) {
                setReport(result);
            } else {
                setError("Could not generate a report. Please try a different query.");
            }
        } catch (err) {
            setError("An error occurred during research.");
        } finally {
            setIsSearching(false);
        }
    };

  return (
    <div className="min-h-[80vh] flex flex-col items-center px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-block p-3 bg-emerald-100 rounded-full text-emerald-600 mb-4">
            <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Market Researcher</h1>
        <p className="text-gray-600 text-lg">Validate your own idea. Our agent performs a 40-step analysis of competitors, keywords, and market size.</p>
      </div>

      {/* Search Form */}
      <div className="w-full max-w-2xl mb-12">
        <form onSubmit={handleSearch} className="relative">
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., A subscription service for organic dog food..." 
                className="w-full pl-6 pr-14 py-4 rounded-full border border-gray-200 shadow-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-lg disabled:bg-gray-50 disabled:text-gray-400"
                disabled={isSearching}
            />
            <button 
                type="submit"
                disabled={isSearching || !query.trim()}
                className="absolute right-2 top-2 bottom-2 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSearching ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Search className="w-5 h-5" />}
            </button>
        </form>
      </div>

      {isSearching && (
        <div className="flex flex-col items-center animate-pulse max-w-md text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-emerald-600 animate-ping" />
            </div>
            <p className="text-lg font-medium text-gray-700">Analysing market data...</p>
            <p className="text-sm text-gray-500 mt-2">Our AI is browsing live sources to check competitors and market volume.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl border border-red-100 mb-8">
            {error}
        </div>
      )}

      {!isSearching && !report && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <FeatureCard icon={<FileText className="w-8 h-8" />} title="SWOT Analysis" desc="Detailed breakdown of strengths and weaknesses." />
            <FeatureCard icon={<Users className="w-8 h-8" />} title="Competitor Map" desc="See who you're up against and their pricing." />
            <FeatureCard icon={<BarChart className="w-8 h-8" />} title="Market Size" desc="TAM, SAM, and SOM calculations." />
        </div>
      )}

      {/* Report Results */}
      {report && (
        <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Executive Summary */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
                <p className="text-gray-700 leading-relaxed text-lg">{report.summary}</p>
                
                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center">
                    <span className="font-bold text-gray-900 mr-3">Verdict:</span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-emerald-100 text-emerald-800">
                        {report.verdict}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                
                {/* SWOT */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-emerald-600" /> SWOT Analysis
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SwotBox title="Strengths" items={report.swot.strengths} color="text-green-600" bg="bg-green-50" icon={<CheckCircle className="w-4 h-4" />} />
                        <SwotBox title="Weaknesses" items={report.swot.weaknesses} color="text-red-500" bg="bg-red-50" icon={<XCircle className="w-4 h-4" />} />
                        <SwotBox title="Opportunities" items={report.swot.opportunities} color="text-blue-500" bg="bg-blue-50" icon={<Sparkles className="w-4 h-4" />} />
                        <SwotBox title="Threats" items={report.swot.threats} color="text-orange-500" bg="bg-orange-50" icon={<AlertTriangle className="w-4 h-4" />} />
                    </div>
                </div>

                {/* Market Size */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <BarChart className="w-5 h-5 mr-2 text-emerald-600" /> Market Size Estimates
                    </h3>
                    
                    <div className="space-y-6 mb-6">
                        <MarketCircle label="TAM" sub="Total Addressable Market" value={report.marketSize.tam} color="bg-emerald-100 text-emerald-800 border-emerald-200" width="w-full" />
                        <MarketCircle label="SAM" sub="Serviceable Available Market" value={report.marketSize.sam} color="bg-blue-100 text-blue-800 border-blue-200" width="w-3/4" />
                        <MarketCircle label="SOM" sub="Serviceable Obtainable Market" value={report.marketSize.som} color="bg-indigo-100 text-indigo-800 border-indigo-200" width="w-1/2" />
                    </div>

                    <div className="mt-auto bg-gray-50 p-4 rounded-lg text-sm text-gray-600 italic">
                        "{report.marketSize.explanation}"
                    </div>
                </div>
            </div>

            {/* Competitors */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-emerald-600" /> Competitive Landscape
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {report.competitors.map((comp, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:border-emerald-300 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-gray-900">{comp.name}</h4>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{comp.price}</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-snug">{comp.description}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
        <div className="text-gray-400 mx-auto mb-3 flex justify-center">{icon}</div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
);

const SwotBox = ({ title, items, color, bg, icon }: { title: string, items: string[], color: string, bg: string, icon: React.ReactNode }) => (
    <div className={`${bg} rounded-xl p-4 bg-opacity-30`}>
        <div className={`flex items-center gap-2 font-bold mb-3 text-sm uppercase tracking-wide ${color}`}>
            {icon} {title}
        </div>
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="text-xs text-gray-700 leading-snug list-disc list-inside pl-1">
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const MarketCircle = ({ label, sub, value, color, width }: any) => (
    <div className={`relative rounded-r-full p-4 border-l-4 ${color} ${width} min-w-[200px]`}>
        <div className="flex justify-between items-center">
            <div>
                <span className="font-bold text-lg block">{label}</span>
                <span className="text-xs opacity-75">{sub}</span>
            </div>
            <span className="font-bold text-xl">{value}</span>
        </div>
    </div>
);
