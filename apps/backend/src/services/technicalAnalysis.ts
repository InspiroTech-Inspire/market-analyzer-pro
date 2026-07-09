// Simple SMA calculation
function calculateSMA(prices: number[], period: number): number[] {
  const sma: number[] = [];
  for (let i = period - 1; i < prices.length; i++) {
    const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    sma.push(sum / period);
  }
  return sma;
}

// Simple EMA calculation
function calculateEMA(prices: number[], period: number): number[] {
  const ema: number[] = [];
  const multiplier = 2 / (period + 1);
  const sma = calculateSMA(prices, period);
  if (sma.length === 0) return [];
  ema.push(sma[0]);
  for (let i = period; i < prices.length; i++) {
    const prevEma = ema[ema.length - 1];
    const currentPrice = prices[i];
    const currentEma = (currentPrice - prevEma) * multiplier + prevEma;
    ema.push(currentEma);
  }
  return ema;
}

// Simple RSI calculation
function calculateRSI(prices: number[], period: number = 14): number[] {
  const rsi: number[] = [];
  for (let i = period; i < prices.length; i++) {
    let gains = 0;
    let losses = 0;
    for (let j = i - period + 1; j < i; j++) {
      const change = prices[j + 1] - prices[j];
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }
    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    const currentRsi = 100 - (100 / (1 + rs));
    rsi.push(currentRsi);
  }
  return rsi;
}

// Simple MACD calculation
function calculateMACD(prices: number[]): { macdLine: number[]; signalLine: number[]; histogram: number[] } {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  const macdLine: number[] = [];
  const signalLine: number[] = [];
  const histogram: number[] = [];
  for (let i = 0; i < Math.min(ema12.length, ema26.length); i++) {
    macdLine.push(ema12[i] - ema26[i]);
  }
  const signal = calculateEMA(macdLine, 9);
  for (let i = 0; i < signal.length; i++) {
    signalLine.push(signal[i]);
    histogram.push(macdLine[i + 8] - signal[i]);
  }
  return { macdLine, signalLine, histogram };
}

// Simple Stochastic Oscillator
function calculateStochastic(prices: number[], period: number = 14, signalPeriod: number = 3): { k: number[]; d: number[] } {
  const k: number[] = [];
  const d: number[] = [];
  for (let i = period; i < prices.length; i++) {
    const slice = prices.slice(i - period + 1, i + 1);
    const high = Math.max(...slice);
    const low = Math.min(...slice);
    const current = prices[i];
    const stochasticK = ((current - low) / (high - low)) * 100;
    k.push(stochasticK);
  }
  if (k.length >= signalPeriod) {
    for (let i = signalPeriod - 1; i < k.length; i++) {
      const sum = k.slice(i - signalPeriod + 1, i + 1).reduce((a, b) => a + b, 0);
      d.push(sum / signalPeriod);
    }
  }
  return { k, d };
}

// Simple Bollinger Bands
function calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2): { upper: number[]; middle: number[]; lower: number[] } {
  const upper: number[] = [];
  const middle: number[] = [];
  const lower: number[] = [];
  for (let i = period - 1; i < prices.length; i++) {
    const slice = prices.slice(i - period + 1, i + 1);
    const mean = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
    const std = Math.sqrt(variance);
    middle.push(mean);
    upper.push(mean + std * stdDev);
    lower.push(mean - std * stdDev);
  }
  return { upper, middle, lower };
}

// Simple ATR calculation
function calculateATR(highs: number[], lows: number[], closes: number[], period: number = 14): number[] {
  const tr: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    const highLow = highs[i] - lows[i];
    const highClose = Math.abs(highs[i] - closes[i - 1]);
    const lowClose = Math.abs(lows[i] - closes[i - 1]);
    tr.push(Math.max(highLow, highClose, lowClose));
  }
  const atr: number[] = [];
  for (let i = period - 1; i < tr.length; i++) {
    const sum = tr.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
    atr.push(sum / period);
  }
  return atr;
}

export function calculateTechnicalIndicators(input: { prices: number[]; volumes?: number[]; timestamps: string[] }) {
  const { prices, volumes = [], timestamps } = input;
  const sma20 = calculateSMA(prices, 20);
  const sma50 = calculateSMA(prices, 50);
  const goldenCross = detectCross(sma20, sma50, true);
  const deathCross = detectCross(sma20, sma50, false);
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);
  const rsi = calculateRSI(prices, 14);
  const overbought = rsi.map((r: number) => r > 70);
  const oversold = rsi.map((r: number) => r < 30);
  const macdResult = calculateMACD(prices);
  const bullish = macdResult.histogram.map((h: number) => h > 0);
  const bearish = macdResult.histogram.map((h: number) => h < 0);
  const stochastic = calculateStochastic(prices, 14, 3);
  const stochasticOverbought = stochastic.k.map((val: number) => val > 80);
  const stochasticOversold = stochastic.k.map((val: number) => val < 20);
  const bb = calculateBollingerBands(prices, 20, 2);
  const bbWidth = bb.upper.map((upper: number, i: number) => upper - bb.lower[i]);
  const bbPercentB = prices.map((price: number, i: number) => (price - bb.lower[i]) / (bb.upper[i] - bb.lower[i]));
  const atr = calculateATR(prices, prices, prices, 14);
  const volatility = atr.map((a: number, i: number) => a / prices[i + 14] * 100);
  const avgVolume = volumes.reduce((sum, v) => sum + v, 0) / volumes.length;
  const volumeSpikes = volumes.map((v: number) => v > avgVolume * 1.5);

  return {
    sma: { sma20, sma50, goldenCross, deathCross },
    ema: { ema12, ema26 },
    rsi: { rsi14: rsi, overbought, oversold },
    macd: { macdLine: macdResult.macdLine, signalLine: macdResult.signalLine, histogram: macdResult.histogram, bullish, bearish },
    stochastic: { k: stochastic.k, d: stochastic.d, overbought: stochasticOverbought, oversold: stochasticOversold },
    bollinger: { upper: bb.upper, middle: bb.middle, lower: bb.lower, width: bbWidth, percentB: bbPercentB },
    atr: { atr14: atr, volatility },
    volume: { spikes: volumeSpikes, average: avgVolume },
  };
}

function detectCross(series1: number[], series2: number[], bullish: boolean): boolean {
  if (series1.length < 2 || series2.length < 2) return false;
  const prev1 = series1[series1.length - 2];
  const prev2 = series2[series2.length - 2];
  const curr1 = series1[series1.length - 1];
  const curr2 = series2[series2.length - 1];
  if (bullish) return prev1 < prev2 && curr1 > curr2;
  else return prev1 > prev2 && curr1 < curr2;
}