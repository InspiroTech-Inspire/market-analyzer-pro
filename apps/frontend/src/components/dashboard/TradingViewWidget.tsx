import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function TradingViewWidget({ symbol, interval = '1D', theme = 'dark' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const existingScript = containerRef.current.querySelector('script');
    if (existingScript) containerRef.current.removeChild(existingScript);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: 'NASDAQ:' + symbol,
          interval: interval,
          timezone: 'Etc/UTC',
          theme: theme,
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview-' + symbol,
        });
      }
    };
    containerRef.current.appendChild(script);
    return () => { 
      const s = containerRef.current?.querySelector('script');
      if (s) containerRef.current.removeChild(s); 
    };
  }, [symbol, interval, theme]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{symbol} Chart</span>
          <div className="text-sm text-muted-foreground">Interactive TradingView Chart</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} id={'tradingview-' + symbol} className="h-96 w-full" />
      </CardContent>
    </Card>
  );
}

export default TradingViewWidget;