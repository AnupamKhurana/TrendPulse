
import React, { useState, useRef, useEffect } from 'react';
import { BusinessIdea, PageView } from '../types';
import { TrendChart } from './TrendChart';
import { jsPDF } from "jspdf";
import { 
  ArrowRight, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Zap, 
  CheckCircle2, 
  Info, 
  Lightbulb,
  MessagesSquare,
  Download,
  Target,
  Flag,
  Copy,
  FileDown,
  ChevronDown,
  BarChart3,
  Layers,
  Rocket,
  Calendar,
  Heart,
  ShieldCheck,
  Clock,
  TrendingUp,
  Map,
  DollarSign,
  Puzzle,
  Bot,
  Loader2,
  Search
} from 'lucide-react';

interface IdeaHeroProps {
  idea: BusinessIdea;
  onNext: () => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  isLoading: boolean;
  onNavigate: (page: PageView) => void;
  onSave?: (idea: BusinessIdea) => void;
}

export const IdeaHero: React.FC<IdeaHeroProps> = ({ 
    idea, 
    onNext, 
    onPrevious, 
    canGoPrevious, 
    isLoading, 
    onNavigate,
    onSave
}) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [activeFitPopup, setActiveFitPopup] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'execution' | 'market'>('overview');
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        // Close Actions Dropdown
        if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
          setIsActionsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showToast = (msg: string) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3000);
  };

  const handleCopy = () => {
      const text = `${idea.title}\n\n${idea.oneLiner}\n\n${idea.description}`;
      navigator.clipboard.writeText(text);
      showToast("Idea copied to clipboard!");
      setIsActionsOpen(false);
  };

  const handleDownload = () => {
      setIsActionsOpen(false);
      showToast("Generating Detailed Report...");

      try {
        // Initialize PDF
        const doc = new jsPDF();
        const margin = 20;
        let y = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const contentWidth = pageWidth - (margin * 2);
        const lineHeight = 6;

        // --- HELPER: Add Section Title ---
        const addSectionTitle = (title: string) => {
            if (y > 270) { doc.addPage(); y = 20; }
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.setTextColor(16, 185, 129); // Emerald 600
            doc.text(title, margin, y);
            y += 10;
            doc.setDrawColor(209, 213, 219); // Gray 300
            doc.line(margin, y - 3, pageWidth - margin, y - 3); // Underline
            y += 5;
        };

        // --- HELPER: Add Body Text ---
        const addBodyText = (text: string, fontSize = 11, color = [31, 41, 55], isBold = false) => {
            doc.setFont("helvetica", isBold ? "bold" : "normal");
            doc.setFontSize(fontSize);
            doc.setTextColor(color[0], color[1], color[2]);
            const lines = doc.splitTextToSize(text, contentWidth);
            if (y + (lines.length * 6) > 280) { doc.addPage(); y = 20; }
            doc.text(lines, margin, y);
            y += (lines.length * 6) + 2;
        };

        // --- HEADER PAGE ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(16, 185, 129); // Emerald 600
        
        const titleLines = doc.splitTextToSize(idea.title, contentWidth);
        doc.text(titleLines, margin, y);
        y += (titleLines.length * 9) + 10;

        // Meta info
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(107, 114, 128); // Gray 500
        doc.text(`Generated on: ${idea.date}`, margin, y);
        doc.text(`Source: TrendPulse.ai Intelligence Report`, margin + 80, y);
        y += 15;

        // Executive Summary
        addSectionTitle("1. Executive Summary");
        addBodyText(idea.oneLiner, 12, [55, 65, 81], true); // Italic/Bold
        y += 5;
        addBodyText(idea.description);
        y += 10;

        // --- STRATEGIC ASSESSMENT ---
        addSectionTitle("2. Strategic Assessment");
        addBodyText("This section evaluates the business concept across four critical dimensions derived from market data. A score of 7+ indicates a strong signal.", 10, [107, 114, 128]);
        y += 5;

        const scores = [
            { label: "Opportunity Score", score: idea.opportunityScore, def: "The combined measure of market size, growth potential, and revenue possibilities relative to competition." },
            { label: "Problem Pain", score: idea.problemSeverity, def: "The intensity of the user's need. Higher scores mean users are actively looking for and willing to pay for a solution." },
            { label: "Feasibility Score", score: idea.feasibilityScore, def: "How achievable the technical build, operations, and go-to-market strategy are with standard startup resources." },
            { label: "Timing Score", score: idea.timingScore, def: "The urgency factor driven by recent market shifts, technology changes, or new regulations that open this window." }
        ];

        scores.forEach(s => {
            if (y > 260) { doc.addPage(); y = 20; }
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(31, 41, 55);
            doc.text(`${s.label}: ${s.score}/10`, margin, y);
            y += 5;
            doc.setFont("helvetica", "italic");
            doc.setFontSize(10);
            doc.setTextColor(107, 114, 128);
            const defLines = doc.splitTextToSize(`Meaning: ${s.def}`, contentWidth);
            doc.text(defLines, margin, y);
            y += (defLines.length * 5) + 8;
        });

        // --- BUSINESS FIT ANALYSIS ---
        if (y > 240) { doc.addPage(); y = 20; }
        addSectionTitle("3. Business Fit Analysis");
        addBodyText("A deep dive into specific attributes that validate this business model.", 10, [107, 114, 128]);
        y += 5;

        idea.businessFits.forEach((fit) => {
             if (y > 260) { doc.addPage(); y = 20; }
             // Label & Value
             doc.setFont("helvetica", "bold");
             doc.setFontSize(12);
             doc.setTextColor(31, 41, 55);
             doc.text(`${fit.label}: ${fit.value}`, margin, y);
             y += 6;
             
             // Subtext
             doc.setFont("helvetica", "normal");
             doc.setFontSize(11);
             doc.text(fit.subtext, margin, y);
             y += 5;

             // Tooltip explanation
             doc.setFont("helvetica", "italic");
             doc.setFontSize(10);
             doc.setTextColor(75, 85, 99); // Gray 600
             const tooltipLines = doc.splitTextToSize(`Analysis: ${fit.tooltip}`, contentWidth - 5);
             doc.text(tooltipLines, margin + 5, y);
             y += (tooltipLines.length * 5) + 8;
        });

        // --- MARKET DYNAMICS ---
        if (y > 200) { doc.addPage(); y = 20; }
        addSectionTitle("4. Market Dynamics");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(31, 41, 55);
        doc.text("Why This Matters Now?", margin, y);
        y += 6;
        addBodyText(idea.whyNow);
        y += 8;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Market Gap Opportunity", margin, y);
        y += 6;
        addBodyText(idea.marketGap);
        y += 8;

        // --- EXECUTION PLAN ---
        if (y > 200) { doc.addPage(); y = 20; }
        addSectionTitle("5. Execution Strategy");
        addBodyText("A step-by-step roadmap generated by our AI to launch and scale this venture.", 10, [107, 114, 128]);
        y += 8;

        const planItems = Array.isArray(idea.executionPlan) ? idea.executionPlan : [idea.executionPlan];
        planItems.forEach((step, i) => {
            if (y > 270) { doc.addPage(); y = 20; }
            const stepText = `${i + 1}. ${step}`;
            addBodyText(stepText);
            y += 2; // Extra spacing between items
        });

        // --- FOOTER ---
        const totalPages = doc.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(156, 163, 175); // Gray 400
            doc.text(`TrendPulse.ai Report - Page ${i} of ${totalPages}`, pageWidth / 2, 290, { align: "center" });
        }

        // Save File
        const safeTitle = idea.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        doc.save(`trendpulse_report_${safeTitle}.pdf`);
        showToast("Detailed Report Downloaded!");

      } catch (error) {
          console.error("PDF Error:", error);
          showToast("Failed to generate PDF.");
      }
  };

  const handleSave = () => {
      if (onSave) {
          onSave(idea);
          showToast("Idea Saved Successfully!");
      }
      setIsActionsOpen(false);
  };

  // Helper to style business fit cards based on type
  const getFitStyle = (label: string) => {
    switch (label) {
      case "Market Need": 
        return { 
            bg: "bg-emerald-50", 
            border: "border-emerald-100", 
            icon: <Target className="w-5 h-5 text-emerald-600" />, 
            headerText: "text-emerald-800",
            barColor: "bg-emerald-500"
        };
      case "Innovation": 
        return { 
            bg: "bg-blue-50", 
            border: "border-blue-100", 
            icon: <Zap className="w-5 h-5 text-blue-600" />, 
            headerText: "text-blue-800",
            barColor: "bg-blue-500"
        };
      case "Regulatory Alignment": 
        return { 
            bg: "bg-slate-50", 
            border: "border-slate-200", 
            icon: <ShieldCheck className="w-5 h-5 text-slate-600" />, 
            headerText: "text-slate-800",
            barColor: "bg-slate-500"
        };
      case "Social Impact": 
        return { 
            bg: "bg-orange-50", 
            border: "border-orange-100", 
            icon: <Heart className="w-5 h-5 text-orange-600" />, 
            headerText: "text-orange-800",
            barColor: "bg-orange-500"
        };
      default: 
        return { 
            bg: "bg-gray-50", 
            border: "border-gray-100", 
            icon: <Info className="w-5 h-5 text-gray-600" />, 
            headerText: "text-gray-800",
            barColor: "bg-gray-500"
        };
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
      {/* Toast Notification */}
      {toast && (
          <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg animate-in slide-in-from-right fade-in duration-300 flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-2" /> {toast}
          </div>
      )}

      {/* Navigation & Controls Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-2 rounded-lg border border-gray-200 shadow-sm gap-4 sm:gap-0">
          <div className="flex items-center justify-between w-full sm:w-auto space-x-2">
              <button 
                onClick={onPrevious}
                disabled={!canGoPrevious || isLoading}
                className="p-2 flex items-center text-gray-500 hover:bg-gray-50 hover:text-emerald-600 rounded-md disabled:opacity-30 transition-colors text-sm font-medium"
                title="Previous Idea"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Prev
              </button>
              
              <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
              
              {/* Date Display */}
              <div className="flex items-center px-3 py-1 bg-gray-50 text-gray-600 rounded border border-gray-100 text-sm font-medium whitespace-nowrap min-w-[120px] justify-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {isLoading ? <Skeleton width="w-20" height="h-4" /> : idea.date}
              </div>

              <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block"></div>
              
              <button 
                onClick={onNext}
                disabled={isLoading}
                className="flex items-center px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:opacity-90 whitespace-nowrap min-w-[160px] justify-center"
              >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...
                    </>
                ) : (
                    <>
                        Generate New Idea <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                )}
              </button>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end" ref={actionsRef}>
             <button onClick={handleSave} disabled={isLoading} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Save"><Bookmark className="w-5 h-5" /></button>
             <div className="relative">
                <button 
                    onClick={() => setIsActionsOpen(!isActionsOpen)}
                    disabled={isLoading}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
                >
                    <Share2 className="w-5 h-5" />
                </button>
                 {isActionsOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20 animate-in fade-in zoom-in-95 duration-200">
                        <button onClick={handleCopy} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
                            <Copy className="w-4 h-4 mr-2" /> Copy Text
                        </button>
                        <button onClick={handleDownload} className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600">
                            <FileDown className="w-4 h-4 mr-2" /> Download PDF
                        </button>
                    </div>
                )}
             </div>
          </div>
      </div>

      {/* MAIN HERO: Split Layout (Context Left, Data Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          {/* Left: Context */}
          <div className="lg:col-span-7 flex flex-col justify-center min-h-[200px]">
              {isLoading ? (
                  <div className="space-y-4 animate-pulse">
                      <div className="flex gap-2 mb-4">
                          <Skeleton width="w-20" height="h-6" rounded="rounded-full" />
                          <Skeleton width="w-24" height="h-6" rounded="rounded-full" />
                          <Skeleton width="w-16" height="h-6" rounded="rounded-full" />
                      </div>
                      <div className="space-y-2">
                          <Skeleton width="w-3/4" height="h-10" />
                          <Skeleton width="w-1/2" height="h-10" />
                      </div>
                      <div className="space-y-2 pt-2">
                          <Skeleton width="w-full" height="h-4" />
                          <Skeleton width="w-full" height="h-4" />
                          <Skeleton width="w-5/6" height="h-4" />
                      </div>
                      <div className="flex gap-3 pt-4">
                          <Skeleton width="w-32" height="h-10" />
                          <Skeleton width="w-32" height="h-10" />
                      </div>
                  </div>
              ) : (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {idea.tags.map((tag, idx) => (
                            <span key={idx} className={`
                                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border
                                ${idx === 0 ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : ''}
                                ${idx === 1 ? 'bg-blue-50 text-blue-700 border-blue-100' : ''}
                                ${idx === 2 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : ''}
                                ${idx > 2 ? 'bg-gray-50 text-gray-600 border-gray-100' : ''}
                            `}>
                            {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {idea.title}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                        {idea.oneLiner}
                    </p>
                    
                    {/* Integrated Buttons */}
                    <div className="flex gap-3">
                        <button 
                                onClick={() => onNavigate('build')}
                                className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm shadow-emerald-200 flex items-center"
                            >
                                <Zap className="w-4 h-4 mr-2" /> Build MVP
                            </button>
                            <button 
                                onClick={() => onNavigate('analysis')}
                                className="bg-white text-gray-700 border border-gray-300 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center"
                            >
                                View Analysis
                            </button>
                    </div>
                  </>
              )}
          </div>

          {/* Right: Data Visualization (Moved UP) */}
          <div className="lg:col-span-5">
             <div className="h-full min-h-[280px] bg-white rounded-xl border border-gray-100 p-1 shadow-sm relative overflow-hidden">
                 {isLoading ? (
                     <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-10">
                         <div className="w-full h-full absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
                         <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                     </div>
                 ) : (
                    <TrendChart 
                        data={idea.chartData} 
                        keyword={idea.keyword} 
                        currentVolume={idea.currentVolume}
                        growth={idea.growthPercentage}
                        volumeNote={idea.volumeNote}
                    />
                 )}
             </div>
          </div>
      </div>

      {/* METRICS STRIP (New Horizontal Layout) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ScoreMetric 
            label="Opportunity" 
            score={idea.opportunityScore} 
            color="text-emerald-600" 
            bg="bg-emerald-50" 
            desc="Market Potential" 
            definition="The combined measure of market size, growth potential, and revenue possibilities relative to competition."
            isLoading={isLoading}
          />
          <ScoreMetric 
            label="Problem Pain" 
            score={idea.problemSeverity} 
            color="text-red-500" 
            bg="bg-red-50" 
            desc="User Urgency" 
            definition="The intensity of the user's need. Higher scores mean users are actively looking for and willing to pay for a solution."
            isLoading={isLoading}
          />
          <ScoreMetric 
            label="Feasibility" 
            score={idea.feasibilityScore} 
            color="text-blue-500" 
            bg="bg-blue-50" 
            desc="Tech Difficulty" 
            definition="How achievable the technical build, operations, and go-to-market strategy are with standard startup resources."
            isLoading={isLoading}
          />
          <ScoreMetric 
            label="Why Now" 
            score={idea.timingScore} 
            color="text-orange-500" 
            bg="bg-orange-50" 
            desc="Market Timing" 
            definition="The urgency factor driven by recent market shifts, technology changes, or new regulations that open this window."
            isLoading={isLoading}
          />
      </div>

      {/* CONTENT & TOOLS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Deep Dive Analysis */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Tabbed Content Container */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm min-h-[400px]">
                <div className="flex border-b border-gray-100">
                    <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<Info className="w-4 h-4 mr-2"/>} label="Overview" disabled={isLoading} />
                    <TabButton active={activeTab === 'execution'} onClick={() => setActiveTab('execution')} icon={<Rocket className="w-4 h-4 mr-2"/>} label="Strategy" disabled={isLoading} />
                    <TabButton active={activeTab === 'market'} onClick={() => setActiveTab('market')} icon={<BarChart3 className="w-4 h-4 mr-2"/>} label="Business Fit" disabled={isLoading} />
                </div>
                
                <div className="p-6">
                    {isLoading ? (
                        <div className="space-y-6">
                             <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 animate-pulse">
                                <div className="flex items-center mb-3">
                                    <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton width="w-full" height="h-4" />
                                    <Skeleton width="w-full" height="h-4" />
                                    <Skeleton width="w-3/4" height="h-4" />
                                </div>
                            </div>
                             <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 animate-pulse">
                                <div className="flex items-center mb-3">
                                    <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                                    <div className="h-4 bg-gray-300 rounded w-40"></div>
                                </div>
                                <div className="space-y-2">
                                    <Skeleton width="w-full" height="h-4" />
                                    <Skeleton width="w-full" height="h-4" />
                                    <Skeleton width="w-5/6" height="h-4" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {activeTab === 'overview' && (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    {/* Concept Card */}
                                    <div className="bg-emerald-50/40 rounded-xl p-5 border border-emerald-100">
                                        <h3 className="text-emerald-900 font-bold text-sm uppercase tracking-wide mb-3 flex items-center">
                                            <Lightbulb className="w-4 h-4 mr-2" /> The Concept
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">{idea.description}</p>
                                    </div>
                                    
                                    {/* Timing/Why Now Card */}
                                    <div className="bg-blue-50/40 rounded-xl p-5 border border-blue-100">
                                        <h3 className="text-blue-900 font-bold text-sm uppercase tracking-wide mb-3 flex items-center">
                                            <TrendingUp className="w-4 h-4 mr-2" /> Why This Matters Now?
                                        </h3>
                                        <p className="text-gray-700 leading-relaxed">{idea.whyNow}</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'execution' && (
                                <div className="animate-in fade-in duration-300 space-y-6">
                                    {/* Execution Roadmap */}
                                    <div className="border-l-4 border-purple-500 bg-purple-50/20 pl-5 py-4 rounded-r-lg">
                                        <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center">
                                            <Map className="w-5 h-5 mr-2 text-purple-600" /> Execution Plan
                                        </h3>
                                        <ul className="space-y-3">
                                            {Array.isArray(idea.executionPlan) ? idea.executionPlan.map((step, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-600 font-bold text-xs flex items-center justify-center mr-3 mt-0.5 border border-purple-200">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                                                </li>
                                            )) : (
                                                <li className="text-gray-700 text-sm leading-relaxed">{idea.executionPlan}</li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Market Gap */}
                                    <div className="border-l-4 border-rose-500 bg-rose-50/20 pl-5 py-3 rounded-r-lg">
                                        <h3 className="text-gray-900 font-bold text-lg mb-2 flex items-center">
                                            <Puzzle className="w-5 h-5 mr-2 text-rose-600" /> Market Gap
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">{idea.marketGap}</p>
                                    </div>
                                    
                                    {/* Monetization Grid */}
                                    <div className="pt-2">
                                        <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wide mb-4 flex items-center">
                                            <DollarSign className="w-4 h-4 mr-2 text-emerald-600" /> Monetization Potential
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <PriceCard 
                                                title="Lead Magnet" 
                                                price="Free" 
                                                desc="Calculators & Tools" 
                                                color="bg-gray-50 border-gray-200" 
                                                definition="Free value provided upfront (like tools or content) to capture user emails and build trust before selling."
                                            />
                                            <PriceCard 
                                                title="Entry Tier" 
                                                price="$49/mo" 
                                                desc="Core AI Features" 
                                                color="bg-emerald-50 border-emerald-200 text-emerald-900" 
                                                definition="The initial paid offering designed to convert free users into paying customers by providing core problem-solving value."
                                            />
                                            <PriceCard 
                                                title="Scale Tier" 
                                                price="$99/mo" 
                                                desc="Advanced Analytics" 
                                                color="bg-blue-50 border-blue-200" 
                                                definition="Premium offering for growing customers needing advanced features, higher usage limits, or priority support."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'market' && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {idea.businessFits.map((fit, idx) => {
                                            const style = getFitStyle(fit.label);
                                            const isOpen = activeFitPopup === idx;
                                            
                                            return (
                                                <div key={idx} className={`${style.bg} rounded-xl p-5 border ${style.border} relative transition-all hover:shadow-md`}>
                                                    {/* Updated Layout: Grouped Title and Info Icon */}
                                                    <div className="flex items-center mb-3">
                                                        <div className="p-2 bg-white rounded-lg shadow-sm mr-3 border border-gray-100/50">
                                                            {style.icon}
                                                        </div>
                                                        <span className={`font-bold text-sm ${style.headerText}`}>
                                                            {fit.label}
                                                        </span>
                                                        
                                                        {/* Info Trigger - Next to Title (Hover) */}
                                                        <div 
                                                            className="relative ml-2"
                                                            onMouseEnter={() => setActiveFitPopup(idx)}
                                                            onMouseLeave={() => setActiveFitPopup(null)}
                                                        >
                                                            <div className={`p-1 rounded-full cursor-help transition-colors ${
                                                                isOpen 
                                                                ? 'bg-emerald-100 text-emerald-600' 
                                                                : 'text-gray-400 hover:text-emerald-600 hover:bg-white/80'
                                                            }`}>
                                                                <Info className="w-3.5 h-3.5" />
                                                            </div>

                                                            {/* Chat-style Popup */}
                                                            {isOpen && (
                                                                <div className="absolute bottom-full left-0 mb-2 w-64 bg-white text-gray-800 rounded-xl rounded-bl-sm p-4 z-50 shadow-xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200 origin-bottom-left">
                                                                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                                                        {fit.tooltip}
                                                                    </p>
                                                                    {/* Arrow Tail */}
                                                                    <div className="absolute -bottom-2 left-2 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45 shadow-[2px_2px_2px_-1px_rgba(0,0,0,0.05)]"></div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="mb-2">
                                                        <span className="text-2xl font-bold text-gray-900">{fit.value}</span>
                                                    </div>
                                                    
                                                    <p className="text-xs text-gray-600 leading-relaxed">{fit.subtext}</p>
                                                    
                                                    {/* Visual Indicator Bar */}
                                                    <div className="w-full h-1.5 bg-gray-200/50 rounded-full mt-4 overflow-hidden">
                                                        <div className={`h-full ${style.barColor} w-3/4 rounded-full opacity-80`}></div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Community Signals Row */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h4 className="font-bold text-gray-900 flex items-center">
                        <MessagesSquare className="w-4 h-4 mr-2 text-emerald-500" /> Community Signals
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                        {isLoading ? 'Listening to social channels...' : `Validated interest from ${idea.communitySignals.length} major platforms.`}
                    </p>
                </div>
                <div className="flex gap-3">
                    {isLoading ? (
                        <>
                            <Skeleton width="w-20" height="h-6" rounded="rounded-lg" />
                            <Skeleton width="w-20" height="h-6" rounded="rounded-lg" />
                        </>
                    ) : (
                        <>
                            {idea.communitySignals.map((sig, i) => (
                                <div key={i} className="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 text-xs font-medium text-gray-600 flex items-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                                    {sig.source}
                                </div>
                            ))}
                            <button 
                                onClick={() => onNavigate('signals')}
                                className="text-emerald-600 text-xs font-bold hover:underline px-2"
                            >
                                View Report →
                            </button>
                        </>
                    )}
                </div>
            </div>

        </div>

        {/* Right Column: Action Console */}
        <div className="space-y-6">
            
            {/* Research Banner */}
            <div className="bg-[#064E3B] rounded-xl p-5 text-white relative overflow-hidden shadow-lg group cursor-pointer" onClick={() => onNavigate('research')}>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">Have your own startup concept?</h3>
                        <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <p className="text-emerald-100 text-xs leading-relaxed mb-3">
                        Use our AI Research Agent to validate your own business ideas against live market competitors and data.
                    </p>
                    <span className="text-[10px] font-bold bg-emerald-500/30 px-2 py-1 rounded text-emerald-100 border border-emerald-500/50">
                        Validate My Idea
                    </span>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500 rounded-full opacity-20 blur-xl group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            {/* Toolkit */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                    <h4 className="font-bold text-gray-900 text-sm flex items-center">
                        <Layers className="w-4 h-4 mr-2 text-gray-500" /> Founder Toolkit
                    </h4>
                </div>
                <div className="divide-y divide-gray-100">
                    <ToolRow onClick={() => onNavigate('build')} icon={<Target className="w-4 h-4 text-purple-500" />} label="Generate Landing Page" disabled={isLoading} />
                    <ToolRow onClick={() => onNavigate('build')} icon={<Flag className="w-4 h-4 text-orange-500" />} label="Create Brand Identity" disabled={isLoading} />
                    <ToolRow onClick={() => onNavigate('build')} icon={<Share2 className="w-4 h-4 text-blue-500" />} label="Draft Ad Creatives" disabled={isLoading} />
                </div>
            </div>

            {/* Categorization Tags */}
             <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                 <h4 className="font-bold text-gray-900 text-xs uppercase mb-3">Market Context</h4>
                 {isLoading ? (
                     <div className="flex flex-wrap gap-2">
                         <Skeleton width="w-16" height="h-6" />
                         <Skeleton width="w-20" height="h-6" />
                         <Skeleton width="w-12" height="h-6" />
                     </div>
                 ) : (
                     <>
                        <div className="flex flex-wrap gap-2">
                            <Tag label={idea.categories.market} />
                            <Tag label={idea.categories.type} />
                            <Tag label={idea.categories.target} />
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50">
                            <div className="text-xs text-gray-400 mb-1">Main Competitor</div>
                            <div className="text-sm font-medium text-gray-800">{idea.categories.competitor}</div>
                        </div>
                     </>
                 )}
             </div>

        </div>
      </div>
    </section>
  );
};

// Helper Components

const Skeleton = ({ width = "w-full", height = "h-4", rounded = "rounded" }: { width?: string, height?: string, rounded?: string }) => (
    <div className={`${width} ${height} ${rounded} bg-gray-200 animate-pulse`}></div>
);

const ScoreMetric = ({ label, score, color, bg, desc, definition, isLoading }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    if (isLoading) {
        return (
            <div className="rounded-xl p-4 border border-gray-100 bg-white shadow-sm flex flex-col justify-between h-full">
                <div className="text-xs font-bold text-gray-300 uppercase tracking-wide mb-2">{label}</div>
                <div className="flex items-end justify-between">
                    <div className="w-10 h-10 rounded-full border-4 border-gray-100 border-t-emerald-500 animate-spin"></div>
                </div>
            </div>
        )
    }

    return (
        <div className={`rounded-xl p-4 border border-gray-100 bg-white shadow-sm flex flex-col justify-between h-full relative`}>
            <div className="flex items-center mb-1">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mr-2">{label}</div>
                <div 
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="text-gray-300 hover:text-emerald-600 cursor-help transition-colors">
                        <Info className="w-3 h-3" />
                    </div>
                    
                    {/* Popup */}
                    {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white text-gray-800 rounded-xl p-3 z-50 shadow-xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
                            <p className="text-[11px] text-gray-600 leading-snug font-medium text-center">
                                {definition}
                            </p>
                            {/* Arrow Tail */}
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex items-end justify-between">
                 <span className={`text-3xl font-bold ${color} leading-none`}>{score}</span>
                 <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${bg} ${color.replace('text', 'text-opacity-80')}`}>{desc}</span>
            </div>
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label, disabled }: any) => (
    <button 
        onClick={onClick}
        disabled={disabled}
        className={`flex-1 py-4 text-sm font-medium flex items-center justify-center border-b-2 transition-colors ${
            active ? 'border-emerald-600 text-emerald-600 bg-emerald-50/30' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'
        }`}
    >
        {icon} {label}
    </button>
);

const PriceCard = ({ title, price, desc, color = "bg-gray-50 border-gray-100", definition }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={`border rounded-lg p-3 text-center ${color} relative`}>
            <div className="flex justify-center items-center mb-1 gap-1">
                <div className="text-xs font-bold text-gray-500 uppercase">{title}</div>
                 <div 
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="text-gray-400 hover:text-emerald-600 cursor-help transition-colors">
                        <Info className="w-3 h-3" />
                    </div>
                    
                    {/* Popup */}
                    {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-white text-gray-800 rounded-xl p-3 z-50 shadow-xl border border-gray-200 animate-in fade-in zoom-in-95 duration-200 text-left">
                            <p className="text-[10px] text-gray-600 leading-snug font-medium">
                                {definition}
                            </p>
                            {/* Arrow Tail */}
                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="font-bold text-gray-900 text-lg">{price}</div>
            <div className="text-[10px] text-gray-400">{desc}</div>
        </div>
    );
};

const ToolRow = ({ onClick, icon, label, disabled }: any) => (
    <button onClick={onClick} disabled={disabled} className="w-full flex items-center p-3 hover:bg-gray-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed">
        <div className="mr-3 p-1.5 bg-gray-50 rounded-md border border-gray-100">
            {icon}
        </div>
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <ChevronDown className="w-4 h-4 ml-auto text-gray-300 -rotate-90" />
    </button>
);

const Tag = ({ label }: { label: string }) => (
    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded border border-gray-200 uppercase tracking-wide">
        {label}
    </span>
);
