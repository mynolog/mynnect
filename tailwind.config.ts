import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'selector',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lime-green-300': '#81c784',
        'lime-green-500': '#4caf50',
        'lime-green-700': '#2e7d32',
        'lime-green-900': '#1b5e20',
        'native-gray-600': '#9e9e9e',
        'steel-blue-600': '#3a4c6b',
        'off-white-500': '#f5f5f5',
        'dim-gray-600': '#444444',
        'github-gray': '#333333',
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        shake: 'shake 0.3s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
