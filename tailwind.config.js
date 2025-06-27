const { hairlineWidth, platformSelect } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // 🌲 THÈME AVENTURE & FORÊT PREMIUM GNTREK
        border: withOpacity('border'),
        input: withOpacity('input'),
        ring: withOpacity('ring'),
        background: withOpacity('background'),
        foreground: withOpacity('foreground'),
        primary: {
          DEFAULT: withOpacity('primary'),
          foreground: withOpacity('primary-foreground'),
        },
        secondary: {
          DEFAULT: withOpacity('secondary'),
          foreground: withOpacity('secondary-foreground'),
        },
        destructive: {
          DEFAULT: withOpacity('destructive'),
          foreground: withOpacity('destructive-foreground'),
        },
        muted: {
          DEFAULT: withOpacity('muted'),
          foreground: withOpacity('muted-foreground'),
        },
        accent: {
          DEFAULT: withOpacity('accent'),
          foreground: withOpacity('accent-foreground'),
        },
        popover: {
          DEFAULT: withOpacity('popover'),
          foreground: withOpacity('popover-foreground'),
        },
        card: {
          DEFAULT: withOpacity('card'),
          foreground: withOpacity('card-foreground'),
        },
        // 🎨 COULEURS OFFICIELLES GNTREK
        gntrek: {
          red: '#D72638',      // Rouge GNTREK officiel
          black: '#000000',    // Noir officiel  
          white: '#FFFFFF',    // Blanc officiel
          forest: '#1A2F1A',   // Vert forêt sombre
          earth: '#8B4513',    // Brun terre
          adventure: '#FF8C42', // Orange aventure
          sky: '#4A90E2',      // Bleu ciel/wilderness
          mist: '#F5F7FA',     // Gris brume
          stone: '#6B7280',    // Gris pierre
        },
        // Gradients nature
        nature: {
          50: '#f0fdf4',   // Vert très clair
          100: '#dcfce7',  // Vert clair
          200: '#bbf7d0',  // Vert doux
          300: '#86efac',  // Vert moyen
          400: '#4ade80',  // Vert vif
          500: '#22c55e',  // Vert principal
          600: '#16a34a',  // Vert foncé
          700: '#15803d',  // Vert très foncé
          800: '#2D4A22',  // Vert forêt GNTREK
          900: '#14532d',  // Vert profond
          950: '#052e16',  // Vert nuit
        },
        adventure: {
          50: '#fffbeb',   // Orange très clair
          100: '#fef3c7',  // Orange clair
          200: '#fde68a',  // Orange doux
          300: '#fcd34d',  // Orange moyen
          400: '#fbbf24',  // Orange vif
          500: '#ecb75f',  // Orange aventure GNTREK
          600: '#d97706',  // Orange foncé
          700: '#b45309',  // Orange très foncé
          800: '#92400e',  // Orange profond
          900: '#78350f',  // Orange nuit
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      fontFamily: {
        // Polices GNTREK
        'roboto-slab': ['RobotoSlab-Regular'],
        'roboto-slab-bold': ['RobotoSlab-Bold'],
        'montserrat': ['Montserrat-Medium'],
        'montserrat-semibold': ['Montserrat-SemiBold'],
        'montserrat-bold': ['Montserrat-Bold'],
        'inter': ['Inter-Regular'],
        'inter-semibold': ['Inter-SemiBold'],
        'inter-bold': ['Inter-Bold'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 5px rgba(139, 21, 56, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 21, 56, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return platformSelect({
        ios: `rgb(var(--${variableName}) / ${opacityValue})`,
        android: `rgb(var(--android-${variableName}) / ${opacityValue})`,
      });
    }
    return platformSelect({
      ios: `rgb(var(--${variableName}))`,
      android: `rgb(var(--android-${variableName}))`,
    });
  };
} 