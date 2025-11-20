
import React from 'react';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                         <div className="flex items-center cursor-pointer mb-4" onClick={() => onNavigate('home')}>
                             <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center mr-2 shadow-sm">
                                {/* Pulse Icon */}
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2 12H5L8 20L13 4L17 14H22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                             </div>
                             <span className="font-bold text-gray-900 tracking-tight">TrendPulse.ai</span>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed mb-4">
                            The AI-powered co-founder for your next big opportunity. Analyze trends, validate ideas, and build MVPs in minutes.
                          </p>
                    </div>

                    {/* Platform Column */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
                        <ul className="space-y-3 text-gray-500 text-xs font-medium">
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center" onClick={() => onNavigate('home')}>
                                Find Ideas
                            </li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('saved')}>
                                Saved Opportunities
                            </li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('pricing')}>
                                Pricing Plans
                            </li>
                        </ul>
                    </div>

                    {/* Tools Column */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">AI Tools</h4>
                        <ul className="space-y-3 text-gray-500 text-xs font-medium">
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('research')}>
                                Market Researcher
                            </li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('build')}>
                                Builder Studio
                            </li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('analysis')}>
                                Deep Dive Analysis
                            </li>
                        </ul>
                    </div>

                     {/* Account Column */}
                     <div>
                        <h4 className="font-bold text-gray-900 mb-4">Account</h4>
                        <ul className="space-y-3 text-gray-500 text-xs font-medium">
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('login')}>
                                Log In
                            </li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('signup')}>
                                Create Account
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
                    <div>© 2025 TrendPulse. All rights reserved.</div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
                        <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-gray-600 cursor-pointer">Data Usage</span>
                    </div>
                </div>
                 <div className="mt-4 text-[10px] text-gray-300 text-center md:text-left leading-snug max-w-3xl">
                    TrendPulse shares research and estimates for educational purposes only. AI-generated content may contain inaccuracies. 
                    Revenue estimates, scores, and examples are illustrative. Always conduct your own due diligence before investing.
                </div>
            </div>
        </footer>
    );
};
