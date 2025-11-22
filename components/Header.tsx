import React, { useState, useRef, useEffect } from 'react';
import { Menu, ChevronDown, X, Search, BookMarked, Settings } from 'lucide-react';
import { PageView } from '../types';
import { SettingsModal } from './SettingsModal';

interface HeaderProps {
  onNavigate: (page: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setIsMoreOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick('home')}>
             <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-emerald-200 group-hover:bg-emerald-700 transition-colors">
                {/* VentureFlow Logo: A sharp 'V' forming an upward trend */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19.5L10 7.5L14 15.5L20 4.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 4.5H15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
             <span className="font-bold text-xl text-gray-900 tracking-tight">VentureFlow<span className="text-emerald-600">.ai</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors"
            >
              Find Ideas
            </button>
            <button 
              onClick={() => handleNavClick('build')}
              className="text-gray-600 hover:text-emerald-600 font-medium text-sm transition-colors"
            >
              Build Ideas
            </button>
            <button 
              onClick={() => handleNavClick('pricing')}
              className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors"
            >
              Pricing
            </button>
            
            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className={`flex items-center text-sm font-medium transition-colors ${isMoreOpen ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'}`}
                >
                    More <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isMoreOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                        <button 
                            onClick={() => handleNavClick('research')}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Search className="w-4 h-4 mr-2" /> Research Tool
                        </button>
                        <button 
                            onClick={() => handleNavClick('saved')}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <BookMarked className="w-4 h-4 mr-2" /> Saved Ideas
                        </button>
                        <div className="border-t border-gray-50 my-1"></div>
                        <button 
                            onClick={() => { setIsSettingsOpen(true); setIsMoreOpen(false); }}
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                        >
                            <Settings className="w-4 h-4 mr-2" /> Settings
                        </button>
                    </div>
                )}
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleNavClick('login')}
              className="text-gray-900 hover:text-emerald-700 text-sm font-medium px-3 py-2 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => handleNavClick('signup')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg animate-in fade-in slide-in-from-top-4">
            <div className="px-4 py-4 space-y-3">
                <button onClick={() => handleNavClick('home')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium">
                    Find Ideas
                </button>
                <button onClick={() => handleNavClick('build')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium">
                    Build Ideas
                </button>
                <button onClick={() => handleNavClick('pricing')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium">
                    Pricing
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <button onClick={() => handleNavClick('research')} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm flex items-center">
                    <Search className="w-4 h-4 mr-2" /> Research Tool
                </button>
                <button onClick={() => handleNavClick('saved')} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm flex items-center">
                    <BookMarked className="w-4 h-4 mr-2" /> Saved Ideas
                </button>
                 <button onClick={() => { setIsSettingsOpen(true); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-sm flex items-center">
                    <Settings className="w-4 h-4 mr-2" /> AI Settings
                </button>
                <div className="border-t border-gray-100 my-2"></div>
                <div className="flex gap-2 p-2">
                    <button onClick={() => handleNavClick('login')} className="flex-1 text-center py-2 text-gray-900 font-medium border border-gray-200 rounded-md">Login</button>
                    <button onClick={() => handleNavClick('signup')} className="flex-1 text-center py-2 bg-emerald-600 text-white font-medium rounded-md">Sign Up</button>
                </div>
            </div>
        </div>
      )}
    </header>
    
    {/* Settings Modal */}
    <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};