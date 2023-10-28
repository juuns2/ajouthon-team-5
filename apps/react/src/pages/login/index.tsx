import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import trpc from '../../utils/trpc';
import "../../css/login.css"
import styled from 'styled-components';

export default function LoginPage() {
    const navigate = useNavigate();
    const googleLoginMutation = trpc.auth.googleLogin.useMutation();

    const login = useGoogleLogin({
        onSuccess: (response) => {
            if (response?.credential) {
                googleLoginMutation.mutate(response.credential, {
                    onSuccess: (data) => {
                        if (data.nickname === null) {
                            return navigate('/register');
                        }
                        return navigate('/');
                    },
                });
            }
        },
        onError: (error) => {
            console.log('Login Failed', error);
        },
    });

    // const handleGoogleLoginClick = () => {
    //     if (loaded) {
    //         signIn();
    //     }
    // };

    return (
        <div className="flex h-[100dvh] w-screen flex-col items-center justify-center">
            <div className='login-container'>
                <h1>아주 <span className='yellow'>찌릿!</span> 으로 <br></br>빠르게 모이자!</h1>
                <img src="../../../public/chito_login.png"/>
                <h4>로그인은 아주대학교 계정으로 연동해주세요!</h4>
                <br></br>
                <h3>Login</h3>
                <button className='google-login-btn' onClick={() => login()}>Continue with Google</button>
            </div>
        </div>
    );
}

