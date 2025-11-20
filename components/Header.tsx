
import React from 'react';
import { Menu, ChevronDown, Activity } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  onNavigate: (page: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
             <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-emerald-200 group-hover:bg-emerald-700 transition-colors">
                {/* Custom Pulse Icon */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12H5L8 20L13 4L17 14H22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
             </div>
             <span className="font-bold text-xl text-gray-900 tracking-tight">TrendPulse<span className="text-emerald-600">.ai</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            <div 
              onClick={() => onNavigate('home')}
              className="group relative flex items-center text-gray-600 hover:text-emerald-600 cursor-pointer text-sm font-medium transition-colors"
            >
              Find Ideas <ChevronDown className="ml-1 w-4 h-4" />
            </div>
            <div 
              onClick={() => onNavigate('build')}
              className="group relative flex items-center text-gray-600 hover:text-emerald-600 cursor-pointer text-sm font-medium transition-colors"
            >
              Build Ideas <ChevronDown className="ml-1 w-4 h-4" />
            </div>
            <button 
              onClick={() => onNavigate('pricing')}
              className="text-gray-600 hover:text-emerald-600 text-sm font-medium transition-colors"
            >
              Pricing
            </button>
            <div className="group relative flex items-center text-gray-600 hover:text-emerald-600 cursor-pointer text-sm font-medium transition-colors">
              More <ChevronDown className="ml-1 w-4 h-4" />
            </div>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('login')}
              className="text-gray-900 hover:text-emerald-700 text-sm font-medium px-3 py-2 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
