
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessIdea, DEFAULT_IDEA, ResearchReport, BrandIdentity, LandingPageContent, MVPSpecs, AdCreativesResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

// Expanded list of specific, high-growth domains to replace the API "Macro Scan"
// This ensures diversity without needing an extra API call to ask "what is trending?"
const DIVERSE_DOMAINS = [
  // Tech & SaaS
  "Micro-SaaS for Niche Agencies", "No-Code Automation Tools", "DevTools for AI Agents",
  "Cybersecurity for Remote Teams", "Vertical SaaS for Construction", "LegalTech for SMBs",
  
  // Health & Wellness
  "FemTech & Women's Health", "Biohacking & Longevity Trackers", "Mental Health AI Companions",
  "Telehealth for Specialized Care", "Sleep Technology", "Personalized Nutrition",

  // Sustainability
  "Circular Economy Marketplaces", "Carbon Accounting Software", "Sustainable Packaging",
  "AgriTech & Vertical Farming", "Water Management Tech", "Clean Meat & Plant Protein",

  // Consumer & Lifestyle
  "Pet Tech & Wearables", "Creator Economy Monetization", "Digital Fashion & Assets",
  "Smart Home Energy Management", "EdTech for Vocational Skills", "AgeTech (Senior Care)",

  // Emerging Markets
  "Space Economy Services", "Drone Logistics", "Synthetic Media Detection",
  "Quantum Computing Education", "Web3 Loyalty Programs", "Autonomous Retail"
];

// Schemas
const chartDataSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      year: { type: Type.STRING },
      volume: { type: Type.NUMBER }
    },
    required: ["year", "volume"]
  }
};

const businessIdeaSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    oneLiner: { type: Type.STRING },
    description: { type: Type.STRING },
    whyNow: { type: Type.STRING },
    marketGap: { type: Type.STRING },
    executionPlan: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "A detailed list of 5-7 actionable steps for executing the idea."
    },
    growthPercentage: { type: Type.NUMBER },
    currentVolume: { type: Type.STRING, description: "Short string like '10k' or '5.5M'" },
    volumeNote: { type: Type.STRING, description: "Contextual note about the volume, e.g. 'Underserved market'" },
    keyword: { type: Type.STRING },
    chartData: chartDataSchema,
    opportunityScore: { type: Type.NUMBER },
    problemSeverity: { type: Type.NUMBER },
    feasibilityScore: { type: Type.NUMBER },
    timingScore: { type: Type.NUMBER },
    businessFits: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          value: { type: Type.STRING },
          subtext: { type: Type.STRING },
          color: { type: Type.STRING },
          tooltip: { type: Type.STRING }
        },
        required: ["label", "value", "subtext", "color", "tooltip"]
      }
    },
    communitySignals: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                source: { type: Type.STRING },
                stats: { type: Type.STRING },
                score: { type: Type.STRING }
            },
            required: ["source", "stats", "score"]
        }
    },
    communityDeepDive: {
        type: Type.OBJECT,
        properties: {
            sentimentScore: { type: Type.NUMBER },
            sentimentBreakdown: {
                type: Type.OBJECT,
                properties: {
                    positive: { type: Type.NUMBER },
                    neutral: { type: Type.NUMBER },
                    negative: { type: Type.NUMBER }
                },
                required: ["positive", "neutral", "negative"]
            },
            topKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            discussions: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        author: { type: Type.STRING },
                        text: { type: Type.STRING },
                        platform: { type: Type.STRING },
                        sentiment: { type: Type.STRING, enum: ['positive', 'neutral', 'negative'] }
                    },
                    required: ["author", "text", "platform", "sentiment"]
                }
            },
            platformBreakdown: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        activityLevel: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                        userIntent: { type: Type.STRING }
                    },
                    required: ["name", "activityLevel", "userIntent"]
                }
            }
        },
        required: ["sentimentScore", "sentimentBreakdown", "topKeywords", "discussions", "platformBreakdown"]
    },
    categories: {
        type: Type.OBJECT,
        properties: {
            type: { type: Type.STRING },
            market: { type: Type.STRING },
            target: { type: Type.STRING },
            competitor: { type: Type.STRING }
        },
        required: ["type", "market", "target", "competitor"]
    }
  },
  required: ["title", "description", "chartData", "opportunityScore", "communityDeepDive", "categories"]
};

const researchReportSchema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING },
    swot: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
        opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
        threats: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["strengths", "weaknesses", "opportunities", "threats"]
    },
    competitors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          price: { type: Type.STRING },
          description: { type: Type.STRING }
        },
        required: ["name", "price", "description"]
      }
    },
    marketSize: {
      type: Type.OBJECT,
      properties: {
        tam: { type: Type.STRING },
        sam: { type: Type.STRING },
        som: { type: Type.STRING },
        explanation: { type: Type.STRING }
      },
      required: ["tam", "sam", "som", "explanation"]
    },
    verdict: { type: Type.STRING }
  },
  required: ["summary", "swot", "competitors", "marketSize", "verdict"]
};

const brandIdentitySchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    tagline: { type: Type.STRING },
    logoConcept: { type: Type.STRING },
    colors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: { name: { type: Type.STRING }, hex: { type: Type.STRING } },
        required: ["name", "hex"]
      }
    },
    fontPairing: {
      type: Type.OBJECT,
      properties: { primary: { type: Type.STRING }, secondary: { type: Type.STRING } },
      required: ["primary", "secondary"]
    },
    voice: { type: Type.STRING }
  },
  required: ["name", "tagline", "logoConcept", "colors", "fontPairing", "voice"]
};

const landingPageSchema = {
  type: Type.OBJECT,
  properties: {
    headline: { type: Type.STRING },
    subheadline: { type: Type.STRING },
    cta: { type: Type.STRING },
    benefits: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: { title: { type: Type.STRING }, desc: { type: Type.STRING } },
        required: ["title", "desc"]
      }
    }
  },
  required: ["headline", "subheadline", "cta", "benefits"]
};

const mvpSpecsSchema = {
  type: Type.OBJECT,
  properties: {
    coreFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
    techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
    userStories: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["coreFeatures", "techStack", "userStories"]
};

const adCreativesSchema = {
  type: Type.OBJECT,
  properties: {
    strategy: { type: Type.STRING },
    variants: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          platform: { type: Type.STRING },
          headline: { type: Type.STRING },
          primaryText: { type: Type.STRING },
          visualPrompt: { type: Type.STRING },
          cta: { type: Type.STRING }
        },
        required: ["platform", "headline", "primaryText", "visualPrompt", "cta"]
      }
    },
    targetAudience: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["strategy", "variants", "targetAudience"]
};

export const generateNextIdea = async (onProgress?: (log: string) => void): Promise<BusinessIdea> => {
  try {
    if (onProgress) onProgress("Initializing AI market researcher...");

    // --- Step 1: Select Target Sector (Client-Side Optimization) ---
    // We skip the API call for "Top Sectors" and pick from our highly diverse, curated list.
    // This saves 1 API call while ensuring high variety.
    const targetSector = DIVERSE_DOMAINS[Math.floor(Math.random() * DIVERSE_DOMAINS.length)];
    
    console.log(`Targeting sector: ${targetSector}`);
    if (onProgress) onProgress(`Targeting High-Growth Sector: ${targetSector}`);

    // --- Step 2: Deep Dive Grounding (API Call #1) ---
    // We go straight to the deep dive search.
    if (onProgress) onProgress(`Deep diving into ${targetSector} trends & pain points...`);
    
    const searchResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Perform a specific search for rising trends, customer complaints, and unmet needs specifically within the "${targetSector}" sector for late 2024 and 2025.
      
      Identify a specific problem that is currently unsolved or poorly solved in this niche.
      
      Return a summary text describing:
      1. The Primary Trend in ${targetSector}.
      2. Key problems/pain points based on search results.
      3. Emerging keywords associated with this trend.
      `,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const trendContext = searchResponse.text;
    if (!trendContext) {
      console.warn("No trend context returned.");
      return DEFAULT_IDEA;
    }

    if (onProgress) onProgress("Analyzing search signals and identifying market gaps...");

    // --- Step 3: Synthesis (API Call #2) ---
    if (onProgress) onProgress("Synthesizing business concept and strategy...");
    
    const mainIdeaPromise = ai.models.generateContent({
      model: MODEL_NAME,
      contents: `You are an expert venture capitalist. Based on this specific market research for the ${targetSector} sector:
      "${trendContext}"
      
      Create a comprehensive "Idea of the Day" profile.
      It should be a specific startup idea that solves a problem identified in the research.
      
      For "oneLiner": Generate a detailed 40-50 word summary paragraph. Explain the core problem and the solution mechanism clearly. It should serve as a pitch hook.
      
      For "executionPlan": Provide a detailed list of 5-7 actionable steps to launch and scale this idea. Be specific (e.g., "Develop MVP", "Launch on ProductHunt", "Partnerships").

      For "currentVolume": Provide a SHORT numeric estimate string (e.g. "10k", "5.5M", "500k"). Do not put long text here.
      For "volumeNote": Provide the qualitative context for the volume here (e.g., "Underserved market", "Rapidly growing interest").

      For the "businessFits" array, generate exactly 4 items with these exact labels:
      1. "Market Need"
      2. "Innovation"
      3. "Regulatory Alignment"
      4. "Social Impact"
      
      Provide a 'tooltip' string for each that explains *why* it has that score.

      For "communityDeepDive", simulate realistic social listening data:
      - Generate a realistic sentiment score (0-100).
      - Generate 3 "Voice of Customer" quotes that sound like real forum posts (Reddit/Twitter).
      - List top keywords people use when complaining about this problem.
      - Breakdown activity level on major platforms.
      
      Ensure the tone is professional, exciting, and data-driven.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: businessIdeaSchema,
        temperature: 0.75
      }
    });

    const mainIdeaRes = await mainIdeaPromise;
    if (onProgress) onProgress("Calculating opportunity scores and metrics...");
    
    let mainIdea = mainIdeaRes.text ? JSON.parse(mainIdeaRes.text) : DEFAULT_IDEA;

    // Add current date to the generated idea
    mainIdea = {
        ...mainIdea,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    if (onProgress) onProgress("Finalizing report generation...");
    return mainIdea;

  } catch (error) {
    console.error("Error generating idea:", error);
    return DEFAULT_IDEA;
  }
};

