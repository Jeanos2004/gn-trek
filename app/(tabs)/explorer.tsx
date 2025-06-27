import React, { useEffect, useRef, useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, Image, Dimensions, 
  StatusBar, Animated, PanGestureHandler, State
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Mountain, TreePine, Compass, MapPin, Sun, Cloud, Wind,
  Star, Leaf, Sparkles, ArrowRight, Play, Heart, Camera,
  Users, Award, Target, Calendar, Clock, Thermometer,
  ChevronDown, Search, Filter, Bookmark, Share2
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function ExplorerScreen() {
  const [timeOfDay, setTimeOfDay] = useState('golden'); // dawn, morning, golden, sunset, night
  const [weatherMood, setWeatherMood] = useState('serene'); // serene, dynamic, mystic
  const [selectedExperience, setSelectedExperience] = useState(null);

  // 🎭 Animations naturelles sophistiquées
  const parallaxY = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const windAnim = useRef(new Animated.Value(0)).current;
  const sunRaysAnim = useRef(new Animated.Value(0)).current;
  const mistAnim = useRef(new Animated.Value(0)).current;
  const leavesAnim = useRef(Array.from({ length: 15 }, () => new Animated.Value(0))).current;
  const starsAnim = useRef(Array.from({ length: 20 }, () => new Animated.Value(0))).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startNaturalAnimations();
  }, []);

  const startNaturalAnimations = () => {
    // 🌬️ Animation vent doux et continu
    Animated.loop(
      Animated.sequence([
        Animated.timing(windAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(windAnim, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // ☀️ Rayons de soleil dansants
    Animated.loop(
      Animated.sequence([
        Animated.timing(sunRaysAnim, {
          toValue: 1,
          duration: 12000,
          useNativeDriver: true,
        }),
        Animated.timing(sunRaysAnim, {
          toValue: 0,
          duration: 12000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 🌫️ Brume mystique
    Animated.loop(
      Animated.timing(mistAnim, {
        toValue: 1,
        duration: 15000,
        useNativeDriver: true,
      })
    ).start();

    // 🍃 Feuilles qui dansent
    leavesAnim.forEach((leaf, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(leaf, {
              toValue: 1,
              duration: 6000 + (index * 200),
              useNativeDriver: true,
            }),
            Animated.timing(leaf, {
              toValue: 0,
              duration: 6000 + (index * 200),
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, index * 800);
    });

    // ⭐ Étoiles scintillantes
    starsAnim.forEach((star, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(star, {
              toValue: 1,
              duration: 2000 + (index * 100),
              useNativeDriver: true,
            }),
            Animated.timing(star, {
              toValue: 0.2,
              duration: 2000 + (index * 100),
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, index * 300);
    });

    // 💧 Effet ripple subtil
    Animated.loop(
      Animated.sequence([
        Animated.timing(rippleAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(rippleAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 🫁 Respiration du logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.05,
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
  };

  // 🎨 Système de couleurs dynamiques selon l'ambiance
  const getAmbianceColors = () => {
    const ambiances = {
      golden: {
        sky: ['#FFE4B5', '#FFA500', '#FF6347', '#8B4513'],
        overlay: ['rgba(255, 140, 0, 0.3)', 'rgba(139, 69, 19, 0.5)', 'rgba(0, 0, 0, 0.7)'],
        accent: '#FF8C42',
        mood: 'Heure dorée'
      },
      dawn: {
        sky: ['#FFB6C1', '#FFA07A', '#FF69B4', '#4B0082'],
        overlay: ['rgba(255, 192, 203, 0.2)', 'rgba(75, 0, 130, 0.4)', 'rgba(0, 0, 0, 0.6)'],
        accent: '#FF69B4',
        mood: 'Aube magique'
      },
      morning: {
        sky: ['#87CEEB', '#98FB98', '#90EE90', '#006400'],
        overlay: ['rgba(135, 206, 235, 0.2)', 'rgba(34, 139, 34, 0.4)', 'rgba(0, 0, 0, 0.5)'],
        accent: '#32CD32',
        mood: 'Matin frais'
      },
      sunset: {
        sky: ['#FF7F50', '#FF4500', '#8B0000', '#2F4F4F'],
        overlay: ['rgba(255, 69, 0, 0.4)', 'rgba(139, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)'],
        accent: '#FF4500',
        mood: 'Coucher de soleil'
      }
    };
    return ambiances[timeOfDay as keyof typeof ambiances] || ambiances.golden;
  };

  const currentAmbiance = getAmbianceColors();

  // 🏔️ Expériences nature immersives
  const natureExperiences = [
    {
      id: 1,
      title: "Forêt des Murmures",
      subtitle: "Sentier mystique • 2.4 km",
      description: "Marchez parmi les géants verts où chaque pas révèle un secret de la nature sauvage",
      image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=800",
      difficulty: "Facile",
      duration: "1h30",
      elevation: "120m",
      rating: 4.9,
      participants: 127,
      tags: ["Zen", "Photographie", "Famille"],
      color: "#22c55e",
      icon: TreePine,
      coordinates: { lat: 45.8566, lng: 6.0639 }
    },
    {
      id: 2,
      title: "Crêtes des Vents",
      subtitle: "Sommet panoramique • 8.2 km",
      description: "Atteignez les hauteurs où le vent danse avec les nuages et l'âme s'élève vers l'infini",
      image: "https://images.pexels.com/photos/1559821/pexels-photo-1559821.jpeg?auto=compress&cs=tinysrgb&w=800",
      difficulty: "Difficile",
      duration: "4h15",
      elevation: "890m",
      rating: 4.8,
      participants: 89,
      tags: ["Défi", "Panorama", "Expert"],
      color: "#D72638",
      icon: Mountain,
      coordinates: { lat: 45.9566, lng: 6.1639 }
    },
    {
      id: 3,
      title: "Lac Miroir Cristallin",
      subtitle: "Refuge aquatique • 3.7 km",
      description: "Découvrez un lac cristallin qui reflète l'infini du ciel et apaise l'esprit vagabond",
      image: "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800",
      difficulty: "Modéré",
      duration: "2h45",
      elevation: "320m",
      rating: 4.7,
      participants: 156,
      tags: ["Sérénité", "Méditation", "Eau"],
      color: "#4A90E2",
      icon: Sparkles,
      coordinates: { lat: 45.7566, lng: 6.2639 }
    }
  ];

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* 🌌 BACKGROUND IMMERSIF MULTICOUCHES */}
      <View className="absolute inset-0">
        {/* Couche 1: Ciel dynamique */}
        <LinearGradient
          colors={currentAmbiance.sky}
          className="absolute inset-0"
        />
        
        {/* Couche 2: Rayons de soleil animés */}
        <Animated.View 
          className="absolute inset-0"
          style={{
            opacity: sunRaysAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.3],
            }),
            transform: [
              {
                rotate: sunRaysAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '5deg'],
                }),
              },
            ],
          }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.2)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0"
          />
        </Animated.View>

        {/* Couche 3: Montagnes en arrière-plan */}
        <View className="absolute bottom-0 left-0 right-0 h-64">
          <LinearGradient
            colors={['transparent', 'rgba(47, 79, 79, 0.8)', 'rgba(47, 79, 79, 0.9)']}
            className="absolute inset-0"
          />
          {/* Silhouettes de montagnes */}
          <View className="absolute bottom-0 left-0 right-0 h-48 bg-slate-800/60" 
            style={{
              clipPath: 'polygon(0 100%, 15% 60%, 35% 40%, 55% 65%, 75% 35%, 90% 55%, 100% 45%, 100% 100%)'
            }}
          />
        </View>

        {/* Couche 4: Brume mystique */}
        <Animated.View 
          className="absolute inset-0"
          style={{
            opacity: mistAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.1, 0.4],
            }),
            transform: [
              {
                translateX: mistAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 50],
                }),
              },
            ],
          }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.3)', 'transparent', 'rgba(255, 255, 255, 0.2)']}
            className="absolute inset-0"
          />
        </Animated.View>

        {/* Couche 5: Overlay final pour lisibilité */}
        <LinearGradient
          colors={currentAmbiance.overlay}
          className="absolute inset-0"
        />
      </View>

      {/* 🍃 ÉLÉMENTS NATURELS FLOTTANTS */}
      <View className="absolute inset-0 pointer-events-none">
        {/* Feuilles dansantes */}
        {leavesAnim.map((leafAnim, index) => {
          const randomX = Math.random() * width;
          const randomY = Math.random() * (height * 0.6);
          const leafSize = 8 + (index % 4) * 3;
          
          return (
            <Animated.View
              key={`leaf-${index}`}
              className="absolute"
              style={{
                left: randomX,
                top: randomY,
                opacity: leafAnim.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.6, 0],
                }),
                transform: [
                  {
                    translateY: leafAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -80],
                    }),
                  },
                  {
                    translateX: windAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 30],
                    }),
                  },
                  {
                    rotate: leafAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              }}
            >
              <Leaf size={leafSize} color="rgba(34, 197, 94, 0.7)" strokeWidth={1.5} />
            </Animated.View>
          );
        })}

        {/* Étoiles scintillantes */}
        {starsAnim.map((starAnim, index) => {
          const randomX = Math.random() * width;
          const randomY = Math.random() * (height * 0.4);
          
          return (
            <Animated.View
              key={`star-${index}`}
              className="absolute"
              style={{
                left: randomX,
                top: randomY,
                opacity: starAnim,
                transform: [
                  {
                    scale: starAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.5, 1.2],
                    }),
                  },
                ],
              }}
            >
              <Star size={6 + (index % 3) * 2} color="rgba(255, 255, 255, 0.8)" strokeWidth={1} />
            </Animated.View>
          );
        })}
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: parallaxY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* 🏠 HEADER MAGIQUE GNTREK */}
        <Animated.View 
          className="pt-16 pb-8 px-6"
          style={{
            transform: [
              {
                translateY: parallaxY.interpolate({
                  inputRange: [0, 200],
                  outputRange: [0, -50],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          {/* Header controls */}
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center">
              <TouchableOpacity>
                <View className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl items-center justify-center border border-white/20">
                  <Search size={24} color="#FFFFFF" strokeWidth={2} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="ml-3">
                <View className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl items-center justify-center border border-white/20">
                  <Filter size={24} color="#FFFFFF" strokeWidth={2} />
                </View>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity onPress={() => {
              const moods = ['golden', 'dawn', 'morning', 'sunset'];
              const currentIndex = moods.indexOf(timeOfDay);
              const nextIndex = (currentIndex + 1) % moods.length;
              setTimeOfDay(moods[nextIndex]);
            }}>
              <View className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex-row items-center">
                <Sun size={16} color={currentAmbiance.accent} strokeWidth={2} />
                <Text className="text-white font-montserrat-semibold text-sm ml-2">
                  {currentAmbiance.mood}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Logo GNTREK avec animation respiration */}
          <Animated.View 
            className="items-center mb-8"
            style={{
              transform: [{ scale: breatheAnim }],
            }}
          >
            <View className="relative mb-6">
              {/* Effet ripple autour du logo */}
              <Animated.View 
                className="absolute -inset-8 border border-white/20 rounded-full"
                style={{
                  opacity: rippleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0],
                  }),
                  transform: [
                    {
                      scale: rippleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 2.5],
                      }),
                    },
                  ],
                }}
              />
              
              {/* Logo container premium */}
              <View className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full items-center justify-center border-2 border-white/40">
                <Compass size={40} color="#FFFFFF" strokeWidth={2} />
              </View>
            </View>
            
            <Text className="text-5xl font-roboto-slab-bold text-white mb-2 tracking-widest">
              GNTREK
            </Text>
            <View className="h-1 w-24 bg-white/60 rounded-full mb-4" />
            <Text className="text-lg font-montserrat text-white/90 text-center">
              Explorez l'authenticité sauvage
            </Text>
          </Animated.View>

          {/* Météo et conditions live */}
          <View className="bg-white/20 backdrop-blur-md rounded-3xl p-4 border border-white/20 mb-8">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Thermometer size={20} color={currentAmbiance.accent} strokeWidth={2} />
                <Text className="text-white font-montserrat-semibold text-lg ml-2">
                  18°C
                </Text>
                <Text className="text-white/70 font-montserrat text-sm ml-2">
                  Parfait pour randonner
                </Text>
              </View>
              <View className="flex-row items-center">
                <Wind size={18} color="#4A90E2" strokeWidth={2} />
                <Text className="text-white font-montserrat text-sm ml-1">
                  8 km/h
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* 🌲 EXPÉRIENCES NATURE IMMERSIVES */}
        <View className="px-6 pb-8">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-3xl font-roboto-slab-bold text-white mb-1">
                Vos aventures
              </Text>
              <Text className="text-white/80 font-montserrat">
                {natureExperiences.length} expériences vous attendent
              </Text>
            </View>
            <TouchableOpacity>
              <View className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl items-center justify-center border border-white/20">
                <ArrowRight size={24} color="#FFFFFF" strokeWidth={2} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Cards expériences premium */}
          <View className="space-y-6">
            {natureExperiences.map((experience, index) => (
              <TouchableOpacity 
                key={experience.id}
                onPress={() => setSelectedExperience(experience)}
                activeOpacity={0.9}
              >
                <Animated.View
                  style={{
                    transform: [
                      {
                        translateY: parallaxY.interpolate({
                          inputRange: [0, 300],
                          outputRange: [0, -index * 20],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  }}
                >
                  <View className="bg-white/20 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20">
                    {/* Image avec overlay gradient */}
                    <View className="relative h-48">
                      <Image
                        source={{ uri: experience.image }}
                        className="absolute inset-0 w-full h-full"
                        style={{ resizeMode: 'cover' }}
                      />
                      <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                        className="absolute inset-0"
                      />
                      
                      {/* Icône flottante */}
                      <View className="absolute top-4 left-4">
                        <View className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl items-center justify-center border border-white/30">
                          {(() => {
                            const IconComponent = experience.icon;
                            return <IconComponent size={24} color={experience.color} strokeWidth={2} />;
                          })()}
                        </View>
                      </View>

                      {/* Actions */}
                      <View className="absolute top-4 right-4 flex-row space-x-2">
                        <TouchableOpacity>
                          <View className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl items-center justify-center border border-white/30">
                            <Bookmark size={18} color="#FFFFFF" strokeWidth={2} />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <View className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl items-center justify-center border border-white/30">
                            <Share2 size={18} color="#FFFFFF" strokeWidth={2} />
                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* Rating et participants */}
                      <View className="absolute bottom-4 left-4 flex-row items-center">
                        <View className="flex-row items-center mr-4">
                          <Star size={14} color="#FFD700" strokeWidth={2} />
                          <Text className="text-white font-montserrat-semibold text-sm ml-1">
                            {experience.rating}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Users size={14} color="#4A90E2" strokeWidth={2} />
                          <Text className="text-white font-montserrat text-sm ml-1">
                            {experience.participants}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Contenu */}
                    <View className="p-6">
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-1">
                          <Text className="text-white font-roboto-slab-bold text-xl mb-1">
                            {experience.title}
                          </Text>
                          <Text className="text-white/70 font-montserrat text-sm">
                            {experience.subtitle}
                          </Text>
                        </View>
                        <View 
                          className="px-3 py-1 rounded-full"
                          style={{ backgroundColor: experience.color + '20' }}
                        >
                          <Text 
                            className="font-montserrat-semibold text-xs"
                            style={{ color: experience.color }}
                          >
                            {experience.difficulty}
                          </Text>
                        </View>
                      </View>

                      <Text className="text-white/80 font-montserrat text-base leading-6 mb-4">
                        {experience.description}
                      </Text>

                      {/* Métriques */}
                      <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center">
                          <Clock size={16} color="#6B7280" strokeWidth={2} />
                          <Text className="text-white/70 font-montserrat text-sm ml-1">
                            {experience.duration}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Mountain size={16} color="#6B7280" strokeWidth={2} />
                          <Text className="text-white/70 font-montserrat text-sm ml-1">
                            {experience.elevation}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <MapPin size={16} color="#6B7280" strokeWidth={2} />
                          <Text className="text-white/70 font-montserrat text-sm ml-1">
                            2.3 km
                          </Text>
                        </View>
                      </View>

                      {/* Tags */}
                      <View className="flex-row flex-wrap mb-4">
                        {experience.tags.map((tag, tagIndex) => (
                          <View 
                            key={tagIndex}
                            className="bg-white/10 px-3 py-1 rounded-full mr-2 mb-2"
                          >
                            <Text className="text-white font-montserrat text-xs">
                              {tag}
                            </Text>
                          </View>
                        ))}
                      </View>

                      {/* CTA */}
                      <TouchableOpacity>
                        <LinearGradient
                          colors={['#D72638', '#B91C3A']}
                          className="py-4 px-6 rounded-2xl flex-row items-center justify-center"
                        >
                          <Play size={20} color="white" strokeWidth={2} />
                          <Text className="text-white font-montserrat-bold text-lg ml-2">
                            Commencer l'aventure
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 🌟 SECTION DÉCOUVERTE */}
        <View className="px-6 pb-12">
          <View className="bg-white/20 backdrop-blur-md rounded-3xl p-6 border border-white/20">
            <View className="items-center">
              <Heart size={32} color="#D72638" strokeWidth={2} className="mb-4" />
              <Text className="text-2xl font-roboto-slab-bold text-white text-center mb-2">
                La nature vous appelle
              </Text>
              <Text className="text-white/80 font-montserrat text-center mb-6 leading-6">
                Rejoignez des milliers d'aventuriers et découvrez des lieux magiques près de chez vous
              </Text>
              
              <TouchableOpacity>
                <LinearGradient
                  colors={[currentAmbiance.accent, '#D72638']}
                  className="py-4 px-8 rounded-2xl flex-row items-center"
                >
                  <Compass size={20} color="white" strokeWidth={2} />
                  <Text className="text-white font-montserrat-bold text-lg ml-2">
                    Explorer maintenant
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
} 