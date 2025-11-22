
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from 'recharts';
import { ChartDataPoint } from '../types';
import { Search, Bot } from 'lucide-react';

interface TrendChartProps {
  data: ChartDataPoint[];
  keyword: string;
  currentVolume: string;
  growth: number;
  volumeNote?: string;
  isSimulated?: boolean;
}

// Utility to format large numbers
const formatYAxis = (num: number) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
  return num.toString();
};

const formatTooltipValue = (num: number) => {
  return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, keyword, currentVolume, growth, volumeNote, isSimulated }) => {
  const primaryColor = isSimulated ? "#A855F7" : "#10B981"; // Purple for Simulated, Emerald for Real
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm h-full flex flex-col relative">
      <div className="flex justify-between items-start mb-2 gap-2">
         <div className="flex-shrink-0">
            <h3 className="text-sm font-bold text-gray-900 flex items-center">
                {isSimulated ? (
                    <><Bot className="w-4 h-4 mr-2 text-purple-500" /> Projected Interest</>
                ) : (
                    <><Search className="w-4 h-4 mr-2 text-emerald-500" /> Search Interest</>
                )}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
                {isSimulated ? "AI Estimate (Simulated)" : "Annual Google Search Volume"}
            </p>
         </div>
         
         <div className="bg-gray-50 rounded-lg px-3 py-1.5 border border-gray-100 flex items-center gap-2 max-w-[60%]">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide whitespace-nowrap hidden sm:inline">Keyword:</span>
            <span className="text-sm text-gray-900 font-medium truncate" title={keyword}>{keyword}</span>
        </div>
      </div>

      <div className="flex items-end gap-6 mb-6 border-b border-gray-50 pb-4">
        <div>
            <div className="flex items-start">
                <div className="text-2xl font-bold text-gray-900">{currentVolume}</div>
                {volumeNote && <span className="text-gray-400 text-xs ml-0.5 font-medium">*</span>}
            </div>
            <div className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">Current Vol</div>
        </div>
        <div>
            <div className={`text-2xl font-bold ${isSimulated ? 'text-purple-500' : 'text-emerald-500'}`}>+{growth}%</div>
            <div className="text-[10px] uppercase tracking-wide text-gray-400 font-bold">YoY Growth</div>
        </div>
      </div>

      <div className="flex-grow w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 30,
              right: 10,
              left: 0, 
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.15}/>
                <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 11, fill: '#9CA3AF', fontFamily: 'Plus Jakarta Sans, sans-serif'}} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#9CA3AF', fontFamily: 'Plus Jakarta Sans, sans-serif'}} 
                tickFormatter={formatYAxis}
                width={45}
            >
                <Label 
                    value="Volume" 
                    position="insideTopLeft" 
                    offset={0}
                    dy={-20}
                    dx={0}
                    style={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', fontFamily: 'Plus Jakarta Sans, sans-serif' }} 
                />
            </YAxis>
            <Tooltip 
                cursor={{ stroke: primaryColor, strokeWidth: 1, strokeDasharray: '4 4' }}
                content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                    const val = payload[0].value as number;
                    return (
                        <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl font-sans">
                            <p className="text-[10px] uppercase tracking-wide text-gray-400 font-bold mb-1">{label}</p>
                            <div className="mb-2">
                                <span className="text-[10px] text-gray-400 uppercase font-bold mr-1">Volume:</span>
                                <span className={`${isSimulated ? 'text-purple-600' : 'text-emerald-600'} font-bold text-lg`}>
                                    {formatTooltipValue(val)}
                                </span>
                            </div>
                            <div className="pt-2 border-t border-gray-50">
                                <div className="flex items-center gap-1 mb-1">
                                    {isSimulated ? <Bot className="w-3 h-3 text-gray-400" /> : <Search className="w-3 h-3 text-gray-400" />}
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Trend Keyword</span>
                                </div>
                                <p className="text-xs text-gray-800 font-medium leading-tight max-w-[180px]">{keyword}</p>
                            </div>
                        </div>
                    );
                    }
                    return null;
                }}
            />
            <Area 
                type="monotone" 
                dataKey="volume" 
                stroke={primaryColor} 
                strokeWidth={2} 
                fillOpacity={1} 
                fill="url(#colorVolume)" 
                animationDuration={1500}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff', fill: primaryColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Note */}
      {volumeNote && (
          <div className="mt-2 pt-2 border-t border-gray-50 text-[10px] text-gray-400 italic leading-snug">
              * {volumeNote}
          </div>
      )}
    </div>
  );
};
