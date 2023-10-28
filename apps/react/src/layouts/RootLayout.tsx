import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <main className="flex h-[100dvh] w-screen flex-col items-center justify-center">
            <Outlet />
        </main>
    );
}
