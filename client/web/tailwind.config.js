/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red: {
          primary: '#FF2F01',
          secondary: '#FF7D01',
        },
        gray: {
          primary: '#EDEDED',
          secondary: '#D2D2D2',
          third: '#ffffffeb',
        },
        dark: {
          primary: '#1E293B',
          secondary: '#0F172A',
        },
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          white: '#ffffff',
          primary: '#FF2F01',
          secondary: '#FF7D01',
          accent: '#EEAF3A',
          neutral: 'black',
          'base-100': '#FAF7F5',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#FF2F01',
        },
      },
    ],
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
};
