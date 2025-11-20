
import { GoogleGenAI, Type } from "@google/genai";
import { BusinessIdea, DEFAULT_IDEA, ResearchReport, BrandIdentity, LandingPageContent, MVPSpecs, AdCreativesResult, AIProviderConfig } from "../types";

// --- CONFIGURATION MANAGEMENT ---

let currentConfig: AIProviderConfig = {
    provider: 'gemini',
    localBaseUrl: 'http://localhost:11434/v1', // Default Ollama port
    localModelName: 'llama3',
    localApiKey: 'ollama',
    enableHybridSearch: false
};

export const setAIConfig = (config: AIProviderConfig) => {
    currentConfig = config;
    console.log("AI Configuration Updated:", currentConfig);
};

export const getAIConfig = () => currentConfig;


// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const MODEL_NAME = "gemini-2.5-flash";

// --- LOCAL AI HELPERS ---

// Helper to call OpenAI-compatible endpoints (Ollama/Llama.cpp)
const callLocalAI = async (
    messages: { role: string, content: string }[], 
    jsonMode: boolean = true
): Promise<string | null> => {
    try {
        const response = await fetch(`${currentConfig.localBaseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentConfig.localApiKey || 'dummy'}`
            },
            body: JSON.stringify({
                model: currentConfig.localModelName,
                messages: messages,
                temperature: 0.7,
                // Some providers support format: 'json_object', others need it in prompt
                ...(jsonMode && { format: 'json' }) 
            })
        });

        if (!response.ok) {
            throw new Error(`Local AI Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || null;
    } catch (error) {
        console.error("Local AI Call Failed:", error);
        return null;
    }
};

// Helper to extract JSON from potential Markdown blocks
const extractJson = (text: string): any => {
    try {
        // Try direct parse
        return JSON.parse(text);
    } catch (e) {
        // Try to find markdown blocks
        const match = text.match(/```json\s*([\s\S]*?)\s*```/);
        if (match && match[1]) {
            try {
                return JSON.parse(match[1]);
            } catch (e2) {
                console.error("Failed to parse JSON from markdown block");
            }
        }
        // Try to find just the first { and last }
        const firstOpen = text.indexOf('{');
        const lastClose = text.lastIndexOf('}');
        if (firstOpen !== -1 && lastClose !== -1) {
            try {
                return JSON.parse(text.substring(firstOpen, lastClose + 1));
            } catch (e3) {
                 console.error("Failed to parse JSON substring");
            }
        }
        return null;
    }
};


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

// Schemas (Kept for Gemini)
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

// --- MAIN GENERATION FUNCTION ---

export const generateNextIdea = async (onProgress?: (log: string) => void): Promise<BusinessIdea> => {
    // Route to appropriate handler based on config
    if (currentConfig.provider === 'local') {
        return generateWithLocalAI(onProgress);
    } else {
        return generateWithGemini(onProgress);
    }
};


// --- GEMINI IMPLEMENTATION ---
const generateWithGemini = async (onProgress?: (log: string) => void): Promise<BusinessIdea> => {
  try {
    if (onProgress) onProgress("Initializing Google Gemini Researcher...");

    const targetSector = DIVERSE_DOMAINS[Math.floor(Math.random() * DIVERSE_DOMAINS.length)];
    console.log(`Gemini Targeting sector: ${targetSector}`);
    if (onProgress) onProgress(`Targeting High-Growth Sector: ${targetSector}`);

    if (onProgress) onProgress(`Deep diving into ${targetSector} trends & pain points...`);
    
    const searchResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Perform a specific search for rising trends, customer complaints, and unmet needs specifically within the "${targetSector}" sector for late 2024 and 2025.
      Identify a specific problem that is currently unsolved or poorly solved in this niche.
      Return a summary text describing:
      1. The Primary Trend in ${targetSector}.
      2. Key problems/pain points based on search results.
      3. Emerging keywords associated with this trend.`,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const trendContext = searchResponse.text;
    if (!trendContext) return DEFAULT_IDEA;

    if (onProgress) onProgress("Analyzing search signals and identifying market gaps...");
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
      
      Ensure the tone is professional, exciting, and data-driven.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: businessIdeaSchema,
        temperature: 0.75
      }
    });

    const mainIdeaRes = await mainIdeaPromise;
    if (onProgress) onProgress("Calculating opportunity scores and metrics...");
    
    let mainIdea = mainIdeaRes.text ? JSON.parse(mainIdeaRes.text) : DEFAULT_IDEA;
    mainIdea = { 
        ...mainIdea, 
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        isSimulated: false // Explicitly mark as Live
    };
    
    if (onProgress) onProgress("Finalizing report generation...");
    return mainIdea;

  } catch (error) {
    console.error("Error generating idea:", error);
    return DEFAULT_IDEA;
  }
};

