import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <main className="min-h-[100dvh] w-screen">
            <Outlet />
        </main>
    );
}
