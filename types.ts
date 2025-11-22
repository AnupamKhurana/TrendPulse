
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
  
  // Added flag to distinguish between Live Data and Local Simulation
  isSimulated?: boolean; 
  
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
  // Trend Data for Research Graph
  trendKeyword: string;
  trendData: ChartDataPoint[];
  currentVolume: string;
  growthPercentage: number;
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
  enableHybridSearch?: boolean; // New: Use Gemini for Search, Local for Synthesis
}

// --- Defaults ---

export const DEFAULT_IDEA: BusinessIdea = {
  id: "default-1",
  date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  title: "Autonomous AI Finance Manager for Gig Economy Workers",
  tags: ["FinTech", "AI Agent", "High Growth"],
  oneLiner: "Freelancers struggle with variable income and surprise tax bills. FiscalFlow connects to bank feeds, uses predictive AI to forecast lean months, and automatically sweeps a calculated percentage of every deposit into a high-yield tax savings bucket, acting as a 'CFO for a team of one'.",
  description: "The platform integrates with banking APIs and gig platforms (Upwork, Uber, Stripe) to centralize income data. It uses predictive AI models to forecast earnings volatility, automatically setting aside the perfect amount for taxes and emergency funds. It provides a 'Safe-to-Spend' daily budget that dynamically adjusts based on upcoming bills and projected income gaps, preventing cash flow crunches before they happen.",
  whyNow: "With the global gig economy projected to reach $455B by 2024 and AI becoming trusted for financial advice, the timing is perfect for an autonomous solution that replaces manual spreadsheets.",
  marketGap: "Existing tools like QuickBooks are retrospective accounting software. There is no proactive 'Financial Autopilot' that moves money for you to prevent tax debt and smooth consumption.",
  executionPlan: [
      "Develop MVP using Plaid API for bank connections and OpenAI for transaction categorization.",
      "Partner with a Banking-as-a-Service (BaaS) provider to offer high-yield savings accounts embedded in the app.",
      "Launch a 'Tax Calculator' lead magnet to capture freelancer emails via targeted LinkedIn ads.",
      "Implement 'Safe-to-Spend' widget for iOS/Android home screens.",
      "Scale by partnering with influencer agencies and gig worker unions."
  ],
  growthPercentage: 312,
  currentVolume: "45.2k",
  volumeNote: "Surge in 'AI personal finance' searches.",
  keyword: "AI personal finance app",
  isSimulated: false,
  chartData: [
    { year: '2022', volume: 15 },
    { year: '2023', volume: 42 },
    { year: '2024', volume: 88 },
    { year: '2025', volume: 145 },
  ],
  opportunityScore: 9,
  problemSeverity: 9,
  feasibilityScore: 7,
  timingScore: 10,
  businessFits: [
    { 
        label: "Market Need", 
        value: "Critical", 
        subtext: "Freelancers fear tax season", 
        color: "text-red-500",
        tooltip: "The pain of unexpected tax bills creates a critical, urgent need for automation."
    },
    { 
        label: "Innovation", 
        value: "High", 
        subtext: "Predictive Cash Flow AI", 
        color: "text-blue-500",
        tooltip: "Uses novel forecasting models to predict variable income, differentiating from static budgeting apps."
    },
    { 
        label: "Regulatory Alignment", 
        value: "Medium", 
        subtext: "FinTech Compliance Req.", 
        color: "text-orange-500",
        tooltip: "Requires strict adherence to financial data security standards (SOC2, PCI) and banking regulations."
    },
    { 
        label: "Social Impact", 
        value: "High", 
        subtext: "Financial health for creators", 
        color: "text-emerald-500",
        tooltip: "Directly improves the financial stability and mental well-being of the independent workforce."
    },
  ],
  communitySignals: [
    { source: "r/freelance", stats: "320k Members", score: "9 / 10" },
    { source: "Twitter/X", stats: "FinTech Topic", score: "8 / 10" },
  ],
  communityDeepDive: {
      sentimentScore: 82,
      sentimentBreakdown: { positive: 70, neutral: 20, negative: 10 },
      topKeywords: ["tax anxiety", "variable income", "budgeting app", "freelance finance"],
      discussions: [
          { platform: "Reddit r/freelance", author: "dev_guy_99", text: "I just got hit with a $5k tax bill I didn't save for. I need something that just takes the money automatically.", sentiment: "positive" },
          { platform: "Twitter", author: "@gig_economist", text: "Most budgeting apps assume you get a paycheck every 2 weeks. They are useless for us.", sentiment: "neutral" },
          { platform: "ProductHunt", author: "sarah_design", text: "Finally, an app that understands my income goes up and down. The safe-to-spend feature is a lifesaver.", sentiment: "positive" }
      ],
      platformBreakdown: [
          { name: "Reddit", activityLevel: "High", userIntent: "Seeking Advice/Venting" },
          { name: "TikTok", activityLevel: "Medium", userIntent: "Financial Hacks" },
          { name: "LinkedIn", activityLevel: "Low", userIntent: "Professional Networking" }
      ]
  },
  categories: {
    type: "B2C FinTech",
    market: "Gig Economy",
    target: "Freelancers/Creators",
    competitor: "QuickBooks Self-Employed"
  }
};
