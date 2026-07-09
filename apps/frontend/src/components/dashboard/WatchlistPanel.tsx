import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Eye, TrendingUp, TrendingDown } from 'lucide-react';
import { formatNumber, formatPercentage } from '@/lib/utils';

const defaultWatchlist = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 192.45, change: 2.34, changePercent: 1.23, pnl: 456.78, pnlPercent: 2.45, signal: 'bullish' },
  { id: '2', symbol: 'TSLA', name: 'Tesla Inc.', price: 256.78, change: -3.21, changePercent: -1.23, pnl: -234.56, pnlPercent: -0.98, signal: 'bearish' },
  { id: '3', symbol: 'MSFT', name: 'Microsoft Corp.', price: 423.56, change: 4.56, changePercent: 1.09, pnl: 876.34, pnlPercent: 3.12, signal: 'bullish' },
  { id: '4', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 178.90, change: 1.23, changePercent: 0.69, pnl: 345.67, pnlPercent: 1.98, signal: 'neutral' },
  { id: '5', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 189.45, change: -2.12, changePercent: -1.11, pnl: -156.78, pnlPercent: -0.84, signal: 'bearish' },
];

function WatchlistPanel() {
  const [watchlist, setWatchlist] = useState(defaultWatchlist);
  const removeFromWatchlist = (id) => setWatchlist(watchlist.filter(item => item.id !== id));
  const getSignalColor = (signal) => signal === 'bullish' ? 'text-success' : signal === 'bearish' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Watchlist</CardTitle>
        <Button variant="outline" size="sm"><Eye className="w-4 h-4 mr-2" />View All</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Signal</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlist.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{item.symbol}</TableCell>
                <TableCell>{formatNumber(item.price)}</TableCell>
                <TableCell className={item.change >= 0 ? 'text-success' : 'text-destructive'}>
                  {item.change >= 0 ? '+' : ''}{formatNumber(item.change)} ({formatPercentage(item.changePercent)})
                </TableCell>
                <TableCell>
                  <span className={`flex items-center gap-1 ${getSignalColor(item.signal)}`}>
                    {item.signal === 'bullish' && <TrendingUp className="w-4 h-4" />}
                    {item.signal === 'bearish' && <TrendingDown className="w-4 h-4" />}
                    {item.signal}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => removeFromWatchlist(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default WatchlistPanel;