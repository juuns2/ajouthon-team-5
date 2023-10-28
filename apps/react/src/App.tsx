import { motion } from 'framer-motion';
import { HeartIcon, ZapIcon } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import {
    Button,
    Dialog,
    DialogTrigger,
    Modal,
    ModalOverlay,
    OverlayArrow,
    Popover,
} from 'react-aria-components';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';

import MessageInput from './MessageInput';
import MessagePopup from './MessagePopup';
import MyMessage from './MyMessage';
import ToggleButtons from './components/ToggleButtons';
import CategoryInfo from './components/category';
import { mockDatas } from './mockdata';
import trpc from './utils/trpc';

const MotionButton = motion(Button);

const ThunderMarker: React.FC<{
    lat: number;
    lng: number;
    category: keyof typeof CategoryInfo;
}> = ({ lat, lng, category }) => {
    const IconComponent = CategoryInfo[category].icon;

    return (
        <CustomOverlayMap
            position={{
                lat: lat,
                lng: lng,
            }}
        >
            <DialogTrigger>
                <MotionButton
                    className="cursor-pointer select-none"
                    whileTap={{
                        scale: 1.2,
                        transition: {
                            duration: 0.2,
                        },
                    }}
                    whileHover={{
                        scale: 1.2,
                        transition: {
                            duration: 0.2,
                        },
                    }}
                >
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full border-4 border-orange-500 bg-slate-500 shadow-md`}
                    >
                        <ZapIcon size={36} strokeWidth="1" fill="yellow" />
                        <div
                            className={
                                'absolute -bottom-2 -right-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-500 bg-slate-500 shadow-md ' +
                                CategoryInfo[category].className +
                                ' bg-gradient-to-tr'
                            }
                        >
                            <IconComponent size={16} strokeWidth="2" />
                        </div>
                    </div>
                </MotionButton>
                <Popover
                    placement="top"
                    arrowSize={6}
                    className={({ isEntering, isExiting }) => `
        placement-bottom:mt-2 placement-top:mb-2 group rounded-lg 
        ${
            isEntering
                ? 'animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 duration-200 ease-out'
                : ''
        }
        ${
            isExiting
                ? 'animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 duration-150 ease-in'
                : ''
        }
      `}
                >
                    <OverlayArrow />
                    <Dialog>
                        <MessagePopup />
                    </Dialog>
                </Popover>
            </DialogTrigger>
        </CustomOverlayMap>
    );
};

const App = () => {
    const { isLoading } = trpc.example.useQuery();

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    let [isOpen, setOpen] = React.useState(false);

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
