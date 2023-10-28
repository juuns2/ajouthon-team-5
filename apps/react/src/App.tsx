import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { LongPressEventType, useLongPress } from 'use-long-press';

import MessageInput from './MessageInput';
import MyMessage from './MyMessage';
import { ThunderMarker } from './ThunderMarker';
import ToggleButtons from './components/ToggleButtons';
import trpc from './utils/trpc';

const App = () => {
    const { data: bubbleData } = trpc.bubble.getAll.useQuery(undefined, {
        initialData: [],
    });

    const apiContext = trpc.useUtils();

    const mapInstance = useRef<kakao.maps.Map | null>(null);

    const bind = useLongPress(
        (e, m) => {
            const mapProjection = mapInstance.current.getProjection();

            console.log(
                e.nativeEvent.touches[0].clientX,
                e.nativeEvent.touches[0].clientY,
            );

            const latlng = mapProjection.coordsFromContainerPoint(
                new kakao.maps.Point(
                    e.nativeEvent.touches[0].clientX,
                    e.nativeEvent.touches[0].clientY,
                ),
            );

            e.stopPropagation();

            setCreateModalData((prev) => ({
                ...prev,
                isOpen: true,
                lat: latlng.getLat(),
                lng: latlng.getLng(),
            }));
        },
        {
            cancelOnMovement: true,
            detect: LongPressEventType.Touch,
        },
    );

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

    let [createModalData, setCreateModalData] = React.useState<{
        isOpen: boolean;
        lat: number | null;
        lng: number | null;
    }>({
        isOpen: false,
        lat: null,
        lng: null,
    });

    const handleCategoryToggle = (categories: string[]) => {
        // 선택된 카테고리를 업데이트
        setSelectedCategories(categories);
    };

    const filteredData = useMemo(() => {
        if (selectedCategories.length === 0) {
            return bubbleData;
        }

        return bubbleData.filter((data) =>
            selectedCategories.includes(data.bubble.category),
        );
    }, [bubbleData, selectedCategories]);

    return (
        <main className="flex h-[100dvh] w-screen flex-col items-center justify-center">
            <ToggleButtons onCategoryToggle={handleCategoryToggle} />

            <Map
                onCreate={(map) => {
                    mapInstance.current = map;
                }}
                {...bind()}
                style={{ width: '100%', height: '100%' }}
                center={{ lat: 37.282, lng: 127.045 }}
                level={3}
            >
                {filteredData.map((data) => (
                    <ThunderMarker
                        category={data.bubble.category}
                        key={data.bubble.id}
                        lat={data.bubble.latitude}
                        lng={data.bubble.longitude}
                        message={data.bubble.message}
                    />
                ))}
            </Map>

            <MessageInput
                isOpen={createModalData.isOpen}
                lat={createModalData.lat}
                lng={createModalData.lng}
                onOpenChange={(v) =>
                    setCreateModalData((prev) => ({
                        ...prev,
                        isOpen: v,
                    }))
                }
            />

            {/* <MyMessage /> */}
        </main>
    );
};

export default App;
