import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';

// 🎨 DESIGN SYSTEM GNTREK UNIFIÉ
// Charte officielle : Rouge (#D72638), Noir (#000000), Blanc (#FFFFFF)
// Style : Sobre, énergique, professionnel, nature/randonnée/liberté

export const GnTrekColors = {
  // Couleurs primaires officielles
  red: '#D72638',      // Rouge GNTREK - passion, aventure, énergie
  black: '#000000',    // Noir profond - élégance, mystère, sophistication
  white: '#FFFFFF',    // Blanc pur - pureté, clarté, simplicité
  
  // Nuances harmonieuses dérivées
  redLight: '#FF4757',     // Rouge plus vif pour les accents
  redDark: '#B91C3A',      // Rouge plus sombre pour les gradients
  redAlpha: {
    5: 'rgba(215, 38, 56, 0.05)',
    10: 'rgba(215, 38, 56, 0.1)',
    20: 'rgba(215, 38, 56, 0.2)',
    30: 'rgba(215, 38, 56, 0.3)',
    40: 'rgba(215, 38, 56, 0.4)',
  },
  
  // Tons naturels pour l'authenticité
  stone: '#6B7280',        // Gris pierre naturelle
  stoneLight: '#9CA3AF',   // Gris plus clair
  stoneDark: '#374151',    // Gris plus foncé
  
  // Accents nature complémentaires
  forest: '#22c55e',       // Vert forêt pour nature
  sky: '#4A90E2',          // Bleu ciel pour liberté
  earth: '#FF8C42',        // Orange terre pour chaleur
  gold: '#FFD700',         // Or pour premium
  
  // Backgrounds subtils
  whiteAlpha: {
    5: 'rgba(255, 255, 255, 0.05)',
    10: 'rgba(255, 255, 255, 0.1)',
    20: 'rgba(255, 255, 255, 0.2)',
    90: 'rgba(255, 255, 255, 0.9)',
  },
  blackAlpha: {
    5: 'rgba(0, 0, 0, 0.05)',
    10: 'rgba(0, 0, 0, 0.1)',
    20: 'rgba(0, 0, 0, 0.2)',
    60: 'rgba(0, 0, 0, 0.6)',
  }
};

export const GnTrekTypography = {
  // Titres avec caractère - Roboto Slab Bold
  heading: {
    hero: 'text-7xl font-roboto-slab-bold',      // 72px - Hero sections
    large: 'text-4xl font-roboto-slab-bold',     // 36px - Titres principaux
    medium: 'text-3xl font-roboto-slab-bold',    // 30px - Titres sections
    small: 'text-2xl font-roboto-slab-bold',     // 24px - Sous-titres
    xs: 'text-xl font-roboto-slab-bold',         // 20px - Mini titres
  },
  
  // Corps de texte - Montserrat pour lisibilité
  body: {
    large: 'text-lg font-montserrat',            // 18px - Texte important
    medium: 'text-base font-montserrat',         // 16px - Texte standard
    small: 'text-sm font-montserrat',            // 14px - Texte secondaire
    xs: 'text-xs font-montserrat',               // 12px - Labels, metadata
  },
  
  // Variations de poids
  weight: {
    bold: 'font-montserrat-bold',
    semibold: 'font-montserrat-semibold',
    medium: 'font-montserrat-medium',
    regular: 'font-montserrat',
  }
};

export const GnTrekSpacing = {
  // Espacements harmonieux basés sur 8px
  xs: 'p-1',      // 4px
  sm: 'p-2',      // 8px
  md: 'p-4',      // 16px
  lg: 'p-6',      // 24px
  xl: 'p-8',      // 32px
  '2xl': 'p-12',  // 48px
  '3xl': 'p-16',  // 64px
  
  // Marges cohérentes
  margin: {
    xs: 'mb-2',    // 8px
    sm: 'mb-4',    // 16px
    md: 'mb-6',    // 24px
    lg: 'mb-8',    // 32px
    xl: 'mb-12',   // 48px
  }
};

export const GnTrekGradients = {
  // Gradients signature GNTREK
  primary: ['#D72638', '#B91C3A', '#D72638'],           // Rouge principal
  nature: ['#1A2F1A', 'rgba(215, 38, 56, 0.08)', 'rgba(255, 255, 255, 0.95)'], // Nature authentique
  hero: ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.1)', 'rgba(215, 38, 56, 0.1)', 'rgba(0, 0, 0, 0.6)'], // Hero overlay
  card: ['#FFFFFF', 'rgba(107, 114, 128, 0.05)'],       // Cards subtiles
  dark: ['#1A1A1A', '#2A2A2A'],                         // Backgrounds sombres
};

// 🧱 COMPOSANTS RÉUTILISABLES

interface GnTrekHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  style?: 'light' | 'dark';
}

export const GnTrekHeader: React.FC<GnTrekHeaderProps> = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  style = 'light' 
}) => (
  <View className="items-center mb-8">
    <View className="flex-row items-center mb-4">
      <View className="w-8 h-px bg-gntrek-red/40" />
      <Icon size={24} color="#D72638" strokeWidth={2} className="mx-3" />
      <View className="w-8 h-px bg-gntrek-red/40" />
    </View>
    <Text className={`text-4xl font-roboto-slab-bold mb-3 text-center ${
      style === 'light' ? 'text-gntrek-black' : 'text-gntrek-white'
    }`}>
      {title}
    </Text>
    {subtitle && (
      <Text className={`font-montserrat text-lg text-center ${
        style === 'light' ? 'text-gntrek-stone' : 'text-gntrek-white/90'
      }`}>
        {subtitle}
      </Text>
    )}
  </View>
);