export const generateResearchReport = async (query: string): Promise<ResearchReport | null> => {
  try {
    // Step 1: Research the specific user query using Google Search
    const searchResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Research the market viability, competitors, and trends for the following business idea: "${query}".
      Look for existing competitors, pricing models, current market size estimates, and potential pitfalls.
      `,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const researchContext = searchResponse.text;

    // Step 2: Synthesize into a JSON report
    const reportResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `You are a startup market researcher. Based on the following research context about the idea "${query}":
      
      ${researchContext}
      
      Generate a detailed "Research Report" in JSON format.
      Include a SWOT analysis, 3 key competitors with estimated pricing, Market Size (TAM/SAM/SOM), and a final verdict (Go/No-Go/Pivot).
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: researchReportSchema,
        temperature: 0.7
      }
    });

    if (reportResponse.text) {
      return JSON.parse(reportResponse.text) as ResearchReport;
    }
    return null;
  } catch (error) {
    console.error("Error generating research report:", error);
    return null;
  }
};

export const generateBrandIdentity = async (idea: BusinessIdea): Promise<BrandIdentity | null> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Create a brand identity for the following startup idea: "${idea.title}".
      Description: ${idea.description}
      Target Audience: ${idea.categories?.target || 'General Audience'}
      
      Provide a catchy startup name, a tagline, a text description of a logo concept, a color palette with hex codes (3-4 colors), a font pairing recommendation, and a description of the brand voice.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: brandIdentitySchema
      }
    });
    return response.text ? JSON.parse(response.text) : null;
  } catch (e) {
    console.error("Error generating brand:", e);
    return null;
  }
};

export const generateLandingPage = async (idea: BusinessIdea): Promise<LandingPageContent | null> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Write high-converting landing page copy for: "${idea.title}".
      Problem: ${idea.oneLiner}
      Solution: ${idea.description}
      
      Include a compelling H1 Headline, H2 Subheadline, Call to Action text, and 3 key benefits.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: landingPageSchema
      }
    });
    return response.text ? JSON.parse(response.text) : null;
  } catch (e) {
    console.error("Error generating landing page:", e);
    return null;
  }
};

export const generateMVPSpecs = async (idea: BusinessIdea): Promise<MVPSpecs | null> => {
  try {
    // Join the execution plan array into a string for context
    const planContext = Array.isArray(idea.executionPlan) ? idea.executionPlan.join('\n') : idea.executionPlan;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Outline the MVP (Minimum Viable Product) specifications for: "${idea.title}".
      Execution Plan: ${planContext}
      
      List the core features required for V1, suggested technology stack (modern web/mobile), and 3-5 key user stories.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: mvpSpecsSchema
      }
    });
    return response.text ? JSON.parse(response.text) : null;
  } catch (e) {
    console.error("Error generating specs:", e);
    return null;
  }
};

export const generateAdCreatives = async (idea: BusinessIdea): Promise<AdCreativesResult | null> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate high-converting ad creatives for: "${idea.title}".
      Target Audience: ${idea.categories?.target || 'General Audience'}
      Problem: ${idea.problemSeverity} (Pain Level)
      
      Create a 1-sentence ad strategy summary.
      Then create 3 ad variants:
      1. Facebook/Instagram (Visual + Story)
      2. LinkedIn (Professional + Value)
      3. Google Search (Keyword + Direct)
      
      For each, provide the Headline, Primary Text (Body), CTA, and a 'visualPrompt' describing the image/video to generation.
      Also list 3-5 target audience keywords/interests.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: adCreativesSchema
      }
    });
    return response.text ? JSON.parse(response.text) : null;
  } catch (e) {
    console.error("Error generating ads:", e);
    return null;
  }
};
