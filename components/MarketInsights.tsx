import React from 'react';
import { ArrowRight } from 'lucide-react';
import { InsightItem } from '../types';

interface MarketInsightsProps {
    insights: InsightItem[];
}

export const MarketInsights: React.FC<MarketInsightsProps> = ({ insights }) => {
    return (
        <section className="bg-gray-50 py-16 border-t border-gray-200">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-indigo-500 mb-2">Market Insights</h2>
                    <p className="text-gray-600">Uncover hidden market opportunities by analyzing reddit, facebook groups, and other communities.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {insights.map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4 text-sm min-h-[40px]">{item.title}</h3>
                            <p className="text-xs text-gray-500 mb-6 line-clamp-2">
                                {item.description}
                            </p>
                            
                            <div className="space-y-3 text-xs font-medium">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">PAIN POINTS (8)</span>
                                    <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded">{item.pain}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">SOLUTION GAPS (6)</span>
                                    <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded">{item.solution}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                                    <span className="text-gray-500">REVENUE POTENTIAL</span>
                                    <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded">Excellent</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                 <div className="mt-12 flex justify-center">
                     <button className="bg-indigo-600 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center">
                        See all market insights <ArrowRight className="w-4 h-4 ml-2" />
                     </button>
                </div>
            </div>
        </section>
    );
};