import { Hono } from 'hono';
import { z } from 'zod';
import { calculateTechnicalIndicators } from '../services/technicalAnalysis';
import { performMultiTimeframeAnalysis } from '../services/multiTimeframe';
import { detectPatterns } from '../services/patternDetection';

const analysisRouter = new Hono();

analysisRouter.post('/technical', async (c) => {
  const body = await c.req.json();
  
  const schema = z.object({
    symbol: z.string(),
    prices: z.array(z.number()),
    volumes: z.array(z.number()),
    timestamps: z.array(z.string()),
    timeframe: z.string().optional(),
  });
  
  const validated = schema.parse(body);
  
  try {
    const indicators = calculateTechnicalIndicators({
      prices: validated.prices,
      volumes: validated.volumes,
      timestamps: validated.timestamps,
    });
    
    const patterns = detectPatterns({
      prices: validated.prices,
      indicators,
    });
    
    return c.json({
      symbol: validated.symbol,
      timeframe: validated.timeframe || '1D',
      indicators,
      patterns,
    });
  } catch (error) {
    console.error('Error in technical analysis:', error);
    return c.json({ error: error.message }, 500);
  }
});

analysisRouter.post('/multi-timeframe', async (c) => {
  const body = await c.req.json();
  
  const schema = z.object({
    symbol: z.string(),
    timeframes: z.array(z.string()),
    data: z.record(z.any()),
  });
  
  const validated = schema.parse(body);
  
  try {
    const result = await performMultiTimeframeAnalysis({
      symbol: validated.symbol,
      timeframes: validated.timeframes,
      data: validated.data,
    });
    
    return c.json(result);
  } catch (error) {
    console.error('Error in multi-timeframe analysis:', error);
    return c.json({ error: error.message }, 500);
  }
});

analysisRouter.get('/scanner', async (c) => {
  const signalType = c.req.query('signalType') || 'bullish';
  const limit = parseInt(c.req.query('limit') || '50');
  
  try {
    const results = [];
    
    return c.json({
      signalType,
      results,
      count: results.length,
    });
  } catch (error) {
    console.error('Error in scanner:', error);
    return c.json({ error: error.message }, 500);
  }
});

export { analysisRouter };