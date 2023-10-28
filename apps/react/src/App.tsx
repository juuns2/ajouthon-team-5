import React, { useEffect, useState } from "react";
// import { Map } from 'react-kakao-maps-sdk';
import trpc from './utils/trpc';
import ToggleButtons from './components/ToggleButtons';
import KakaoMap from "./components/KakaoMap";

import { mockDatas } from "./mockdata";


const App = () => {
    const { isLoading } = trpc.example.useQuery();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    const handleCategoryToggle = (categories: string[]) => {
        // 선택된 카테고리를 업데이트
        setSelectedCategories(categories);
    };

    return (
        <main className="flex h-[100dvh] w-screen flex-col items-center justify-center">
            <ToggleButtons onCategoryToggle={handleCategoryToggle} />
            <KakaoMap markers={mockDatas} selectedCategories={selectedCategories} />
        </main>
    );
};

export default App;
