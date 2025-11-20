
import React from 'react';
import { Check } from 'lucide-react';

export const PricingPage: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-gray-600">Choose the plan that's right for your startup journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Starter</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6">$0<span className="text-lg font-normal text-gray-500">/mo</span></div>
            <p className="text-gray-600 mb-6 text-sm">Perfect for exploring ideas and getting inspired.</p>
            <button className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors mb-8">Get Started</button>
            <ul className="space-y-4">
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> 5 Idea Generations per day</li>
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> Basic Trend Analysis</li>
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> Community Access</li>
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-emerald-600 rounded-2xl p-8 shadow-lg relative">
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Pro</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6">$29<span className="text-lg font-normal text-gray-500">/mo</span></div>
            <p className="text-gray-600 mb-6 text-sm">For serious founders ready to validate and build.</p>
            <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors mb-8">Start Free Trial</button>
            <ul className="space-y-4">
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> Unlimited Idea Generations</li>
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> Deep Market Reports</li>
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> AI Research Agent</li>
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> Export to PDF/CSV</li>
            </ul>
          </div>

          {/* Enterprise Plan */}
          <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Agency</h3>
            <div className="text-4xl font-bold text-gray-900 mb-6">$99<span className="text-lg font-normal text-gray-500">/mo</span></div>
            <p className="text-gray-600 mb-6 text-sm">For venture studios and agencies.</p>
            <button className="w-full bg-white border border-gray-300 text-gray-900 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors mb-8">Contact Sales</button>
            <ul className="space-y-4">
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> Everything in Pro</li>
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> Team Collaboration</li>
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> White-label Reports</li>
              <li className="flex items-center text-sm text-gray-600"><Check className="w-4 h-4 text-emerald-500 mr-2" /> API Access</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
