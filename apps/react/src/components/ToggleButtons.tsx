import React, { useEffect, useState } from 'react';
import { BsBook } from 'react-icons/bs';
import { IoFastFoodOutline, IoGameControllerOutline } from 'react-icons/io5';
import { LiaDumbbellSolid } from 'react-icons/lia';
import { PiDotsThreeCircleLight } from 'react-icons/pi';

import '../css/ToggleButtons.css';
import CategoryInfo from './category';

const ToggleButtons = ({ onCategoryToggle }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        // 선택된 카테고리가 변경될 때 부모 컴포넌트로 전달
        onCategoryToggle(selectedCategories);

        console.log(selectedCategories);

        // 부모 컴포넌트로 선택된 카테고리를 전달
        onCategoryToggle(selectedCategories);
    }, [selectedCategories, onCategoryToggle]);

    const toggleCategory = (category: string) => {
        // 선택된 카테고리를 토글
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((cat) => cat !== category),
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }

        // 부모 컴포넌트로 선택된 카테고리를 전달
        onCategoryToggle(selectedCategories);
    };

    return (
        <div className="button-container absolute inset-x-0 top-4 bg-black/30 px-2 py-2">
            <div className="flex w-fit gap-2">
                {Object.entries(CategoryInfo).map(([key, value]) => (
                    <button
                        onClick={() => toggleCategory(key)}
                        className={`toggle-button ${
                            selectedCategories.includes(key)
                                ? 'grayscale-[0%]'
                                : 'grayscale-[70%]'
                        } bg-gradient-to-tr text-white shadow-lg ${
                            value.className
                        }`}
                    >
                        <value.icon />
                        {value.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ToggleButtons;
