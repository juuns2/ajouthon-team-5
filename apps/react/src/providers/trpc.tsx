import { useQueryClient } from '@tanstack/react-query';
import {
    createWSClient,
    httpBatchLink,
    loggerLink,
    splitLink,
    wsLink,
} from '@trpc/client';

import trpc from '../utils/trpc';

const wsClient = createWSClient({
    url: `ws://${window.location.host}/websocket`,
});

const trpcClient = trpc.createClient({
    links: [
        loggerLink({
            enabled: (opts) =>
                process.env.NODE_ENV === 'development' ||
                (opts.direction === 'down' && opts.result instanceof Error),
        }),
        splitLink({
            condition(op) {
                return op.type === 'subscription';
            },
            true: wsLink({
                client: wsClient,
            }),
            false: httpBatchLink({
                url: `http://localhost:5173/trpc`,
            }),
        }),
    ],
});

const TRPCProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            {children}
        </trpc.Provider>
    );
};

export default TRPCProvider;
