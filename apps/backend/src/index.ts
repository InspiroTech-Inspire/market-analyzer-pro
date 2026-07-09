import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { trpcRouter } from './routes/trpc';
import { analysisRouter } from './routes/analysis';
import { watchlistRouter } from './routes/watchlist';
import { marketDataRouter } from './routes/marketData';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', prettyJSON());

// Health check
app.get('/', (c) => c.json({ message: 'Market Analyzer Pro API', version: '1.0.0' }));
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Routes
app.route('/trpc', trpcRouter);
app.route('/api/analysis', analysisRouter);
app.route('/api/watchlist', watchlistRouter);
app.route('/api/market-data', marketDataRouter);

// Error handling
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: err.message }, 500);
});

// Not found
app.notFound((c) => c.json({ error: 'Not Found' }, 404));

const port = parseInt(process.env.PORT || '3001');

console.log(`Server running on http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch,
};

export { app };