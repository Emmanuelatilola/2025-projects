/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce': 'bounce 2s infinite',
        'spin': 'spin 1s linear infinite',
        'fadeInUp': 'fadeInUp 0.6s ease forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-button': 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        'gradient-details': 'linear-gradient(135deg, #667eea, #764ba2)',
      },
      boxShadow: {
        'hero': '0 10px 30px rgba(0,0,0,0.2)',
        'card': '0 15px 35px rgba(0,0,0,0.1)',
        'button': '0 4px 15px rgba(102, 126, 234, 0.3)',
        'video': '0 6px 20px rgba(255, 107, 107, 0.4)',
      },
    },
  },
  plugins: [],
}

