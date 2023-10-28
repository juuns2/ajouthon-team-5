import { motion } from 'framer-motion';
import { HeartIcon, ZapIcon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import MessageInput from './MessageInput';
import MessagePopup from './MessagePopup';
import MyMessage from './MyMessage';
import KakaoMap from './components/KakaoMap';
import ToggleButtons from './components/ToggleButtons';
import { mockDatas } from './mockdata';
// import { Map } from 'react-kakao-maps-sdk';
import trpc from './utils/trpc';

const ThunderMarker: React.FC<{ lat: number; lng: number }> = ({
    lat,
    lng,
}) => {
    return (
        <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
            // 커스텀 오버레이가 표시될 위치입니다
            position={{
                lat: lat,
                lng: lng,
            }}
        >
            <motion.div
                className="cursor-pointer"
                whileHover={{
                    scale: 1.2,
                    transition: {
                        duration: 0.2,
                    },
                }}
            >
                {/* 커스텀 오버레이에 표시할 내용입니다 */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-orange-500 bg-slate-500 shadow-md">
                    <ZapIcon size={32} strokeWidth="1" fill="yellow" />
                </div>
                <div className="absolute -bottom-1 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-orange-500 bg-slate-500 shadow-md">
                    <HeartIcon size={12} strokeWidth="1" fill="red" />
                </div>
            </motion.div>
        </CustomOverlayMap>
    );
};

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
                    <ThunderMarker
                        key={data.content}
                        lat={data.latitude}
                        lng={data.longitude}
                    />
                ))}
            </Map>
      <MessageInput/>
      <MessagePopup/>
      <MyMessage/>
        </main>
    );
};

export default App;
