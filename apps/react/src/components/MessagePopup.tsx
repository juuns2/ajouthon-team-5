import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

//메인 화면에서 번개를 클릭하면 보여지는 메세지 팝업
const StyleComp = styled.div`
    .main-container {
        width: 250px;
        height: 171px;
        border-radius: 25px;
        border: 1px solid #4993e3;
        background: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        position: relative;
        font-family: 'Jua', sans-serif;
    }
    .chito-img {
        width: 73px;
        height: 66px;
        position: absolute;
        right: 8px;
        top: 2px;
    }
    .user-name {
        margin-right: auto;
    }
    .message-container {
        width: 100%;
    }
    .like-btn {
        width: 75px;
        height: 30px;
        border-radius: 9px;
        background: rgba(202, 216, 235, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .like-btn div {
        padding-right: 8px;
    }
`;

function MessagePopup({
    nickname,
    message,
}: {
    nickname: string;
    message: string;
}) {
    const [LikeBtn, setLikeBtn] = useState(false);

    const handleButtonClick = () => {
        setLikeBtn(!LikeBtn);
    };
    return (
        <StyleComp>
            <div className="main-container">
                <img className="chito-img" src="/chito2.png"></img>
                <div className="user-name">{nickname}</div>
                <div className="message-container">{message}</div>
                <button
                    className="like-btn"
                    onClick={handleButtonClick}
                    style={{ color: LikeBtn ? '#2A64AD' : '#FFFFFF' }}
                >
                    <div>25</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill={LikeBtn ? '#2A64AD' : '#FFFFFF'}
                    >
                        <path
                            d="M6.04171 17.6667C4.39865 17.6667 2.99465 17.0979 1.82971 15.9604C0.664764 14.8229 0.0826525 13.4326 0.0833747 11.7896C0.0833747 10.3812 0.50768 9.12638 1.35629 8.02499C2.2049 6.92361 3.31532 6.21944 4.68754 5.91249C5.13893 4.25138 6.04171 2.90624 7.39587 1.87708C8.75004 0.847912 10.2848 0.333328 12 0.333328C14.1125 0.333328 15.9047 1.06927 17.3766 2.54116C18.8485 4.01305 19.5841 5.80488 19.5834 7.91666C20.8292 8.06111 21.8631 8.59844 22.685 9.52866C23.5068 10.4589 23.9174 11.5465 23.9167 12.7917C23.9167 14.1458 23.4426 15.297 22.4943 16.2453C21.546 17.1936 20.3952 17.6674 19.0417 17.6667H6.04171ZM6.04171 15.5H19.0417C19.8 15.5 20.441 15.2382 20.9646 14.7146C21.4882 14.191 21.75 13.55 21.75 12.7917C21.75 12.0333 21.4882 11.3924 20.9646 10.8687C20.441 10.3451 19.8 10.0833 19.0417 10.0833H17.4167V7.91666C17.4167 6.41805 16.8884 5.14044 15.8318 4.08383C14.7752 3.02722 13.4979 2.49927 12 2.49999C10.5014 2.49999 9.22382 3.0283 8.16721 4.08491C7.1106 5.14152 6.58265 6.41877 6.58337 7.91666H6.04171C4.99449 7.91666 4.10074 8.2868 3.36046 9.02708C2.62018 9.76735 2.25004 10.6611 2.25004 11.7083C2.25004 12.7555 2.62018 13.6493 3.36046 14.3896C4.10074 15.1299 4.99449 15.5 6.04171 15.5Z"
                            fill={LikeBtn ? '#2A64AD' : '#FFFFFF'}
                        />
                        <path
                            d="M14.0053 12.1711L15.9164 12.7553C16.1813 12.8365 16.4219 12.9822 16.6168 13.1792C16.8116 13.3762 16.9545 13.6185 17.0327 13.8843C17.1109 14.1501 17.122 14.4311 17.065 14.7023C17.0079 14.9734 16.8845 15.2262 16.7058 15.4379L9.45703 24.0182C9.28263 24.2234 9.04288 24.3622 8.77811 24.4114C8.51334 24.4606 8.23971 24.417 8.00327 24.2881C7.76684 24.1592 7.58202 23.9528 7.47991 23.7036C7.37781 23.4544 7.36465 23.1777 7.44266 22.9199L9.70264 15.5279L8.16522 15.0053C7.75382 14.8643 7.41333 14.569 7.21571 14.1816C7.01808 13.7942 6.97881 13.3452 7.10618 12.9294L9.04056 6.60232C9.17048 6.17736 9.4639 5.82141 9.85627 5.61279C10.2486 5.40416 10.7078 5.35995 11.1328 5.48988L14.0255 6.37427C14.4505 6.5042 14.8064 6.79762 15.015 7.18998C15.2237 7.58234 15.2679 8.04151 15.1379 8.46648L14.0053 12.1711Z"
                            fill={LikeBtn ? '#2A64AD' : '#FFFFFF'}
                        />
                    </svg>
                </button>
            </div>
        </StyleComp>
    );
}

export default MessagePopup;
