import { Hono } from 'hono';
import { z } from 'zod';
import { db } from '../config/database';
import { watchlist } from '../db/schema/watchlist';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

const watchlistRouter = new Hono();

watchlistRouter.get('/', async (c) => {
  try {
    const items = await db.select().from(watchlist);
    return c.json(items);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return c.json({ error: 'Failed to fetch watchlist' }, 500);
  }
});

watchlistRouter.post('/', async (c) => {
  const body = await c.req.json();
  
  const schema = z.object({
    userId: z.string(),
    symbol: z.string(),
    assetType: z.enum(['stock', 'crypto', 'etf']),
    entryPrice: z.number(),
    quantity: z.number(),
  });
  
  const validated = schema.parse(body);
  
  try {
    const newItem = {
      id: uuidv4(),
      userId: validated.userId,
      symbol: validated.symbol,
      assetType: validated.assetType,
      entryPrice: validated.entryPrice,
      quantity: validated.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await db.insert(watchlist).values(newItem);
    return c.json(newItem, 201);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return c.json({ error: 'Failed to add to watchlist' }, 500);
  }
});

watchlistRouter.delete('/:id', async (c) => {
  const id = c.req.param('id');
  
  try {
    await db.delete(watchlist).where(eq(watchlist.id, id));
    return c.json({ message: 'Item removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return c.json({ error: 'Failed to remove from watchlist' }, 500);
  }
});

export { watchlistRouter };