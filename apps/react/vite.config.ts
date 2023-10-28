import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/trpc': {
                target: 'http://localhost:5001/trpc',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/trpc/, ''),
                secure: false,
            },
            '/websocket': {
                target: 'http://localhost:5001/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/websocket/, ''),
                secure: false,
                ws: true,
            },
        },
    },
});
