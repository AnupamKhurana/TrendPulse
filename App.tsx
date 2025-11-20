
import React, { useState } from 'react';
import { Header } from './components/Header';
import { IdeaHero } from './components/IdeaHero';
import { Footer } from './components/Footer';
import { GenerationModal } from './components/GenerationModal';
import { PricingPage } from './pages/PricingPage';
import { AuthPage } from './pages/AuthPage';
import { BuildPage } from './pages/BuildPage';
import { AnalysisPage } from './pages/AnalysisPage';
import { ResearchPage } from './pages/ResearchPage';
import { SavedPage } from './pages/SavedPage';
import { SignalsPage } from './pages/SignalsPage';
import { generateNextIdea } from './services/geminiService';
import { BusinessIdea, DEFAULT_IDEA, PageView } from './types';

const App: React.FC = () => {
  const [ideaHistory, setIdeaHistory] = useState<BusinessIdea[]>([DEFAULT_IDEA]);
  const [currentIdeaIndex, setCurrentIdeaIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [savedIdeas, setSavedIdeas] = useState<BusinessIdea[]>([]);
  
  // Generation State
  const [generationStep, setGenerationStep] = useState<string>("");
  const [generationLogs, setGenerationLogs] = useState<string[]>([]);

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
    setGenerationLogs([]);
    setGenerationStep("Initializing...");

    try {
      const newIdea = await generateNextIdea((log) => {
          setGenerationStep(log);
          setGenerationLogs(prev => [...prev, log]);
      });
      
      // Ensure new idea has a unique ID
      const ideaWithId = { ...newIdea, id: Date.now().toString() };
      setIdeaHistory(prev => [...prev, ideaWithId]);
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

  const handleSaveIdea = (idea: BusinessIdea) => {
      if (!savedIdeas.some(saved => saved.title === idea.title)) {
          setSavedIdeas([...savedIdeas, { ...idea, id: Date.now().toString() }]);
      }
  };

  const handleDeleteSaved = (id: string) => {
      setSavedIdeas(savedIdeas.filter(idea => idea.id !== id));
  };

  const handleViewSaved = (idea: BusinessIdea) => {
      setIdeaHistory(prev => [...prev, idea]);
      setCurrentIdeaIndex(ideaHistory.length); // Set to the new last item
      setCurrentPage('home');
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
        case 'saved':
            return <SavedPage savedIdeas={savedIdeas} onDelete={handleDeleteSaved} onView={handleViewSaved} />;
        case 'signals':
            return <SignalsPage idea={currentIdea} />;
        case 'home':
        default:
            return (
                <div className="relative overflow-hidden h-full flex flex-col min-h-[80vh]">
                    {/* Background decorative elements - Green Theme */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-gray-50 to-white -z-10" />
                    <div className="absolute right-0 top-0 w-1/3 h-screen bg-gradient-to-l from-emerald-50/50 to-transparent -z-10" />
                    
                    {/* Hero Headline Section */}
                    <div className="pt-12 pb-2 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
                           Unlock Your <span className="text-emerald-600">Next Big Opportunity</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Analyze live market trends to find profitable startup ideas, 
                            validate them with AI, and build your roadmap in seconds.
                        </p>
                    </div>

                    <IdeaHero 
                      idea={currentIdea} 
                      onNext={handleNextIdea} 
                      onPrevious={handlePreviousIdea}
                      canGoPrevious={currentIdeaIndex > 0}
                      isLoading={isLoading} 
                      onNavigate={handleNavigate}
                      onSave={handleSaveIdea}
                    />
                </div>
            );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans relative">
      <Header onNavigate={handleNavigate} />
      
      {/* Generation Overlay Modal */}
      {isLoading && (
          <GenerationModal currentStep={generationStep} logs={generationLogs} />
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
