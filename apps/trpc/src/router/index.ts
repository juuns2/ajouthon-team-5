import { eq } from 'drizzle-orm';
import { z } from 'zod';

import schema from '../schema';
import { mergeRouters, protectedProcedure, t } from '../trpc';
import AuthRouter from './auth';
import BubbleRouter from './bubble';
import ExampleRouter from './example';

type AppRouter = typeof appRouter;

const appRouter = mergeRouters(
    ExampleRouter,
    t.router({
        auth: AuthRouter,
        bubble: BubbleRouter,
        getMyInfo: protectedProcedure.query(async ({ ctx }) => {
            const [userInfo] = await ctx.db
                .select()
                .from(schema.user)
                .where(eq(schema.user.id, ctx.userId))
                .limit(1);

            return userInfo;
        }),
        editMyInfo: protectedProcedure
            .input(
                z.object({
                    nickname: z.string(),
                }),
            )
            .mutation(async ({ input, ctx }) => {
                const [userInfo] = await ctx.db
                    .update(schema.user)
                    .set({
                        nickname: input.nickname,
                    })
                    .where(eq(schema.user.id, ctx.userId))
                    .returning();

                return userInfo;
            }),
    }),
);

export default appRouter;
export type { AppRouter };
