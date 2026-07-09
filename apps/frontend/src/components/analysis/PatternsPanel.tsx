import { Card, CardContent, CardHeader, CardTitle } from @/components/ui/card
import { Badge } from @/components/ui/badge
import { Layers, TrendingUp, TrendingDown, AlertTriangle } from lucide-react

function PatternsPanel({ symbol }) {
  const patterns = {
    doubleTop: false,
    doubleBottom: true,
    higherHighs: true,
    lowerLows: false,
    volumeSpikes: true,
    pivotPoints: { resistance: [200.12, 205.34], support: [190.56, 185.78] },
    trendlines: {
      resistance: [{ start: 5, end: 15, strength: 0.85 }, { start: 20, end: 25, strength: 0.72 }],
      support: [{ start: 10, end: 18, strength: 0.90 }, { start: 30, end: 35, strength: 0.65 }]
    },
  }

  const detectedPatterns = [
    { name: Double Bottom, detected: patterns.doubleBottom, type: bullish },
    { name: Higher Highs, detected: patterns.higherHighs, type: bullish },
    { name: Double Top, detected: patterns.doubleTop, type: bearish },
    { name: Lower Lows, detected: patterns.lowerLows, type: bearish },
    { name: Volume Spike, detected: patterns.volumeSpikes, type: neutral },
  ]

  const getPatternColor = (type) => type === bullish ? bg-success/10 text-success : type === bearish ? bg-destructive/10 text-destructive : bg-muted/10 text-muted-foreground

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Pattern Detection for {symbol}</h2>
      <Card>
        <CardHeader><CardTitle>Detected Patterns</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {detectedPatterns.map((pattern) => (
              <div key={pattern.name} className={`p-4 rounded-lg border ${getPatternColor(pattern.type)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {pattern.type === bullish && <TrendingUp className="w-5 h-5" />}
                  {pattern.type === bearish && <TrendingDown className="w-5 h-5" />}
                  {pattern.type === neutral && <AlertTriangle className="w-5 h-5" />}
                  <h3 className="font-semibold">{pattern.name}</h3>
                </div>
                <Badge variant={pattern.detected ? default : secondary}>
                  {pattern.detected ? Detected : Not Detected}
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  {pattern.detected ? Pattern confirmed on + symbol : No + pattern.name + pattern detected}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Layers className="w-5 h-5" />Resistance Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {patterns.pivotPoints.resistance.map((level, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded bg-muted/50">
                <span>R{index + 1}</span>
                <span className="font-medium">${level.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Layers className="w-5 h-5" />Support Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {patterns.pivotPoints.support.map((level, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded bg-muted/50">
                <span>S{index + 1}</span>
                <span className="font-medium">${level.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader><CardTitle>Trendlines</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Resistance Trendlines</h3>
              <div className="space-y-3">
                {patterns.trendlines.resistance.map((line, index) => (
                  <div key={index} className="p-3 border rounded bg-muted/50">
                    <div className="flex justify-between">
                      <span>Trendline {index + 1}</span>
                      <span className="font-medium">Strength: {(line.strength * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">From bar {line.start} to {line.end}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support Trendlines</h3>
              <div className="space-y-3">
                {patterns.trendlines.support.map((line, index) => (
                  <div key={index} className="p-3 border rounded bg-muted/50">
                    <div className="flex justify-between">
                      <span>Trendline {index + 1}</span>
                      <span className="font-medium">Strength: {(line.strength * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">From bar {line.start} to {line.end}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatternsPanel