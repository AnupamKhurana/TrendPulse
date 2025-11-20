
import React from 'react';
import { BusinessIdea, PageView } from '../types';
import { TrendChart } from './TrendChart';
import { 
  ArrowRight, 
  ArrowLeft, 
  Calendar, 
  Share2, 
  Bookmark, 
  Zap, 
  CheckCircle2, 
  Info, 
  Lightbulb,
  MessagesSquare,
  Download,
  Target,
  Flag
} from 'lucide-react';

interface IdeaHeroProps {
  idea: BusinessIdea;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLoading: boolean;
  onNavigate: (page: PageView) => void;
}

export const IdeaHero: React.FC<IdeaHeroProps> = ({ 
    idea, 
    onNext, 
    onPrevious, 
    canGoPrevious, 
    isLoading, 
    onNavigate 
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Nav Bar within Hero */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0 relative">
         {/* Floating Action Bar (Top Left) */}
        <div className="absolute left-0 top-0 hidden md:flex items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-sm font-medium text-gray-600 mr-2">Idea Actions</span>
            <ChevronDownIcon />
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <button 
            onClick={onPrevious}
            disabled={!canGoPrevious || isLoading}
            className="flex items-center hover:text-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Previous
          </button>
          <span className="text-gray-300">|</span>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <span className="text-gray-300">|</span>
          <button 
            onClick={onNext}
            disabled={isLoading}
            className="flex items-center hover:text-emerald-600 transition-colors disabled:opacity-50 font-medium"
          >
            {isLoading ? 'Generating...' : 'Next Idea'} <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="absolute right-0 top-0 hidden md:flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600"><Bookmark className="w-5 h-5" /></button>
            <button className="p-2 text-gray-400 hover:text-gray-600"><Share2 className="w-5 h-5" /></button>
            <button 
                onClick={() => onNavigate('build')}
                className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200"
            >
                <Zap className="w-4 h-4 mr-1 fill-current" /> Build This Idea <ArrowRight className="w-4 h-4 ml-1" />
            </button>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
          {isLoading ? "Analyzing Market Trends..." : idea.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {idea.tags.map((tag, idx) => (
            <span key={idx} className={`
                inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
                ${idx === 0 ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : ''}
                ${idx === 1 ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                ${idx === 2 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
                ${idx > 2 ? 'bg-gray-50 text-gray-600 border-gray-100' : ''}
            `}>
              {idx === 0 && <span className="mr-1">⏱️</span>}
              {idx === 1 && <span className="mr-1">🚀</span>}
              {idx === 2 && <CheckCircle2 className="w-3 h-3 mr-1" />}
              {tag}
            </span>
          ))}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-100">
            +16 More
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Description + Chart) */}
        <div className="lg:col-span-2 space-y-8">
          <div className={`prose prose-emerald text-gray-600 max-w-none transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <p className="font-medium text-lg text-gray-800 leading-relaxed">{idea.oneLiner}</p>
            <p className="leading-relaxed">{idea.description}</p>
            <p className="leading-relaxed">{idea.whyNow}</p>
          </div>

          <TrendChart 
            data={idea.chartData} 
            keyword={idea.keyword} 
            currentVolume={idea.currentVolume}
            growth={idea.growthPercentage}
          />

          {/* Research Tool Banner */}
          <div className="bg-[#064E3B] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between text-white relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center mb-1 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                    Research Tool
                </div>
                <h3 className="font-bold text-lg mb-1">Get a Report Exactly Like This for Your Idea</h3>
                <p className="text-emerald-100 text-sm max-w-md">Have your own business idea? Our AI Research Agent conducts a comprehensive 40-step analysis to validate and research any idea you give it.</p>
             </div>
             <button 
                onClick={() => onNavigate('research')}
                className="mt-4 sm:mt-0 relative z-10 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold flex items-center hover:bg-gray-100 transition-colors"
             >
                <Zap className="w-4 h-4 mr-2" /> Research My Idea <ArrowRight className="w-4 h-4 ml-2" />
             </button>
             {/* Decorative BG */}
             <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-emerald-500/20 to-transparent"></div>
          </div>

          {/* Offer / Details Section */}
          <div className="space-y-6">
             <h3 className="text-2xl font-bold text-gray-900">Offer</h3>
             <div className="space-y-6 relative border-l-2 border-gray-100 ml-3 pl-8 py-2">
                <StepItem number="1" title="Lead Magnet" name="Inventory Savings Calculator" desc="Online tool to calculate savings by preventing inventory loss with AI." type="(Free)" />
                <StepItem number="2" title="Frontend" name="AI Inventory Trial" desc="Full access to the AI Inventory Buddy for one month." type="($49 for 30 days)" />
                <StepItem number="3" title="Core" name="Standard Monthly Subscription" desc="Full access with real-time updates and predictive inventory recommendations." type="($79/month)" />
             </div>
             <button 
                onClick={() => onNavigate('analysis')}
                className="text-emerald-600 font-medium text-sm flex items-center hover:underline"
             >
                View full value ladder <ArrowRight className="w-4 h-4 ml-1" />
             </button>
          </div>

          {/* Why Now / Proof */}
           <div className="space-y-6">
             <h3 className="text-2xl font-bold text-gray-900">Why Now?</h3>
             <p className="text-gray-600">{idea.whyNow}</p>
             <button 
                onClick={() => onNavigate('analysis')}
                className="text-emerald-600 font-medium text-sm flex items-center hover:underline"
             >
                See why this opportunity matters now <ArrowRight className="w-4 h-4 ml-1" />
             </button>
          </div>
          
           <div className="space-y-6">
             <h3 className="text-2xl font-bold text-gray-900">The Market Gap</h3>
             <p className="text-gray-600">{idea.marketGap}</p>
             <button 
                onClick={() => onNavigate('analysis')}
                className="text-emerald-600 font-medium text-sm flex items-center hover:underline"
             >
                Understand the market opportunity <ArrowRight className="w-4 h-4 ml-1" />
             </button>
          </div>

          <div className="flex justify-center pt-6">
             <button 
                onClick={() => onNavigate('analysis')}
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center"
             >
                See full analysis <ArrowRight className="w-5 h-5 ml-2" />
             </button>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Scorecards */}
          <div className="grid grid-cols-2 gap-4">
            <ScoreCard label="Opportunity" score={idea.opportunityScore} color="text-emerald-500" bg="bg-emerald-50" desc="Exceptional" />
            <ScoreCard label="Problem" score={idea.problemSeverity} color="text-red-500" bg="bg-red-50" desc="High Pain" />
            <ScoreCard label="Feasibility" score={idea.feasibilityScore} color="text-blue-500" bg="bg-blue-50" desc="Challenging" />
            <ScoreCard label="Why Now" score={idea.timingScore} color="text-orange-500" bg="bg-orange-50" desc="Perfect Timing" />
          </div>

          {/* Business Fit */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Business Fit</h4>
            <div className="space-y-4">
                {idea.businessFits.map((fit, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                        <div>
                            <div className="flex items-center font-medium text-gray-700 text-sm">
                                {fit.label} <Info className="w-3 h-3 ml-1 text-gray-300" />
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">{fit.subtext}</div>
                        </div>
                        <div className={`font-bold ${fit.color === 'text-blue-500' ? 'text-emerald-500' : fit.color}`}>{fit.value}</div>
                    </div>
                ))}
                <div className="pt-2 text-right">
                    <button 
                        onClick={() => onNavigate('analysis')}
                        className="text-emerald-600 text-xs font-bold flex items-center justify-end w-full"
                    >
                        Find Out <ArrowRight className="w-3 h-3 ml-1" />
                    </button>
                </div>
            </div>
          </div>

          {/* Start Building */}
           <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
             <h4 className="font-bold text-gray-900 mb-1 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-emerald-500 fill-emerald-500" /> Start Building in 1-click
             </h4>
             <p className="text-xs text-gray-500 mb-4">Turn this idea into your business with pre-built prompts</p>
             
             <div className="space-y-2">
                <ActionRow onClick={() => onNavigate('build')} label="Ad Creatives" sub="High-converting ad copy and creative concepts" />
                <ActionRow onClick={() => onNavigate('build')} label="Brand Package" sub="Complete brand identity with logo, colors, and voice" />
                <ActionRow onClick={() => onNavigate('build')} label="Landing Page" sub="Copy + wireframe blocks" />
                <ActionRow onClick={() => onNavigate('build')} label="More prompts..." sub="View all available prompts" />
             </div>

             <div className="mt-4 flex items-center justify-center text-xs text-gray-400 gap-2">
                Works with: 
                <div className="flex space-x-1">
                    <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                    <div className="w-4 h-4 rounded-full bg-emerald-400"></div>
                    <span className="text-[10px]">+more</span>
                </div>
             </div>
           </div>

           {/* Actions List */}
           <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-50">
             <SidebarLink onClick={() => onNavigate('analysis')} icon={<Lightbulb className="w-4 h-4 text-emerald-600" />} title="Idea Actions" sub="Download, analyze & more" />
             <SidebarLink onClick={() => onNavigate('build')} icon={<MessagesSquare className="w-4 h-4 text-emerald-600" />} title="Get Instant Answers" sub="AI Chat with this idea" />
             <SidebarLink onClick={() => onNavigate('analysis')} icon={<Download className="w-4 h-4 text-emerald-600" />} title="Download Data" sub="Export all research & analysis" />
             <SidebarLink onClick={() => onNavigate('analysis')} icon={<Target className="w-4 h-4 text-red-500" />} title="Founder Fit" sub="Is this idea right for you?" />
             <SidebarLink onClick={() => onNavigate('build')} icon={<Flag className="w-4 h-4 text-yellow-500" />} title="Claim Idea" sub="Make this idea yours" />
           </div>

           {/* Categorization */}
           <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
             <h4 className="font-bold text-gray-900 mb-4 text-xs uppercase">Categorization</h4>
             <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div>
                    <div className="text-xs text-gray-500 mb-1">Type</div>
                    <div className="text-sm font-medium text-gray-800">{idea.categories.type}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">Market</div>
                    <div className="text-sm font-medium text-gray-800">{idea.categories.market}</div>
                </div>
                <div>
                    <div className="text-xs text-gray-500 mb-1">Target</div>
                    <div className="text-sm font-medium text-gray-800">{idea.categories.target}</div>
                </div>
                 <div>
                    <div className="text-xs text-gray-500 mb-1">Main Competitor</div>
                    <div className="text-sm font-medium text-gray-800">{idea.categories.competitor}</div>
                </div>
             </div>
             <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500 mb-1">Trend Analysis</div>
                <p className="text-xs text-gray-600 leading-relaxed">
                    The {idea.categories.market} market is projected to grow significantly, and there's an increasing demand for solutions in the {idea.categories.target} space.
                </p>
             </div>
           </div>

           {/* Community Signals */}
           <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
              <h4 className="font-bold text-gray-900 mb-4 text-sm">Community Signals</h4>
              <div className="space-y-4">
                {idea.communitySignals.map((sig, i) => (
                    <div key={i} className="flex justify-between items-center">
                         <div className="flex items-start gap-3">
                             <div className="mt-1 w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-bold text-gray-600">
                                {sig.source[0]}
                             </div>
                             <div>
                                 <div className="font-bold text-sm text-gray-800">{sig.source}</div>
                                 <div className="text-xs text-gray-500">{sig.stats}</div>
                             </div>
                         </div>
                         <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{sig.score}</span>
                    </div>
                ))}
                 <button 
                    onClick={() => onNavigate('analysis')}
                    className="text-emerald-600 font-medium text-xs flex items-center pt-2 hover:underline"
                 >
                    View detailed breakdown <ArrowRight className="w-3 h-3 ml-1" />
                 </button>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

// Helper Components

const ChevronDownIcon = () => (
  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ScoreCard = ({ label, score, color, bg, desc }: { label: string, score: number, color: string, bg: string, desc: string }) => (
    <div className={`rounded-lg p-3 border border-gray-100 ${bg} bg-opacity-40`}>
        <div className="flex justify-between items-start mb-1">
             <span className="text-xs font-bold text-gray-700">{label} <span className="text-gray-300 font-normal">ⓘ</span></span>
             <span className={`text-xl font-bold ${color}`}>{score}</span>
        </div>
        <span className="text-[10px] text-gray-500">{desc}</span>
    </div>
);

const StepItem = ({ number, title, name, desc, type }: any) => (
    <div className="relative">
        <div className="absolute -left-[41px] top-0 bg-emerald-100 text-emerald-600 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs border-2 border-white ring-1 ring-gray-100">
            {number}
        </div>
        <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">{title}</span>
            <div className="font-bold text-gray-900 text-sm">
                {name} <span className="font-normal text-gray-500 text-xs ml-1">{type}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1 leading-snug">{desc}</p>
        </div>
    </div>
);

const ActionRow = ({ label, sub, onClick }: any) => (
    <div 
        onClick={onClick}
        className="group flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer border border-transparent hover:border-gray-100 transition-all"
    >
        <div>
            <div className="text-sm font-medium text-gray-800">{label}</div>
            <div className="text-[10px] text-gray-400">{sub}</div>
        </div>
        <ChevronDownIcon />
    </div>
);

const SidebarLink = ({ icon, title, sub, onClick }: any) => (
    <div 
        onClick={onClick}
        className="p-4 flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
    >
        <div className="mt-0.5 p-1.5 bg-gray-100 rounded-md">
            {icon}
        </div>
        <div>
            <div className="text-sm font-medium text-gray-900">{title}</div>
            <div className="text-xs text-gray-500">{sub}</div>
        </div>
    </div>
);
