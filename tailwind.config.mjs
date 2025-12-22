/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1D6F42", // Changed to Excel Green as requested
                "primary-dark": "#145231",
                "excel-green": "#1D6F42",
                "navy-blue": "#0F172A", // Added navy blue for text/backgrounds if needed
                "smoke-gray": "#F3F4F6",
                "background-light": "#F3F4F6", // Smoke gray background
                "background-dark": "#102218",
                "surface-light": "#ffffff",
                "surface-dark": "#1a2c23",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "body": ["Inter", "sans-serif"],
            },
            keyframes: {
                shimmer: {
                    '100%': { transform: 'translateX(100%)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            animation: {
                shimmer: 'shimmer 1s infinite',
                float: 'float 4s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