// --- LOCAL AI IMPLEMENTATION ---
const generateWithLocalAI = async (onProgress?: (log: string) => void): Promise<BusinessIdea> => {
    try {
        if (onProgress) onProgress(`Initializing Local AI (${currentConfig.localModelName})...`);

        const targetSector = DIVERSE_DOMAINS[Math.floor(Math.random() * DIVERSE_DOMAINS.length)];
        if (onProgress) onProgress(`Targeting High-Growth Sector: ${targetSector}`);

        let trendContext = "";
        let isSimulated = true;

        // --- HYBRID SEARCH MODE ---
        // If enabled, use Gemini for the Search Step, then switch to Local AI for Synthesis
        if (currentConfig.enableHybridSearch) {
            try {
                if (onProgress) onProgress("HYBRID MODE: Fetching Real-Time Google Data...");
                
                const searchResponse = await ai.models.generateContent({
                  model: MODEL_NAME,
                  contents: `Perform a specific search for rising trends, customer complaints, and unmet needs specifically within the "${targetSector}" sector for late 2024 and 2025.
                  Identify a specific problem that is currently unsolved or poorly solved in this niche.
                  Return a summary text describing:
                  1. The Primary Trend in ${targetSector}.
                  2. Key problems/pain points based on search results.
                  3. Emerging keywords associated with this trend.`,
                  config: {
                    tools: [{ googleSearch: {} }],
                  }
                });
                
                if (searchResponse.text) {
                    trendContext = searchResponse.text;
                    isSimulated = false; // We have real data!
                    if (onProgress) onProgress("Real-Time Data Acquired. Switching to Local AI...");
                }
            } catch (e) {
                console.warn("Hybrid search failed, falling back to simulation:", e);
                if (onProgress) onProgress("Hybrid Search Failed. Falling back to Simulation...");
            }
        }

        // Fallback: Simulate Research if Hybrid failed or disabled
        if (!trendContext) {
            if (onProgress) onProgress("Simulating market research from training data...");
            
            const contextPrompt = `You are an expert market researcher.
            Topic: ${targetSector}.
            Task: Identify a specific, high-potential gap or problem in this sector based on your knowledge of 2024/2025 trends.
            Output: A concise summary of the problem, the trend driving it, and why existing solutions fail.`;

            const simulatedContext = await callLocalAI([{ role: 'user', content: contextPrompt }], false);
            if (!simulatedContext) return DEFAULT_IDEA;
            trendContext = simulatedContext;
        }

        // Local Step 2: Synthesis
        if (onProgress) onProgress("Synthesizing business concept...");

        const jsonPrompt = `You are a venture capitalist. Based on this market gap:
        "${trendContext}"
        
        Generate a detailed JSON object for a startup idea.
        
        IMPORTANT: Return ONLY valid JSON. No markdown formatting.
        
        Structure required:
        {
            "title": "Startup Name",
            "tags": ["Tag1", "Tag2"],
            "oneLiner": "Detailed 40-50 word summary.",
            "description": "Full description.",
            "whyNow": "Why is timing right?",
            "marketGap": "What is missing?",
            "executionPlan": ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"],
            "growthPercentage": 120,
            "currentVolume": "10k",
            "volumeNote": "Qualitative note",
            "keyword": "Main SEO Keyword",
            "chartData": [
                {"year": "2022", "volume": 10},
                {"year": "2023", "volume": 40},
                {"year": "2024", "volume": 80},
                {"year": "2025", "volume": 150}
            ],
            "opportunityScore": 8,
            "problemSeverity": 9,
            "feasibilityScore": 7,
            "timingScore": 8,
            "businessFits": [
                { "label": "Market Need", "value": "High", "subtext": "...", "color": "text-emerald-500", "tooltip": "..." },
                { "label": "Innovation", "value": "High", "subtext": "...", "color": "text-blue-500", "tooltip": "..." },
                { "label": "Regulatory Alignment", "value": "Safe", "subtext": "...", "color": "text-emerald-500", "tooltip": "..." },
                { "label": "Social Impact", "value": "Medium", "subtext": "...", "color": "text-orange-500", "tooltip": "..." }
            ],
            "communitySignals": [
                { "source": "Reddit", "stats": "...", "score": "8/10" }
            ],
            "communityDeepDive": {
                "sentimentScore": 75,
                "sentimentBreakdown": { "positive": 60, "neutral": 30, "negative": 10 },
                "topKeywords": ["key1", "key2"],
                "discussions": [
                    { "author": "user1", "text": "quote", "platform": "Reddit", "sentiment": "negative" }
                ],
                "platformBreakdown": [
                    { "name": "Reddit", "activityLevel": "High", "userIntent": "Venting" }
                ]
            },
            "categories": {
                "type": "SaaS", "market": "B2B", "target": "SMBs", "competitor": "CompName"
            }
        }`;

        const jsonResponse = await callLocalAI([
            { role: 'system', content: "You are a JSON generator. Output only valid JSON." },
            { role: 'user', content: jsonPrompt }
        ], true);

        if (onProgress) onProgress("Finalizing report...");
        
        let mainIdea = extractJson(jsonResponse || "{}");
        
        // Fallback if JSON failed
        if (!mainIdea || !mainIdea.title) return DEFAULT_IDEA;

        mainIdea = { 
            ...mainIdea, 
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            isSimulated: isSimulated // Use our tracking flag
        };
        return mainIdea as BusinessIdea;

    } catch (e) {
        console.error("Local AI Error:", e);
        return DEFAULT_IDEA;
    }
}

