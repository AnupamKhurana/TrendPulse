
export interface ChartDataPoint {
  year: string;
  volume: number;
}

export interface BusinessScore {
  label: string;
  score: number;
  description: string;
}

export interface BusinessFit {
  label: string;
  value: string;
  subtext: string;
  color: string;
}

export interface CommunitySignal {
  source: string;
  stats: string;
  score: string; // e.g. "8 / 10"
}

export interface BusinessIdea {
  title: string;
  tags: string[];
  oneLiner: string;
  description: string; // detailed problem/solution
  whyNow: string;
  marketGap: string;
  executionPlan: string;
  chartData: ChartDataPoint[];
  growthPercentage: number;
  currentVolume: string; // e.g. "9.9k"
  keyword: string;
  
  // Sidebar data
  opportunityScore: number;
  problemSeverity: number;
  feasibilityScore: number;
  timingScore: number;
  
  businessFits: BusinessFit[];
  communitySignals: CommunitySignal[];
  
  categories: {
    type: string;
    market: string;
    target: string;
    competitor: string;
  };
}

export interface DatabaseIdea {
  title: string;
  tags: string[];
}

export interface TrendItem {
  name: string;
  vol: string;
  growth: string;
  desc: string;
}

export interface InsightItem {
  title: string;
  description: string;
  pain: string;
  solution: string;
}

// Research Report Types
export interface Competitor {
  name: string;
  price: string;
  description: string;
}

export interface ResearchReport {
  summary: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  competitors: Competitor[];
  marketSize: {
    tam: string; // Total Addressable Market
    sam: string; // Serviceable Available Market
    som: string; // Serviceable Obtainable Market
    explanation: string;
  };
  verdict: string;
}

export type PageView = 'home' | 'pricing' | 'login' | 'signup' | 'build' | 'research' | 'analysis';

// --- Defaults ---

export const DEFAULT_IDEA: BusinessIdea = {
  title: "Smart inventory tracker that predicts supply needs for cleaning businesses",
  tags: ["Perfect Timing", "Unfair Advantage", "Product Ready"],
  oneLiner: "Running a cleaning service means you're constantly running out of supplies at the worst possible moments.",
  description: "The platform connects to your existing systems and uses smart cameras or simple scanning to monitor supply levels in real-time. It learns your crew's usage patterns, factors in upcoming jobs, and sends alerts when it's time to reorder. Instead of playing inventory guesswork, you get precise forecasts.",
  whyNow: "With the global cleaning services market booming towards $616.98 billion by 2030, now is the ideal time to launch 'InStockAI'.",
  marketGap: "The biggest market gap for 'InStockAI' lies in its ability to provide real-time, AI-driven inventory management specifically for commercial cleaners.",
  executionPlan: "Launch a cutting-edge MVP offering AI-driven inventory tracking specifically for commercial cleaning. Integrate mobile apps for predictive reordering.",
  growthPercentage: 519,
  currentVolume: "9.9k",
  keyword: "Cloud based inventory man...",
  chartData: [
    { year: '2022', volume: 20 },
    { year: '2023', volume: 35 },
    { year: '2024', volume: 45 },
    { year: '2025', volume: 95 },
  ],
  opportunityScore: 9,
  problemSeverity: 8,
  feasibilityScore: 6,
  timingScore: 9,
  businessFits: [
    { label: "Revenue Potential", value: "$$$", subtext: "$1M-$10M ARR potential", color: "text-blue-500" },
    { label: "Execution Difficulty", value: "5/10", subtext: "Moderate complexity with integration", color: "text-gray-500" },
    { label: "Go-To-Market", value: "8/10", subtext: "Strong traction with clear signals", color: "text-blue-500" },
  ],
  communitySignals: [
    { source: "Reddit", stats: "4 subreddits • 2.5M+ members", score: "8 / 10" },
    { source: "Facebook", stats: "5 groups • 150K+ members", score: "7 / 10" },
  ],
  categories: {
    type: "SaaS",
    market: "B2B",
    target: "Small Businesses",
    competitor: "Fishbowl"
  }
};
