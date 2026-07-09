export interface Symbol {
  symbol: string
  name: string
  assetType: stock | crypto | etf | forex
  exchange?: string
  currency?: string
}

export interface PriceData {
  timestamp: string | Date
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface TechnicalIndicators {
  trend: {
    sma20: number
    sma50: number
    ema12: number
    ema26: number
    goldenCross: boolean
    deathCross: boolean
  }
  momentum: {
    rsi14: number
    macd: number
    signalLine: number
    histogram: number
    stochasticK: number
    stochasticD: number
  }
  volatility: {
    bollingerUpper: number
    bollingerMiddle: number
    bollingerLower: number
    atr14: number
    bbWidth: number
    bbPercentB: number
  }
  volume: {
    current: number
    average: number
    spike: boolean
  }
}

export interface PatternDetection {
  doubleTop: boolean
  doubleBottom: boolean
  higherHighs: boolean
  lowerLows: boolean
  volumeSpikes: boolean
  pivotPoints: {
    resistance: number[]
    support: number[]
  }
  trendlines: {
    resistance: Array<{ start: number; end: number; strength: number }>
    support: Array<{ start: number; end: number; strength: number }>
  }
}

export interface TimeframeAnalysis {
  timeframe: string
  trendScore: number
  momentumScore: number
  volatilityScore: number
  volumeScore: number
  overallScore: number
  indicators: TechnicalIndicators
  patterns: PatternDetection
}

export interface MultiTimeframeResult {
  symbol: string
  timeframes: TimeframeAnalysis[]
  overallAlignment: number
  signalFlow: SignalFlowNode[]
  narrative: string
}

export interface SignalFlowNode {
  timeframe: string
  score: number
  signal: bullish | bearish | neutral
  children: SignalFlowNode[]
}