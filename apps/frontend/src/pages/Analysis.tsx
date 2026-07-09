import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Activity, BarChart3, Clock, Layers } from 'lucide-react';
import TradingViewWidget from '@/components/dashboard/TradingViewWidget';
import IndicatorsPanel from '@/components/analysis/IndicatorsPanel';
import PatternsPanel from '@/components/analysis/PatternsPanel';
import MultiTimeframePanel from '@/components/analysis/MultiTimeframePanel';
import ScannerPanel from '@/components/analysis/ScannerPanel';

function Analysis() {
  const { symbol } = useParams();
  const [activeTab, setActiveTab] = useState('chart');
  const [timeframe, setTimeframe] = useState('1D');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{symbol || 'Symbol Analysis'}</h1>
          <p className="text-muted-foreground">Comprehensive technical analysis</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-32"><SelectValue placeholder="Select timeframe" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1D">1 Day</SelectItem>
              <SelectItem value="4H">4 Hours</SelectItem>
              <SelectItem value="1H">1 Hour</SelectItem>
              <SelectItem value="30m">30 Minutes</SelectItem>
              <SelectItem value="15m">15 Minutes</SelectItem>
              <SelectItem value="5m">5 Minutes</SelectItem>
            </SelectContent>
          </Select>
          <Button><Activity className="w-4 h-4 mr-2" />Run Analysis</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="chart"><BarChart3 className="w-4 h-4 mr-2" />Chart</TabsTrigger>
          <TabsTrigger value="indicators"><TrendingUp className="w-4 h-4 mr-2" />Indicators</TabsTrigger>
          <TabsTrigger value="patterns"><Layers className="w-4 h-4 mr-2" />Patterns</TabsTrigger>
          <TabsTrigger value="multi-timeframe"><Clock className="w-4 h-4 mr-2" />Multi-Timeframe</TabsTrigger>
          <TabsTrigger value="scanner"><TrendingDown className="w-4 h-4 mr-2" />Scanner</TabsTrigger>
        </TabsList>

        <TabsContent value="chart"><TradingViewWidget symbol={symbol || 'AAPL'} /></TabsContent>
        <TabsContent value="indicators"><IndicatorsPanel symbol={symbol || 'AAPL'} /></TabsContent>
        <TabsContent value="patterns"><PatternsPanel symbol={symbol || 'AAPL'} /></TabsContent>
        <TabsContent value="multi-timeframe"><MultiTimeframePanel symbol={symbol || 'AAPL'} /></TabsContent>
        <TabsContent value="scanner"><ScannerPanel /></TabsContent>
      </Tabs>
    </div>
  );
}

export default Analysis;