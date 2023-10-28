import React from 'react';
import { useState } from 'react';
import {
    Button,
    Dialog,
    DialogTrigger,
    Modal,
    ModalOverlay,
    OverlayArrow,
    Popover,
} from 'react-aria-components';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CategoryInfo from '../../../data/category';
import trpc from '../../../utils/trpc';

//화면을 꾹 누르면 뜨는 메세지를 작성하는 팝업 (화면누를때 뜨는건 구현해야함)
const StyleComp = styled.div`
    .main-container {
        padding: 10px;
        max-width: 500px;
        height: 400px;
        display: flex;
        flex-direction: column;
        border-radius: 25px;
        background: #fff;
        border: 1px solid black;
        justify-content: space-around;
        align-items: center;
        font-family: 'Jua', sans-serif;
        position: relative;
    }
    .chito-img {
        width: 179px;
        height: 179px;
        position: absolute;
        top: -100px;
        left: -40px;
    }
    .closeBtn-container {
        margin-left: auto;
    }
    .category-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 100;
        gap: 12px;
    }
    .category {
        flex: 1;
        background-color: rgba(42, 100, 173, 0.3);
        height: 28px;
        padding: 10px;
        border-radius: 25px;
        color: rgba(0, 0, 0, 0.6);
        cursor: pointer;
        display: flex;
        justify-content: center;
        flex-direction: row;
        white-space: nowrap;
        align-items: center;
        font-family: Jua;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: center;
    }
    .message-container {
        width: 100%;
        height: 200px;
        border-radius: 12px;
        background: rgba(217, 217, 217, 0.38);
    }
    .message-container input {
        width: 100%;
        height: 100%;
        background: rgba(217, 217, 217, 0.38);
        text-align: center;
    }
    .submit-btn {
        background-color: rgba(42, 100, 173, 0.3);
        width: 221px;
        height: 38.12px;
        border-radius: 25px;
    }
`;
const MessageInput: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const lat: number = location.state.lat;
    const lng: number = location.state.lng;

    const createBubbleMutation = trpc.bubble.add.useMutation();

    const [message, setMessage] = useState('');

    const [selectedCategory, setSelectedCategory] =
        useState<keyof typeof CategoryInfo>();

    return (
        <Modal
            isDismissable={true}
            isOpen={true}
            onOpenChange={(v) => {
                if (!v) {
                    navigate(-1);
                }
            }}
        >
            <StyleComp className="flex w-screen items-center justify-center px-4">
                <Dialog className="main-container w-full">
                    {({ close }) => (
                        <>
                            <img className="chito-img" src="/chito1.png"></img>
                            <div className="closeBtn-container">
                                <button onClick={close}>
                                    <svg
                                        className="close-btn"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 21 21"
                                        fill="none"
                                    >
                                        <path
                                            d="M13.8214 8.57145L11.8945 10.5L13.8239 12.4286C14.0088 12.6135 14.1127 12.8643 14.1127 13.1258C14.1127 13.3873 14.0088 13.6382 13.8239 13.8231C13.639 14.008 13.3882 14.1119 13.1266 14.1119C12.8651 14.1119 12.6143 14.008 12.4294 13.8231L10.5 11.8945L8.57145 13.8239C8.38652 14.0088 8.13571 14.1127 7.87418 14.1127C7.61266 14.1127 7.36184 14.0088 7.17692 13.8239C6.99199 13.639 6.8881 13.3882 6.8881 13.1266C6.8881 12.8651 6.99199 12.6143 7.17692 12.4294L9.10547 10.5L7.17856 8.57145C7.08699 8.47988 7.01436 8.37117 6.9648 8.25154C6.91525 8.1319 6.88974 8.00367 6.88974 7.87418C6.88974 7.61265 6.99363 7.36184 7.17856 7.17691C7.36348 6.99199 7.6143 6.8881 7.87582 6.8881C8.13735 6.8881 8.38816 6.99199 8.57309 7.17691L10.5 9.10547L12.4286 7.17609C12.6135 6.99117 12.8643 6.88728 13.1258 6.88728C13.3873 6.88728 13.6382 6.99117 13.8231 7.17609C14.008 7.36102 14.1119 7.61183 14.1119 7.87336C14.1119 8.13488 14.008 8.3857 13.8231 8.57063L13.8214 8.57145ZM19.3594 10.5C19.3594 12.2522 18.8398 13.9651 17.8663 15.422C16.8928 16.8789 15.5092 18.0145 13.8903 18.685C12.2715 19.3555 10.4902 19.531 8.77163 19.1891C7.05307 18.8473 5.47449 18.0035 4.23548 16.7645C2.99647 15.5255 2.1527 13.9469 1.81086 12.2284C1.46902 10.5098 1.64446 8.7285 2.31501 7.10966C2.98555 5.49082 4.12108 4.10718 5.578 3.1337C7.03492 2.16022 8.74778 1.64063 10.5 1.64062C12.8489 1.64323 15.1008 2.57746 16.7617 4.23835C18.4225 5.89924 19.3568 8.15115 19.3594 10.5ZM17.3906 10.5C17.3906 9.13716 16.9865 7.80493 16.2293 6.67177C15.4722 5.53862 14.396 4.65543 13.1369 4.13389C11.8778 3.61236 10.4924 3.4759 9.15571 3.74178C7.81906 4.00765 6.59127 4.66392 5.6276 5.62759C4.66392 6.59126 4.00766 7.81906 3.74178 9.15571C3.4759 10.4924 3.61236 11.8778 4.1339 13.1369C4.65543 14.396 5.53862 15.4722 6.67178 16.2293C7.80494 16.9865 9.13717 17.3906 10.5 17.3906C12.3269 17.3887 14.0784 16.6621 15.3703 15.3702C16.6621 14.0784 17.3887 12.3269 17.3906 10.5Z"
                                            fill="black"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="category-container">
                                {Object.entries(CategoryInfo).map(
                                    ([key, value]) => (
                                        <div
                                            key={key}
                                            className="category"
                                            onClick={() =>
                                                setSelectedCategory(key)
                                            }
                                            style={{
                                                backgroundColor:
                                                    selectedCategory === key
                                                        ? '#2A64AD'
                                                        : 'rgba(42, 100, 173, 0.30)',
                                            }}
                                        >
                                            {<value.icon size={16} />}
                                            <span>{value.title}</span>
                                        </div>
                                    ),
                                )}
                            </div>
                            <label className="message-container">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="시간과 장소를 입력하세요"
                                    className="h-full w-full bg-transparent p-2"
                                />
                            </label>
                            <button
                                className="submit-btn"
                                type="submit"
                                onClick={() => {
                                    if (!selectedCategory) {
                                        alert('카테고리를 선택해주세요');
                                        return;
                                    }

                                    createBubbleMutation.mutate(
                                        {
                                            category: selectedCategory,
                                            latitude: lat!,
                                            longitude: lng!,
                                            message: message,
                                        },
                                        {
                                            onSuccess: () => {
                                                close();
                                            },
                                        },
                                    );
                                }}
                            >
                                등록하기
                            </button>
                        </>
                    )}
                </Dialog>
            </StyleComp>
        </Modal>
    );
};

export default MessageInput;
