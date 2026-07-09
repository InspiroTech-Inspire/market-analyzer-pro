import { Card, CardContent, CardHeader, CardTitle } from @/components/ui/card
import { Progress } from @/components/ui/progress

function MarketOverview() {
  const marketData = [
    { label: "S&P 500", value: 5432.12, change: 23.45, changePercent: 0.43, color: "text-success" },
    { label: "NASDAQ", value: 17890.12, change: 45.67, changePercent: 0.26, color: "text-success" },
    { label: "Dow Jones", value: 39245.67, change: -34.56, changePercent: -0.09, color: "text-destructive" },
    { label: "Bitcoin", value: 67890.12, change: 1234.56, changePercent: 1.85, color: "text-success" },
    { label: "Ethereum", value: 3456.78, change: 45.67, changePercent: 1.33, color: "text-success" },
  ]

  return (
    <Card>
      <CardHeader><CardTitle>Market Overview</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {marketData.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">${item.value.toLocaleString()}</p>
              </div>
              <div className={item.color}>
                {item.change > 0 ? "+" : ""}{item.change.toFixed(2)} ({item.changePercent}%)
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-2">Market Sentiment</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Bullish</span>
              <Progress value={38} className="h-2" />
              <span className="text-sm">38%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Neutral</span>
              <Progress value={24} className="h-2" />
              <span className="text-sm">24%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bearish</span>
              <Progress value={38} className="h-2" />
              <span className="text-sm">38%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MarketOverview