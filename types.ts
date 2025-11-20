
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
  tooltip: string; // Explanation for the metric
}

export interface CommunitySignal {
  source: string;
  stats: string;
  score: string; // e.g. "8 / 10"
}

export interface DiscussionComment {
  author: string;
  text: string;
  platform: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface CommunityDeepDive {
  sentimentScore: number; // 0 to 100
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  topKeywords: string[];
  discussions: DiscussionComment[];
  platformBreakdown: {
    name: string;
    activityLevel: 'High' | 'Medium' | 'Low';
    userIntent: string; // e.g. "Seeking Advice", "Complaining"
  }[];
}

export interface BusinessIdea {
  id?: string; // Added optional ID for saving
  date: string; // Date of generation
  title: string;
  tags: string[];
  oneLiner: string;
  description: string; // detailed problem/solution
  whyNow: string;
  marketGap: string;
  executionPlan: string[]; // Changed to array of steps
  chartData: ChartDataPoint[];
  growthPercentage: number;
  currentVolume: string; // e.g. "9.9k"
  volumeNote?: string; // Contextual note for volume (e.g. "Underserved market")
  keyword: string;
  
  // Sidebar data
  opportunityScore: number;
  problemSeverity: number;
  feasibilityScore: number;
  timingScore: number;
  
  businessFits: BusinessFit[];
  communitySignals: CommunitySignal[];
  communityDeepDive: CommunityDeepDive; // New detailed field
  
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

// Builder Studio Types
export interface BrandIdentity {
  name: string;
  tagline: string;
  logoConcept: string;
  colors: { name: string; hex: string }[];
  fontPairing: { primary: string; secondary: string };
  voice: string;
}

export interface LandingPageContent {
  headline: string;
  subheadline: string;
  cta: string;
  benefits: { title: string; desc: string }[];
}

export interface MVPSpecs {
  coreFeatures: string[];
  techStack: string[];
  userStories: string[];
}

export interface AdCreativeVariant {
  platform: string; // e.g., "Facebook/Instagram", "LinkedIn", "Google Search"
  headline: string;
  primaryText: string;
  visualPrompt: string; // Description for image generation
  cta: string;
}

export interface AdCreativesResult {
  strategy: string; // Brief strategy overview
  variants: AdCreativeVariant[];
  targetAudience: string[];
}

export type PageView = 'home' | 'pricing' | 'login' | 'signup' | 'build' | 'research' | 'analysis' | 'saved' | 'signals';

// --- AI Config Types ---
export type AIProvider = 'gemini' | 'local';

export interface AIProviderConfig {
  provider: AIProvider;
  // Local AI Settings
  localBaseUrl: string; // e.g., http://localhost:11434/v1
  localModelName: string; // e.g., llama3, mistral
  localApiKey?: string; // Optional, usually 'ollama' or not needed
}

// --- Defaults ---

export const DEFAULT_IDEA: BusinessIdea = {
  id: "default-1",
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  title: "Smart inventory tracker that predicts supply needs for cleaning businesses",
  tags: ["Perfect Timing", "Unfair Advantage", "Product Ready"],
  oneLiner: "Running a commercial cleaning service means facing constant supply shortages and lost revenue. InStockAI transforms this by using existing cameras to monitor inventory in real-time. It learns usage patterns, predicts exactly when you'll run out, and automates reordering, ensuring your team always has what they need without excess stock.",
  description: "The platform connects to your existing systems and uses smart cameras or simple scanning to monitor supply levels in real-time. It learns your crew's usage patterns, factors in upcoming jobs, and sends alerts when it's time to reorder. Instead of playing inventory guesswork, you get precise forecasts.",
  whyNow: "With the global cleaning services market booming towards $616.98 billion by 2030, now is the ideal time to launch 'InStockAI'.",
  marketGap: "The biggest market gap for 'InStockAI' lies in its ability to provide real-time, AI-driven inventory management specifically for commercial cleaners.",
  executionPlan: [
      "Develop MVP with basic QR code scanning and manual entry features for supply tracking.",
      "Pilot with 10 local commercial cleaning businesses to gather usage data and train the prediction algorithm.",
      "Integrate with popular accounting software like QuickBooks and Xero for automated reordering.",
      "Launch mobile app for field staff to report usage in real-time.",
      "Scale marketing efforts targeting cleaning franchises and facility management companies."
  ],
  growthPercentage: 519,
  currentVolume: "9.9k",
  volumeNote: "Rapidly growing interest in automated logistics solutions.",
  keyword: "Cloud based inventory management",
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
    { 
        label: "Market Need", 
        value: "High", 
        subtext: "Urgent demand in commercial sectors", 
        color: "text-emerald-500",
        tooltip: "Measures the current demand intensity and urgency for a solution in this specific market vertical."
    },
    { 
        label: "Innovation", 
        value: "High", 
        subtext: "First-mover advantage with AI", 
        color: "text-blue-500",
        tooltip: "Assesses the novelty of the solution and its technological differentiation from existing alternatives."
    },
    { 
        label: "Regulatory Alignment", 
        value: "Safe", 
        subtext: "Low compliance hurdles", 
        color: "text-emerald-500",
        tooltip: "Evaluates legal risks, compliance requirements, and adherence to industry standards."
    },
    { 
        label: "Social Impact", 
        value: "Medium", 
        subtext: "Reduces waste and improves efficiency", 
        color: "text-orange-500",
        tooltip: "Estimates the positive effect on society, sustainability, or community well-being."
    },
  ],
  communitySignals: [
    { source: "Reddit", stats: "4 subreddits • 2.5M+ members", score: "8 / 10" },
    { source: "Facebook", stats: "5 groups • 150K+ members", score: "7 / 10" },
  ],
  communityDeepDive: {
      sentimentScore: 78,
      sentimentBreakdown: { positive: 65, neutral: 25, negative: 10 },
      topKeywords: ["inventory nightmare", "cleaning supplies cost", "waste management", "employee theft"],
      discussions: [
          { platform: "Reddit r/cleaning_business", author: "clean_king_99", text: "I lose about 15% of my margin just on supplies disappearing or being overused. I'd pay for a tracker.", sentiment: "positive" },
          { platform: "IndieHackers", author: "SaaS_Founder", text: "The hardware component might be tricky, but the software need is definitely there.", sentiment: "neutral" },
          { platform: "Facebook Group", author: "Sarah J.", text: "Stop trying to automate everything. Pen and paper works fine for my small crew.", sentiment: "negative" }
      ],
      platformBreakdown: [
          { name: "Reddit", activityLevel: "High", userIntent: "Venting/Seeking Solutions" },
          { name: "Facebook Groups", activityLevel: "Medium", userIntent: "Peer Support" },
          { name: "Twitter/X", activityLevel: "Low", userIntent: "News/Trends" }
      ]
  },
  categories: {
    type: "SaaS",
    market: "B2B",
    target: "Small Businesses",
    competitor: "Fishbowl"
  }
};
