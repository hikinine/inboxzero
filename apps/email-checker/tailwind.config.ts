import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Identidade midnight (ref. Linear)
        void: '#08090a',
        carbon: '#0f1011',
        obsidian: '#161718',
        graphite: '#23252a',
        smoke: '#383b3f',
        ash: '#62666d',
        fog: '#8a8f98',
        mist: '#d0d6e0',
        bone: '#e5e5e6',
        // Único acento cromático de ação
        brand: {
          DEFAULT: '#e4f222',
          fg: '#08090a',
        },
        pulse: '#27a644',
        coral: '#eb5757',
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config;