interface GnTrekButtonProps {
  title: string;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  onPress?: () => void;
  disabled?: boolean;
}

export const GnTrekButton: React.FC<GnTrekButtonProps> = ({ 
  title, 
  icon: Icon, 
  variant = 'primary',
  size = 'medium',
  onPress,
  disabled = false
}) => {
  const getButtonStyles = () => {
    const sizeStyles = {
      small: 'py-3 px-6',
      medium: 'py-4 px-8', 
      large: 'py-5 px-10'
    };
    
    const textSizes = {
      small: 'text-sm',
      medium: 'text-lg',
      large: 'text-xl'
    };

    return {
      container: sizeStyles[size],
      text: textSizes[size]
    };
  };

  const styles = getButtonStyles();

  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <LinearGradient
          colors={['#D72638', '#B91C3A', '#D72638']}
          className={`${styles.container} rounded-3xl flex-row items-center justify-center shadow-2xl`}
        >
          {Icon && <Icon size={size === 'small' ? 18 : size === 'medium' ? 20 : 24} color="white" strokeWidth={2} />}
          <Text className={`text-gntrek-white font-montserrat-bold ${styles.text} ${Icon ? 'ml-2' : ''} tracking-wide`}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'secondary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <View className={`bg-gntrek-white/20 backdrop-blur-md border border-gntrek-white/30 ${styles.container} rounded-3xl flex-row items-center justify-center`}>
          {Icon && <Icon size={size === 'small' ? 18 : size === 'medium' ? 20 : 24} color="#FFFFFF" strokeWidth={2} />}
          <Text className={`text-gntrek-white font-montserrat-semibold ${styles.text} ${Icon ? 'ml-2' : ''}`}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View className={`bg-gntrek-white border border-gntrek-stone/20 ${styles.container} rounded-2xl flex-row items-center justify-center`}>
        {Icon && <Icon size={size === 'small' ? 18 : size === 'medium' ? 20 : 24} color="#D72638" strokeWidth={2} />}
        <Text className={`text-gntrek-black font-montserrat-semibold ${styles.text} ${Icon ? 'ml-2' : ''}`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface GnTrekCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'premium' | 'glass';
  className?: string;
}

export const GnTrekCard: React.FC<GnTrekCardProps> = ({ 
  children, 
  variant = 'default',
  className = ''
}) => {
  const getCardStyles = () => {
    switch (variant) {
      case 'premium':
        return 'bg-gradient-to-br from-gntrek-white to-gntrek-stone/5 border-2 border-gntrek-red/20 shadow-2xl';
      case 'glass':
        return 'bg-gntrek-white/15 backdrop-blur-md border border-gntrek-white/20';
      default:
        return 'bg-gntrek-white border border-gntrek-stone/10 shadow-lg';
    }
  };

  return (
    <View className={`rounded-3xl p-6 ${getCardStyles()} ${className}`}>
      {children}
    </View>
  );
};

interface GnTrekLogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  animated?: boolean;
  style?: 'light' | 'dark';
}

export const GnTrekLogo: React.FC<GnTrekLogoProps> = ({ 
  size = 'medium',
  animated = false,
  style = 'light'
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { container: 'w-16 h-16', icon: 32, text: 'text-2xl', line: 'h-0.5 w-16' };
      case 'large':
        return { container: 'w-32 h-32', icon: 56, text: 'text-5xl', line: 'h-1 w-32' };
      case 'hero':
        return { container: 'w-36 h-36', icon: 64, text: 'text-7xl', line: 'h-1.5 w-40' };
      default:
        return { container: 'w-24 h-24', icon: 40, text: 'text-4xl', line: 'h-1 w-24' };
    }
  };

  const sizes = getSizeStyles();
  const textColor = style === 'light' ? 'text-gntrek-black' : 'text-gntrek-white';

  return (
    <View className="items-center">
      <View className={`${sizes.container} bg-gradient-to-br from-gntrek-white/25 to-gntrek-red/20 rounded-full items-center justify-center border-2 border-gntrek-white/50 backdrop-blur-sm mb-4`}>
        {/* Icon Compass sera remplacé par votre logo */}
        <View className={`w-${sizes.icon/4} h-${sizes.icon/4} bg-gntrek-red rounded-full`} />
      </View>
      <Text className={`${sizes.text} font-roboto-slab-bold ${textColor} tracking-widest`}>
        GNTREK
      </Text>
      <View className={`${sizes.line} bg-gntrek-red rounded-full mt-2`} />
    </View>
  );
};

// 🎭 ANIMATIONS SIGNATURE GNTREK
export const GnTrekAnimations = {
  // Animation d'entrée douce
  fadeIn: (animValue: Animated.Value, duration = 1000) => 
    Animated.timing(animValue, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }),

  // Animation de slide naturelle
  slideUp: (animValue: Animated.Value, duration = 800) =>
    Animated.spring(animValue, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }),

  // Animation respiration pour logo
  breathe: (animValue: Animated.Value) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1.05,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    ),

  // Animation flottement naturel
  float: (animValue: Animated.Value) =>
    Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: -8,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ),
};

export default {
  GnTrekColors,
  GnTrekTypography,
  GnTrekSpacing,
  GnTrekGradients,
  GnTrekHeader,
  GnTrekButton,
  GnTrekCard,
  GnTrekLogo,
  GnTrekAnimations,
}; 