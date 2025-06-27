import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mountain, Compass, TreePine, Sunrise, Star, MapPin, 
  Calendar, Users, ChevronRight, Play, Award, Target 
} from 'lucide-react-native';

// 🌲 DESIGN SYSTEM GNTREK PREMIUM
// Palette officielle: Rouge (#D72638), Blanc (#FFFFFF), Noir (#000000)

export const GnTrekDesignSystem = {
  // 🎨 COULEURS PRINCIPALES
  colors: {
    primary: '#D72638',      // Rouge GNTREK officiel
    secondary: '#000000',    // Noir officiel
    white: '#FFFFFF',        // Blanc officiel
    forest: '#1A2F1A',       // Vert forêt sombre
    earth: '#8B4513',        // Brun terre
    adventure: '#FF8C42',    // Orange aventure
    sky: '#4A90E2',          // Bleu ciel
    mist: '#F5F7FA',         // Gris brume
    stone: '#6B7280',        // Gris pierre
  },
  
  // 📱 GRADIENTS SIGNATURE
  gradients: {
    hero: ['#1A2F1A', '#D72638', '#000000'],
    adventure: ['#FF8C42', '#D72638'],
    forest: ['#1A2F1A', '#2D5016'],
    premium: ['#000000', '#D72638', '#FF8C42'],
  },
};

// 🚀 COMPOSANTS PREMIUM

export const GnTrekButton = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  icon: Icon,
  size = 'medium' 
}: { title: string, onPress: () => void, variant?: 'primary' | 'secondary' | 'adventure', icon: any, size?: 'small' | 'medium' }) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gntrek-red border-gntrek-red';
      case 'secondary':
        return 'bg-transparent border-white border-2';
      case 'adventure':
        return 'bg-adventure-500 border-adventure-500';
      default:
        return 'bg-gntrek-red border-gntrek-red';
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return 'text-white';
      default:
        return 'text-white';
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={variant === 'primary' ? ['#D72638', '#8B1538'] : ['transparent', 'transparent']}
        className={`${getButtonStyle()} px-8 py-4 rounded-2xl items-center justify-center flex-row shadow-lg`}
      >
        {Icon && <Icon size={20} color="white" className="mr-3" />}
        <Text className={`${getTextStyle()} font-montserrat-bold text-lg tracking-wide`}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const GnTrekCard = ({ 
  title, 
  subtitle, 
  children, 
  variant = 'default',
  icon: Icon 
}: { title: string, subtitle: string, children: React.ReactNode, variant?: 'default' | 'adventure', icon: any }) => {
  return (
    <View className="bg-slate-800/90 rounded-3xl p-6 border border-gntrek-red/30 shadow-xl">
      {Icon && (
        <View className="mb-4 flex-row items-center">
          <View className="bg-gntrek-red/20 p-3 rounded-2xl mr-4">
            <Icon size={24} color="#D72638" strokeWidth={2.5} />
          </View>
          <View className="flex-1">
            <Text className="text-white text-xl font-roboto-slab-bold">
              {title}
            </Text>
            {subtitle && (
              <Text className="text-stone-400 font-montserrat">
                {subtitle}
              </Text>
            )}
          </View>
        </View>
      )}
      {children}
    </View>
  );
};

export const GnTrekHeader = ({ title, subtitle, showBackButton = false }: { title: string, subtitle: string, showBackButton?: boolean }) => {
  return (
    <LinearGradient
      colors={['#1A2F1A', 'rgba(215, 38, 56, 0.1)', 'transparent']}
      className="pt-16 pb-8 px-6"
    >
      <View className="flex-row items-center mb-4">
        <View className="w-2 h-10 bg-gntrek-red rounded-full mr-4" />
        <View className="flex-1">
          <Text className="text-3xl font-roboto-slab-bold text-white">
            {title}
          </Text>
          {subtitle && (
            <Text className="text-stone-300 font-montserrat mt-1">
              {subtitle}
            </Text>
          )}
        </View>
        <Compass size={32} color="#D72638" strokeWidth={2.5} />
      </View>
    </LinearGradient>
  );
};

export const GnTrekStats = ({ value, label, icon: Icon, trend }: { value: string, label: string, icon: any, trend: string }) => {
  return (
    <View className="bg-white/10 rounded-2xl p-4 items-center border border-white/20">
      <View className="bg-gntrek-red/20 p-3 rounded-full mb-3">
        <Icon size={24} color="#D72638" strokeWidth={2.5} />
      </View>
      <Text className="text-white text-2xl font-roboto-slab-bold">
        {value}
      </Text>
      <Text className="text-stone-300 font-montserrat text-sm text-center">
        {label}
      </Text>
      {trend && (
        <Text className="text-green-400 font-montserrat-semibold text-xs mt-1">
          +{trend}%
        </Text>
      )}
    </View>
  );
};

