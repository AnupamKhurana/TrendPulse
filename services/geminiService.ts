
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessIdea, DEFAULT_IDEA, ResearchReport, BrandIdentity, LandingPageContent, MVPSpecs, AdCreativesResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

// List of diverse domains to ensure variety in generation
const DIVERSE_DOMAINS = [
  "HealthTech & Digital Wellness",
  "Sustainable Energy & GreenTech",
  "FinTech & Personal Wealth Management",
  "EdTech & Micro-learning Platforms",
  "AgriTech & Vertical Farming",
  "Pet Tech & Services",
  "Remote Work Infrastructure & Tools",
  "AgeTech & Senior Care",
  "Creator Economy Monetization",
  "Cybersecurity for SMBs",
  "Smart Home & IoT Solutions",
  "Niche E-commerce & D2C Brands",
  "Legal Tech & Compliance",
  "Logistics & Last-Mile Delivery",
  "Mental Health & Mindfulness Apps",
  "Construction Tech (ConTech)",
  "Biohacking & Longevity",
  "AI Agents for Specific Industries",
  "Travel & Local Experiences",
  "PropTech & Real Estate Innovation"
];

// Schemas
const chartDataSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      year: { type: Type.STRING },
      volume: { type: Type.NUMBER }
    }
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
        }
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
            }
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
                }
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
                    }
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
                    }
                }
            }
        }
    },
    categories: {
        type: Type.OBJECT,
        properties: {
            type: { type: Type.STRING },
            market: { type: Type.STRING },
            target: { type: Type.STRING },
            competitor: { type: Type.STRING }
        }
    }
  },
  required: ["title", "description", "chartData", "opportunityScore", "communityDeepDive"]
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
      }
    },
    competitors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          price: { type: Type.STRING },
          description: { type: Type.STRING }
        }
      }
    },
    marketSize: {
      type: Type.OBJECT,
      properties: {
        tam: { type: Type.STRING },
        sam: { type: Type.STRING },
        som: { type: Type.STRING },
        explanation: { type: Type.STRING }
      }
    },
    verdict: { type: Type.STRING }
  }
};

const brandIdentitySchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    tagline: { type: Type.STRING },
    colors: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: { name: { type: Type.STRING }, hex: { type: Type.STRING } }
      }
    },
    fontPairing: {
      type: Type.OBJECT,
      properties: { primary: { type: Type.STRING }, secondary: { type: Type.STRING } }
    },
    voice: { type: Type.STRING }
  }
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
        properties: { title: { type: Type.STRING }, desc: { type: Type.STRING } }
      }
    }
  }
};

const mvpSpecsSchema = {
  type: Type.OBJECT,
  properties: {
    coreFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
    techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
    userStories: { type: Type.ARRAY, items: { type: Type.STRING } }
  }
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
        }
      }
    },
    targetAudience: { type: Type.ARRAY, items: { type: Type.STRING } }
  }
};

export const generateNextIdea = async (onProgress?: (log: string) => void): Promise<BusinessIdea> => {
  try {
    if (onProgress) onProgress("Initializing AI market researcher...");

    // Step 1: Randomly select a domain
    const randomDomain = DIVERSE_DOMAINS[Math.floor(Math.random() * DIVERSE_DOMAINS.length)];
    console.log(`Searching for trends in domain: ${randomDomain}`);
    if (onProgress) onProgress(`Targeting sector: ${randomDomain}...`);

    // Grounding - Find a current trend cluster
    if (onProgress) onProgress("Querying Google Search for real-time trends...");
    const searchResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Perform a search for rising trends, consumer complaints, and emerging market opportunities specifically within the "${randomDomain}" sector for late 2024 and 2025.
      
      Identify a specific problem that is currently unsolved or poorly solved.
      
      Return a summary text describing:
      1. The Primary Trend in ${randomDomain}.
      2. Key problems in this sector based on search results.
      3. Emerging keywords.
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

    // Step 2: Generate Main Idea
    if (onProgress) onProgress("Synthesizing business concept and strategy...");
    const mainIdeaPromise = ai.models.generateContent({
      model: MODEL_NAME,
      contents: `You are an expert venture capitalist. Based on this specific market research for the ${randomDomain} sector:
      "${trendContext}"
      
      Create a comprehensive "Idea of the Day" profile.
      It should be a specific startup idea that solves a problem identified in the research.
      
      For "oneLiner": Generate a concise 40-50 word summary paragraph. Explain the core problem and the solution mechanism clearly. It should serve as a pitch hook.
      
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
      Target Audience: ${idea.categories.target}
      
      Provide a catchy startup name, a tagline, a color palette with hex codes (3-4 colors), a font pairing recommendation, and a description of the brand voice.`,
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
      Target Audience: ${idea.categories.target}
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
