import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import session from 'express-session';

import db from './db';
import appRouter from './router';

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

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    return { req, res, db };
};

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);

export default app;
export { createContext };
