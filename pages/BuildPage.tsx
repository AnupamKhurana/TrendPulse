
import React from 'react';
import { BusinessIdea } from '../types';
import { Loader2, Hammer, PenTool, Layout } from 'lucide-react';

interface BuildPageProps {
  idea: BusinessIdea;
}

export const BuildPage: React.FC<BuildPageProps> = ({ idea }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-emerald-900 rounded-2xl p-12 text-white mb-12 relative overflow-hidden">
        <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4">Builder Studio</h1>
            <p className="text-emerald-200 max-w-2xl">
                You are building: <span className="text-white font-semibold">{idea.title}</span>
            </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-emerald-600 to-transparent opacity-30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <PenTool className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Generate Brand Identity</h3>
            <p className="text-sm text-gray-500 mb-4">Create logos, color palettes, and brand voice guidelines specifically for {idea.categories.market}.</p>
            <button className="text-blue-600 font-medium text-sm flex items-center">Start Generating &rarr;</button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Build Landing Page</h3>
            <p className="text-sm text-gray-500 mb-4">Generate conversion-optimized copy and wireframes for a {idea.categories.type} product.</p>
            <button className="text-purple-600 font-medium text-sm flex items-center">Launch Builder &rarr;</button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-colors cursor-pointer group">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Hammer className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">MVP Specification</h3>
            <p className="text-sm text-gray-500 mb-4">Break down "{idea.title}" into actionable technical tasks and user stories.</p>
            <button className="text-orange-600 font-medium text-sm flex items-center">Create Specs &rarr;</button>
        </div>

      </div>

      <div className="mt-12 bg-gray-50 rounded-xl p-8 text-center border border-dashed border-gray-300">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">More builder tools are being initialized for your session...</p>
      </div>
    </div>
  );
};
