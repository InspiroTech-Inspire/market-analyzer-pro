import { Card, CardContent, CardHeader, CardTitle } from @/components/ui/card
import { Button } from @/components/ui/button
import { ArrowRight, TrendingUp, TrendingDown, Activity } from lucide-react
import { formatDate } from @/lib/utils

const recentAnalyses = [
  { id: 1, symbol: AAPL, timeframe: 1D, score: 78, signal: bullish, date: new Date(), type: technical },
  { id: 2, symbol: TSLA, timeframe: 4H, score: -45, signal: bearish, date: new Date(Date.now() - 86400000), type: multi-timeframe },
  { id: 3, symbol: BTC-USD, timeframe: 1H, score: 85, signal: bullish, date: new Date(Date.now() - 172800000), type: pattern },
  { id: 4, symbol: NVDA, timeframe: 1D, score: 62, signal: bullish, date: new Date(Date.now() - 259200000), type: scanner },
  { id: 5, symbol: META, timeframe: 4H, score: -33, signal: bearish, date: new Date(Date.now() - 345600000), type: technical },
]

function RecentAnalyses() {
  const getSignalIcon = (signal) => {
    if (signal === bullish) return <TrendingUp className="w-4 h-4 text-success" />
    if (signal === bearish) return <TrendingDown className="w-4 h-4 text-destructive" />
    return <Activity className="w-4 h-4 text-muted-foreground" />
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Analyses</CardTitle>
        <Button variant="ghost" size="sm">View All <ArrowRight className="w-4 h-4 ml-1" /></Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentAnalyses.map((analysis) => (
          <div key={analysis.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              {getSignalIcon(analysis.signal)}
              <div>
                <p className="font-medium">{analysis.symbol}</p>
                <p className="text-xs text-muted-foreground">{analysis.timeframe} - {formatDate(analysis.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${analysis.score > 0 ? text-success : analysis.score < 0 ? text-destructive : text-muted-foreground}`}>
                {analysis.score > 0 ? + :  }{analysis.score}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default RecentAnalyses