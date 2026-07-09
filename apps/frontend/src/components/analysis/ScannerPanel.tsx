import { useState } from react
import { Card, CardContent, CardHeader, CardTitle } from @/components/ui/card
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from @/components/ui/table
import { Button } from @/components/ui/button
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from @/components/ui/select
import { Input } from @/components/ui/input
import { TrendingUp, TrendingDown, Activity, Search, Filter } from lucide-react
import { getSignalColor, formatNumber } from @/lib/utils

function ScannerPanel() {
  const [signalType, setSignalType] = useState(all)
  const [minScore, setMinScore] = useState(0)
  const [searchQuery, setSearchQuery] = useState( )

  const allSymbols = [
    { symbol: AAPL, name: Apple Inc., score: 78, signal: bullish, volume: 12345678, price: 192.45 },
    { symbol: TSLA, name: Tesla Inc., score: -45, signal: bearish, volume: 8765432, price: 256.78 },
    { symbol: MSFT, name: Microsoft Corp., score: 62, signal: bullish, volume: 9876543, price: 423.56 },
    { symbol: GOOGL, name: Alphabet Inc., score: 34, signal: neutral, volume: 7654321, price: 178.90 },
    { symbol: AMZN, name: Amazon.com Inc., score: -23, signal: bearish, volume: 6543210, price: 189.45 },
    { symbol: NVDA, name: NVIDIA Corp., score: 85, signal: bullish, volume: 15432109, price: 1234.56 },
    { symbol: META, name: Meta Platforms Inc., score: -12, signal: bearish, volume: 5432198, price: 487.23 },
    { symbol: BTC-USD, name: Bitcoin, score: 72, signal: bullish, volume: 34567890, price: 67890.12 },
    { symbol: ETH-USD, name: Ethereum, score: 55, signal: neutral, volume: 23456789, price: 3456.78 },
    { symbol: SOL-USD, name: Solana, score: -33, signal: bearish, volume: 12345678, price: 156.78 },
  ]

  const filteredSymbols = allSymbols.filter(symbol => {
    if (signalType !== all && symbol.signal !== signalType) return false
    if (signalType === bullish && symbol.score < minScore) return false
    if (signalType === bearish && symbol.score > -minScore) return false
    if (signalType === all && Math.abs(symbol.score) < minScore) return false
    if (searchQuery && !symbol.symbol.toLowerCase().includes(searchQuery.toLowerCase()) && !symbol.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const bullishCount = filteredSymbols.filter(s => s.signal === bullish).length
  const bearishCount = filteredSymbols.filter(s => s.signal === bearish).length
  const neutralCount = filteredSymbols.filter(s => s.signal === neutral).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Market Scanner</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Bullish: {bullishCount}</span>
          <span className="text-sm text-muted-foreground">Bearish: {bearishCount}</span>
          <span className="text-sm text-muted-foreground">Neutral: {neutralCount}</span>
        </div>
      </div>
      <Card>
        <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Signal Type</label>
            <Select value={signalType} onValueChange={setSignalType}>
              <SelectTrigger><SelectValue placeholder="Select signal type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Signals</SelectItem>
                <SelectItem value="bullish">Bullish Only</SelectItem>
                <SelectItem value="bearish">Bearish Only</SelectItem>
                <SelectItem value="neutral">Neutral Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Minimum Score</label>
            <Input type="number" value={minScore} onChange={(e) => setMinScore(parseInt(e.target.value) || 0)} min="0" max="100" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search symbols..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Scan Results ({filteredSymbols.length} symbols)</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Signal</TableHead>
                <TableHead>Volume</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSymbols.map((symbol) => (
                <TableRow key={symbol.symbol} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{symbol.symbol}</TableCell>
                  <TableCell>{symbol.name}</TableCell>
                  <TableCell>{formatNumber(symbol.price)}</TableCell>
                  <TableCell className={getSignalColor(symbol.score)}>{symbol.score > 0 ? + :  }{symbol.score}</TableCell>
                  <TableCell>
                    <span className={`flex items-center gap-1 ${getSignalColor(symbol.score)}`}>
                      {symbol.signal === bullish && <TrendingUp className="w-4 h-4" />}
                      {symbol.signal === bearish && <TrendingDown className="w-4 h-4" />}
                      {symbol.signal === neutral && <Activity className="w-4 h-4" />}
                      {symbol.signal}
                    </span>
                  </TableCell>
                  <TableCell>{symbol.volume.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Analyze
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default ScannerPanel