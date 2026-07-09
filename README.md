# Market Analyzer Pro

> **⚡ Powerful Full-Stack Financial Analysis Platform**

A comprehensive trading analysis website with real-time market data, technical indicators, multi-timeframe analysis, and interactive dashboards.

## Features

### Technical Analysis Engine
- Trend Analysis: SMA 20/50, EMA 12/26, Golden/Death Cross detection
- Momentum Indicators: RSI 14, MACD, Stochastic Oscillator
- Volatility Analysis: Bollinger Bands, ATR
- Pattern Detection: Double Top/Bottom, Higher Highs/Lower Lows, Volume Spikes
- Support/Resistance: Automatic level detection + Pivot Points

### Multi-Timeframe Analysis
- Analyzes from 1D to 4H to 1H to 30m to 15m to 5m
- Individual timeframe scoring (-100 to +100)
- Overall signal alignment percentage
- Visual signal flow diagram
- Contextual narrative summary

### Dashboard Features
- TradingView Chart Widget: Full interactive charting
- Watchlist Panel: 14 default symbols with live P&L
- Symbol Search: Search any stock/crypto/ETF
- 5 Analysis Tabs: Chart, Indicators, Patterns, Top-Down, Scanner
- Scoring Cards: Visual trend/momentum/volatility/volume/overall scores
- Market Scanner: Filter by bullish/bearish signals across symbols

## Tech Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router DOM
- TanStack Query (React Query)
- tRPC Client
- Recharts (Charts)
- Framer Motion (Animations)

### Backend
- Hono (Web Framework)
- tRPC (Type-safe API)
- Drizzle ORM (Database)
- MySQL (Database)
- Axios (HTTP Client)

### Data Source
- Yahoo Finance API (Real-time market data)

## Quick Start

### Prerequisites
- Node.js 20+
- npm 10+
- MySQL 8+
- Docker (optional)

### 1. Clone Repository

git clone https://github.com/InspiroTech-Inspire/market-analyzer-pro.git
cd market-analyzer-pro

### 2. Install Dependencies
npm install

### 3. Set up Environment Variables

**apps/backend/.env**
DATABASE_URL=mysql://appuser:apppassword@localhost:3306/market_analyzer
PORT=3001
CORS_ORIGIN=http://localhost:5173
YAHOO_FINANCE_API_KEY=your_api_key

**apps/frontend/.env**
VITE_API_URL=http://localhost:3001

### 4. Set up Database
mysql -u root -p -e "CREATE DATABASE market_analyzer;"
cd apps/backend
npm run db:push

### 5. Start Development Servers
npm run dev

Open http://localhost:5173 in your browser.

## Docker Deployment

### 1. Build and Start Containers
docker-compose up -d --build

### 2. Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## License
MIT License