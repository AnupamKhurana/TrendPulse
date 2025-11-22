
import React, { useState } from 'react';
import { BusinessIdea, BrandIdentity, LandingPageContent, MVPSpecs, AdCreativesResult } from '../types';
import { Loader2, Hammer, PenTool, Layout, ArrowRight, CheckCircle2, Copy, Megaphone, Image as ImageIcon, Hash, AlertTriangle, RefreshCcw } from 'lucide-react';
import { generateBrandIdentity, generateLandingPage, generateMVPSpecs, generateAdCreatives } from '../services/geminiService';

interface BuildPageProps {
  idea: BusinessIdea;
}

type ToolType = 'brand' | 'landing' | 'mvp' | 'ads' | null;

export const BuildPage: React.FC<BuildPageProps> = ({ idea }) => {
  // Initialize state from the idea prop if available
  const [activeTool, setActiveTool] = useState<ToolType>(idea.brandIdentity ? 'brand' : null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Results State - Initialize from idea prop
  const [brandData, setBrandData] = useState<BrandIdentity | null>(idea.brandIdentity || null);
  const [landingData, setLandingData] = useState<LandingPageContent | null>(idea.landingPage || null);
  const [mvpData, setMvpData] = useState<MVPSpecs | null>(idea.mvpSpecs || null);
  const [adData, setAdData] = useState<AdCreativesResult | null>(idea.adCreatives || null);

  const handleToolClick = async (tool: ToolType) => {
    // Allow retry if previously failed (error exists) or data is missing
    const hasData = (tool === 'brand' && brandData) || 
                    (tool === 'landing' && landingData) || 
                    (tool === 'mvp' && mvpData) || 
                    (tool === 'ads' && adData);
                    
    if (activeTool === tool && hasData) return; 

    setActiveTool(tool);
    setError(null);
    
    // Check if data already exists to avoid re-fetching
    if (tool === 'brand' && brandData) return;
    if (tool === 'landing' && landingData) return;
    if (tool === 'mvp' && mvpData) return;
    if (tool === 'ads' && adData) return;

    setIsLoading(true);
    try {
      if (tool === 'brand') {
        const res = await generateBrandIdentity(idea);
        if (res) setBrandData(res);
        else throw new Error("Failed to generate brand identity");
      } else if (tool === 'landing') {
        const res = await generateLandingPage(idea);
        if (res) setLandingData(res);
        else throw new Error("Failed to generate landing page");
      } else if (tool === 'mvp') {
        const res = await generateMVPSpecs(idea);
        if (res) setMvpData(res);
        else throw new Error("Failed to generate MVP specs");
      } else if (tool === 'ads') {
        const res = await generateAdCreatives(idea);
        if (res) setAdData(res);
        else throw new Error("Failed to generate ad creatives");
      }
    } catch (error) {
      console.error("Generation failed", error);
      setError("Generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: Add a toast here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[80vh]">
      <div className="bg-emerald-900 rounded-2xl p-12 text-white mb-12 relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">Builder Studio</h1>
            <p className="text-emerald-200 max-w-2xl text-lg">
                Turn <span className="text-white font-bold underline decoration-emerald-400 underline-offset-4">{idea.title}</span> into reality. Select a tool below to generate assets instantly.
            </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald-600 to-transparent opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
      </div>

      {/* Tool Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        <ToolCard 
            icon={<PenTool className="w-6 h-6" />}
            title="Brand Identity"
            desc="Generate name, logo concepts, and colors."
            color="blue"
            isActive={activeTool === 'brand'}
            onClick={() => handleToolClick('brand')}
            hasData={!!brandData}
        />

        <ToolCard 
            icon={<Layout className="w-6 h-6" />}
            title="Landing Page"
            desc="Create headlines, benefits, and copy."
            color="purple"
            isActive={activeTool === 'landing'}
            onClick={() => handleToolClick('landing')}
            hasData={!!landingData}
        />

        <ToolCard 
            icon={<Hammer className="w-6 h-6" />}
            title="MVP Specs"
            desc="Outline features and tech stack."
            color="orange"
            isActive={activeTool === 'mvp'}
            onClick={() => handleToolClick('mvp')}
            hasData={!!mvpData}
        />

        <ToolCard 
            icon={<Megaphone className="w-6 h-6" />}
            title="Ad Creatives"
            desc="Ads for FB, LinkedIn & Google."
            color="red"
            isActive={activeTool === 'ads'}
            onClick={() => handleToolClick('ads')}
            hasData={!!adData}
        />
      </div>

      {/* Dynamic Workspace Area */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[400px] relative overflow-hidden transition-all">
          
          {!activeTool && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Layout className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a tool to start building</h3>
                  <p className="max-w-md">Your workspace is ready. Click on a card above to generate tailored assets for your startup idea.</p>
              </div>
          )}

          {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 z-50 backdrop-blur-sm">
                  <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mb-4" />
                  <p className="text-emerald-800 font-medium animate-pulse">AI Agent is working on your request...</p>
              </div>
          )}

          {error && activeTool && !isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-40 p-8 text-center">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Generation Failed</h3>
                  <p className="text-gray-500 max-w-md mb-6">{error}</p>
                  <button 
                    onClick={() => handleToolClick(activeTool)}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                      <RefreshCcw className="w-4 h-4 mr-2" /> Try Again
                  </button>
              </div>
          )}

          {/* Brand Identity View */}
          {activeTool === 'brand' && brandData && (
              <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{brandData.name}</h2>
                        <p className="text-gray-500 italic">{brandData.tagline}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">Brand Identity</span>
                  </div>
                  
                  {/* Logo Concept Section */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col md:flex-row items-center gap-6">
                        <div 
                            className="w-24 h-24 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: 'white' }}
                        >
                            {/* Placeholder Logo using Initials */}
                            <span className="text-4xl font-extrabold" style={{ color: brandData.colors[0]?.hex || '#000' }}>
                                {brandData.name.substring(0, 2).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Logo Concept</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{brandData.logoConcept}</p>
                        </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div>
                          <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Color Palette</h3>
                          <div className="space-y-3">
                              {brandData.colors.map((c, i) => (
                                  <div key={i} className="flex items-center group cursor-pointer" onClick={() => copyToClipboard(c.hex)}>
                                      <div className="w-12 h-12 rounded-lg shadow-sm mr-4 border border-gray-100" style={{ backgroundColor: c.hex }}></div>
                                      <div>
                                          <div className="font-medium text-gray-900">{c.name}</div>
                                          <div className="text-xs text-gray-500 font-mono group-hover:text-blue-600 transition-colors">{c.hex} <Copy className="w-3 h-3 inline ml-1 opacity-0 group-hover:opacity-100" /></div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div className="space-y-6">
                          <div>
                              <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Typography</h3>
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                  <div className="mb-2">
                                      <span className="text-xs text-gray-400 uppercase">Primary</span>
                                      <div className="font-bold text-lg text-gray-800">{brandData.fontPairing.primary}</div>
                                  </div>
                                  <div>
                                      <span className="text-xs text-gray-400 uppercase">Secondary</span>
                                      <div className="font-medium text-gray-600">{brandData.fontPairing.secondary}</div>
                                  </div>
                              </div>
                          </div>
                          <div>
                              <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Brand Voice</h3>
                              <p className="text-sm text-gray-600 leading-relaxed">{brandData.voice}</p>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* Landing Page View */}
          {activeTool === 'landing' && landingData && (
              <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                      <h2 className="text-2xl font-bold text-gray-900">Landing Page Content</h2>
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wide">Copywriting</span>
                  </div>

                  <div className="space-y-8">
                      {/* Hero Section Preview */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
                          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{landingData.headline}</h1>
                          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{landingData.subheadline}</p>
                          <button className="bg-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-emerald-700 transition-colors">{landingData.cta}</button>
                      </div>

                      <div>
                          <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Key Benefits</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {landingData.benefits.map((b, i) => (
                                  <div key={i} className="p-4 border border-gray-100 rounded-lg hover:border-purple-200 transition-colors">
                                      <CheckCircle2 className="w-5 h-5 text-purple-600 mb-2" />
                                      <h4 className="font-bold text-gray-900 mb-1">{b.title}</h4>
                                      <p className="text-sm text-gray-600">{b.desc}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* MVP Specs View */}
          {activeTool === 'mvp' && mvpData && (
              <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                      <h2 className="text-2xl font-bold text-gray-900">MVP Specifications</h2>
                      <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase tracking-wide">Product Mgmt</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                          <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Core Features (V1)</h3>
                          <ul className="space-y-3">
                              {mvpData.coreFeatures.map((feature, i) => (
                                  <li key={i} className="flex items-start text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                      <span className="font-bold text-orange-500 mr-3">{i+1}.</span>
                                      {feature}
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div className="space-y-8">
                          <div>
                              <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">Tech Stack Recommendation</h3>
                              <div className="flex flex-wrap gap-2">
                                  {mvpData.techStack.map((tech, i) => (
                                      <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-600 shadow-sm">
                                          {tech}
                                      </span>
                                  ))}
                              </div>
                          </div>
                          <div>
                              <h3 className="text-sm font-bold text-gray-900 uppercase mb-4">User Stories</h3>
                              <div className="space-y-3">
                                  {mvpData.userStories.map((story, i) => (
                                      <div key={i} className="text-sm text-gray-600 italic pl-4 border-l-2 border-orange-200">
                                          "{story}"
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* Ad Creatives View */}
          {activeTool === 'ads' && adData && (
              <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                      <h2 className="text-2xl font-bold text-gray-900">Ad Creatives</h2>
                      <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold uppercase tracking-wide">Marketing</span>
                  </div>

                  <div className="mb-8">
                     <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200">
                        <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">Campaign Strategy</h3>
                        <p className="text-sm text-gray-700">{adData.strategy}</p>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {adData.targetAudience.map((tag, i) => (
                            <div key={i} className="flex items-center text-xs font-medium text-gray-600 bg-white border border-gray-200 px-2 py-1 rounded-md">
                                <Hash className="w-3 h-3 mr-1 text-gray-400" /> {tag}
                            </div>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {adData.variants.map((variant, i) => (
                          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden flex flex-col bg-white hover:border-red-200 transition-colors">
                              <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                                  <span className="text-xs font-bold text-gray-600 uppercase">{variant.platform}</span>
                                  <Megaphone className="w-3 h-3 text-gray-400" />
                              </div>
                              <div className="p-4 flex-grow space-y-4">
                                  <div>
                                      <span className="text-[10px] uppercase text-gray-400 font-bold">Headline</span>
                                      <p className="font-bold text-gray-900 text-sm leading-tight">{variant.headline}</p>
                                  </div>
                                  <div>
                                      <span className="text-[10px] uppercase text-gray-400 font-bold">Primary Text</span>
                                      <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{variant.primaryText}</p>
                                  </div>
                                  <div className="bg-gray-50 p-2 rounded border border-gray-100">
                                     <span className="text-[10px] uppercase text-gray-400 font-bold flex items-center mb-1"><ImageIcon className="w-3 h-3 mr-1" /> Visual Concept</span>
                                     <p className="text-[10px] text-gray-500 italic leading-snug">{variant.visualPrompt}</p>
                                  </div>
                              </div>
                              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-center">
                                  <span className="text-xs font-bold text-emerald-600 uppercase border border-emerald-200 px-2 py-1 rounded bg-emerald-50">{variant.cta}</span>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
          )}

      </div>
    </div>
  );
};

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    color: 'blue' | 'purple' | 'orange' | 'red';
    isActive: boolean;
    onClick: () => void;
    hasData: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, desc, color, isActive, onClick, hasData }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
        purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
        orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
        red: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white'
    };
    
    const borderClass = isActive 
        ? (color === 'blue' ? 'border-blue-500 ring-1 ring-blue-500' : 
           color === 'purple' ? 'border-purple-500 ring-1 ring-purple-500' : 
           color === 'orange' ? 'border-orange-500 ring-1 ring-orange-500' : 
           'border-red-500 ring-1 ring-red-500')
        : 'border-gray-200 hover:border-gray-300';

    return (
        <div 
            onClick={onClick}
            className={`bg-white border rounded-xl p-6 cursor-pointer group transition-all shadow-sm hover:shadow-md relative ${borderClass}`}
        >
            {hasData && (
                <div className="absolute top-4 right-4 text-emerald-500">
                    <CheckCircle2 className="w-5 h-5" />
                </div>
            )}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${colorClasses[color]}`}>
                {icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 mb-4">{desc}</p>
            <button className={`font-medium text-sm flex items-center transition-colors ${isActive ? 'text-gray-900' : `text-${color}-600`}`}>
                {hasData ? 'View Assets' : 'Start Generating'} <ArrowRight className="w-4 h-4 ml-1" />
            </button>
        </div>
    );
};
