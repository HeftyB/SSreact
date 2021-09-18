module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        blowUpModal: {
          '0%': {transform: 'scale(0)', opacity: '0'},
          '100%': {transform: 'scale(1)', opacity: '1'}
        },
        blowUpModalTwo: {
          '0%': {transform: 'scale(1)', opacity: '1'},
          '100%': {transform: 'scale(0)', opacity: '0'}
        },
      },
      animation: {
        blowUpModal: "blowUpModal 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
        blowUpModalTwo: "blowUpModalTwo 2s cubic-bezier(0.165, 0.84, 0.44, 1) forwards",
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

