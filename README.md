# 💡 TrendPulse — AI Startup Ideation & Market Intelligence Dashboard

**TrendPulse** is a feature-rich, interactive web application designed to analyze search volume trends, evaluate business feasibility, run community sentiment deep-dives, and generate comprehensive startup launch roadmaps using advanced AI logic.

It features **dual-LLM integration**, allowing you to run predictions either using **Google Gemini** or a **local LLM instance** (like Ollama or llama.cpp) running on your own hardware.

---

## ✨ Features & Capabilities

### 1. 🔍 Trend Detection & Ideation
- **Live Search Signals**: Reviews search volumes, growth trajectory percentages, and market gaps to present viable product niches.
- **AI Core Scores**: Generates timing, timing feasibility, opportunity, and problem-severity scores (rated out of 10) dynamically.
- **Why Now & Execution Plan**: Outlines concrete reasons to launch immediately and presents a structured 5-step go-to-market plan.

### 2. 🧬 Community Deep-Dive (Signals)
- **Sentiment Tracker**: Generates sentiment metrics (Positive, Neutral, Negative) on community discussions.
- **Platform Breakdown**: Analyzes user activity level and intent (e.g. "Seeking Advice", "Complaining", "Buying") across **Reddit**, **TikTok**, and **LinkedIn**.
- **Sample Discussion Engine**: Creates simulated user testimonies/concerns to showcase the exact pain points being addressed.

### 3. 📊 Market Research & Competitor Analysis
- **TAM, SAM, SOM Sizing**: Generates Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM) metrics.
- **SWOT Analysis**: Identifies Strengths, Weaknesses, Opportunities, and Threats for any query.
- **Competitor Matrix**: Compiles top competitors, their pricing models, and key descriptions.

### 4. 🏗️ Builder Studio (Build Page)
- **Brand Identity**: Suggests brand names, slogans, logo concepts, Hex color palettes, typography, and brand voice guidelines.
- **Landing Page Copy**: Generates ready-to-use headlines, subheadlines, primary CTAs, and benefits lists.
- **MVP Technical Specifications**: Recommends a custom tech stack, core database schemas, API routes, user stories, and a 4-week development roadmap.
- **Ad Creative Builder**: Outlines platform-specific campaigns (Facebook, LinkedIn, Google Search) with headlines, visual prompts, and target audiences.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **Charting Engine**: Recharts (for trend visualization)
- **Icons**: Lucide React
- **AI Backend**: 
  - **Gemini API** (via Google AI Studio SDK)
  - **Local LLM support** (Ollama/llama.cpp compatible)

---

## ⚙️ Configuration & Dual-LLM Modes

TrendPulse supports flexible LLM architectures which you can toggle from the **Settings Modal** in the UI:

1. **Google Gemini Mode** (Recommended):
   - Fast, high-accuracy inference using official Google Gemini models.
   - Requires setting `GEMINI_API_KEY` in your `.env.local` file.
   
2. **Local LLM Mode**:
   - Run completely locally using Ollama, llama.cpp, or LM Studio.
   - Compatible with models like `gemma3`, `llama3.1`, or `mistral`.
   - Requires configuring your local endpoint (e.g. `http://localhost:11434/v1` or `http://localhost:8080/v1`).
   
3. **Hybrid Search Mode**:
   - Uses Gemini for search analysis and falls back to your local LLM for code, text synthesis, and specification planning.

---

## 🚀 Installation & Running Locally

### 1. Clone the Repository
```bash
git clone https://github.com/AnupamKhurana/TrendPulse.git
cd TrendPulse
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` in the root of the project:
```env
# Google Gemini API key
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Start the Application
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your web browser.

---

## 📂 Folder Overview

```
TrendPulse/
├── components/          # React Components
│   ├── Header.tsx       # Core navigation and page switching
│   ├── IdeaHero.tsx     # The central business idea card & score panels
│   ├── TrendChart.tsx   # Recharts visualization of interest volume
│   └── SettingsModal.tsx# Handles API key & Local/Gemini provider toggle
├── pages/               # Dashboard View Layouts
│   ├── ResearchPage.tsx # TAM/SAM/SOM, SWOT, and competitor analysis
│   ├── BuildPage.tsx    # Brand, landing page copy, MVP specs, and ads
│   ├── SignalsPage.tsx  # Reddit/TikTok community sentiment analyzer
│   └── SavedPage.tsx    # Library of saved business concepts
├── services/
│   └── geminiService.ts # Dual-LLM router & API endpoints caller
├── types.ts             # TypeScript definitions for structures
└── vite.config.ts       # Vite config
```
