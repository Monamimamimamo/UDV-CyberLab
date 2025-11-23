import { heroui } from '@heroui/react';

// TODO переписать на @theme https://tailwindcss.com/docs/theme
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#DDE0F1',
        foreground: '#343976',
        secondary: '#EDEDFC',
        second: '#9599CC',
        link: '#3568FF',

        search: '#EDEDFC',
        header: '#EDEDFC',

        white: '#FDFDFD',
        gray: '#B9BACA',
        orange: '#F29F26',
        focus: '#9599CC',

        controls: '#E9E9F1',
        'controls-primary': '#F4F4F5',
      },
      fontFamily: {
        inter: ['Inter Variable', 'sans-serif'],
        w3ip: ['W3-ip', 'sans-serif'],
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(90deg, #343976, #9599CC)',
        'second-gradient': 'linear-gradient(90deg, #9599CC, #343976)',
      },
      dropShadow: {
        base: '0 4px 4px rgba(0,0,0,0.15)',
      },
      container: {
        center: true,
      },
      screens: {
        mobile: '440px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
