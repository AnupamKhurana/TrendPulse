
import React from 'react';
import { BusinessIdea } from '../types';
import { Check, TrendingUp, Users, AlertCircle } from 'lucide-react';
import { TrendChart } from '../components/TrendChart';

interface AnalysisPageProps {
  idea: BusinessIdea;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({ idea }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <span className="text-emerald-600 font-bold tracking-wider text-xs uppercase">Deep Dive Analysis</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{idea.title}</h1>
        <p className="text-xl text-gray-600 mt-4">{idea.oneLiner}</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-gray-500 text-xs font-bold uppercase">Market Growth</div>
          <div className="text-2xl font-bold text-green-600 mt-1">+{idea.growthPercentage}%</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-gray-500 text-xs font-bold uppercase">Opportunity</div>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{idea.opportunityScore}/10</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-gray-500 text-xs font-bold uppercase">Search Vol</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{idea.currentVolume}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="text-gray-500 text-xs font-bold uppercase">Timing</div>
            <div className="text-2xl font-bold text-orange-500 mt-1">{idea.timingScore}/10</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
            
            <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" /> Market Dynamics
                </h3>
                <div className="prose text-gray-600 mb-6">
                    <p>{idea.whyNow}</p>
                    <p className="mt-4">{idea.marketGap}</p>
                </div>
                <TrendChart 
                    data={idea.chartData} 
                    keyword={idea.keyword} 
                    currentVolume={idea.currentVolume}
                    growth={idea.growthPercentage}
                    volumeNote={idea.volumeNote}
                />
            </section>

            <section>
                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-emerald-600" /> Target Audience & Competition
                </h3>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <div className="text-xs text-gray-500 uppercase font-bold mb-1">Target Customer</div>
                            <div className="font-medium text-gray-900">{idea.categories.target}</div>
                        </div>
                        <div>
                             <div className="text-xs text-gray-500 uppercase font-bold mb-1">Main Competitor</div>
                            <div className="font-medium text-gray-900">{idea.categories.competitor}</div>
                        </div>
                        <div>
                             <div className="text-xs text-gray-500 uppercase font-bold mb-1">Market Type</div>
                            <div className="font-medium text-gray-900">{idea.categories.market}</div>
                        </div>
                        <div>
                             <div className="text-xs text-gray-500 uppercase font-bold mb-1">Business Model</div>
                            <div className="font-medium text-gray-900">{idea.categories.type}</div>
                        </div>
                    </div>
                </div>
            </section>

             <section>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Check className="w-5 h-5 mr-2 text-emerald-600" /> Execution Strategy
                </h3>
                 <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 text-emerald-900 leading-relaxed">
                    <ul className="space-y-4">
                        {Array.isArray(idea.executionPlan) ? idea.executionPlan.map((step, i) => (
                            <li key={i} className="flex items-start">
                                <div className="flex-shrink-0 mt-0.5 bg-emerald-200 rounded-full p-0.5 mr-3">
                                    <Check className="w-3 h-3 text-emerald-800" />
                                </div>
                                <span>{step}</span>
                            </li>
                        )) : (
                            <li>{idea.executionPlan}</li>
                        )}
                    </ul>
                 </div>
            </section>

        </div>

        <div className="space-y-8">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-bold text-gray-900 mb-6">SWOT Snapshot</h4>
                
                <div className="space-y-6">
                    <div>
                        <div className="text-xs font-bold text-green-600 uppercase mb-2">Strengths</div>
                        <ul className="text-sm text-gray-600 space-y-2">
                            {idea.tags.map(tag => <li key={tag} className="flex items-start"><Check className="w-3 h-3 mt-1 mr-2 text-green-500" /> {tag}</li>)}
                        </ul>
                    </div>
                    <div>
                        <div className="text-xs font-bold text-red-500 uppercase mb-2">Risks</div>
                        <p className="text-sm text-gray-600">High dependence on API stability from third-party providers.</p>
                    </div>
                </div>
             </div>

             <div className="bg-gray-900 text-white rounded-xl p-6">
                <h4 className="font-bold mb-2">Ready to start?</h4>
                <p className="text-gray-400 text-sm mb-4">Get the full business plan exported to PDF.</p>
                <button className="w-full bg-white text-gray-900 py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors">Download Report</button>
             </div>
        </div>
      </div>
    </div>
  );
};
