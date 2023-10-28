import React from 'react';
import { Map } from 'react-kakao-maps-sdk';
import styled, { createGlobalStyle } from 'styled-components';
import MessageInput from './MessageInput';
import MessagePopup from './MessagePopup';
import MyMessage from './MyMessage';
const App = () => {
  const isLoading = false; // 미리 정의된 값을 사용하는 것으로 보입니다.

  return (
    <div className='main-container'>
      <MessageInput/>
      <MessagePopup/>
      <MyMessage/>
    </div>
  );
};

export default App;
