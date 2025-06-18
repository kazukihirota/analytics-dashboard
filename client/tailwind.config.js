/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary-red': '#fb5153',
        'primary-indigo': '#6366f1',
        'secondary-amber': '#f59e0b',
        'secondary-emerald': '#10b981',
        'secondary-violet': '#8b5cf6',
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '0.75rem' }], // 10px
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        // ... existing code ...
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
