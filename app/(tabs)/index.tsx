import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mountain, Calendar, Users, MapPin, Compass, Clock, Thermometer, 
  ChevronRight, Star, TreePine, Leaf, Sun, Play, Award, Target,
  Camera, Zap, Shield, Globe
} from 'lucide-react-native';
import { useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animations d'entrée premium
    Animated.stagger(150, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation compass GNTREK signature
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animation floating premium
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const nextMission = {
    title: "Conquest du Mont Ventoux",
    date: "Dimanche 23 Février 2025", 
    time: "06:00",
    participants: 24,
    maxParticipants: 30,
    weather: "15°C",
    difficulty: "Expert",
    duration: "10h",
  };

  const achievements = [
    { icon: Mountain, label: "Sommets", value: "42", trend: "+3" },
    { icon: Target, label: "Missions", value: "127", trend: "+12" },
    { icon: Users, label: "Aventuriers", value: "2.5K", trend: "+240" },
    { icon: Award, label: "Trophées", value: "89", trend: "+7" },
  ];

  return (
    <View className="flex-1 bg-gntrek-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🏔️ HERO SECTION SIGNATURE GNTREK */}
        <View className="relative h-screen overflow-hidden">
          {/* Background Image Premium */}
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
            className="absolute inset-0 w-full h-full"
            style={{ resizeMode: 'cover' }}
          />
          
          {/* Gradient Overlay GNTREK */}
          <LinearGradient
            colors={['rgba(26, 47, 26, 0.9)', 'rgba(215, 38, 56, 0.7)', 'rgba(0, 0, 0, 0.95)']}
            className="absolute inset-0"
          />
          
          {/* Éléments flottants nature */}
          <Animated.View 
            className="absolute top-20 left-8 opacity-50"
            style={{ transform: [{ translateY: floatAnim }] }}
          >
            <TreePine size={28} color="#1A2F1A" strokeWidth={2} />
          </Animated.View>
          
          <Animated.View 
            className="absolute top-32 right-12 opacity-60"
            style={{ transform: [{ translateY: floatAnim }, { rotate: '15deg' }] }}
          >
            <Leaf size={24} color="#22c55e" strokeWidth={2} />
          </Animated.View>

          <Animated.View 
            className="absolute inset-0 items-center justify-center px-8"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            {/* LOGO GNTREK PREMIUM SIGNATURE */}
            <Animated.View 
              className="items-center mb-16"
              style={{ transform: [{ scale: pulseAnim }] }}
            >
              <View className="relative mb-8">
                {/* Effet glow premium */}
                <View className="absolute -inset-6 bg-gntrek-red/25 rounded-full blur-2xl" />
                <View className="w-32 h-32 bg-gntrek-red/15 rounded-full items-center justify-center border-3 border-gntrek-red/40">
                  <Compass size={64} color="#D72638" strokeWidth={2.5} />
                </View>
              </View>
              
              {/* Titre GNTREK Signature */}
              <Text className="text-7xl font-roboto-slab-bold text-gntrek-white mb-4 text-center tracking-wider">
                GNTREK
              </Text>
              <View className="h-1.5 w-40 bg-gntrek-red rounded-full mb-6" />
              <Text className="text-xl font-montserrat text-gntrek-white/90 text-center tracking-widest">
                CONQUÉRIR • EXPLORER • VIVRE
              </Text>
            </Animated.View>

            {/* Call to Action Premium */}
            <TouchableOpacity>
              <LinearGradient
                colors={['#D72638', '#8B1538']}
                className="px-10 py-5 rounded-3xl flex-row items-center shadow-2xl border border-gntrek-red/30"
              >
                <Play size={24} color="white" strokeWidth={2.5} />
                <Text className="text-gntrek-white font-montserrat-bold text-xl ml-4 tracking-wide">
                  COMMENCER L'AVENTURE
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Stats flottantes */}
            <Animated.View 
              className="absolute bottom-32 left-6 bg-gntrek-black/80 px-6 py-4 rounded-2xl border border-gntrek-red/30"
              style={{ transform: [{ translateY: floatAnim }] }}
            >
              <Text className="text-gntrek-white/80 text-sm font-montserrat text-center mb-1">Expéditions</Text>
              <Text className="text-gntrek-white text-3xl font-roboto-slab-bold text-center">127+</Text>
            </Animated.View>

            <Animated.View 
              className="absolute bottom-32 right-6 bg-gntrek-red/20 px-6 py-4 rounded-2xl border border-gntrek-red/50"
              style={{ transform: [{ translateY: floatAnim }] }}
            >
              <Text className="text-gntrek-white/80 text-sm font-montserrat text-center mb-1">Aventuriers</Text>
              <Text className="text-gntrek-white text-3xl font-roboto-slab-bold text-center">2.5K+</Text>
            </Animated.View>
          </Animated.View>
        </View>

        {/* 🎯 SECTION MISSION PREMIUM */}
        <View className="bg-gntrek-black px-6 pt-8">
          <Animated.View 
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            {/* Header Section */}
            <View className="flex-row items-center mb-8">
              <View className="w-2 h-12 bg-gntrek-red rounded-full mr-5" />
              <View className="flex-1">
                <Text className="text-4xl font-roboto-slab-bold text-gntrek-white mb-2">
                  Prochaine Mission
                </Text>
                <Text className="text-gntrek-stone font-montserrat text-lg">
                  Votre prochaine conquête vous attend
                </Text>
              </View>
              <View className="bg-gntrek-red/20 p-4 rounded-2xl">
                <Mountain size={32} color="#D72638" strokeWidth={2.5} />
              </View>
            </View>

            {/* Mission Card Premium */}
            <TouchableOpacity className="mb-8">
              <LinearGradient
                colors={['#1A1A1A', '#2A2A2A', '#1A1A1A']}
                className="rounded-3xl p-8 border-2 border-gntrek-red/30 shadow-xl"
              >
                {/* Mission Header */}
                <View className="flex-row items-center justify-between mb-6">
                  <View className="flex-row items-center flex-1">
                    <View className="bg-gntrek-red/20 p-5 rounded-2xl mr-5">
                      <Mountain size={32} color="#D72638" strokeWidth={2.5} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-2">
                        {nextMission.title}
                      </Text>
                      <Text className="text-gntrek-red font-montserrat-semibold text-lg">
                        Mission de Conquête Elite
                      </Text>
                    </View>
                  </View>
                  
                  <View className="bg-orange-500/20 px-4 py-2 rounded-full border border-orange-500/40">
                    <Text className="text-orange-400 font-montserrat-bold text-sm">
                      {nextMission.difficulty}
                    </Text>
                  </View>
                </View>
                
                {/* Mission Details Premium */}
                <View className="bg-gntrek-black/50 rounded-2xl p-6 mb-6">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Calendar size={20} color="#D72638" strokeWidth={2.5} />
                      <Text className="text-gntrek-white font-montserrat ml-3 text-lg">
                        {nextMission.date}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Clock size={20} color="#4A90E2" strokeWidth={2.5} />
                      <Text className="text-gntrek-white font-montserrat ml-3 text-lg">
                        {nextMission.time}
                      </Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between items-center mt-4">
                    <View className="flex-row items-center">
                      <Users size={20} color="#22c55e" strokeWidth={2.5} />
                      <Text className="text-gntrek-white font-montserrat ml-3 text-lg">
                        {nextMission.participants}/{nextMission.maxParticipants} Places
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Thermometer size={20} color="#FF8C42" strokeWidth={2.5} />
                      <Text className="text-gntrek-white font-montserrat ml-3 text-lg">
                        {nextMission.weather}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Action Button */}
                <TouchableOpacity>
                  <LinearGradient
                    colors={['#D72638', '#8B1538']}
                    className="py-4 rounded-2xl flex-row items-center justify-center"
                  >
                    <Target size={24} color="white" strokeWidth={2.5} />
                    <Text className="text-gntrek-white font-montserrat-bold text-xl ml-3">
                      REJOINDRE LA MISSION
                    </Text>
                    <ChevronRight size={24} color="white" strokeWidth={2.5} />
                  </LinearGradient>
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>

            {/* 📊 SECTION ACHIEVEMENTS PREMIUM */}
            <View className="mb-8">
              <View className="flex-row items-center mb-6">
                <View className="w-2 h-10 bg-gntrek-red rounded-full mr-5" />
                <Text className="text-3xl font-roboto-slab-bold text-gntrek-white">
                  Vos Conquêtes
                </Text>
                <Award size={28} color="#D72638" strokeWidth={2.5} className="ml-4" />
              </View>

              <View className="flex-row flex-wrap justify-between">
                {achievements.map((achievement, index) => (
                  <View key={index} className="w-[48%] mb-4">
                    <View className="bg-gntrek-black/80 rounded-2xl p-5 border border-gntrek-red/20 items-center">
                      <View className="bg-gntrek-red/20 p-4 rounded-full mb-4">
                        <achievement.icon size={28} color="#D72638" strokeWidth={2.5} />
                      </View>
                      <Text className="text-gntrek-white text-3xl font-roboto-slab-bold mb-1">
                        {achievement.value}
                      </Text>
                      <Text className="text-gntrek-stone font-montserrat text-center text-sm mb-2">
                        {achievement.label}
                      </Text>
                      <Text className="text-green-400 font-montserrat-semibold text-xs">
                        +{achievement.trend} ce mois
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* 🌟 SECTION ACTIONS RAPIDES */}
            <View className="mb-12">
              <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-6">
                Actions Rapides
              </Text>
              
              <View className="space-y-4">
                <TouchableOpacity>
                  <LinearGradient
                    colors={['#1A1A1A', '#2A2A2A']}
                    className="flex-row items-center p-6 rounded-2xl border border-gntrek-red/20"
                  >
                    <View className="bg-blue-500/20 p-4 rounded-2xl mr-4">
                      <MapPin size={28} color="#4A90E2" strokeWidth={2.5} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gntrek-white font-roboto-slab-bold text-xl mb-1">
                        Explorer la Carte
                      </Text>
                      <Text className="text-gntrek-stone font-montserrat">
                        Découvrez de nouveaux territoires
                      </Text>
                    </View>
                    <ChevronRight size={24} color="#D72638" strokeWidth={2.5} />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity>
                  <LinearGradient
                    colors={['#1A1A1A', '#2A2A2A']}
                    className="flex-row items-center p-6 rounded-2xl border border-gntrek-red/20"
                  >
                    <View className="bg-green-500/20 p-4 rounded-2xl mr-4">
                      <Camera size={28} color="#22c55e" strokeWidth={2.5} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-gntrek-white font-roboto-slab-bold text-xl mb-1">
                        Galerie d'Aventures
                      </Text>
                      <Text className="text-gntrek-stone font-montserrat">
                        Partagez vos moments épiques
                      </Text>
                    </View>
                    <ChevronRight size={24} color="#D72638" strokeWidth={2.5} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}