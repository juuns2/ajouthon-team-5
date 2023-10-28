import * as trpcExpress from '@trpc/server/adapters/express';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import ws from 'ws';

import db from './db';
import appRouter, { AppRouter } from './router';

const app = express();

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    }),
);

app.use(express.json());
app.use(
    cors({
        origin: ['https://vite-rpc-react.vercel.app', 'http://localhost:5173'],
    }),
);

const createContext = <TRequest, TResponse>({
    req,
    res,
}: NodeHTTPCreateContextFnOptions<TRequest, TResponse>) => {
    return { req, res, db };
};

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware<AppRouter>({
        router: appRouter,
        createContext,
    }),
);

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () =>
    console.log(`Listening on port ${PORT}.`),
);

applyWSSHandler<AppRouter>({
    wss: new ws.Server({ server }), // * <- pass the server
    router: appRouter, // * <- pass the router
    createContext, // * <- pass the context
});

export default app;
export { createContext };
