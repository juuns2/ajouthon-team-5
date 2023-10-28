import {
    createWSClient,
    httpBatchLink,
    loggerLink,
    wsLink,
} from '@trpc/client';

import trpc from '../utils/trpc';
import { queryClient } from './query';

const wsClient = createWSClient({
    url: `ws://localhost:5001`,
});

const trpcClient = trpc.createClient({
    links: [
        loggerLink({
            enabled: (opts) =>
                process.env.NODE_ENV === 'development' ||
                (opts.direction === 'down' && opts.result instanceof Error),
        }),
        wsLink({
            client: wsClient,
        }),
        httpBatchLink({
            url: `${import.meta.env.VITE_TRPC_SERVER_URL}`,
        }),
    ],
});

const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            {children}
        </trpc.Provider>
    );
};

export default TRPCProvider;
