import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import trpc from '../../utils/trpc';

const StyleComp = styled.div`
    display: flex;
    justify-content: center;
    .main-container {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #000;
        font-size: 1.2em;
        font-family: Jua;

        min-width: 375px;
        max-width: 1000px;
        max-height: 900px;
    }
    .text-container {
    }
    .text-container span {
        color: #2a64ad;
        font-weight: 500;
        font-size: 1.5rem;
    }
    .character-img {
        width: 70px;
        height: 70px;
    }
    .text-userName {
        margin-top: 30px;
    }
    .start-btn {
        background-color: #2a64ad;
    }
    .input-container {
        display: flex;
        flex-direction: column;
    }
    .input-container {
        display: flex;
        flex-direction: column;
        justify-contents: center;
        align-items: center;
    }
    .notification-text {
        font-size: 0.9rem;
        color: #c1c1c1;
    }
    .userName-input {
        border-radius: 9px;
        border: 1px solid #c1c1c1;

        background: #fff;
        text-align: center;
        padding: 2%;
        width: 80%;
    }
    .line {
        background-color: #2a64ad;
        width: 90%;
        height: 4px;
        margin-top: 2%;
    }
    .btn-container {
        width: 100%;
        text-align: center;
    }
    .start-btn {
        border-radius: 30px;
        background: #2a64ad;
        padding: 0.3rem;
        width: 90%;
        color: white;
    }
`;

export default function RegisterPage() {
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [displayText, setDisplayText] = useState('...');
    const handleInputChange = (event: { target: { value: any } }) => {
        const inputText = event.target.value;
        setUserInput(inputText);

        // 특수문자를 검사하기 위한 정규표현식
        const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

        // 입력값에서 특수문자가 포함되었는지 검사
        const containsSpecialCharacter = specialCharacterRegex.test(inputText);

        if (containsSpecialCharacter && inputText.length > 10) {
            setIsValid(false);
            setDisplayText('사용하실 수 없는 닉네임입니당..');
        } else {
            setIsValid(true);
            setDisplayText('사용하실 수 있는 닉네임입니당!');
        }
    };

    const editUserMutation = trpc.editMyInfo.useMutation({
        onSuccess: (data) => {
            navigate('/');
        },
    });

    return (
        <StyleComp>
            <div className="main-container px-4">
                <div className="text-container">
                    <h2>안녕하세요 아주대 번개 팟 모임!</h2>
                    <h2>
                        '<span>아주찌릿</span>'! 입니다.
                    </h2>
                    <h2 className="text-userName">닉네임을 설정해주세요.</h2>
                </div>
                <div className="input-container">
                    <div>{displayText}</div>
                    {!isValid && (
                        <div className="notification-text">
                            특수문자 제외 10자 이내
                        </div>
                    )}
                    <img
                        className="character-img"
                        src={
                            !isValid
                                ? '/subCharacter1.png'
                                : '/subCharacter2.png'
                        }
                    ></img>
                    <input
                        placeholder="닉네임(를) 입력하세요."
                        className="userName-input"
                        onChange={handleInputChange}
                    />
                    <div className="line"> </div>
                </div>
                <div className="btn-container">
                    <button
                        className="start-btn"
                        onClick={() => {
                            editUserMutation.mutate({
                                nickname: userInput,
                            });
                        }}
                    >
                        시작하기
                    </button>
                </div>
            </div>
        </StyleComp>
    );
}
