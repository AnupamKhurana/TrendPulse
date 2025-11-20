
import React from 'react';
import { BusinessIdea } from '../types';
import { BookMarked, Trash2, ArrowRight } from 'lucide-react';

interface SavedPageProps {
  savedIdeas: BusinessIdea[];
  onDelete: (id: string) => void;
  onView: (idea: BusinessIdea) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({ savedIdeas, onDelete, onView }) => {
  return (
    <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12 flex items-center">
          <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600 mr-4">
            <BookMarked className="w-8 h-8" />
          </div>
          <div>
              <h1 className="text-3xl font-bold text-gray-900">Saved Ideas</h1>
              <p className="text-gray-500">Your curated list of opportunities.</p>
          </div>
      </div>

      {savedIdeas.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
           <BookMarked className="w-12 h-12 text-gray-300 mx-auto mb-4" />
           <h3 className="text-lg font-medium text-gray-900">No saved ideas yet</h3>
           <p className="text-gray-500 mb-6">Start browsing trends and save ideas that resonate with you.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedIdeas.map((idea, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                    <div className="p-6 flex-grow">
                        <div className="flex gap-2 mb-4">
                            {idea.tags.slice(0,2).map((tag, i) => (
                                <span key={i} className="text-[10px] font-bold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">{tag}</span>
                            ))}
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{idea.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">{idea.oneLiner}</p>
                        
                        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mt-auto pt-4 border-t border-gray-50">
                            <span className="flex items-center">
                                Opportunity: <span className="text-emerald-600 ml-1">{idea.opportunityScore}/10</span>
                            </span>
                            <span className="flex items-center">
                                Vol: <span className="text-gray-700 ml-1">{idea.currentVolume}</span>
                            </span>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 flex justify-between items-center border-t border-gray-100">
                        <button 
                            onClick={() => onView(idea)}
                            className="text-sm font-medium text-gray-900 hover:text-emerald-600 flex items-center transition-colors"
                        >
                            View Analysis <ArrowRight className="w-3 h-3 ml-1" />
                        </button>
                        <button 
                            onClick={() => idea.id && onDelete(idea.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Remove"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
};
