import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
const StyleComp = styled.div`
.main-container{
    width: 260.634px;
height: 218px;
border-radius: 25px;
background: #FFF;
position:relative;
}
.text-container{
width: 243.303px;
height: 204px;
border-radius: 25px;
background: rgba(217, 217, 217, 0.38);
position:absolute;
top:7px;
left:8.32px;
display:flex;
flex-direction:column;
padding:8px;
}
.close-btn{
    margin-left:auto;
    cursor:pointer;
    z-index:2000;
}
.text-box{
    color: #000;
    width: 229.836px;
    height: 155.664px;
text-align: center;
font-family: Jua;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
display:flex;
flex-direction:column;
justify-content:center;
}
.text-box div{
    margin-bottom:5px;
}
.chito-img{
width: 227px;
height: 230px;
position:absolute;
bottom:160px;
left:16px;
z-index:1000;
}
`

function MessageRepeatPopUp(){
    return(
        <StyleComp>
            <div className='main-container'>
                <img className='chito-img' src='/chito4.png'></img>
                <div className='text-container'>
                <svg className='close-btn' xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M12.3368 7.65075L10.6168 9.37215L12.339 11.0935C12.504 11.2586 12.5967 11.4825 12.5967 11.7159C12.5967 11.9493 12.504 12.1732 12.339 12.3383C12.1739 12.5033 11.95 12.5961 11.7166 12.5961C11.4831 12.5961 11.2593 12.5033 11.0942 12.3383L9.37209 10.6169L7.65069 12.339C7.48563 12.5041 7.26176 12.5968 7.02832 12.5968C6.79489 12.5968 6.57102 12.5041 6.40596 12.339C6.24089 12.1739 6.14816 11.9501 6.14816 11.7166C6.14816 11.4832 6.24089 11.2593 6.40596 11.0943L8.12735 9.37215L6.40742 7.65075C6.32569 7.56902 6.26086 7.47199 6.21663 7.3652C6.17239 7.25842 6.14963 7.14397 6.14963 7.02838C6.14963 6.79495 6.24236 6.57108 6.40742 6.40601C6.57248 6.24095 6.79636 6.14822 7.02979 6.14822C7.26322 6.14822 7.48709 6.24095 7.65216 6.40601L9.37209 8.12741L11.0935 6.40528C11.2585 6.24022 11.4824 6.14749 11.7158 6.14749C11.9493 6.14749 12.1732 6.24022 12.3382 6.40528C12.5033 6.57034 12.596 6.79422 12.596 7.02765C12.596 7.26108 12.5033 7.48496 12.3382 7.65002L12.3368 7.65075ZM17.2798 9.37215C17.2798 10.9361 16.816 12.465 15.9471 13.7654C15.0782 15.0659 13.8432 16.0794 12.3982 16.6779C10.9533 17.2765 9.36332 17.4331 7.82937 17.1279C6.29542 16.8228 4.88639 16.0697 3.78048 14.9638C2.67456 13.8578 1.92143 12.4488 1.6163 10.9149C1.31118 9.38092 1.46778 7.79094 2.0663 6.34599C2.66482 4.90104 3.67837 3.66602 4.97879 2.79711C6.27921 1.9282 7.80809 1.46442 9.37209 1.46442C11.4686 1.46674 13.4786 2.30062 14.9611 3.78311C16.4436 5.26559 17.2775 7.2756 17.2798 9.37215ZM15.5225 9.37215C15.5225 8.1557 15.1618 6.96657 14.486 5.95513C13.8102 4.9437 12.8496 4.15538 11.7258 3.68987C10.6019 3.22435 9.36526 3.10255 8.17219 3.33987C6.97912 3.57719 5.88322 4.16296 5.02306 5.02312C4.1629 5.88327 3.57713 6.97918 3.33981 8.17225C3.10249 9.36532 3.22429 10.602 3.68981 11.7258C4.15532 12.8497 4.94364 13.8102 5.95508 14.4861C6.96652 15.1619 8.15564 15.5226 9.37209 15.5226C11.0028 15.5209 12.5661 14.8723 13.7192 13.7192C14.8722 12.5662 15.5208 11.0028 15.5225 9.37215Z" fill="black"/>
                </svg>
                <div className='text-box'>
                    <div>메세지 등록은 최대 '한개'만 가능합니다.</div>
                    <div>재등록을 원할시 기존 메세지를 클리어해주세요!</div>
                </div>

                </div>
            </div>
        </StyleComp>
    )
}

export default MessageRepeatPopUp;