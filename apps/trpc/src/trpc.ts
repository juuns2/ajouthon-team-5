import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';

import { createContext } from './app';

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
const router = t.router;
const publicProcedure = t.procedure;
const mergeRouters = t.mergeRouters;

const isAuthed = t.middleware((opts) => {
    const { ctx } = opts;

    console.log(ctx.req.session);

    if (!ctx.req.session.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: '로그인이 필요합니다.',
        });
    }

    return opts.next({
        ctx: {
            userId: ctx.req.session.userId,
        },
    });
});

const protectedProcedure = t.procedure.use(isAuthed);

export { t, router, publicProcedure, protectedProcedure, mergeRouters };
export type { Context };
