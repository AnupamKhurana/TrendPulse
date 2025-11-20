
import React, { useState } from 'react';
import { Search, Sparkles, FileText, BarChart, CheckCircle, XCircle, AlertTriangle, Users, TrendingUp, Target, DollarSign, Shield, ArrowRight } from 'lucide-react';
import { generateResearchReport } from '../services/geminiService';
import { ResearchReport } from '../types';
import { TrendChart } from '../components/TrendChart';

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
    <div className="min-h-[80vh] flex flex-col items-center px-4 py-12 bg-gray-50/50">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-block p-3 bg-white border border-gray-100 shadow-sm rounded-2xl text-emerald-600 mb-4">
            <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Market Researcher</h1>
        <p className="text-gray-600 text-lg">Validate your vision with precision. Our agent performs a comprehensive market scan, analyzing competitors, keywords, and growth potential.</p>
      </div>

      {/* Search Form */}
      <div className="w-full max-w-2xl mb-12">
        <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-0 bg-emerald-200 rounded-full blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., A subscription service for organic dog food..." 
                className="relative w-full pl-8 pr-16 py-5 rounded-full border border-gray-200 shadow-xl bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-lg text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-400 transition-all"
                disabled={isSearching}
            />
            <button 
                type="submit"
                disabled={isSearching || !query.trim()}
                className="absolute right-3 top-3 bottom-3 bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
                {isSearching ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Search className="w-5 h-5" />}
            </button>
        </form>
      </div>

      {isSearching && (
        <div className="flex flex-col items-center animate-pulse max-w-md text-center">
            <div className="w-20 h-20 bg-white border border-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Sparkles className="w-8 h-8 text-emerald-500 animate-ping" />
            </div>
            <p className="text-xl font-bold text-gray-900 mb-2">Analyzing Market Data...</p>
            <p className="text-sm text-gray-500">Scanning competitors, calculating TAM, and checking search volume trends.</p>
        </div>
      )}

      {error && (
        <div className="bg-white text-red-600 px-8 py-6 rounded-2xl border border-red-100 shadow-sm mb-8 max-w-2xl text-center">
            <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-red-500" />
            <p className="font-medium">{error}</p>
        </div>
      )}

      {!isSearching && !report && !error && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
            <FeatureCard icon={<FileText className="w-6 h-6" />} title="SWOT Analysis" desc="Detailed breakdown of strengths and weaknesses." />
            <FeatureCard icon={<Users className="w-6 h-6" />} title="Competitor Map" desc="See who you're up against and their pricing." />
            <FeatureCard icon={<BarChart className="w-6 h-6" />} title="Market Size" desc="TAM, SAM, and SOM calculations." />
        </div>
      )}

      {/* Report Results */}
      {report && (
        <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
            
            {/* SECTION 1: Executive Briefing */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-emerald-900 px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                     <div>
                        <div className="flex items-center text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                            <FileText className="w-4 h-4 mr-2" /> Executive Briefing
                        </div>
                        <h2 className="text-2xl font-bold text-white">Market Viability Report</h2>
                     </div>
                     <div className="bg-emerald-800/50 border border-emerald-700 rounded-lg px-4 py-2 flex items-center">
                        <span className="text-emerald-200 text-xs font-bold uppercase mr-3">Verdict</span>
                        <span className="text-white font-bold">{report.verdict}</span>
                     </div>
                </div>
                <div className="p-8">
                     <p className="text-gray-700 text-lg leading-relaxed">{report.summary}</p>
                </div>
            </div>

            {/* SECTION 2: Market Intelligence (Split View) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Market Size (Left) */}
                <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-emerald-600" /> Total Addressable Market
                    </h3>
                    
                    <div className="space-y-6 flex-grow">
                        <MarketStat label="TAM" sub="Total Addressable Market" value={report.marketSize.tam} color="bg-emerald-50 border-emerald-100 text-emerald-900" />
                        <MarketStat label="SAM" sub="Serviceable Available Market" value={report.marketSize.sam} color="bg-blue-50 border-blue-100 text-blue-900" />
                        <MarketStat label="SOM" sub="Serviceable Obtainable Market" value={report.marketSize.som} color="bg-indigo-50 border-indigo-100 text-indigo-900" />
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-xs text-gray-500 italic leading-relaxed">"{report.marketSize.explanation}"</p>
                    </div>
                </div>

                {/* Trends (Right) */}
                <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" /> Search Interest Trends
                    </h3>
                    <p className="text-sm text-gray-500 mb-6">Historical search volume for "{report.trendKeyword || query}"</p>
                    
                    {report.trendData && report.trendData.length > 0 ? (
                        <div className="h-[300px] w-full">
                            <TrendChart 
                                data={report.trendData}
                                keyword={report.trendKeyword || query}
                                currentVolume={report.currentVolume || "N/A"}
                                growth={report.growthPercentage || 0}
                                volumeNote="Search Volume History"
                            />
                        </div>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p className="text-gray-400 text-sm">Trend data unavailable for this query.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* SECTION 3: Competitive Landscape */}
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-emerald-600" /> Competitive Landscape
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {report.competitors.map((comp, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-emerald-500 transition-colors"></div>
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-lg text-gray-900">{comp.name}</h4>
                                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                                    {comp.price}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{comp.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SECTION 4: Strategic SWOT Matrix */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-emerald-600" /> Strategic SWOT Matrix
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <SwotSection 
                        title="Strengths" 
                        items={report.swot.strengths} 
                        headerColor="text-emerald-700" 
                        icon={<CheckCircle className="w-5 h-5 text-emerald-600" />}
                        bg="bg-emerald-50/50"
                        border="border-emerald-100"
                    />
                    <SwotSection 
                        title="Weaknesses" 
                        items={report.swot.weaknesses} 
                        headerColor="text-rose-700" 
                        icon={<XCircle className="w-5 h-5 text-rose-600" />}
                        bg="bg-rose-50/50"
                        border="border-rose-100"
                    />
                    <SwotSection 
                        title="Opportunities" 
                        items={report.swot.opportunities} 
                        headerColor="text-blue-700" 
                        icon={<Sparkles className="w-5 h-5 text-blue-600" />}
                        bg="bg-blue-50/50"
                        border="border-blue-100"
                    />
                    <SwotSection 
                        title="Threats" 
                        items={report.swot.threats} 
                        headerColor="text-amber-700" 
                        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
                        bg="bg-amber-50/50"
                        border="border-amber-100"
                    />
                </div>
            </div>

        </div>
      )}
    </div>
  );
};

// --- Helper Components ---

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-all cursor-default">
        <div className="text-gray-400 mx-auto mb-4 flex justify-center p-3 bg-gray-50 rounded-full w-16 h-16 items-center">
            {icon}
        </div>
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
);

const MarketStat = ({ label, sub, value, color }: any) => (
    <div className={`p-4 rounded-xl border ${color} flex items-center justify-between`}>
        <div>
            <div className="text-xs font-bold uppercase opacity-70 mb-1">{label}</div>
            <div className="text-xs opacity-60 font-medium">{sub}</div>
        </div>
        <div className="text-xl font-bold">{value}</div>
    </div>
);

const SwotSection = ({ title, items, headerColor, icon, bg, border }: any) => (
    <div className={`rounded-xl p-6 ${bg} border ${border}`}>
        <div className={`flex items-center gap-2 font-bold text-lg mb-4 ${headerColor}`}>
            {icon} {title}
        </div>
        <ul className="space-y-3">
            {items.map((item: string, i: number) => (
                <li key={i} className="flex items-start text-sm text-gray-700 leading-relaxed">
                    <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);