export const GnTrekBadge = ({ text, type = 'default' }: { text: string, type?: 'success' | 'warning' | 'danger' | 'default' }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-600/20 border-green-600/40 text-green-400';
      case 'warning':
        return 'bg-adventure-500/20 border-adventure-500/40 text-adventure-400';
      case 'danger':
        return 'bg-red-600/20 border-red-600/40 text-red-400';
      default:
        return 'bg-gntrek-red/20 border-gntrek-red/40 text-gntrek-red';
    }
  };

  return (
    <View className={`${getBadgeStyle()} px-3 py-1 rounded-full border`}>
      <Text className={`font-montserrat-semibold text-sm ${getBadgeStyle().split(' ').pop()}`}>
        {text}
      </Text>
    </View>
  );
};

// 🏔️ COMPOSANT HERO SIGNATURE GNTREK
export const GnTrekHero = ({ title, subtitle, backgroundImage, onAction }: { title: string, subtitle: string, backgroundImage: string, onAction: () => void }) => {
  return (
    <View className="relative h-96 overflow-hidden">
      {/* Background avec overlay premium */}
      <LinearGradient
        colors={['rgba(26, 47, 26, 0.9)', 'rgba(215, 38, 56, 0.8)', 'rgba(0, 0, 0, 0.95)']}
        className="absolute inset-0 z-10"
      />
      
      {/* Contenu principal */}
      <View className="absolute inset-0 z-20 items-center justify-center px-8">
        {/* Logo GNTREK avec effet glow */}
        <View className="items-center mb-12">
          <View className="relative mb-6">
            <View className="absolute -inset-4 bg-gntrek-red/30 rounded-full blur-xl" />
            <View className="w-24 h-24 bg-gntrek-red/20 rounded-full items-center justify-center border-2 border-gntrek-red/50">
              <Compass size={48} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>
          
          <Text className="text-6xl font-roboto-slab-bold text-white mb-3 text-center tracking-wider">
            GNTREK
          </Text>
          <View className="h-1 w-32 bg-gntrek-red rounded-full mb-4" />
          <Text className="text-lg font-montserrat text-white/90 text-center tracking-widest">
            CONQUÉRIR • EXPLORER • VIVRE
          </Text>
        </View>

        {/* Action Button */}
        {onAction && (
          <TouchableOpacity onPress={onAction}>
            <LinearGradient
              colors={['#D72638', '#8B1538']}
              className="px-8 py-4 rounded-2xl flex-row items-center shadow-xl"
            >
              <Play size={20} color="white" className="mr-3" />
              <Text className="text-white font-montserrat-bold text-lg">
                COMMENCER L'AVENTURE
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// 📊 EXEMPLES D'UTILISATION
export const DesignSystemShowcase = () => {
  return (
    <ScrollView className="flex-1 bg-slate-900" showsVerticalScrollIndicator={false}>
      <GnTrekHero 
        title="GNTREK"
        subtitle="CONQUÉRIR • EXPLORER • VIVRE"
        onAction={() => console.log('Action pressed')}
      />
      
      <View className="px-6 py-8 space-y-6">
        <GnTrekHeader 
          title="Design System"
          subtitle="Composants premium GNTREK"
        />
        
        {/* Buttons */}
        <View className="space-y-4">
          <GnTrekButton 
            title="REJOINDRE MISSION"
            icon={Mountain}
            onPress={() => {}}
          />
          <GnTrekButton 
            title="Explorer"
            variant="secondary"
            icon={Compass}
            onPress={() => {}}
          />
        </View>
        
        {/* Cards */}
        <GnTrekCard 
          title="Prochaine Expédition"
          subtitle="Mont Blanc - Samedi 15 Fév"
          icon={Mountain}
        >
          <View className="flex-row justify-between mt-4">
            <GnTrekBadge text="Difficile" type="warning" />
            <Text className="text-white font-montserrat">8h de marche</Text>
          </View>
        </GnTrekCard>
        
        {/* Stats Grid */}
        <View className="flex-row justify-between space-x-4">
          <GnTrekStats 
            value="127+"
            label="Expéditions"
            icon={Mountain}
            trend="12"
          />
          <GnTrekStats 
            value="2.5K+"
            label="Aventuriers"
            icon={Users}
            trend="8"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DesignSystemShowcase; 