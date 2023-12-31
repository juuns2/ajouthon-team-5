import { motion } from 'framer-motion';
import { ZapIcon } from 'lucide-react';
import React from 'react';
import {
    Button,
    Dialog,
    DialogTrigger,
    OverlayArrow,
    Popover,
} from 'react-aria-components';
import { CustomOverlayMap } from 'react-kakao-maps-sdk';

import BubblePopup from './components/BubblePopup';
import CategoryInfo from './data/category';

const MotionButton = motion(Button);
export const ThunderMarker: React.FC<{
    nickname: string;
    lat: number;
    lng: number;
    category: keyof typeof CategoryInfo;
    message: string;
    meEmoji: boolean;
}> = ({ lat, lng, category, message, nickname, meEmoji = false }) => {
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
                        className={`flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-4 border-orange-500 bg-slate-500 shadow-md`}
                    >
                        <span className="text-base font-bold text-white">
                            {nickname}
                        </span>
                        <div
                            className={
                                'absolute -bottom-2 -right-3 flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-500 bg-slate-500 shadow-md ' +
                                CategoryInfo[category].className +
                                ' bg-gradient-to-tr'
                            }
                        >
                            <IconComponent size={16} strokeWidth="2" />
                        </div>
                        {
                            <div
                                className={
                                    'absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-orange-500 bg-slate-500 bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-md'
                                }
                            >
                                <ZapIcon
                                    size={16}
                                    strokeWidth="1"
                                    fill="yellow"
                                />
                            </div>
                        }
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
                        <BubblePopup nickname={nickname} message={message} />
                    </Dialog>
                </Popover>
            </DialogTrigger>
        </CustomOverlayMap>
    );
};
