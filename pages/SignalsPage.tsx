
import React from 'react';
import { BusinessIdea } from '../types';
import { MessageCircle, ThumbsUp, ThumbsDown, Minus, ExternalLink, Users, MessageSquare, TrendingUp, Hash } from 'lucide-react';

interface SignalsPageProps {
  idea: BusinessIdea;
}

export const SignalsPage: React.FC<SignalsPageProps> = ({ idea }) => {
  const { communityDeepDive, communitySignals } = idea;
  
  // Fallback if deep dive data isn't available (for older ideas)
  if (!communityDeepDive) {
      return (
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Data Not Available</h2>
              <p className="text-gray-500">Detailed signal analysis is not available for this idea version. Please generate a new idea.</p>
          </div>
      )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <div className="flex items-center text-emerald-600 font-bold tracking-wider text-xs uppercase mb-2">
            <Users className="w-4 h-4 mr-2" /> Community Intelligence
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Social Proof & Market Validation</h1>
        
        {/* Idea Context Summary */}
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Analyzing Signal For:</span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">{idea.title}</h2>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">{idea.oneLiner}</p>
        </div>
      </div>

      {/* Top High-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Sentiment Score */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                  <div className="text-sm font-bold text-gray-500 uppercase mb-1">Sentiment Score</div>
                  <div className="text-3xl font-bold text-gray-900">{communityDeepDive.sentimentScore}/100</div>
                  <div className="text-xs text-emerald-600 font-medium mt-1">Generally Positive</div>
              </div>
              <div className="w-16 h-16 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#f3f4f6" strokeWidth="6" fill="none" />
                      <circle cx="32" cy="32" r="28" stroke="#10B981" strokeWidth="6" fill="none" strokeDasharray="175" strokeDashoffset={175 - (175 * communityDeepDive.sentimentScore) / 100} />
                  </svg>
              </div>
          </div>

          {/* Breakdown Bar */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm md:col-span-2 flex flex-col justify-center">
              <div className="flex justify-between text-sm font-medium text-gray-600 mb-3">
                  <span className="flex items-center"><ThumbsUp className="w-4 h-4 mr-1 text-green-500" /> Positive</span>
                  <span className="flex items-center"><Minus className="w-4 h-4 mr-1 text-gray-400" /> Neutral</span>
                  <span className="flex items-center"><ThumbsDown className="w-4 h-4 mr-1 text-red-500" /> Negative</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex">
                  <div style={{ width: `${communityDeepDive.sentimentBreakdown.positive}%` }} className="bg-green-500 h-full"></div>
                  <div style={{ width: `${communityDeepDive.sentimentBreakdown.neutral}%` }} className="bg-gray-400 h-full"></div>
                  <div style={{ width: `${communityDeepDive.sentimentBreakdown.negative}%` }} className="bg-red-500 h-full"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>{communityDeepDive.sentimentBreakdown.positive}%</span>
                  <span>{communityDeepDive.sentimentBreakdown.neutral}%</span>
                  <span>{communityDeepDive.sentimentBreakdown.negative}%</span>
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Col: Discussions */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Voice of Customer */}
              <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-emerald-600" /> Voice of the Customer
                  </h3>
                  <div className="space-y-4">
                      {communityDeepDive.discussions.map((discuss, i) => (
                          <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-emerald-200 transition-colors relative">
                              <div className={`absolute top-5 right-5 px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                  discuss.sentiment === 'positive' ? 'bg-green-50 text-green-700' : 
                                  discuss.sentiment === 'negative' ? 'bg-red-50 text-red-700' : 
                                  'bg-gray-50 text-gray-600'
                              }`}>
                                  {discuss.sentiment}
                              </div>
                              <p className="text-gray-700 italic text-sm leading-relaxed mb-3">"{discuss.text}"</p>
                              <div className="flex items-center text-xs text-gray-500 font-medium">
                                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold mr-2">
                                      {discuss.author[0]}
                                  </div>
                                  {discuss.author} • <span className="text-emerald-600 ml-1">{discuss.platform}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </section>

              {/* Keywords Cloud */}
              <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                      <Hash className="w-5 h-5 mr-2 text-emerald-600" /> Trending Pain Points
                  </h3>
                  <div className="flex flex-wrap gap-3">
                      {communityDeepDive.topKeywords.map((kw, i) => (
                          <span key={i} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700 transition-colors cursor-default">
                              #{kw}
                          </span>
                      ))}
                  </div>
              </section>
          </div>

          {/* Right Col: Channels */}
          <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" /> Channel Activity
                  </h4>
                  <div className="space-y-6">
                      {communityDeepDive.platformBreakdown.map((platform, i) => (
                          <div key={i} className="relative">
                              <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-sm text-gray-800">{platform.name}</span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                      platform.activityLevel === 'High' ? 'bg-emerald-100 text-emerald-700' :
                                      platform.activityLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-gray-100 text-gray-500'
                                  }`}>
                                      {platform.activityLevel} Activity
                                  </span>
                              </div>
                              <p className="text-xs text-gray-500">User Intent: {platform.userIntent}</p>
                          </div>
                      ))}
                  </div>
              </div>

              <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-6">
                  <h4 className="font-bold text-emerald-900 mb-2">Why this matters?</h4>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                      A high sentiment score coupled with "High" activity on problem-centric platforms (like Reddit) indicates a <span className="font-bold">Validated Pull Market</span>. People are actively looking for solutions.
                  </p>
              </div>
          </div>

      </div>
    </div>
  );
};
