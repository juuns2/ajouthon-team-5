import React, { useEffect, useMemo, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import KakaoMap from './components/KakaoMap';
import ToggleButtons from './components/ToggleButtons';
import { mockDatas } from './mockdata';
// import { Map } from 'react-kakao-maps-sdk';
import trpc from './utils/trpc';

const App = () => {
    const { isLoading } = trpc.example.useQuery();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoryToggle = (categories: string[]) => {
        // 선택된 카테고리를 업데이트
        setSelectedCategories(categories);
    };

    const filteredData = useMemo(() => {
        if (selectedCategories.length === 0) {
            return mockDatas;
        }

        return mockDatas.filter((data) =>
            selectedCategories.includes(data.category),
        );
    }, [selectedCategories]);

    return (
        <main className="flex h-[100dvh] w-screen flex-col items-center justify-center">
            <ToggleButtons onCategoryToggle={handleCategoryToggle} />
            <Map
                style={{ width: '100%', height: '100%' }}
                center={{ lat: 37.282, lng: 127.045 }}
                level={3}
            >
                {filteredData.map((data) => (
                    <MapMarker
                        key={data.content}
                        position={{
                            lat: data.latitude,
                            lng: data.longitude,
                        }}
                        image={{
                            src: `/public/thunder_${data.category}.png`,
                            size: {
                                width: 60,
                                height: 60,
                            },
                        }}
                    />
                ))}
            </Map>
        </main>
    );
};

export default App;
