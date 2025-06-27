import React, { useEffect, useRef, useState } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, Image, Dimensions, 
  Animated, StatusBar, FlatList, SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Mountain, Calendar, Users, MapPin, Compass, Clock, Thermometer, 
  ChevronRight, Star, TreePine, Leaf, Sun, Play, Award, Target,
  Camera, Zap, Shield, Globe, Activity, Sunrise, Wind, Navigation,
  TrendingUp, Eye, Heart, Share, Bookmark
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  // États pour les animations dynamiques
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherCondition, setWeatherCondition] = useState('sunny');
  
  // Animations raffinées
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;
  const compassRotate = useRef(new Animated.Value(0)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const parallaxAnim = useRef(new Animated.Value(0)).current;
  const statsCounters = useRef(Array.from({ length: 4 }, () => new Animated.Value(0))).current;

  useEffect(() => {
    // Animation d'entrée séquentielle premium
    const sequence = Animated.sequence([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    // Animation compass continue
    const compassSpin = Animated.loop(
      Animated.timing(compassRotate, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    // Respiration du héro
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.02,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );

    // Animation des compteurs de stats
    const animateStats = statsCounters.map((counter, index) => 
      Animated.timing(counter, {
        toValue: 1,
        duration: 2000,
        delay: index * 200,
        useNativeDriver: true,
      })
    );

    // Démarrer toutes les animations
    sequence.start();
    compassSpin.start();
    breathe.start();
    Animated.stagger(300, animateStats).start();

    // Timer pour l'heure
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Données dynamiques
  const nextMission = {
    id: 1,
    title: "Conquest des Pics de Belledonne",
    subtitle: "Expédition Alpine Premium",
    date: "Dimanche 23 Février 2025", 
    time: "05:30",
    duration: "12h",
    participants: 18,
    maxParticipants: 24,
    weather: { temp: "12°C", condition: "Ensoleillé", icon: Sun },
    difficulty: { level: "Expert", color: "#FF4444" },
    elevation: "2.847m",
    distance: "16.2km",
    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
    rewards: ["Badge Alpiniste", "Photos Premium", "Certificat"]
  };

  const achievements = [
    { 
      icon: Mountain, 
      label: "Sommets Conquis", 
      value: 47, 
      trend: "+5", 
      color: "#D72638",
      description: "Ce mois"
    },
    { 
      icon: Target, 
      label: "Missions Réalisées", 
      value: 134, 
      trend: "+12", 
      color: "#FF8C42",
      description: "Total"
    },
    { 
      icon: Users, 
      label: "Réseau", 
      value: 2847, 
      trend: "+340", 
      color: "#22c55e",
      description: "Aventuriers"
    },
    { 
      icon: Award, 
      label: "Trophées Elite", 
      value: 23, 
      trend: "+3", 
      color: "#4A90E2",
      description: "Collection"
    },
  ];

  const quickActions = [
    {
      title: "Explorer les Sentiers",
      subtitle: "Découvrir de nouveaux territoires",
      icon: MapPin,
      color: "#4A90E2",
      gradient: ['#4A90E2', '#357ABD'],
      action: "navigation"
    },
    {
      title: "Galerie Premium",
      subtitle: "Vos plus beaux moments",
      icon: Camera,
      color: "#22c55e", 
      gradient: ['#22c55e', '#16a34a'],
      action: "gallery"
    },
    {
      title: "Communauté Elite",
      subtitle: "Rejoindre des aventuriers",
      icon: Users,
      color: "#FF8C42",
      gradient: ['#FF8C42', '#f97316'],
      action: "community"
    }
  ];

  const compassRotation = compassRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return "Bonne nuit";
    if (hour < 12) return "Bon matin";
    if (hour < 18) return "Bon après-midi";
    return "Bonne soirée";
  };

  return (
    <SafeAreaView className="flex-1 bg-gntrek-black">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        bounces={true}
        className="flex-1"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: parallaxAnim } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >

        {/* 🏔️ HERO SECTION ULTRA-PREMIUM */}
        <Animated.View 
          className="relative overflow-hidden"
          style={{ 
            height: height * 0.75,
            opacity: heroOpacity,
            transform: [{ scale: breatheAnim }]
          }}
        >
          {/* Background parallax avec plusieurs couches */}
          <Animated.View
            className="absolute inset-0"
            style={{
              transform: [{
                translateY: parallaxAnim.interpolate({
                  inputRange: [0, 300],
                  outputRange: [0, -150],
                  extrapolate: 'clamp',
                })
              }]
            }}
          >
            <Image
              source={{ uri: nextMission.image }}
              className="w-full h-full"
              style={{ resizeMode: 'cover' }}
            />
          </Animated.View>
          
          {/* Overlay gradient sophistiqué */}
          <LinearGradient
            colors={[
              'rgba(26, 47, 26, 0.4)',
              'rgba(215, 38, 56, 0.3)', 
              'rgba(0, 0, 0, 0.7)',
              'rgba(0, 0, 0, 0.9)'
            ]}
            locations={[0, 0.3, 0.7, 1]}
            className="absolute inset-0"
          />

          {/* Éléments nature flottants */}
          <Animated.View className="absolute top-20 left-8 opacity-30">
            <TreePine size={32} color="#22c55e" strokeWidth={1.5} />
          </Animated.View>
          <Animated.View className="absolute top-32 right-12 opacity-40" 
            style={{ transform: [{ rotate: '25deg' }] }}>
            <Leaf size={28} color="#FF8C42" strokeWidth={1.5} />
          </Animated.View>
          <Animated.View className="absolute bottom-40 left-16 opacity-25">
            <Wind size={24} color="#4A90E2" strokeWidth={1.5} />
          </Animated.View>

          {/* Header avec salutation et heure */}
          <View className="absolute top-12 left-6 right-6 flex-row justify-between items-start">
            <View>
              <Text className="text-gntrek-white/80 font-montserrat text-lg">
                {getGreeting()}, Aventurier
              </Text>
              <Text className="text-gntrek-white font-montserrat-bold text-2xl">
                {formatTime(currentTime)}
              </Text>
            </View>
            <View className="bg-gntrek-black/60 px-4 py-2 rounded-2xl border border-gntrek-red/30">
              <View className="flex-row items-center">
                <Sun size={16} color="#FF8C42" strokeWidth={2} />
                <Text className="text-gntrek-white font-montserrat-semibold ml-2">
                  15°C
                </Text>
              </View>
            </View>
          </View>

          {/* Logo central premium */}
          <View className="absolute inset-0 items-center justify-center">
            <View className="items-center mb-8">
              {/* Compass animé avec effet glow */}
              <View className="relative mb-6">
                <View className="absolute -inset-8 bg-gntrek-red/20 rounded-full blur-2xl" />
                <Animated.View
                  className="w-28 h-28 bg-gntrek-black/80 rounded-full items-center justify-center border-2 border-gntrek-red/60"
                  style={{ transform: [{ rotate: compassRotation }] }}
                >
                  <Compass size={48} color="#D72638" strokeWidth={2.5} />
                </Animated.View>
                {/* Points cardinaux */}
                <View className="absolute -top-2 left-1/2 transform -translate-x-1">
                  <Text className="text-gntrek-white/60 font-montserrat-bold text-xs">N</Text>
                </View>
              </View>
              
              {/* Titre GNTREK signature */}
              <Text className="text-6xl font-roboto-slab-bold text-gntrek-white mb-3 text-center tracking-widest">
                GNTREK
              </Text>
              <View className="h-0.5 w-32 bg-gntrek-red mb-4" />
              <Text className="text-gntrek-white/90 font-montserrat text-lg text-center tracking-[3px]">
                CONQUÉRIR • EXPLORER • VIVRE
              </Text>
            </View>

            {/* CTA Principal premium */}
            <TouchableOpacity className="mt-8">
              <LinearGradient
                colors={['#D72638', '#8B1538', '#D72638']}
                locations={[0, 0.5, 1]}
                className="px-8 py-4 rounded-3xl flex-row items-center border border-gntrek-white/20"
                style={{ 
                  shadowColor: '#D72638',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8
                }}
              >
                <Play size={20} color="white" strokeWidth={2.5} fill="white" />
                <Text className="text-gntrek-white font-montserrat-bold text-lg ml-3 tracking-wide">
                  PARTIR À L'AVENTURE
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stats flottantes repositionnées */}
          <View className="absolute bottom-8 left-6 right-6">
            <View className="flex-row justify-between">
              <View className="bg-gntrek-black/80 px-6 py-3 rounded-2xl border border-gntrek-red/40">
                <Text className="text-gntrek-white/70 text-sm font-montserrat text-center">Expéditions</Text>
                <Text className="text-gntrek-white text-2xl font-roboto-slab-bold text-center">134</Text>
              </View>
              <View className="bg-gntrek-red/20 px-6 py-3 rounded-2xl border border-gntrek-red/60">
                <Text className="text-gntrek-white/70 text-sm font-montserrat text-center">Aventuriers</Text>
                <Text className="text-gntrek-white text-2xl font-roboto-slab-bold text-center">2.8K</Text>
              </View>
              <View className="bg-gntrek-black/80 px-6 py-3 rounded-2xl border border-gntrek-red/40">
                <Text className="text-gntrek-white/70 text-sm font-montserrat text-center">Sommets</Text>
                <Text className="text-gntrek-white text-2xl font-roboto-slab-bold text-center">47</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* 🎯 SECTION MISSION REPENSÉE */}
        <Animated.View 
          className="px-6 pt-8 bg-gntrek-black"
          style={{
            transform: [{ translateY: contentSlide }]
          }}
        >
          {/* Header section élégant */}
          <View className="flex-row items-center mb-6">
            <View className="w-1 h-16 bg-gradient-to-b from-gntrek-red to-transparent rounded-full mr-4" />
            <View className="flex-1">
              <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-1">
                Prochaine Conquête
              </Text>
              <Text className="text-gntrek-white/70 font-montserrat text-base">
                Votre prochaine épopée alpine vous attend
              </Text>
            </View>
            <View className="bg-gntrek-red/15 p-3 rounded-2xl">
              <Mountain size={28} color="#D72638" strokeWidth={2.5} />
            </View>
          </View>

          {/* Mission Card Premium redesignée */}
          <TouchableOpacity activeOpacity={0.95} className="mb-8">
            <View className="relative overflow-hidden rounded-3xl">
              {/* Background image avec overlay */}
              <Image
                source={{ uri: nextMission.image }}
                className="absolute inset-0 w-full h-80"
                style={{ resizeMode: 'cover' }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}
                className="absolute inset-0"
              />
              
              {/* Contenu de la carte */}
              <View className="relative p-6 h-80 justify-end">
                {/* Tags en haut */}
                <View className="absolute top-6 left-6 right-6 flex-row justify-between">
                  <View className="bg-gntrek-red/90 px-3 py-1 rounded-full">
                    <Text className="text-gntrek-white font-montserrat-bold text-xs">
                      {nextMission.difficulty.level}
                    </Text>
                  </View>
                  <View className="bg-gntrek-black/80 px-3 py-1 rounded-full flex-row items-center">
                    <Users size={12} color="#22c55e" strokeWidth={2} />
                    <Text className="text-gntrek-white font-montserrat-semibold text-xs ml-1">
                      {nextMission.participants}/{nextMission.maxParticipants}
                    </Text>
                  </View>
                </View>

                {/* Informations principales */}
                <View className="mb-4">
                  <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-1">
                    {nextMission.title}
                  </Text>
                  <Text className="text-gntrek-red font-montserrat-semibold text-base mb-3">
                    {nextMission.subtitle}
                  </Text>
                  
                  {/* Métadonnées en grille */}
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center">
                      <Calendar size={16} color="#4A90E2" strokeWidth={2} />
                      <Text className="text-gntrek-white/90 font-montserrat text-sm ml-2">
                        {nextMission.date.split(' ').slice(0, 2).join(' ')}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Clock size={16} color="#FF8C42" strokeWidth={2} />
                      <Text className="text-gntrek-white/90 font-montserrat text-sm ml-2">
                        {nextMission.duration}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Mountain size={16} color="#22c55e" strokeWidth={2} />
                      <Text className="text-gntrek-white/90 font-montserrat text-sm ml-2">
                        {nextMission.elevation}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Bouton d'action intégré */}
                <LinearGradient
                  colors={['#D72638', '#8B1538']}
                  className="py-3 rounded-2xl flex-row items-center justify-center"
                >
                  <Target size={18} color="white" strokeWidth={2.5} />
                  <Text className="text-gntrek-white font-montserrat-bold text-base ml-2">
                    REJOINDRE L'EXPÉDITION
                  </Text>
                  <ChevronRight size={18} color="white" strokeWidth={2.5} />
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>

          {/* 📊 ACHIEVEMENTS REDESIGNÉS */}
          <View className="mb-8">
            <View className="flex-row items-center mb-6">
              <Award size={24} color="#D72638" strokeWidth={2.5} />
              <Text className="text-2xl font-roboto-slab-bold text-gntrek-white ml-3">
                Tableau de Conquêtes
              </Text>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {achievements.map((achievement, index) => {
                const animatedValue = statsCounters[index].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, achievement.value],
                });

                return (
                  <View key={index} className="w-[48%] mb-4">
                    <LinearGradient
                      colors={['#1A1A1A', '#2A2A2A']}
                      className="rounded-2xl p-4 border border-gntrek-red/20"
                    >
                      <View className="items-center">
                        <View 
                          className="p-3 rounded-full mb-3"
                          style={{ backgroundColor: `${achievement.color}20` }}
                        >
                          <achievement.icon size={24} color={achievement.color} strokeWidth={2.5} />
                        </View>
                        <Animated.Text className="text-gntrek-white text-2xl font-roboto-slab-bold mb-1">
                          {animatedValue}
                        </Animated.Text>
                        <Text className="text-gntrek-white/80 font-montserrat text-sm text-center mb-1">
                          {achievement.label}
                        </Text>
                        <Text className="text-gntrek-white/60 font-montserrat text-xs text-center mb-2">
                          {achievement.description}
                        </Text>
                        <View className="flex-row items-center">
                          <TrendingUp size={12} color="#22c55e" strokeWidth={2} />
                          <Text className="text-green-400 font-montserrat-semibold text-xs ml-1">
                            {achievement.trend}
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                );
              })}
            </View>
          </View>

          {/* 🚀 ACTIONS RAPIDES REPENSÉES */}
          <View className="mb-12">
            <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-6">
              Actions Essentielles
            </Text>
            
            <View className="space-y-4">
              {quickActions.map((action, index) => (
                <TouchableOpacity key={index} activeOpacity={0.9}>
                  <LinearGradient
                    colors={['#1A1A1A', '#2A2A2A']}
                    className="flex-row items-center p-5 rounded-2xl border border-gntrek-red/20"
                  >
                    <LinearGradient
                      colors={action.gradient}
                      className="p-4 rounded-2xl mr-4"
                    >
                      <action.icon size={24} color="white" strokeWidth={2.5} />
                    </LinearGradient>
                    <View className="flex-1">
                      <Text className="text-gntrek-white font-roboto-slab-bold text-lg mb-1">
                        {action.title}
                      </Text>
                      <Text className="text-gntrek-white/70 font-montserrat text-sm">
                        {action.subtitle}
                      </Text>
                    </View>
                    <View className="bg-gntrek-red/20 p-2 rounded-full">
                      <ChevronRight size={20} color="#D72638" strokeWidth={2.5} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}