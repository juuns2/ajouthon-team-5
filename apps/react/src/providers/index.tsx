import { GoogleOAuthProvider } from '@react-oauth/google';

import QueryProvider from './query';
import TRPCProvider from './trpc';

const RootProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <GoogleOAuthProvider clientId="160296153462-ugga4r2ai7sj6k1iqcejna9cogslbdi5.apps.googleusercontent.com">
            <QueryProvider>
                <TRPCProvider>{children}</TRPCProvider>
            </QueryProvider>
        </GoogleOAuthProvider>
    );
};

export default RootProvider;
