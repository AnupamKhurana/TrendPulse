
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessIdea, DEFAULT_IDEA, ResearchReport } from "../types";

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
    executionPlan: { type: Type.STRING },
    growthPercentage: { type: Type.NUMBER },
    currentVolume: { type: Type.STRING },
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
          color: { type: Type.STRING }
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
  required: ["title", "description", "chartData", "opportunityScore"]
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

export const generateNextIdea = async (): Promise<BusinessIdea> => {
  try {
    // Step 1: Randomly select a domain to focus the search on
    const randomDomain = DIVERSE_DOMAINS[Math.floor(Math.random() * DIVERSE_DOMAINS.length)];
    console.log(`Searching for trends in domain: ${randomDomain}`);

    // Grounding - Find a current trend cluster within the specific domain
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

    // Step 2: Generate Main Idea
    const mainIdeaPromise = ai.models.generateContent({
      model: MODEL_NAME,
      contents: `You are an expert venture capitalist. Based on this specific market research for the ${randomDomain} sector:
      "${trendContext}"
      
      Create a comprehensive "Idea of the Day" profile.
      It should be a specific startup idea that solves a problem identified in the research.
      Ensure the tone is professional, exciting, and data-driven.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: businessIdeaSchema,
        temperature: 0.75
      }
    });

    const mainIdeaRes = await mainIdeaPromise;
    const mainIdea = mainIdeaRes.text ? JSON.parse(mainIdeaRes.text) : DEFAULT_IDEA;

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
