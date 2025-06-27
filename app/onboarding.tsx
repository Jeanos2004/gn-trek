import React, { useEffect, useRef, useState } from 'react';
import { 
  View, Text, Dimensions, Animated, StatusBar, TouchableOpacity, 
  Image, Easing, PanGestureHandler, State
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mountain, Compass, Target, Users, Camera, MapPin, 
  ChevronRight, ArrowRight, Star, TreePine, Leaf, Sun,
  Award, Shield, Zap, Play, Heart, SkipForward
} from 'lucide-react-native';
import { router } from 'expo-router';
import { GnTrekButton } from '../components/GnTrekDesignSystem';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Animations premium sophistiquées
  const slideProgress = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(50)).current;
  const elementsOpacity = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(1)).current;
  const floatAnimation = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;
  const particlesAnimations = useRef(Array.from({ length: 12 }, () => new Animated.Value(0))).current;
  
  const slides = [
    {
      id: 1,
      title: "DÉCOUVREZ",
      subtitle: "L'AVENTURE AUTHENTIQUE",
      description: "Plongez dans l'univers GNTREK et explorez des sentiers secrets avec notre technologie premium",
      icon: Compass,
      iconSecondary: Mountain,
      color: "#D72638",
      gradient: ['rgba(215, 38, 56, 0.8)', 'rgba(185, 28, 58, 0.9)', 'rgba(0, 0, 0, 0.7)'],
      background: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200",
      features: [
        { text: "Navigation GPS Premium", icon: MapPin },
        { text: "Communauté d'Explorateurs", icon: Users },
        { text: "Sécurité Garantie", icon: Shield }
      ]
    },
    {
      id: 2,
      title: "CONQUÉREZ",
      subtitle: "VOS LIMITES",
      description: "Défiez-vous avec des missions personnalisées et atteignez des sommets extraordinaires",
      icon: Mountain,
      iconSecondary: Target,
      color: "#FF8C42",
      gradient: ['rgba(255, 140, 66, 0.8)', 'rgba(215, 38, 56, 0.9)', 'rgba(0, 0, 0, 0.7)'],
      background: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1200",
      features: [
        { text: "Défis Personnalisés", icon: Target },
        { text: "Coaching Expert", icon: Award },
        { text: "Progression Trackée", icon: Zap }
      ]
    },
    {
      id: 3,
      title: "PARTAGEZ",
      subtitle: "VOS EXPLOITS",
      description: "Immortalisez vos aventures et inspirez la communauté des passionnés de nature",
      icon: Heart,
      iconSecondary: Camera,
      color: "#22c55e",
      gradient: ['rgba(34, 197, 94, 0.8)', 'rgba(255, 140, 66, 0.9)', 'rgba(0, 0, 0, 0.7)'],
      background: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200",
      features: [
        { text: "Galerie Premium", icon: Camera },
        { text: "Stories d'Aventure", icon: Star },
        { text: "Réseau Social Nature", icon: Heart }
      ]
    }
  ];

  useEffect(() => {
    startSlideAnimations();
    
    // Auto-progression des slides
    if (isAutoPlaying) {
      const autoSlideTimer = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          nextSlide();
        }
      }, 6000); // 6 secondes par slide
      
      return () => clearTimeout(autoSlideTimer);
    }
  }, [currentSlide, isAutoPlaying]);

  const startSlideAnimations = () => {
    // Reset animations
    logoScale.setValue(0);
    titleOpacity.setValue(0);
    titleTranslateY.setValue(50);
    elementsOpacity.setValue(0);
    
    // Séquence d'animation premium
    Animated.sequence([
      // Logo entrance avec effet dramatique
      Animated.timing(logoScale, {
        toValue: 1.1,
        duration: 1000,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotation continue sophistiquée
    Animated.loop(
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Titre avec effet cinématique
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    // Éléments UI avec délai progressif
    setTimeout(() => {
      Animated.timing(elementsOpacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }, 800);

    // Progress bar animation
    Animated.timing(progressWidth, {
      toValue: ((currentSlide + 1) / slides.length) * 100,
      duration: 800,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();

    // Glow pulsation subtile
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1.2,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Particules flottantes naturelles
    particlesAnimations.forEach((particle, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(particle, {
              toValue: 1,
              duration: 4000 + (index * 300),
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(particle, {
              toValue: 0,
              duration: 4000 + (index * 300),
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, index * 200);
    });
  };

  const nextSlide = () => {
    setIsAutoPlaying(false);
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.replace('/(tabs)');
    }
  };

  const skipOnboarding = () => {
    router.replace('/(tabs)');
  };

  const currentSlideData = slides[currentSlide];
  
  const spin = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const floatY = floatAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-15, 15],
  });

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Premium avec Parallax */}
      <View className="absolute inset-0">
        <Image
          source={{ uri: currentSlideData.background }}
          style={{ 
            width: width * 1.2,
            height: height * 1.2,
            marginLeft: -width * 0.1,
            marginTop: -height * 0.1,
          }}
          className="object-cover"
        />
        
        {/* Overlay Gradient Cinématique */}
        <LinearGradient
          colors={currentSlideData.gradient}
          className="absolute inset-0"
          style={{ opacity: 0.85 }}
        />
        
        {/* Effet de profondeur */}
        <View className="absolute inset-0 bg-gradient-to-t from-gntrek-black/60 via-transparent to-gntrek-black/40" />
      </View>

      {/* Particules flottantes nature */}
      <View className="absolute inset-0 pointer-events-none">
        {particlesAnimations.map((particle, index) => {
          const randomX = Math.random() * width;
          const randomY = Math.random() * height;
          const icons = [TreePine, Leaf, Star, Mountain];
          const IconComponent = icons[index % icons.length];
          
          return (
            <Animated.View
              key={index}
              className="absolute"
              style={{
                left: randomX,
                top: randomY,
                opacity: particle.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.3, 0],
                }),
                transform: [
                  {
                    translateY: particle.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -100],
                    }),
                  },
                  {
                    rotate: particle.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              }}
            >
              <IconComponent 
                size={12 + (index % 3) * 4} 
                color="rgba(255, 255, 255, 0.4)" 
                strokeWidth={1.5} 
              />
            </Animated.View>
          );
        })}
      </View>

      {/* Header avec Skip Button */}
      <View className="absolute top-16 right-6 z-10">
        <TouchableOpacity onPress={skipOnboarding}>
          <View className="bg-gntrek-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-gntrek-white/30 flex-row items-center">
            <Text className="text-gntrek-white font-montserrat-semibold text-sm mr-2">
              Passer
            </Text>
            <SkipForward size={16} color="#FFFFFF" strokeWidth={2} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Contenu Principal */}
      <View className="flex-1 justify-center items-center px-8">
        {/* Logo Central Animé */}
        <Animated.View 
          className="items-center mb-16"
          style={{
            transform: [
              { scale: Animated.multiply(logoScale, glowPulse) },
              { rotate: spin },
              { translateY: floatY }
            ]
          }}
        >
          <View className="relative">
            {/* Glow Effect Premium */}
            <Animated.View 
              className="absolute -inset-16 rounded-full opacity-60"
              style={{
                backgroundColor: currentSlideData.color,
                transform: [{ scale: glowPulse }]
              }}
            />
            
            {/* Conteneur Logo Principal */}
            <View className="w-32 h-32 bg-gradient-to-br from-gntrek-white/25 to-gntrek-white/10 rounded-full items-center justify-center border-2 border-gntrek-white/50 backdrop-blur-sm">
              {(() => {
                const IconComponent = currentSlideData.icon;
                return <IconComponent size={56} color="#FFFFFF" strokeWidth={2} />;
              })()}
            </View>
            
            {/* Icône secondaire flottante */}
            <Animated.View 
              className="absolute -top-4 -right-4 w-12 h-12 rounded-full items-center justify-center border-2 border-gntrek-white/50"
              style={{
                backgroundColor: currentSlideData.color + '90',
                transform: [{ translateY: floatY }, { scale: glowPulse }]
              }}
            >
              {(() => {
                const IconComponent = currentSlideData.iconSecondary;
                return <IconComponent size={20} color="#FFFFFF" strokeWidth={2} />;
              })()}
            </Animated.View>
          </View>
        </Animated.View>

        {/* Contenu Textuel */}
        <Animated.View 
          className="items-center mb-12"
          style={{
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }]
          }}
        >
          <Text className="text-6xl font-roboto-slab-bold text-gntrek-white mb-2 text-center tracking-wider">
            {currentSlideData.title}
          </Text>
          <Text className="text-2xl font-roboto-slab-bold text-center mb-6"
            style={{ color: currentSlideData.color }}
          >
            {currentSlideData.subtitle}
          </Text>
          <Text className="text-lg font-montserrat text-gntrek-white/90 text-center leading-7 max-w-sm">
            {currentSlideData.description}
          </Text>
        </Animated.View>

        {/* Features Premium */}
        <Animated.View 
          className="w-full mb-12"
          style={{ opacity: elementsOpacity }}
        >
          <View className="space-y-4">
            {currentSlideData.features.map((feature, index) => (
              <Animated.View
                key={index}
                className="bg-gntrek-white/15 backdrop-blur-md rounded-2xl p-4 border border-gntrek-white/20"
                style={{
                  opacity: elementsOpacity,
                  transform: [
                    {
                      translateX: elementsOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50 * (index + 1), 0],
                      }),
                    },
                  ],
                }}
              >
                <View className="flex-row items-center">
                  <View 
                    className="w-10 h-10 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: currentSlideData.color + '30' }}
                  >
                    {(() => {
                      const IconComponent = feature.icon;
                      return <IconComponent size={20} color={currentSlideData.color} strokeWidth={2} />;
                    })()}
                  </View>
                  <Text className="text-gntrek-white font-montserrat-semibold text-lg flex-1">
                    {feature.text}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </View>

      {/* Footer Navigation Premium */}
      <Animated.View 
        className="absolute bottom-12 left-0 right-0 px-8"
        style={{ opacity: elementsOpacity }}
      >
        {/* Progress Bar Élégante */}
        <View className="mb-8">
          <View className="h-1 bg-gntrek-white/20 rounded-full overflow-hidden">
            <Animated.View 
              className="h-full rounded-full"
              style={{
                backgroundColor: currentSlideData.color,
                width: progressWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              }}
            />
          </View>
          <View className="flex-row justify-between mt-2">
            {slides.map((_, index) => (
              <View 
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'opacity-100' : 'opacity-40'
                }`}
                style={{ backgroundColor: currentSlideData.color }}
              />
            ))}
          </View>
        </View>

        {/* Boutons Navigation */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={skipOnboarding}>
            <Text className="text-gntrek-white/70 font-montserrat-semibold text-lg">
              Passer l'intro
            </Text>
          </TouchableOpacity>
          
          <GnTrekButton
            title={currentSlide === slides.length - 1 ? "Commencer" : "Suivant"}
            icon={currentSlide === slides.length - 1 ? Play : ArrowRight}
            variant="primary"
            size="medium"
            onPress={nextSlide}
          />
        </View>
      </Animated.View>
    </View>
  );
} 