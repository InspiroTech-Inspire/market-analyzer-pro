import { Card, CardContent, CardHeader, CardTitle } from @/components/ui/card
import { Progress } from @/components/ui/progress
import { Badge } from @/components/ui/badge
import { TrendingUp, TrendingDown, Activity } from lucide-react
import { getSignalColor, getSignalBgColor } from @/lib/utils

function IndicatorsPanel({ symbol }) {
  const indicators = {
    trend: { score: 67, sma20: 195.23, sma50: 192.45, ema12: 196.78, ema26: 194.32, goldenCross: true, deathCross: false },
    momentum: { score: 45, rsi: 58.3, macd: 1.23, signal: 0.98, histogram: 0.25, stochasticK: 67.8, stochasticD: 65.4 },
    volatility: { score: -12, bollingerUpper: 200.12, bollingerMiddle: 195.45, bollingerLower: 190.78, atr: 2.34, bbWidth: 9.34, bbPercentB: 0.45 },
    volume: { score: 23, current: 12345678, average: 10234567, spike: true },
    overall: { score: 54, signal: bullish },
  }

  const scoreCards = [
    { label: Trend, score: indicators.trend.score, color: getSignalColor(indicators.trend.score) },
    { label: Momentum, score: indicators.momentum.score, color: getSignalColor(indicators.momentum.score) },
    { label: Volatility, score: indicators.volatility.score, color: getSignalColor(indicators.volatility.score) },
    { label: Volume, score: indicators.volume.score, color: getSignalColor(indicators.volume.score) },
    { label: Overall, score: indicators.overall.score, color: getSignalColor(indicators.overall.score) },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Technical Indicators for {symbol}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {scoreCards.map((card) => (
          <Card key={card.label} className={getSignalBgColor(card.score)}>
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">{card.label}</CardTitle></CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ color: card.color }}>{card.score > 0 ? + :  }{card.score}</div>
              <Progress value={Math.abs(card.score)} className="h-1 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" />Trend Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between"><span>SMA 20</span><span className="font-medium">{indicators.trend.sma20.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>SMA 50</span><span className="font-medium">{indicators.trend.sma50.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>EMA 12</span><span className="font-medium">{indicators.trend.ema12.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>EMA 26</span><span className="font-medium">{indicators.trend.ema26.toFixed(2)}</span></div>
            </div>
            <div className="flex gap-2 pt-2">
              {indicators.trend.goldenCross && <Badge variant="outline" className="bg-success/10 text-success">Golden Cross</Badge>}
              {indicators.trend.deathCross && <Badge variant="outline" className="bg-destructive/10 text-destructive">Death Cross</Badge>}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5" />Momentum Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between"><span>RSI (14)</span><span className="font-medium">{indicators.momentum.rsi.toFixed(1)}</span></div>
              <div className="flex justify-between"><span>MACD</span><span className="font-medium">{indicators.momentum.macd.toFixed(3)}</span></div>
              <div className="flex justify-between"><span>Signal Line</span><span className="font-medium">{indicators.momentum.signal.toFixed(3)}</span></div>
              <div className="flex justify-between"><span>Stochastic %K</span><span className="font-medium">{indicators.momentum.stochasticK.toFixed(1)}</span></div>
              <div className="flex justify-between"><span>Stochastic %D</span><span className="font-medium">{indicators.momentum.stochasticD.toFixed(1)}</span></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingDown className="w-5 h-5" />Volatility Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between"><span>Bollinger Upper</span><span className="font-medium">{indicators.volatility.bollingerUpper.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Bollinger Middle</span><span className="font-medium">{indicators.volatility.bollingerMiddle.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Bollinger Lower</span><span className="font-medium">{indicators.volatility.bollingerLower.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>ATR (14)</span><span className="font-medium">{indicators.volatility.atr.toFixed(2)}</span></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5" />Volume Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between"><span>Current Volume</span><span className="font-medium">{indicators.volume.current.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Average Volume</span><span className="font-medium">{indicators.volume.average.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Volume Ratio</span><span className="font-medium">{(indicators.volume.current / indicators.volume.average).toFixed(2)}x</span></div>
            </div>
            {indicators.volume.spike && <Badge variant="outline" className="bg-warning/10 text-warning">Volume Spike Detected</Badge>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default IndicatorsPanel