
import React, { useState } from 'react';
import { Header } from './components/Header';
import { IdeaHero } from './components/IdeaHero';
import { Footer } from './components/Footer';
import { PricingPage } from './pages/PricingPage';
import { AuthPage } from './pages/AuthPage';
import { BuildPage } from './pages/BuildPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ResearchPage } from './pages/ResearchPage';
import { generateNextIdea } from './services/geminiService';
import { BusinessIdea, DEFAULT_IDEA, PageView } from './types';

const App: React.FC = () => {
  const [ideaHistory, setIdeaHistory] = useState<BusinessIdea[]>([DEFAULT_IDEA]);
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  const currentIdea = ideaHistory[currentIdeaIndex];

  // Navigation Handler
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Function to handle generation of a new idea
  const handleNextIdea = async () => {
    // If we are just moving forward in history
    if (currentIdeaIndex < ideaHistory.length - 1) {
        setCurrentIdeaIndex(currentIdeaIndex + 1);
        return;
    }

    // Otherwise generate new
    setIsLoading(true);
    try {
      const newIdea = await generateNextIdea();
      setIdeaHistory(prev => [...prev, newIdea]);
      setCurrentIdeaIndex(prev => prev + 1);
    } catch (error) {
      console.error("Failed to fetch new data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousIdea = () => {
    if (currentIdeaIndex > 0) {
        setCurrentIdeaIndex(currentIdeaIndex - 1);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
        case 'pricing':
            return <PricingPage />;
        case 'login':
            return <AuthPage mode="login" />;
        case 'signup':
            return <AuthPage mode="signup" />;
        case 'build':
            return <BuildPage idea={currentIdea} />;
        case 'analysis':
            return <AnalysisPage idea={currentIdea} />;
        case 'research':
            return <ResearchPage />;
        case 'home':
        default:
            return (
                <div className="relative overflow-hidden h-full flex flex-col justify-center min-h-[80vh]">
                    {/* Background decorative elements - Green Theme */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50/40 to-transparent -z-10" />
                    <div className="absolute -left-20 top-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                    <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-32 left-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

                    <div className="pt-12 pb-4 text-center px-4">
                        <div className="inline-flex items-center bg-white border border-emerald-100 rounded-full px-4 py-1 shadow-sm mb-6">
                            <span className="text-xs font-medium text-emerald-700 uppercase tracking-wide">
                                🚀 The #1 AI Engine for Market Trends
                            </span>
                            <div className="ml-3 w-8 h-4 bg-black rounded-full relative cursor-pointer group">
                                <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full transition-transform group-hover:-translate-x-3"></div>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
                           Unlock Your Next <span className="text-emerald-600">Big Opportunity</span>
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Spot rising trends before they peak. Generate validated startup ideas backed by real-time data.
                        </p>
                    </div>
                    
                    <IdeaHero 
                      idea={currentIdea} 
                      onNext={handleNextIdea} 
                      onPrevious={handlePreviousIdea}
                      canGoPrevious={currentIdeaIndex > 0}
                      isLoading={isLoading} 
                      onNavigate={handleNavigate}
                    />
                </div>
            );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