// --- OTHER TOOLS ---
// Note: We need to wrap these similarly if we want them to work with Local AI, 
// but for brevity, I'm applying the same pattern to `generateResearchReport` as an example.

export const generateResearchReport = async (query: string): Promise<ResearchReport | null> => {
    // Local AI fallback
    if (currentConfig.provider === 'local') {
        const prompt = `Generate a hypothetical Market Research Report JSON for the idea: "${query}".
        Include "summary", "swot" (strengths, weaknesses, opportunities, threats), "competitors" (name, price, description), "marketSize" (tam, sam, som, explanation), and "verdict".
        Return ONLY JSON.`;
        
        const res = await callLocalAI([{ role: 'user', content: prompt }]);
        return extractJson(res || "{}");
    }

    // Gemini Flow
    try {
        const searchResponse = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: `Research the market viability, competitors, and trends for the following business idea: "${query}".`,
            config: { tools: [{ googleSearch: {} }] }
        });
        const researchContext = searchResponse.text;

        const reportResponse = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: `Based on: ${researchContext}\n\nGenerate a detailed "Research Report" in JSON format for "${query}".\nInclude SWOT, Competitors, Market Size, Verdict.`,
            config: { responseMimeType: "application/json", responseSchema: (researchReportSchema as any) }
        });
        return reportResponse.text ? JSON.parse(reportResponse.text) : null;
    } catch (e) {
        return null;
    }
};

// Stub functions for other tools to use the correct provider in a full implementation
export const generateBrandIdentity = async (idea: BusinessIdea): Promise<BrandIdentity | null> => {
    // Simplified for brevity: In a full prod app, replicate the 'if local' check here
    // For now, defaulting to Gemini or returning null if local to avoid crash
    if (currentConfig.provider === 'local') return null; 
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
    if (currentConfig.provider === 'local') return null;
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
    if (currentConfig.provider === 'local') return null;
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
    if (currentConfig.provider === 'local') return null;
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
