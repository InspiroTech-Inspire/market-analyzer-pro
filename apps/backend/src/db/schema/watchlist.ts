import { mysqlTable, varchar, timestamp, float } from 'drizzle-orm/mysql-core';
import { users } from './users';

export const watchlist = mysqlTable('watchlist', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).references(() => users.id),
  symbol: varchar('symbol', { length: 20 }).notNull(),
  assetType: varchar('asset_type', { length: 20 }).notNull(),
  entryPrice: float('entry_price').notNull(),
  quantity: float('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
});

export type WatchlistItem = typeof watchlist.$inferSelect;
export type NewWatchlistItem = typeof watchlist.$inferInsert;