import { Hono } from 'hono';
import axios from 'axios';

const marketDataRouter = new Hono();
const YAHOO_FINANCE_BASE = 'https://yfapi.net/v6/finance';

marketDataRouter.get('/quote/:symbol', async (c) => {
  const symbol = c.req.param('symbol').toUpperCase();
  
  try {
    const response = await axios.get(`${YAHOO_FINANCE_BASE}/quote`, {
      params: { symbols: symbol },
      headers: {
        'x-api-key': process.env.YAHOO_FINANCE_API_KEY,
      },
    });
    
    return c.json(response.data);
  } catch (error) {
    console.error('Error fetching quote:', error);
    return c.json({ error: 'Failed to fetch market data' }, 500);
  }
});

marketDataRouter.get('/chart/:symbol', async (c) => {
  const symbol = c.req.param('symbol').toUpperCase();
  const interval = c.req.query('interval') || '1d';
  const range = c.req.query('range') || '1mo';
  
  try {
    const response = await axios.get(`${YAHOO_FINANCE_BASE}/chart/${symbol}`, {
      params: { interval, range },
      headers: {
        'x-api-key': process.env.YAHOO_FINANCE_API_KEY,
      },
    });
    
    return c.json(response.data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return c.json({ error: 'Failed to fetch chart data' }, 500);
  }
});

marketDataRouter.get('/search/:query', async (c) => {
  const query = c.req.param('query');
  
  try {
    const response = await axios.get(`${YAHOO_FINANCE_BASE}/search`, {
      params: { q: query },
      headers: {
        'x-api-key': process.env.YAHOO_FINANCE_API_KEY,
      },
    });
    
    return c.json(response.data);
  } catch (error) {
    console.error('Error searching symbols:', error);
    return c.json({ error: 'Failed to search symbols' }, 500);
  }
});

export { marketDataRouter };