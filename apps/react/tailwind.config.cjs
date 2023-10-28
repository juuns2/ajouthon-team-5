/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'ajou-blue': '#0033FF',
                'ajou-gold': '#B38000',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('tailwindcss-react-aria-components'),
    ],
};
