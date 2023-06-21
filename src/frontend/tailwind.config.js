/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
      'px-18': '18px',
      'px-22': '22px',
      'px-40': '40px',

    },
    fontFamily: {
      'mont': ['Montserrat', 'sans-serif'],
      'inter' : ['Inter'],
    },
    screens: {
      'sm': '480px',
      'md': '547px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1680px',
    },
    extend: {
      colors: {
        'white': '#ffffff',
        'black-zero': '#373D43',
        'black-cem': '#000000',
        'blue-gerdau-init': "#0079C1",
        'blue-gerdau-mid': "#004A8F",
        'blue-gerdau-end': "#003068",
      },
      // backgroundImage: {
      //   'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      //   'gradient-conic':
      //     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      // },
    },
    boxShadow: {
      'custom': '0px 0px 10px rgba(0, 0, 0, 0.25)',
    },
  },
  plugins: [],
}
