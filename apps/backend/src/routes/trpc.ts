import { Hono } from 'hono';
import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db } from '../config/database';
import { users } from '../db/schema/users';

const t = initTRPC.create();

const appRouter = t.router({
  greeting: t.procedure
    .input(z.object({ name: z.string().optional() }))
    .query(async ({ input }) => {
      return {
        message: `Hello, ${input.name || 'World'}!`,
        timestamp: new Date().toISOString(),
      };
    }),
  
  getUsers: t.procedure.query(async () => {
    const allUsers = await db.select().from(users);
    return allUsers;
  }),
});

export type AppRouter = typeof appRouter;

const trpcRouter = new Hono();

trpcRouter.post('/', async (c) => {
  const input = await c.req.json();
  
  try {
    const result = await appRouter.createCaller({}).greeting(input);
    return c.json(result);
  } catch (error) {
    return c.json({ error: error.message }, 400);
  }
});

export { trpcRouter, appRouter };