/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        void: '#050505',
        panel: '#0B0B0F',
        panel2: '#12121A',
        ink: '#E8E8E8',
        muted: '#A9ADB8',
        gamma: '#7CFF00',
        glow: '#39FF14',
        hulk: '#7CFF00',
        volt: '#7CFF00',
        violet: '#39FF14',
        lavender: '#A3FF2E',
        cyan: '#7CFF00',
        steel: '#8FA3B8',
        edge: '#7CFF00',
        // Live colours driven by the rage engine (src/lib/rage.js)
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-text': 'rgb(var(--accent-text) / <alpha-value>)',
        heading: 'rgb(var(--heading) / <alpha-value>)',
        surge: 'rgb(var(--glow) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Saira', 'Impact', 'Arial Narrow', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      maxWidth: {
        site: '76rem',
      },
    },
  },
  plugins: [],
};
