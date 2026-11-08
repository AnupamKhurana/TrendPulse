# 💡 TrendPulse — AI Startup Ideation & Market Intelligence Dashboard

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-API-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Ollama](https://img.shields.io/badge/Ollama-Local_LLM-000000?style=for-the-badge&logo=ollama&logoColor=white)](https://ollama.ai)
[![Recharts](https://img.shields.io/badge/Charts-Recharts-22b5bf?style=for-the-badge)](https://recharts.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

An interactive, AI-powered market intelligence and startup ideation platform that discovers high-potential product niches, analyzes search volume trends, conducts community sentiment deep-dives across Reddit and TikTok, and synthesizes complete go-to-market execution roadmaps. Features **Dual-LLM architecture** supporting both **Google Gemini** and **local offline LLMs** (Ollama / llama.cpp).

---

## ✨ Features & Capabilities

```
  ┌─────────────────────────────────────────────────────────────┐
  │                 TrendPulse Intelligence Engine              │
  └───────────────┬─────────────────────────────┬───────────────┘
                  ▼                             ▼
       [ Google Gemini Cloud ]       [ Local LLM / Ollama ]
                  │                             │
    ┌─────────────┴─────────────────────────────┴─────────────┐
    ▼                         ▼                               ▼
1. Trend & Ideation     2. Sentiment Signals          3. Builder Studio
   • Search Trajectory     • Reddit/TikTok/LinkedIn      • Brand Identity
   • Timing & Scores       • Pain Points & Intent        • MVP Architecture
   • Opportunity Gaps      • Community Sentiment         • 4-Week Dev Plan
```

### 1. 🔍 Trend Detection & Business Scoring
- **Search Growth Trajectory**: Monitors keyword demand curves and visualizes historical interest with Recharts.
- **AI Viability Scoring**: Computes instant scores for Market Timing, Opportunity Size, Technical Feasibility, and Problem Severity.
- **Launch Rationalization**: Delivers clear "Why Now" market theses and phased execution playbooks.

### 2. 🧬 Community Sentiment & Social Signals
- **Multi-Platform Scraping Synthesis**: Synthesizes real community intent across **Reddit**, **TikTok**, and **LinkedIn**.
- **Pain Point Extraction**: Categorizes comments into "Complaints", "Seeking Advice", or "Buying Intent" to isolate real friction points.

### 3. 📊 Market Sizing & Competitive Audits
- **TAM / SAM / SOM Models**: Generates automated market size estimations.
- **Dynamic SWOT Frameworks**: Evaluates Strengths, Weaknesses, Opportunities, and Threats for any concept.
- **Competitor Matrices**: Identifies incumbents, product gaps, and pricing benchmarks.

### 4. 🏗️ Founder Studio & MVP Blueprint
- **Brand Identity & Copywriting**: Creates brand names, color palettes, tagline variations, and conversion-optimized hero copy.
- **Technical MVP Specifications**: Auto-generates recommended tech stacks, database schemas, API routes, and 4-week sprint milestones.
- **Ad Campaigns**: Generates targeted copy for Google Ads, Facebook, and LinkedIn sponsored content.

---

## 🛠️ Dual-LLM Modes

Switch between inference engines directly from the **Settings Modal** inside the app:

1. **Google Gemini (Cloud)**: Lightning-fast reasoning and structured JSON output using Gemini models (`gemini-2.0-flash` / `gemini-1.5-pro`).
2. **Local LLM (Private & Free)**: Route all analysis through local endpoints via [Ollama](https://ollama.ai) (`http://localhost:11434/v1`) or [llama.cpp](https://github.com/ggerganov/llama.cpp) (`http://localhost:8080/v1`).

---

## 📂 Project Structure

```text
TrendPulse/
├── components/          # Reusable UI components
│   ├── Header.tsx       # Navigation and dashboard header
│   ├── IdeaHero.tsx     # Hero card & market opportunity scores
│   ├── TrendChart.tsx   # Interactive Recharts volume graph
│   └── SettingsModal.tsx# AI Provider switcher (Gemini vs. Local LLM)
├── pages/               # Primary dashboard views
│   ├── ResearchPage.tsx # TAM/SAM/SOM, SWOT, and competitor analysis
│   ├── BuildPage.tsx    # Brand kits, MVP technical specs, and ad campaigns
│   ├── SignalsPage.tsx  # Social sentiment & customer pain point explorer
│   └── SavedPage.tsx    # Saved startup concepts library
├── services/
│   └── geminiService.ts # Dual-LLM dispatch layer
├── types.ts             # TypeScript interfaces and models
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies & scripts
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ and npm
- (Optional) Google Gemini API key or a local Ollama instance

### 1. Clone & Install
```bash
git clone https://github.com/AnupamKhurana/TrendPulse.git
cd TrendPulse
npm install
```

### 2. Configure Environment (Optional for Cloud Mode)
Create a `.env.local` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If using local Ollama, you can skip this step and configure the local host URL inside the in-app Settings modal).*

### 3. Launch Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

---

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
