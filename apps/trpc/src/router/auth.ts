import { eq } from 'drizzle-orm';
import { OAuth2Client } from 'google-auth-library';
import { z } from 'zod';

import schema from '../schema';
import { publicProcedure, router } from '../trpc';

const GOOGLE_CLIENT_ID =
    '160296153462-ugga4r2ai7sj6k1iqcejna9cogslbdi5.apps.googleusercontent.com';
const client = new OAuth2Client();

const AuthRouter = router({
    googleLogin: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            const ticket = await client.verifyIdToken({
                idToken: input,
                audience: GOOGLE_CLIENT_ID,
            });

            const ticketPayload = ticket.getPayload();

            if (!ticketPayload) {
                throw new Error('ticketPayload is null');
            }

            const googleUserId = ticketPayload.sub;

            if (googleUserId === null) {
                throw new Error("googleUserId can't be null");
            }

            let [userInfo] = await ctx.db
                .select()
                .from(schema.user)
                .where(eq(schema.user.googleId, googleUserId))
                .limit(1);

            if (!userInfo) {
                [userInfo] = await ctx.db
                    .insert(schema.user)
                    .values({
                        googleId: googleUserId,
                    })
                    .returning();
            }

            ctx.req.session.userId = userInfo.id;

            return userInfo;
        }),

    logout: publicProcedure.mutation(async ({ ctx }) => {
        await new Promise((resolve) => ctx.req.session.destroy(resolve));
    }),
});

export default AuthRouter;
