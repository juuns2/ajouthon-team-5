import React, { useState, useEffect } from 'react';
import '../css/ToggleButtons.css';
import { BsBook } from 'react-icons/bs';
import { IoFastFoodOutline, IoGameControllerOutline } from 'react-icons/io5';
import { LiaDumbbellSolid } from 'react-icons/lia';
import { PiDotsThreeCircleLight } from 'react-icons/pi';

const ToggleButtons = ({ onCategoryToggle }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        // 선택된 카테고리가 변경될 때 부모 컴포넌트로 전달
        onCategoryToggle(selectedCategories);

        console.log(selectedCategories);

        // 부모 컴포넌트로 선택된 카테고리를 전달
        onCategoryToggle(selectedCategories);

    }, [selectedCategories, onCategoryToggle]);


    const toggleCategory = (category) => {
        // 선택된 카테고리를 토글
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }

        console.log(selectedCategories);

        // 부모 컴포넌트로 선택된 카테고리를 전달
        onCategoryToggle(selectedCategories);
    };

    return (
        <div className='button-container'>
            <button
                onClick={() => toggleCategory('study')}
                className={`toggle-button ${selectedCategories.includes('study') ? 'active' : ''}`}
            >
                <BsBook />
                공부
            </button>
            <button
                onClick={() => toggleCategory('food')}
                className={`toggle-button ${selectedCategories.includes('food') ? 'active' : ''}`}
            >
                <IoFastFoodOutline />
                밥 & 술
            </button>
            <button
                onClick={() => toggleCategory('workout')}
                className={`toggle-button ${selectedCategories.includes('workout') ? 'active' : ''}`}
            >
                <LiaDumbbellSolid />
                운동
            </button>
            <button
                onClick={() => toggleCategory('game')}
                className={`toggle-button ${selectedCategories.includes('game') ? 'active' : ''}`}
            >
                <IoGameControllerOutline />
                게임
            </button>
            <button
                onClick={() => toggleCategory('etc')}
                className={`toggle-button ${selectedCategories.includes('etc') ? 'active' : ''}`}
            >
                <PiDotsThreeCircleLight />
                기타
            </button>
        </div>
    );
};

export default ToggleButtons;
