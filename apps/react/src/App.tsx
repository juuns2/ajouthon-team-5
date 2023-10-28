import React, { useEffect, useMemo, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

import MessageInput from './MessageInput';
import MyMessage from './MyMessage';
import { ThunderMarker } from './ThunderMarker';
import ToggleButtons from './components/ToggleButtons';
import trpc from './utils/trpc';

const App = () => {
    const { data: bubbleData } = trpc.bubble.getAll.useQuery(undefined, {
        initialData: [],
    });

    const apiContext = trpc.useContext();

    trpc.bubble.onAdd.useSubscription(undefined, {
        onData: (data) => {
            apiContext.bubble.getAll.setData(undefined, (prev) => {
                if (prev) {
                    return [...prev, data];
                }
                return undefined;
            });
        },
    });

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    let [isOpen, setOpen] = React.useState(false);

    const handleCategoryToggle = (categories: string[]) => {
        // 선택된 카테고리를 업데이트
        setSelectedCategories(categories);
    };

    const filteredData = useMemo(() => {
        if (selectedCategories.length === 0) {
            return bubbleData;
        }

        return bubbleData.filter((data) =>
            selectedCategories.includes(data.category),
        );
    }, [bubbleData, selectedCategories]);

    return (
        <main className="flex h-[100dvh] w-screen flex-col items-center justify-center">
            <ToggleButtons onCategoryToggle={handleCategoryToggle} />

            <Map
                onRightClick={(t, e) => {
                    setOpen(true);
                }}
                style={{ width: '100%', height: '100%' }}
                center={{ lat: 37.282, lng: 127.045 }}
                level={3}
            >
                {filteredData.map((data) => (
                    <ThunderMarker
                        category={data.category}
                        key={data.content}
                        lat={data.latitude}
                        lng={data.longitude}
                    />
                ))}
            </Map>

            <MessageInput isOpen={isOpen} onOpenChange={setOpen} />

            {/* <MyMessage /> */}
        </main>
    );
};

export default App;
