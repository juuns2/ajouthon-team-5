import { observable } from '@trpc/server/observable';
import { eq } from 'drizzle-orm';
import EventEmitter from 'node:events';
import { z } from 'zod';

import schema from '../schema';
import { publicProcedure, router } from '../trpc';

const ee = new EventEmitter();

const BubbleRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return [
            {
                userId: 'juuns',
                category: 'food',
                latitude: 37.28213155885395,
                longitude: 127.04624402824868,
                content:
                    '팔달관 나무계단에서 18시에 치킨 먹으면서 축구 볼 사람 괌 ㅜ',
                likes: 25,
                createdAt: new Date(),
            },
            {
                userId: 'juuns',
                category: 'study',
                latitude: 37.281569184896895,
                longitude: 127.0442139688065,
                content: '저녁 7시 커라메이트 구함',
                likes: 0,
                createdAt: new Date(),
            },
            {
                userId: 'juuns',
                category: 'workout',
                latitude: 37.28066806539145,
                longitude: 127.04442768686567,
                content: '8시 나이스짐에서 하체 조질 사람',
                likes: 12,
                createdAt: new Date(),
            },
        ];
    }),
    onAdd: publicProcedure.subscription(async ({ ctx }) => {
        return observable<{
            userId: 'juuns';
            category: 'food';
            latitude: 37.28213155885395;
            longitude: 127.04624402824868;
            content: '팔달관 나무계단에서 18시에 치킨 먹으면서 축구 볼 사람 괌 ㅜ';
            likes: 25;
            createdAt: Date;
        }>((emit) => {
            const onAdd = (data: {
                userId: 'juuns';
                category: 'food';
                latitude: 37.28213155885395;
                longitude: 127.04624402824868;
                content: '팔달관 나무계단에서 18시에 치킨 먹으면서 축구 볼 사람 괌 ㅜ';
                likes: 25;
                createdAt: Date;
            }) => {
                emit.next(data);
            };

            ee.on('add', onAdd);

            return () => {
                ee.off('add', onAdd);
            };
        });
    }),
    add: publicProcedure
        .input(
            z.object({
                id: z.string().uuid().optional(),
                text: z.string().min(1),
            }),
        )
        .mutation(async (opts) => {
            const post = { ...opts.input }; /* [..] add to db */
            ee.emit('add', {
                userId: 'juuns',
                category: 'food',
                latitude: 37.28213155885395 + Math.random() * 0.001,
                longitude: 127.04624402824868 + Math.random() * 0.001,
                content:
                    '팔달관 나무계단에서 18시에 치킨 먹으면서 축구 볼 사람 괌 ㅜ',
                likes: 25,
                createdAt: new Date(),
            });
            return post;
        }),
});

export default BubbleRouter;
