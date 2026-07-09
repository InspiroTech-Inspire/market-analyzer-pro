import { mysqlTable, varchar, timestamp, float, json } from 'drizzle-orm/mysql-core';
import { users } from './users';

export const analysisResults = mysqlTable('analysis_results', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).references(() => users.id),
  symbol: varchar('symbol', { length: 20 }).notNull(),
  timeframe: varchar('timeframe', { length: 10 }).notNull(),
  trendScore: float('trend_score').notNull(),
  momentumScore: float('momentum_score').notNull(),
  volatilityScore: float('volatility_score').notNull(),
  volumeScore: float('volume_score').notNull(),
  overallScore: float('overall_score').notNull(),
  indicators: json('indicators').notNull(),
  patterns: json('patterns').notNull(),
  supportResistance: json('support_resistance').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export type AnalysisResult = typeof analysisResults.$inferSelect;
export type NewAnalysisResult = typeof analysisResults.$inferInsert;