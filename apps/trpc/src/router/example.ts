import { eq } from 'drizzle-orm';
import { OAuth2Client } from 'google-auth-library';
import { z } from 'zod';

import schema from '../schema';
import { publicProcedure, router } from '../trpc';

const ExampleRouter = router({
    exampleWithArgs: publicProcedure
        .input(
            z.object({
                message: z.string(),
            }),
        )
        .mutation((req) => {
            return { info: req.input.message };
        }),

    example: publicProcedure.query(async ({ ctx }) => {
        return { info: 42 };
    }),

    getMessages: publicProcedure
        .input(
            z.object({
                minLat: z.number(),
                maxLat: z.number(),
                minLng: z.number(),
                maxLng: z.number(),
            }),
        )
        .query(async ({ ctx }) => {}),
});

export default ExampleRouter;
