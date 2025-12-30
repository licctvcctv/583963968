/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}", // Key: user has components at root
        "./*.{js,ts,jsx,tsx}", // Key: App.tsx and index.tsx are at root
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                serif: ['SimSun', 'Songti SC', 'serif'], // 'font-song'
                hei: ['SimHei', 'Heiti SC', 'sans-serif'], // 'font-hei'
            },
        },
    },
    plugins: [],
}
