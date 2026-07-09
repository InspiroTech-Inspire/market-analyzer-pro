interface PatternDetectionInput { prices: number[]; indicators: any; }

export function detectPatterns(input: PatternDetectionInput): any {
  const { prices, indicators } = input;
  return {
    doubleTop: detectDoubleTopBottom(prices, true),
    doubleBottom: detectDoubleTopBottom(prices, false),
    higherHighs: detectHigherHighsLowerLows(prices, true),
    lowerLows: detectHigherHighsLowerLows(prices, false),
    volumeSpikes: indicators.volume.spikes.some((s: boolean) => s),
    pivotPoints: calculatePivotPoints(prices),
    trendlines: detectTrendlines(prices),
  };
}

function detectDoubleTopBottom(prices: number[], isTop: boolean): boolean {
  if (prices.length < 10) return false;
  const last10 = prices.slice(-10);
  if (isTop) {
    const peaks = findPeaks(last10, true);
    if (peaks.length >= 2) return Math.abs(peaks[peaks.length - 1].value - peaks[peaks.length - 2].value) < 0.02;
  } else {
    const valleys = findPeaks(last10, false);
    if (valleys.length >= 2) return Math.abs(valleys[valleys.length - 1].value - valleys[valleys.length - 2].value) < 0.02;
  }
  return false;
}

function findPeaks(prices: number[], isPeak: boolean): { index: number; value: number }[] {
  const peaks: { index: number; value: number }[] = [];
  for (let i = 1; i < prices.length - 1; i++) {
    if (isPeak && prices[i] > prices[i - 1] && prices[i] > prices[i + 1]) peaks.push({ index: i, value: prices[i] });
    else if (!isPeak && prices[i] < prices[i - 1] && prices[i] < prices[i + 1]) peaks.push({ index: i, value: prices[i] });
  }
  return peaks;
}

function detectHigherHighsLowerLows(prices: number[], isHigher: boolean): boolean {
  if (prices.length < 5) return false;
  const last5 = prices.slice(-5);
  if (isHigher) {
    for (let i = 1; i < last5.length; i++) if (last5[i] <= last5[i - 1]) return false;
    return true;
  } else {
    for (let i = 1; i < last5.length; i++) if (last5[i] >= last5[i - 1]) return false;
    return true;
  }
}

function calculatePivotPoints(prices: number[]): { resistance: number[]; support: number[] } {
  if (prices.length < 3) return { resistance: [], support: [] };
  const last3 = prices.slice(-3);
  const high = Math.max(...last3); const low = Math.min(...last3); const close = last3[last3.length - 1];
  const pivot = (high + low + close) / 3;
  return { resistance: [2 * pivot - low, pivot + (high - low)], support: [2 * pivot - high, pivot - (high - low)] };
}

function detectTrendlines(prices: number[]): any {
  const resistance = []; const support = [];
  const recentHigh = Math.max(...prices.slice(-10)); const highIndex = prices.lastIndexOf(recentHigh);
  if (highIndex > 0) resistance.push({ start: highIndex - 5, end: highIndex, strength: 0.8 });
  const recentLow = Math.min(...prices.slice(-10)); const lowIndex = prices.lastIndexOf(recentLow);
  if (lowIndex > 0) support.push({ start: lowIndex - 5, end: lowIndex, strength: 0.8 });
  return { resistance, support };
}