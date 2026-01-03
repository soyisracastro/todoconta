/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "var(--color-primary)",
                "primary-dark": "var(--color-primary-dark)",
                "primary-hover": "var(--color-primary-hover)",
                "secondary": "var(--color-secondary)",
                "text-main": "var(--color-text-primary)",
                "text-muted": "var(--color-text-secondary)",
                "excel-green": "#1D6F42",
                "navy-blue": "#0F172A",
                "background-light": "var(--color-background)",
                "background-dark": "var(--color-hero-background)",
                "surface-light": "var(--color-surface)",
                "surface-dark": "var(--color-hero-background-alt)",
            },
            fontFamily: {
                "display": ["Space Grotesk Variable", "Space Grotesk", "Inter", "sans-serif"],
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
