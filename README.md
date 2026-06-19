<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 💡 TrendPulse

**TrendPulse** is an AI-powered trend analysis and startup ideation platform. It leverages Large Language Models (Google Gemini) to identify rising market search patterns, formulate viable business opportunities, analyze market demand, map out tech architectures, and generate actionable launch roadmaps.

---

## 🚀 Key Features

- **🔍 Trend Signal Analysis**: Scans rising search patterns and market movements to identify under-the-radar startup opportunities.
- **📊 Business Model Generation**: Automatically generates complete startup profiles including mission, value proposition, target demographic, and market sizing.
- **💰 Dynamic Pricing Architectures**: Formulates tailored tiered subscription plans (Free/Hobby, Pro, Enterprise) for generated ideas.
- **🏗️ Tech Stack Recommendations**: Designs complete software architecture blueprints, identifying the optimal backend, frontend, database, and infrastructure choices.
- **🗺️ Actionable MVP Roadmaps**: Structures phased milestones from setup to launch, helping founders build from zero to one.
- **📁 Saved Ideas & Library**: Keep track of generated concepts, explore history, and evaluate past startup options.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, TailwindCSS
- **AI Engine**: Google Gemini API via Google AI Studio SDK

---

## 📋 Prerequisites

Ensure you have the following installed locally:
1. **Node.js 18+**
2. **npm** (comes packaged with Node.js)

---

## ⚙️ Running Locally

Follow these quick steps to get TrendPulse up and running on your system:

### 1. Clone & Navigate
```bash
git clone https://github.com/AnupamKhurana/TrendPulse.git
cd TrendPulse
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Key
Create a `.env.local` file in the root directory and add your Gemini API Key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> *You can obtain an API key for free from [Google AI Studio](https://aistudio.google.com/).*

### 4. Run the Dev Server
```bash
npm run dev
```
The application will start, usually serving on [http://localhost:5173](http://localhost:5173).

---

## 📂 Project Structure

```
TrendPulse/
├── components/          # Reusable UI elements (Header, Footer, modals, etc.)
├── pages/               # Main dashboard views (Research, Build, Signals, etc.)
├── services/            # Gemini API client and generation logic
├── types/               # TypeScript interfaces and default state schemas
├── index.html           # HTML entry point
├── App.tsx              # Application layout and router
└── vite.config.ts       # Vite project settings
```
