import { useState } from react
import { Card, CardContent, CardHeader, CardTitle } from @/components/ui/card
import { Progress } from @/components/ui/progress
import { Button } from @/components/ui/button
import { Clock, RefreshCw } from lucide-react
import { getSignalColor, getSignalBgColor } from @/lib/utils

function MultiTimeframePanel({ symbol }) {
  const [loading, setLoading] = useState(false)
  const timeframes = [1D, 4H, 1H, 30m, 15m, 5m]
  const analysis = timeframes.map((tf, index) => ({
    timeframe: tf,
    trendScore: [78, 65, 45, 32, 28, 22][index],
    momentumScore: [62, 58, 42, 35, 30, 25][index],
    volatilityScore: [-12, -8, -5, -3, -2, 0][index],
    volumeScore: [23, 18, 15, 12, 10, 8][index],
    overallScore: [54, 48, 35, 28, 25, 20][index],
    signal: [bullish, bullish, neutral, neutral, bearish, bearish][index],
  }))

  const overallAlignment = 68.5
  const signalFlow = {
    root: {
      timeframe: ROOT,
      score: 38.5,
      signal: bullish,
      children: analysis.map(a => ({ timeframe: a.timeframe, score: a.overallScore, signal: a.signal, children: [] })),
    },
  }

  const narrative = Multi-timeframe analysis for + symbol + across + timeframes.length + timeframes shows moderate alignment with an overall score of + overallAlignment.toFixed(1) + %. Higher timeframes show bullish bias while lower timeframes are turning bearish.

  const handleRefresh = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Multi-Timeframe Analysis for {symbol}</h2>
        <Button onClick={handleRefresh} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? animate-spin :  }`} />
          Refresh Analysis
        </Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Individual Timeframe Scoring (-100 to +100)</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {analysis.map((tf) => (
              <Card key={tf.timeframe} className={getSignalBgColor(tf.overallScore)}>
                <CardHeader className="pb-1"><CardTitle className="text-lg font-bold">{tf.timeframe}</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold" style={{ color: getSignalColor(tf.overallScore) }}>{tf.overallScore > 0 ? + :  }{tf.overallScore}</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between"><span>Trend:</span><span className={getSignalColor(tf.trendScore)}>{tf.trendScore > 0 ? + :  }{tf.trendScore}</span></div>
                    <div className="flex justify-between"><span>Momentum:</span><span className={getSignalColor(tf.momentumScore)}>{tf.momentumScore > 0 ? + :  }{tf.momentumScore}</span></div>
                    <div className="flex justify-between"><span>Volatility:</span><span className={getSignalColor(tf.volatilityScore)}>{tf.volatilityScore > 0 ? + :  }{tf.volatilityScore}</span></div>
                    <div className="flex justify-between"><span>Volume:</span><span className={getSignalColor(tf.volumeScore)}>{tf.volumeScore > 0 ? + :  }{tf.volumeScore}</span></div>
                  </div>
                  <Progress value={Math.abs(tf.overallScore)} className="h-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Overall Signal Alignment Percentage</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold" style={{ color: getSignalColor(overallAlignment) }}>{overallAlignment.toFixed(1)}%</div>
              <p className="text-muted-foreground">
                {overallAlignment > 70 ? Strong Alignment : overallAlignment > 50 ? Moderate Alignment : Weak Alignment}
              </p>
            </div>
            <Progress value={overallAlignment} className="h-4" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Contextual Narrative Summary</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed">{narrative}</p>
            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">Key Insights:</h4>
              <ul className="text-sm space-y-1">
                <li>Higher timeframes show strong bullish signals</li>
                <li>Lower timeframes showing early bearish divergence</li>
                <li>Volume confirms the trend across all timeframes</li>
                <li>Volatility is decreasing, suggesting consolidation</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Visual Signal Flow Diagram</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Top-down analysis flow from highest to lowest timeframe</p>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center mb-4">
                <div className={`w-24 h-16 rounded-lg border-2 flex items-center justify-center ${getSignalBgColor(signalFlow.root.score)}`}>
                  <span className="font-bold">{signalFlow.root.timeframe}</span>
                  <span className={`text-xl font-bold ${getSignalColor(signalFlow.root.score)}`}>{signalFlow.root.score > 0 ? + :  }{signalFlow.root.score}</span>
                </div>
                <div className="w-0.5 h-8 bg-muted" />
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {signalFlow.root.children.map((child) => (
                  <div key={child.timeframe} className="flex flex-col items-center">
                    <div className={`w-20 h-12 rounded-lg border flex items-center justify-center ${getSignalBgColor(child.score)}`}>
                      <span className="text-xs">{child.timeframe}</span>
                      <span className={`font-bold ${getSignalColor(child.score)}`}>{child.score > 0 ? + :  }{child.score}</span>
                    </div>
                    <div className="w-0.5 h-4 bg-muted" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-4 pt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success" /><span className="text-sm">Bullish</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-muted" /><span className="text-sm">Neutral</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive" /><span className="text-sm">Bearish</span></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MultiTimeframePanel