
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
                             <div className="w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center mr-2">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2 12H5L8 20L13 4L17 14H22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                             </div>
                             <span className="font-bold text-gray-900">TrendPulse.ai</span>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed">
                            Get ideas for profitable startups, trending keywords, and go-to-market tactics, powered by data.
                          </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Browse Ideas</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('home')}>Idea of the Day</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Tools</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('home')}>Idea Generator</li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('research')}>Research Your Ideas</li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('build')}>Idea Builder</li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('build')}>Chat & Strategize</li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('analysis')}>Founder Fit</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Platform Tour</li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Features</li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Tools Library</li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => onNavigate('pricing')}>Pricing</li>
                            <li className="hover:text-emerald-600 cursor-pointer transition-colors">FAQ</li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
                    <div>© 2025 TrendPulse. All rights reserved.</div>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-600">Terms and Conditions</a>
                        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-600">Data Protection</a>
                        <a href="#" className="hover:text-gray-600">Disclaimer</a>
                    </div>
                </div>
                 <div className="mt-4 text-[10px] text-gray-300 text-center md:text-left">
                    TrendPulse shares research and education, not promises or advice. Revenue estimates, scores, and examples are illustrative only; your results will vary. Always do your own due diligence.
                </div>
            </div>
        </footer>
    );
};
