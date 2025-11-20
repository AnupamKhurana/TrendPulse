import React from 'react';
import { ArrowRight } from 'lucide-react';
import { DatabaseIdea, TrendItem } from '../types';

interface IdeaGridProps {
    ideas: DatabaseIdea[];
}

export const IdeaGrid: React.FC<IdeaGridProps> = ({ ideas }) => {
    // Colors to cycle through for the cards
    const colors = [
        "bg-blue-500",
        "bg-orange-500",
        "bg-red-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-teal-500"
    ];

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-indigo-500 mb-2">The Idea Database</h2>
                    <p className="text-gray-600">Dive into deep research and analysis on 700+ business ideas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ideas.map((card, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
                            {/* Mock Image area */}
                            <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                                <div className={`absolute inset-x-0 top-0 h-1 ${colors[i % colors.length]}`}></div>
                                <img src={`https://picsum.photos/seed/${i + 55}/400/200`} alt="chart" className="opacity-80 mix-blend-multiply w-full h-full object-cover" />
                                {/* Overlay Sparkline look */}
                                <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold border border-gray-200">
                                    Trending
                                </div>
                            </div>
                            
                            <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-2 leading-snug">
                                {card.title}
                            </h3>
                            <p className="text-xs text-gray-500 line-clamp-3 mb-4">
                                A high-potential opportunity identified in the current market landscape with strong growth signals.
                            </p>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex gap-2">
                                    {card.tags.map((t, idx) => (
                                        <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                     <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center">
                        Browse more ideas <ArrowRight className="w-4 h-4 ml-2" />
                     </button>
                </div>
            </div>
        </section>
    );
};

interface TrendsGridProps {
    trends: TrendItem[];
}

export const TrendsGrid: React.FC<TrendsGridProps> = ({ trends }) => {
    return (
        <section className="bg-white py-16">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-indigo-500 mb-2">Trends</h2>
                    <p className="text-gray-600">Discover emerging trends and opportunities</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trends.map((trend, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-200 transition-colors cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-gray-900 text-sm">{trend.name}</h3>
                            </div>
                            <div className="flex gap-4 text-xs font-bold mb-6">
                                <span className="text-indigo-600">{trend.vol} <span className="text-gray-400 font-normal">Volume</span></span>
                                <span className="text-green-500">{trend.growth} <span className="text-gray-400 font-normal">Growth</span></span>
                            </div>
                            
                            {/* Mini Sparkline Mock */}
                            <div className="h-16 w-full mb-4 relative">
                                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                    <path d={`M0,40 Q20,35 40,${30 - i*5} T100,${10 + i*5}`} fill="none" stroke="#4F46E5" strokeWidth="2" />
                                    <path d={`M0,40 Q20,35 40,${30 - i*5} T100,${10 + i*5} V40 H0 Z`} fill="#4F46E5" fillOpacity="0.05" />
                                </svg>
                            </div>

                            <p className="text-xs text-gray-500 line-clamp-2">{trend.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                     <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center">
                        See all trends <ArrowRight className="w-4 h-4 ml-2" />
                     </button>
                </div>
            </div>
        </section>
    );
};