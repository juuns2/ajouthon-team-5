import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
                queryCache: new QueryCache({
                    onError: (error, query) => {
                        if (query.meta?.isForInitialize === true) {
                            return;
                        }
                        if (error instanceof TRPCClientError) {
                            if (error.data?.code === 'UNAUTHORIZED') {
                                navigate('/login');
                            }
                        }
                    },
                }),
                mutationCache: new MutationCache({
                    onError: (error) => {
                        if (error instanceof TRPCClientError) {
                            if (error.data?.code === 'UNAUTHORIZED') {
                                navigate('/login');
                            }
                        }
                    },
                }),
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

export default QueryProvider;
