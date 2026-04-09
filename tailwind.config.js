import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            colors: {
                "primary-fixed-dim": "#5391ff",
                "surface-tint": "#0057bd",
                "on-background": "#2c2f31",
                "primary-container": "#6e9fff",
                "on-secondary-fixed": "#004840",
                "error-container": "#fb5151",
                "on-error": "#ffefee",
                "outline": "#747779",
                "secondary": "#00675c",
                "tertiary-fixed-dim": "#f08934",
                "secondary-fixed-dim": "#50ebd5",
                "error": "#b31b25",
                "primary-dim": "#004ca6",
                "tertiary-dim": "#7e3e00",
                "inverse-on-surface": "#9a9d9f",
                "on-secondary-fixed-variant": "#00675c",
                "inverse-surface": "#0b0f10",
                "inverse-primary": "#4d8eff",
                "surface-container-low": "#eef1f3",
                "surface-variant": "#d9dde0",
                "tertiary-fixed": "#ff9742",
                "on-tertiary-fixed-variant": "#5d2c00",
                "secondary-dim": "#005a50",
                "on-secondary-container": "#005c52",
                "on-primary": "#f0f2ff",
                "surface-container-high": "#dfe3e6",
                "on-surface": "#2c2f31",
                "on-tertiary-container": "#4f2500",
                "surface-dim": "#d0d5d8",
                "primary-fixed": "#6e9fff",
                "on-tertiary": "#fff0e8",
                "on-surface-variant": "#595c5e",
                "surface-container-lowest": "#ffffff",
                "on-tertiary-fixed": "#2b1100",
                "on-error-container": "#570008",
                "outline-variant": "#abadaf",
                "on-primary-fixed-variant": "#002a62",
                "surface-bright": "#f5f7f9",
                "surface-container": "#e5e9eb",
                "on-primary-fixed": "#000000",
                "tertiary-container": "#ff9742",
                "secondary-container": "#62fae3",
                "on-secondary": "#c1fff2",
                "error-dim": "#9f0519",
                "background": "#f5f7f9",
                "surface": "#f5f7f9",
                "secondary-fixed": "#62fae3",
                "on-primary-container": "#002150",
                "surface-container-highest": "#d9dde0",
                "tertiary": "#904800",
                "primary": "#0057bd"
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                headline: ['Manrope', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                label: ['Inter', 'sans-serif']
            },
        },
    },

    plugins: [forms],
};
