import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, StatusBar, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Mountain, Calendar, Users, MapPin, Compass, Clock, Thermometer, 
  ChevronRight, Star, TreePine, Leaf, Sun, Play, Award, Target,
  Camera, Heart, ArrowRight
} from 'lucide-react-native';
import { useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  // Animations subtiles et élégantes
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const breatheAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation d'entrée douce
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation respiration douce pour le logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.05,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="flex-1 bg-gntrek-white">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 🌟 HERO SECTION - Image immersive avec overlay élégant */}
        <View className="relative h-screen">
          {/* Image de fond nature authentique */}
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=1200' }}
            className="absolute inset-0 w-full h-full"
            style={{ resizeMode: 'cover' }}
          />
          
          {/* Overlay gradient subtil pour préserver la beauté naturelle */}
          <LinearGradient
            colors={[
              'rgba(0, 0, 0, 0.3)',
              'rgba(0, 0, 0, 0.1)', 
              'rgba(215, 38, 56, 0.1)',
              'rgba(0, 0, 0, 0.6)'
            ]}
            className="absolute inset-0"
          />

          {/* Éléments nature flottants subtils */}
          <View className="absolute top-20 right-8 opacity-30">
            <TreePine size={20} color="rgba(255, 255, 255, 0.6)" strokeWidth={1.5} />
          </View>
          <View className="absolute top-32 left-12 opacity-25">
            <Leaf size={16} color="rgba(34, 197, 94, 0.7)" strokeWidth={1.5} />
          </View>
          <View className="absolute top-40 right-20 opacity-20">
            <Star size={12} color="rgba(255, 140, 66, 0.8)" strokeWidth={1.5} />
          </View>

          {/* Contenu hero centré avec élégance */}
          <Animated.View 
            className="absolute inset-0 items-center justify-center px-8"
            style={{
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }}
          >
            {/* Logo GNTREK premium avec respiration douce */}
            <Animated.View 
              className="items-center mb-12"
              style={{ transform: [{ scale: breatheAnim }] }}
            >
              <View className="relative mb-6">
                {/* Glow doux et subtil */}
                <View className="absolute -inset-8 bg-gntrek-red/20 rounded-full blur-xl opacity-60" />
                <View className="w-32 h-32 bg-gradient-to-br from-gntrek-white/20 to-gntrek-red/20 rounded-full items-center justify-center border-2 border-gntrek-white/40 backdrop-blur-sm">
                  <Compass size={56} color="#FFFFFF" strokeWidth={2} />
                </View>
              </View>
              
              {/* Titre GNTREK avec caractère mais élégant */}
              <Text className="text-6xl font-roboto-slab-bold text-gntrek-white mb-3 text-center tracking-wider">
                GNTREK
              </Text>
              <View className="h-1 w-32 bg-gntrek-red rounded-full mb-4" />
              
              {/* Slogan authentique et évocateur */}
              <Text className="text-xl font-montserrat text-gntrek-white/95 text-center tracking-wide mb-2">
                Explorez la nature authentique
              </Text>
              <Text className="text-base font-montserrat text-gntrek-white/80 text-center">
                Découvrez des sentiers secrets et vivez l'aventure
              </Text>
            </Animated.View>

            {/* CTA principal - bouton premium avec caractère outdoor */}
            <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#D72638', '#B91C3A', '#D72638']}
                  className="px-10 py-5 rounded-3xl flex-row items-center shadow-2xl"
                >
                  <TreePine size={24} color="white" strokeWidth={2} />
                  <Text className="text-gntrek-white font-montserrat-bold text-xl ml-3 tracking-wide">
                    Explorer les sentiers
                  </Text>
                  <ArrowRight size={24} color="white" strokeWidth={2} className="ml-2" />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Indicateur scroll doux */}
            <Animated.View 
              className="absolute bottom-12"
              style={{ 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }] 
              }}
            >
              <View className="items-center">
                <Text className="text-gntrek-white/70 font-montserrat text-sm mb-3">
                  Découvrez plus
                </Text>
                <View className="w-6 h-10 border-2 border-gntrek-white/50 rounded-full items-center justify-start p-1">
                  <View className="w-1 h-3 bg-gntrek-white/70 rounded-full" />
                </View>
              </View>
            </Animated.View>
          </Animated.View>
        </View>

        {/* 🏔️ SECTION DÉCOUVERTE - Authentique et premium */}
        <View className="bg-gntrek-white px-6 py-12">
          <Animated.View style={{ opacity: fadeAnim }}>
            {/* Header section avec caractère nature */}
            <View className="items-center mb-10">
              <View className="flex-row items-center mb-4">
                <View className="w-8 h-px bg-gntrek-red/40" />
                <Mountain size={20} color="#D72638" strokeWidth={2} className="mx-3" />
                <View className="w-8 h-px bg-gntrek-red/40" />
              </View>
              <Text className="text-3xl font-roboto-slab-bold text-gntrek-black text-center mb-3">
                Votre prochaine aventure
              </Text>
              <Text className="text-gntrek-stone font-montserrat text-center text-lg">
                Des expériences outdoor authentiques vous attendent
              </Text>
            </View>

            {/* Card mission featured - Design premium mais naturel */}
            <View className="mb-8">
              <View className="bg-gntrek-white rounded-3xl shadow-lg border border-gntrek-stone/10 overflow-hidden">
                {/* Image header */}
                <View className="relative h-48">
                  <Image
                    source={{ uri: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800' }}
                    className="w-full h-full"
                    style={{ resizeMode: 'cover' }}
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)']}
                    className="absolute inset-0"
                  />
                  
                  {/* Badge premium discret */}
                  <View className="absolute top-4 right-4">
                    <View className="bg-gntrek-white/90 px-3 py-1 rounded-full flex-row items-center">
                      <Star size={12} color="#D72638" strokeWidth={2} />
                      <Text className="text-gntrek-black font-montserrat-semibold text-xs ml-1">
                        Recommandé
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Contenu card */}
                <View className="p-6">
                  <Text className="text-2xl font-roboto-slab-bold text-gntrek-black mb-2">
                    Randonnée des Crêtes Sauvages
                  </Text>
                  <Text className="text-gntrek-stone font-montserrat mb-4">
                    Une aventure authentique au cœur des Vosges, entre forêts ancestrales et panoramas à couper le souffle.
                  </Text>
                  
                  {/* Métadonnées élégantes */}
                  <View className="flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center">
                      <Clock size={16} color="#6B7280" strokeWidth={2} />
                      <Text className="text-gntrek-stone font-montserrat ml-2">6h30</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Mountain size={16} color="#6B7280" strokeWidth={2} />
                      <Text className="text-gntrek-stone font-montserrat ml-2">Modéré</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Users size={16} color="#6B7280" strokeWidth={2} />
                      <Text className="text-gntrek-stone font-montserrat ml-2">12 places</Text>
                    </View>
                  </View>

                  {/* CTA secondaire élégant */}
                  <TouchableOpacity>
                    <View className="bg-gntrek-black py-4 rounded-2xl flex-row items-center justify-center">
                      <Text className="text-gntrek-white font-montserrat-semibold text-lg mr-2">
                        Découvrir cette aventure
                      </Text>
                      <ChevronRight size={20} color="#FFFFFF" strokeWidth={2} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* 🌿 SECTION EXPÉRIENCES - Grid naturel et premium */}
            <View className="mb-10">
              <Text className="text-2xl font-roboto-slab-bold text-gntrek-black mb-6 text-center">
                Explorez par envie
              </Text>
              
              <View className="flex-row flex-wrap justify-between">
                {[
                  {
                    title: "Forêts mystiques",
                    subtitle: "Sentiers ombragés",
                    icon: TreePine,
                    color: "#22c55e",
                    image: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    title: "Sommets épiques",
                    subtitle: "Vues panoramiques",
                    icon: Mountain,
                    color: "#D72638",
                    image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    title: "Lacs cristallins",
                    subtitle: "Eaux pures",
                    icon: Sun,
                    color: "#4A90E2",
                    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=400"
                  },
                  {
                    title: "Refuges cosy",
                    subtitle: "Haltes chaleureuses",
                    icon: Heart,
                    color: "#FF8C42",
                    image: "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=400"
                  }
                ].map((experience, index) => (
                  <TouchableOpacity key={index} className="w-[48%] mb-4">
                    <View className="bg-gntrek-white rounded-2xl shadow-md border border-gntrek-stone/10 overflow-hidden">
                      {/* Image avec overlay subtil */}
                      <View className="relative h-28">
                        <Image
                          source={{ uri: experience.image }}
                          className="w-full h-full"
                          style={{ resizeMode: 'cover' }}
                        />
                        <LinearGradient
                          colors={['transparent', 'rgba(0,0,0,0.3)']}
                          className="absolute inset-0"
                        />
                        
                        {/* Icône flottante */}
                        <View 
                          className="absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center"
                          style={{ backgroundColor: `${experience.color}20` }}
                        >
                          {(() => {
                            const IconComponent = experience.icon;
                            return <IconComponent size={16} color={experience.color} strokeWidth={2} />;
                          })()}
                        </View>
                      </View>
                      
                      {/* Contenu */}
                      <View className="p-4">
                        <Text className="text-gntrek-black font-roboto-slab-bold text-base mb-1">
                          {experience.title}
                        </Text>
                        <Text className="text-gntrek-stone font-montserrat text-sm">
                          {experience.subtitle}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* 📸 SECTION INSPIRATION - Galerie aperçu */}
            <View className="mb-10">
              <View className="flex-row items-center justify-between mb-6">
                <Text className="text-2xl font-roboto-slab-bold text-gntrek-black">
                  Inspirations récentes
                </Text>
                <TouchableOpacity>
                  <Text className="text-gntrek-red font-montserrat-semibold">
                    Voir tout
                  </Text>
                </TouchableOpacity>
              </View>
              
              {/* Aperçu horizontal scrollable */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row space-x-4">
                  {[
                    "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=300",
                    "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=300",
                    "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=300",
                    "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=300"
                  ].map((image, index) => (
                    <TouchableOpacity key={index}>
                      <Image
                        source={{ uri: image }}
                        className="w-24 h-24 rounded-xl"
                        style={{ resizeMode: 'cover' }}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* 🌟 FOOTER CTA - Appel à l'action final */}
            <View className="items-center py-8">
              <View className="bg-gradient-to-br from-gntrek-red/5 to-gntrek-red/10 rounded-3xl p-8 w-full border border-gntrek-red/20">
                <View className="items-center">
                  <View className="mb-4">
                    <Compass size={32} color="#D72638" strokeWidth={2} />
                  </View>
                  <Text className="text-xl font-roboto-slab-bold text-gntrek-black text-center mb-2">
                    Prêt pour l'aventure ?
                  </Text>
                  <Text className="text-gntrek-stone font-montserrat text-center mb-6">
                    Rejoignez notre communauté de passionnés
                  </Text>
                  
                  <TouchableOpacity>
                    <View className="bg-gntrek-red px-8 py-4 rounded-2xl flex-row items-center">
                      <Text className="text-gntrek-white font-montserrat-semibold text-lg mr-2">
                        Commencer maintenant
                      </Text>
                      <Play size={20} color="#FFFFFF" strokeWidth={2} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}