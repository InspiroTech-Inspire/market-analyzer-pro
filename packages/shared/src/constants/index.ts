export const TIMEFRAMES = [1D, 4H, 1H, 30m, 15m, 5m] as const
export type Timeframe = typeof TIMEFRAMES[number]

export const ASSET_TYPES = [stock, crypto, etf, forex] as const
export type AssetType = typeof ASSET_TYPES[number]

export const SIGNAL_TYPES = [bullish, bearish, neutral] as const
export type SignalType = typeof SIGNAL_TYPES[number]

export const DEFAULT_SYMBOLS = [
  AAPL, MSFT, GOOGL, AMZN, META, TSLA, NVDA,
  SPY, QQQ, DIA, BTC-USD, ETH-USD, SOL-USD,
  XRP-USD, ADA-USD
]

export const API_ENDPOINTS = {
  QUOTE: /api/market-data/quote,
  CHART: /api/market-data/chart,
  SEARCH: /api/market-data/search,
  TECHNICAL_ANALYSIS: /api/analysis/technical,
  MULTI_TIMEFRAME: /api/analysis/multi-timeframe,
  SCANNER: /api/analysis/scanner,
  WATCHLIST: /api/watchlist,
}

export const SCORE_THRESHOLDS = {
  STRONG_BULLISH: 50,
  MODERATE_BULLISH: 20,
  STRONG_BEARISH: -50,
  MODERATE_BEARISH: -20,
}

export const INDICATOR_DEFAULT_PERIODS = {
  SMA: [20, 50],
  EMA: [12, 26],
  RSI: 14,
  MACD: { fast: 12, slow: 26, signal: 9 },
  STOCHASTIC: { period: 14, signalPeriod: 3 },
  BOLLINGER: { period: 20, stdDev: 2 },
  ATR: 14,
}