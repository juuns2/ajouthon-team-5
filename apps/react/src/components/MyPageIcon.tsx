import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const StyleComp = styled.div`
    .myPage-container {
        width: 60px;
        height: 70px;
        border-radius: 15px;
        border: 1px solid #2a64ad;

        background: rgba(255, 255, 255, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .myPage-img {
        width: 48px;
        height: 53px;
        border-radius: 15px;
    }
    .myPage-text {
        width: 48px;
        height: 14px;
        color: #005bac;

        text-align: center;
        font-family: Jua;
        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
`;

function MyPageIcon() {
    return (
        <StyleComp className="fixed bottom-4 right-4 z-10">
            <div className="myPage-container drop-shadow-lg backdrop-blur">
                <div className="myPage-text">나의 찌릿!</div>
                <img className="myPage-img" src="/myPageIcon.png" alt="" />
            </div>
        </StyleComp>
    );
}

export default MyPageIcon;
