import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#246B45',
          50: '#F0F7F3',
          100: '#E1EFE7',
          200: '#C2DFCE',
          300: '#95C7AB',
          400: '#62AB83',
          500: '#3D8F61',
          600: '#246B45',
          700: '#1C5436',
          800: '#17432C',
          900: '#123724',
        },
        leaf: {
          DEFAULT: '#4B9561',
          50: '#F2F8F4',
          100: '#E4F1E9',
          200: '#C7E2D2',
          300: '#9BCBB0',
          400: '#6DB08A',
          500: '#4B9561',
          600: '#3A794D',
          700: '#2F603D',
          800: '#284C32',
          900: '#213E2A',
        },
        agriBg: '#F7F9F6',
        agriSurface: '#FFFFFF',
        agriText: '#1C2921',
        agriMuted: '#69766D',
        agriBorder: '#E5EAE5',
        agriWarning: '#E8A23A',
        agriDanger: '#D9534F',
        agriInfo: '#4285B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
