import { calculateTechnicalIndicators } from './technicalAnalysis';

interface TimeframeAnalysis {
  timeframe: string;
  trendScore: number;
  momentumScore: number;
  volatilityScore: number;
  volumeScore: number;
  overallScore: number;
  indicators: any;
  patterns: any;
}

export async function performMultiTimeframeAnalysis(params: { symbol: string; timeframes: string[]; data: Record<string, any> }) {
  const { symbol, timeframes, data } = params;
  const analyses: TimeframeAnalysis[] = [];
  let totalScore = 0;
  
  for (const tf of timeframes) {
    const tfData = data[tf];
    if (!tfData) continue;
    
    const indicators = calculateTechnicalIndicators({
      prices: tfData.prices,
      volumes: tfData.volumes,
      timestamps: tfData.timestamps,
    });
    
    const trendScore = calculateTrendScore(indicators);
    const momentumScore = calculateMomentumScore(indicators);
    const volatilityScore = calculateVolatilityScore(indicators);
    const volumeScore = calculateVolumeScore(indicators);
    const overallScore = trendScore * 0.35 + momentumScore * 0.30 + volatilityScore * 0.20 + volumeScore * 0.15;
    totalScore += overallScore;
    
    analyses.push({
      timeframe: tf,
      trendScore,
      momentumScore,
      volatilityScore,
      volumeScore,
      overallScore,
      indicators,
      patterns: detectPatternsFromIndicators(indicators),
    });
  }
  
  const avgScore = totalScore / analyses.length;
  const alignment = (Math.abs(avgScore) / 100) * 100;
  const signalFlow = buildSignalFlow(analyses);
  const narrative = generateNarrative(analyses, alignment);
  
  return { symbol, timeframes: analyses, overallAlignment: alignment, signalFlow, narrative };
}

function calculateTrendScore(indicators: any): number {
  let score = 0;
  const lastSma20 = indicators.sma.sma20[indicators.sma.sma20.length - 1];
  const lastSma50 = indicators.sma.sma50[indicators.sma.sma50.length - 1];
  if (lastSma20 > lastSma50) score += 20; else if (lastSma20 < lastSma50) score -= 20;
  if (indicators.sma.goldenCross) score += 30; if (indicators.sma.deathCross) score -= 30;
  const lastEma12 = indicators.ema.ema12[indicators.ema.ema12.length - 1];
  const lastEma26 = indicators.ema.ema26[indicators.ema.ema26.length - 1];
  if (lastEma12 > lastEma26) score += 20; else if (lastEma12 < lastEma26) score -= 20;
  return Math.min(100, Math.max(-100, score));
}

function calculateMomentumScore(indicators: any): number {
  let score = 0;
  const lastRsi = indicators.rsi.rsi14[indicators.rsi.rsi14.length - 1];
  if (lastRsi > 50) score += (lastRsi - 50) * 2; else if (lastRsi < 50) score -= (50 - lastRsi) * 2;
  const lastMacd = indicators.macd.macdLine[indicators.macd.macdLine.length - 1];
  const lastSignal = indicators.macd.signalLine[indicators.macd.signalLine.length - 1];
  if (lastMacd > lastSignal) score += 15; else if (lastMacd < lastSignal) score -= 15;
  return Math.min(100, Math.max(-100, score));
}

function calculateVolatilityScore(indicators: any): number {
  const avgVolatility = indicators.atr.volatility.reduce((sum: number, v: number) => sum + v, 0) / indicators.atr.volatility.length;
  return Math.min(100, Math.max(-100, (avgVolatility / 5) * 100));
}

function calculateVolumeScore(indicators: any): number {
  const spikeCount = indicators.volume.spikes.filter((s: boolean) => s).length;
  return Math.min(100, Math.max(-100, (spikeCount / indicators.volume.spikes.length) * 100));
}

function detectPatternsFromIndicators(indicators: any): any {
  const prices = indicators.sma.sma20;
  return {
    doubleTop: detectDoublePattern(prices, true),
    doubleBottom: detectDoublePattern(prices, false),
    higherHighs: detectHigherHighs(prices),
    lowerLows: detectLowerLows(prices),
  };
}

function detectDoublePattern(prices: number[], isTop: boolean): boolean {
  if (prices.length < 5) return false;
  const last5 = prices.slice(-5);
  if (isTop) return last5[0] > last5[1] && last5[1] < last5[2] && last5[2] > last5[3] && last5[3] < last5[4] && Math.abs(last5[2] - last5[4]) < 0.01;
  else return last5[0] < last5[1] && last5[1] > last5[2] && last5[2] < last5[3] && last5[3] > last5[4] && Math.abs(last5[2] - last5[4]) < 0.01;
}

function detectHigherHighs(prices: number[]): boolean {
  if (prices.length < 3) return false;
  return prices[prices.length - 1] > prices[prices.length - 2] && prices[prices.length - 2] > prices[prices.length - 3];
}

function detectLowerLows(prices: number[]): boolean {
  if (prices.length < 3) return false;
  return prices[prices.length - 1] < prices[prices.length - 2] && prices[prices.length - 2] < prices[prices.length - 3];
}

function buildSignalFlow(analyses: TimeframeAnalysis[]): any {
  const root = {
    timeframe: 'ROOT',
    score: analyses.reduce((sum, a) => sum + a.overallScore, 0) / analyses.length,
    signal: getSignal(analyses.reduce((sum, a) => sum + a.overallScore, 0) / analyses.length),
    children: analyses.map(a => ({ timeframe: a.timeframe, score: a.overallScore, signal: getSignal(a.overallScore), children: [] })),
  };
  return [root];
}

function getSignal(score: number): 'bullish' | 'bearish' | 'neutral' {
  if (score > 20) return 'bullish'; if (score < -20) return 'bearish'; return 'neutral';
}

function generateNarrative(analyses: TimeframeAnalysis[], alignment: number): string {
  const highestTf = analyses[0];
  const lowestTf = analyses[analyses.length - 1];
  let narrative = `Multi-timeframe analysis for ${analyses.length} timeframes shows ${alignment > 70 ? 'strong' : alignment > 50 ? 'moderate' : 'weak'} alignment with ${alignment.toFixed(1)}%. `;
  if (highestTf.overallScore > 0) narrative += 'Higher timeframes show bullish bias. '; else narrative += 'Higher timeframes show bearish bias. ';
  if (lowestTf.overallScore > highestTf.overallScore) narrative += 'Lower timeframes are more bullish.'; else if (lowestTf.overallScore < highestTf.overallScore) narrative += 'Lower timeframes are more bearish.'; else narrative += 'All timeframes are in agreement.';
  return narrative;
}