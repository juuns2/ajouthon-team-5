import {
    BeerIcon,
    BookIcon,
    DumbbellIcon,
    JoystickIcon,
    MoreHorizontalIcon,
} from 'lucide-react';

const CategoryInfo = {
    study: {
        title: '공부',
        icon: BookIcon,
        className: 'from-pink-500 to-yellow-500',
    },
    food: {
        title: '밥 & 술',
        icon: BeerIcon,
        className: 'from-blue-500 to-cyan-500',
    },
    workout: {
        title: '운동',
        icon: DumbbellIcon,
        className: 'from-emerald-500 to-cyan-500',
    },
    game: {
        title: '게임',
        icon: JoystickIcon,
        className: 'from-red-500 to-slate-500',
    },
    etc: {
        title: '기타',
        icon: MoreHorizontalIcon,
        className: 'from-pink-500 to-purple-500',
    },
};

export default CategoryInfo;
