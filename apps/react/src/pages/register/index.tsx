import { GoogleLogin } from '@react-oauth/google';

import trpc from '../../utils/trpc';

export default function RegisterPage() {
    const googleLoginMutation = trpc.auth.googleLogin.useMutation();

    return (
        <div className="flex h-[100dvh] w-screen flex-col">
            <div className="container flex h-full w-full flex-col items-center p-4">
                <h2>안녕하세요 아주대 번개 팟 모임!000입니다.</h2>
                <h2>닉네임을 설정해주세요.</h2>

                <input
                    placeholder="닉네임(를) 입력하세요."
                    className="border-1 border-gray-400"
                />
                <button className="bg-ajou-blue w-full rounded-full py-2 text-lg font-bold text-white">
                    시작하기
                </button>
            </div>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    if (credentialResponse.credential) {
                        googleLoginMutation.mutate(
                            credentialResponse.credential,
                            {
                                onSuccess: (data) => {
                                    console.log(data);
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
