import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import trpc from '../../utils/trpc';

export default function LoginPage() {
    const navigate = useNavigate();
    const googleLoginMutation = trpc.auth.googleLogin.useMutation();

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log(tokenResponse),
    });

    return (
        <div className="flex h-[100dvh] w-screen flex-col">
            <div className="container flex h-full w-full flex-col items-center p-4">
                <h2>로그인</h2>
            </div>
            <button
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={() => login()}
            >
                Google Login
            </button>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                        googleLoginMutation.mutate(
                            credentialResponse.credential,
                            {
                                onSuccess: (data) => {
                                    if (data.nickname === null) {
                                        navigate('/register');
                                    }
                                    if (data.nickname === null) {
                                        navigate('/');
                                    }
                                },
                            },
                        );
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
            ;
        </div>
    );
}
