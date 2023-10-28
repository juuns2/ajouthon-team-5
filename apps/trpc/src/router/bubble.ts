import { observable } from '@trpc/server/observable';
import { eq } from 'drizzle-orm';
import EventEmitter from 'node:events';
import { z } from 'zod';

import schema from '../schema';
import { protectedProcedure, publicProcedure, router } from '../trpc';

const ee = new EventEmitter();

type TBubbleInfo = {
    user: {
        id: number;
        googleId: string;
        nickname: string | null;
    };
    bubble: {
        id: number;
        userId: number;
        category: string;
        latitude: number;
        longitude: number;
        message: string;
        createdAt: Date;
    };
};

const BubbleRouter = router({
    getAll: publicProcedure.query(async ({ ctx }): Promise<TBubbleInfo[]> => {
        const result = await ctx.db
            .select()
            .from(schema.bubble)
            .innerJoin(schema.user, eq(schema.bubble.userId, schema.user.id));

        return result;
    }),
    onAdd: publicProcedure.subscription(async ({ ctx }) => {
        return observable<TBubbleInfo>((emit) => {
            const onAdd = (data: TBubbleInfo) => {
                emit.next(data);
            };

            ee.on('add', onAdd);

            return () => {
                ee.off('add', onAdd);
            };
        });
    }),
    add: protectedProcedure
        .input(
            z.object({
                category: z.string(),
                latitude: z.number(),
                longitude: z.number(),
                message: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const [{ id: bubbleId }] = await ctx.db
                .insert(schema.bubble)
                .values({
                    userId: ctx.userId,
                    ...input,
                })
                .returning({
                    id: schema.bubble.id,
                });

            const [result] = await ctx.db
                .select()
                .from(schema.bubble)
                .innerJoin(
                    schema.user,
                    eq(schema.bubble.userId, schema.user.id),
                )
                .where(eq(schema.bubble.id, bubbleId))
                .limit(1);

            ee.emit('add', result);

            return;
        }),
});

export default BubbleRouter;
