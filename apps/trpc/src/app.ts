import * as trpcExpress from '@trpc/server/adapters/express';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import http from 'http';
import ws from 'ws';

import db from './db';
import appRouter, { AppRouter } from './router';

const createContext = <TRequest, TResponse>({
    req,
    res,
}: NodeHTTPCreateContextFnOptions<TRequest, TResponse>) => {
    return {
        req,
        res,
        db,
        ws: res instanceof ws.WebSocket ? res : undefined,
    };
};

const app = express();
const server = http.createServer(app);

const wss = new ws.Server({ server });
const wsHandler = applyWSSHandler<AppRouter>({
    wss: wss,
    router: appRouter,
    createContext,
});

app.use(
    cors({
        origin: ['*'],
    }),
);

app.use(
    session({
        name: 'sess',
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000, secure: false },
    }),
);

app.use(express.json());

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware<AppRouter>({
        router: appRouter,
        createContext,
    }),
);

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

server.on('error', console.error);

process.on('SIGTERM', () => {
    wsHandler.broadcastReconnectNotification();
    wss.close();
    server.close();
});

export { createContext };
