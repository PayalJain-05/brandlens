/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary — deep bluish-violet / indigo (Brand identity, analysis)
        brand: {
          50: '#f3f1ff',
          100: '#e9e5ff',
          200: '#d4ccff',
          300: '#b5a6ff',
          400: '#9079ff',
          500: '#7658f5',
          600: '#6444e0',
          700: '#5236b8',
          800: '#3f2890',
          900: '#2d1d68',
          950: '#1a1138',
        },
        // Mint — strengths / positive insights
        mint: {
          50: '#eafaf4',
          100: '#cdf3e3',
          200: '#9ee7c9',
          300: '#62d6aa',
          400: '#35d39a',
          500: '#1fb885',
          600: '#15956d',
          700: '#127558',
          800: '#105c46',
          900: '#0d4938',
        },
        // Sky — supporting information
        sky: {
          50: '#eef9fe',
          100: '#d2f0fc',
          200: '#a9e3f9',
          300: '#71d2f5',
          400: '#32b5f0',
          500: '#1c98d6',
          600: '#177ab0',
          700: '#15628c',
          800: '#154f72',
          900: '#143f5c',
        },
        // Pink — Story Mining / creativity
        pink: {
          50: '#fdeffa',
          100: '#fadcec',
          200: '#f4b8d8',
          300: '#ec8cc0',
          400: '#f05db4',
          500: '#d63d97',
          600: '#b62a7c',
          700: '#942264',
          800: '#781e53',
          900: '#621b45',
        },
        // Mustard — actions / priorities
        mustard: {
          50: '#fffbeb',
          100: '#fff3c7',
          200: '#ffe585',
          300: '#ffd83d',
          400: '#f5c014',
          500: '#d9a00a',
          600: '#b07c08',
          700: '#8c5e0a',
          800: '#714c0c',
          900: '#5e3e0d',
        },
        // Coral — gaps / warnings
        coral: {
          50: '#fff2f2',
          100: '#ffe0e0',
          200: '#ffc6c7',
          300: '#ff9ea0',
          400: '#ff5a5f',
          500: '#e84247',
          600: '#c92e33',
          700: '#a52529',
          800: '#86232a',
          900: '#6f2127',
        },
        // Orange — secondary highlights
        orange: {
          50: '#fff6ec',
          100: '#ffe9cf',
          200: '#ffce9c',
          300: '#ffb266',
          400: '#f4a04a',
          500: '#e0822c',
          600: '#bd651f',
          700: '#974e1c',
          800: '#7b3f1d',
          900: '#66341c',
        },
        // Neutrals — warm off-white foundation
        ink: {
          50: '#f4f1eb',
          100: '#ece8e0',
          200: '#ddd7cb',
          300: '#c6bda9',
          400: '#a89e88',
          500: '#857c69',
          600: '#665f50',
          700: '#4a4538',
          800: '#2a2620',
          900: '#1a1814',
          950: '#111111',
        },
      },
      fontFamily: {
        display: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px -1px rgba(17, 17, 17, 0.05), 0 6px 16px -8px rgba(17, 17, 17, 0.08)',
        card: '0 1px 3px -1px rgba(17, 17, 17, 0.06), 0 10px 28px -10px rgba(17, 17, 17, 0.12)',
        float: '0 16px 40px -12px rgba(17, 17, 17, 0.20)',
        glow: '0 0 36px -8px rgba(118, 88, 245, 0.40)',
        'inner-soft': 'inset 0 1px 2px rgba(17, 17, 17, 0.04)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-fast': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'orb-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.95' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'orb-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'check-pop': {
          '0%': { transform: 'scale(0)' },
          '70%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
        'draw-line': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        'orb-breathe': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.04) rotate(180deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out both',
        'fade-in-fast': 'fade-in-fast 0.3s ease-out both',
        'orb-pulse': 'orb-pulse 3.5s ease-in-out infinite',
        'orb-rotate': 'orb-rotate 24s linear infinite',
        'float-up': 'float-up 5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'check-pop': 'check-pop 0.4s ease-out both',
        'draw-line': 'draw-line 1.5s ease-out forwards',
        'orb-breathe': 'orb-breathe 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
