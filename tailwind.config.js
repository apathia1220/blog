module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        'tab': '0.875rem',
        'control': '1rem',
        'title-1': '2.25rem',
        'title-2': '1.5rem',
        'title-3': '1.875rem',
        'content-1': '1.12rem',
        'content-2': '1rem',
       },
      maxWidth: {
        '1/2': '50%',
        '10/12': '80%',
        '12/10': '120%',
        'ap': 'var(--max-width)'
      },
      minHeight: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
        'content': '600px',
        'carousel': '400px'
       },
       maxHeight: {
        'carousel': '9rem'
       },
      spacing: {
        '12/10': '120%'
      },
      height: {
        'ap-carousel': '28rem',
        'ap-talk-icon': '4.5rem',
        '12/10': '120%',
      },
      colors: {
        'ap-card': 'var(--background-card)',
        'ap-tag': 'var(--background-tag)',
        'ap-bg': 'var(--background)',
        'ap-trans': 'var(--background-trans)',
        'ap-bright': 'var(--text-bright)',
        'ap-normal': 'var(--text-normal)',
        'ap-link': 'var(--text-link)',
        'ap-link-hover': 'var(--text-a-hover)',
        'ap-login': '#1ca4b3',
        'ap-dim': 'var(--text-dim)',
        'ap-accent': 'var(--text-accent)',
      },
      boxShadow: {
        ap: 'var(--shadow)',
      },
      backgroundImage: {
        'ap': 'var(--main--gradient)'
      },
      zIndex: {
        '999': '999',
        '1000': '1000'
      },
      fontFamily: {
        'icon-font': 'var(--font-family)'
      },
      gridTemplateColumns: {
        'main': 'minmax(0, 1fr) 320px'
      },
      translate: {
        "7/10": "70%"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')]
}
