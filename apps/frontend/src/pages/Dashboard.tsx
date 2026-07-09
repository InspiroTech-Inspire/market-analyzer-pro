import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, TrendingDown, Activity, Clock, Search } from 'lucide-react';
import WatchlistPanel from '@/components/dashboard/WatchlistPanel';
import MarketOverview from '@/components/dashboard/MarketOverview';
import RecentAnalyses from '@/components/dashboard/RecentAnalyses';
import TradingViewWidget from '@/components/dashboard/TradingViewWidget';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search symbols..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 w-64" />
          </div>
          <Button>Add to Watchlist</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="scanner">Scanner</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total P&L</CardTitle><TrendingUp className="w-4 h-4 text-success" /></CardHeader><CardContent><div className="text-2xl font-bold">+$12,345.67</div><p className="text-xs text-muted-foreground">+2.34% today</p></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Win Rate</CardTitle><Activity className="w-4 h-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">78.5%</div><p className="text-xs text-muted-foreground">14 winning trades</p></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Active Signals</CardTitle><Clock className="w-4 h-4 text-warning" /></CardHeader><CardContent><div className="text-2xl font-bold">24</div><p className="text-xs text-muted-foreground">8 bullish, 16 bearish</p></CardContent></Card>
            <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Market Sentiment</CardTitle><TrendingDown className="w-4 h-4 text-destructive" /></CardHeader><CardContent><div className="text-2xl font-bold">Bearish</div><p className="text-xs text-muted-foreground">62% bearish signals</p></CardContent></Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2"><TradingViewWidget symbol="AAPL" /></div>
            <div className="space-y-4"><MarketOverview /><RecentAnalyses /></div>
          </div>
        </TabsContent>
        <TabsContent value="watchlist"><WatchlistPanel /></TabsContent>
        <TabsContent value="analysis"><div className="space-y-4"><h2 className="text-xl font-semibold">Technical Analysis</h2></div></TabsContent>
        <TabsContent value="scanner"><div className="space-y-4"><h2 className="text-xl font-semibold">Market Scanner</h2></div></TabsContent>
        <TabsContent value="settings"><div className="space-y-4"><h2 className="text-xl font-semibold">Settings</h2></div></TabsContent>
      </Tabs>
    </div>
  );
}

export default Dashboard;