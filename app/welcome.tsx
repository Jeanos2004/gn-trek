import React, { useEffect, useRef } from 'react';
import { 
  View, Text, Dimensions, Animated, StatusBar, TouchableOpacity, 
  Image, BackHandler
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mountain, Compass, TreePine, Leaf, Star, 
  ChevronRight, Heart, ArrowRight, Play, MapPin, Users, Camera, Shield
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  // Animations premium
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation d'entrée séquentielle
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      })
    ]).start();

    // Animation respiration logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.08,
          duration: 3500,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animation flottement léger
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => backHandler.remove();
  }, []);

  const features = [
    {
      icon: Mountain,
      title: "Aventures guidées",
      description: "Explorez des sentiers secrets avec des guides experts",
      color: "#D72638"
    },
    {
      icon: Camera,
      title: "Moments inoubliables",
      description: "Immortalisez vos plus belles découvertes nature",
      color: "#22c55e"
    },
    {
      icon: Users,
      title: "Communauté passionnée",
      description: "Rencontrez des aventuriers partageant votre passion",
      color: "#4A90E2"
    },
    {
      icon: Shield,
      title: "Sécurité garantie",
      description: "Randonnées encadrées avec matériel de sécurité fourni",
      color: "#FF8C42"
    }
  ];

  const proceedToOnboarding = () => {
    router.replace('/onboarding');
  };

  const proceedToApp = () => {
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Image de fond nature authentique */}
      <View className="absolute inset-0">
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
          className="w-full h-full"
          style={{ resizeMode: 'cover' }}
        />
        
        {/* Overlay gradient premium */}
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0.4)',
            'rgba(0, 0, 0, 0.2)',
            'rgba(215, 38, 56, 0.1)',
            'rgba(0, 0, 0, 0.7)'
          ]}
          className="absolute inset-0"
        />
      </View>

      {/* Éléments nature flottants décoratifs */}
      <Animated.View 
        className="absolute top-24 right-8 opacity-30"
        style={{ transform: [{ translateY: floatAnim }] }}
      >
        <TreePine size={24} color="rgba(255, 255, 255, 0.6)" strokeWidth={1.5} />
      </Animated.View>
      <Animated.View 
        className="absolute top-36 left-12 opacity-25"
        style={{ transform: [{ translateY: floatAnim }, { rotate: '15deg' }] }}
      >
        <Star size={18} color="rgba(255, 140, 66, 0.8)" strokeWidth={1.5} />
      </Animated.View>

      {/* Contenu principal */}
      <Animated.View 
        className="flex-1 justify-center px-8"
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }}
      >
        {/* Logo GNTREK majestueux */}
        <Animated.View 
          className="items-center mb-16"
          style={{ transform: [{ scale: breatheAnim }] }}
        >
          <View className="relative mb-8">
            {/* Glow subtil autour du logo */}
            <View className="absolute -inset-12 bg-gntrek-red/15 rounded-full blur-2xl opacity-70" />
            <View className="w-36 h-36 bg-gradient-to-br from-gntrek-white/25 to-gntrek-red/20 rounded-full items-center justify-center border-2 border-gntrek-white/50 backdrop-blur-sm">
              <Compass size={64} color="#FFFFFF" strokeWidth={2} />
            </View>
          </View>
          
          {/* Titre avec caractère */}
          <Text className="text-7xl font-roboto-slab-bold text-gntrek-white mb-4 text-center tracking-widest">
            GNTREK
          </Text>
          <View className="h-1.5 w-40 bg-gntrek-red rounded-full mb-6" />
          
          {/* Slogan inspirant */}
          <Text className="text-2xl font-montserrat text-gntrek-white/95 text-center tracking-wide mb-3">
            L'aventure vous appelle
          </Text>
          <Text className="text-lg font-montserrat text-gntrek-white/80 text-center">
            Découvrez la beauté sauvage des sentiers secrets
          </Text>
        </Animated.View>

        {/* Features en cards glassmorphism */}
        <Animated.View 
          className="mb-12"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          <View className="space-y-4">
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                style={{
                  transform: [{ translateY: slideAnim }],
                  opacity: fadeAnim
                }}
              >
                <View className="bg-gntrek-white/15 backdrop-blur-md rounded-2xl p-5 border border-gntrek-white/20">
                  <View className="flex-row items-center">
                    <View 
                      className="w-12 h-12 rounded-full items-center justify-center mr-4"
                      style={{ backgroundColor: `${feature.color}20` }}
                    >
                      {(() => {
                        const IconComponent = feature.icon;
                        return <IconComponent size={24} color={feature.color} strokeWidth={2} />;
                      })()}
                    </View>
                    <View className="flex-1">
                      <Text className="text-gntrek-white font-roboto-slab-bold text-lg mb-1">
                        {feature.title}
                      </Text>
                      <Text className="text-gntrek-white/85 font-montserrat text-sm leading-5">
                        {feature.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* CTA dual élégant */}
        <Animated.View 
          className="space-y-4"
          style={{ transform: [{ translateY: slideAnim }] }}
        >
          {/* CTA principal premium */}
          <TouchableOpacity>
            <LinearGradient
              colors={['#D72638', '#B91C3A', '#D72638']}
              className="py-5 rounded-3xl flex-row items-center justify-center shadow-2xl"
            >
              <Mountain size={24} color="white" strokeWidth={2} />
              <Text className="text-gntrek-white font-montserrat-bold text-xl ml-3 tracking-wide">
                Commencer l'onboarding
              </Text>
              <ArrowRight size={24} color="white" strokeWidth={2} className="ml-2" />
            </LinearGradient>
          </TouchableOpacity>

          {/* CTA secondaire glassmorphism */}
          <TouchableOpacity>
            <View className="bg-gntrek-white/20 backdrop-blur-md border border-gntrek-white/30 py-5 rounded-3xl flex-row items-center justify-center">
              <Play size={20} color="#FFFFFF" strokeWidth={2} />
              <Text className="text-gntrek-white font-montserrat-semibold text-lg ml-2">
                Explorer directement
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Footer subtil avec infos */}
        <Animated.View 
          className="items-center mt-12"
          style={{ opacity: fadeAnim }}
        >
          <View className="flex-row items-center mb-3">
            <MapPin size={16} color="rgba(255, 255, 255, 0.7)" strokeWidth={2} />
            <Text className="text-gntrek-white/70 font-montserrat text-sm ml-2">
              +500 sentiers référencés
            </Text>
          </View>
          <View className="flex-row items-center space-x-6">
            <View className="flex-row items-center">
              <Users size={16} color="rgba(255, 255, 255, 0.7)" strokeWidth={2} />
              <Text className="text-gntrek-white/70 font-montserrat text-sm ml-1">
                2.5k+ aventuriers
              </Text>
            </View>
            <View className="flex-row items-center">
              <Star size={16} color="rgba(255, 255, 255, 0.7)" strokeWidth={2} />
              <Text className="text-gntrek-white/70 font-montserrat text-sm ml-1">
                4.9/5 • 1.2k avis
              </Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
} 