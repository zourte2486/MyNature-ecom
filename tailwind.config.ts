import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Honey-inspired color palette
        primary: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Main honey gold
          600: '#d97706', // Dark honey
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#059669', // Herbal green
          600: '#047857',
          700: '#065f46',
          800: '#064e3b',
          900: '#064e3b',
        },
        accent: {
          50: '#fefce8',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#fef3c7', // Honeycomb beige
          600: '#fde68a',
          700: '#fcd34d',
          800: '#fbbf24',
          900: '#f59e0b',
        },
        background: '#fffdf8', // Warm off-white
        surface: '#ffffff', // Panel white
        text: {
          primary: '#1f2937', // Dark gray
          secondary: '#6b7280', // Neutral gray
        }
      },
      fontFamily: {
        'arabic': ['Cairo', 'Amiri', 'Noto Sans Arabic', 'sans-serif'],
        'sans': ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'honey': '1rem', // Honeycomb-inspired rounded corners
      },
      boxShadow: {
        'honey': '0 4px 6px -1px rgba(245, 158, 11, 0.1), 0 2px 4px -1px rgba(245, 158, 11, 0.06)',
        'honey-lg': '0 10px 15px -3px rgba(245, 158, 11, 0.1), 0 4px 6px -2px rgba(245, 158, 11, 0.05)',
      },
      animation: {
        'honey-drip': 'honey-drip 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'honey-drip': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
