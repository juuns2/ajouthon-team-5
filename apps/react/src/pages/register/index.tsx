import { GoogleLogin } from '@react-oauth/google';

import trpc from '../../utils/trpc';
import styled from 'styled-components';
import { useState } from 'react';
const StyleComp = styled.div`
display:flex;
justify-content:center;
.main-container{
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    color: #000;
    font-size:1.2em;
font-family: Jua;
margin:0 5%;

min-width:375px;
max-width:1000px;
max-height:900px;
}
.text-container{

}
.text-container span{
    color:#2a64ad;
    font-weight:500;
    font-size:1.5rem;
}
.character-img{
    width:70px;
    height:70px;
}
.text-userName{
    margin-top:30px;
}
.start-btn{
    background-color:#2a64ad;
}
.input-container{
    display:flex;
    flex-direction:column;

}
.input-container{
    display:flex;
    flex-direction:column;
    justify-contents:center;
    align-items:center;
}
.userName-input{
    border-radius: 9px;
border: 1px solid #C1C1C1;

background: #FFF;
text-align:center;
padding:2%;
width:80%;
}
.line{
    background-color:#2a64ad;
    width:90%;
    height:4px;
    margin-top:2%;

}
.btn-container{
    width:100%;
    text-align:center;
}
.start-btn{
    border-radius: 30px;
background: #2A64AD;
padding:0.3rem;
width:90%;
color:white;
}
`
export default function RegisterPage() {
    const googleLoginMutation = trpc.auth.googleLogin.useMutation();
    
/**
 * const [nickname, setNickname] = useState('');
    const [savedNickname, setSavedNickname] = useState('');
 * const handleNickname = (event) => {
        setNickname(event.target.value);
      };
    const handleSaveNickname = () => {
        setSavedNickname(nickname);
      };
 */
    
    return (
        <StyleComp>

        <div className="main-container">
            <div className="text-container">
                <h2>안녕하세요 아주대 번개 팟 모임!</h2>
                <h2>'<span>아주찌릿</span>'! 입니다.</h2>
                <h2 className='text-userName'>닉네임을 설정해주세요.</h2>
            </div>
            <div className='input-container'>
                <div>...</div>
                <img className='character-img'src='/subCharacter1.png'></img>
                <input
                    placeholder="닉네임(를) 입력하세요."
                    className="userName-input"
                    /*value={nickname}
                    onChange={handleNickname}*/

                />
                <div className='line'> </div>
            </div>
            <div className='btn-container'>
                <button className="start-btn" /*onClick={handleSaveNickname}*/>
                    시작하기
                </button>
            </div>
            
            
        </div>
        </StyleComp>

    );
}


/**
 * <GoogleLogin
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
 */