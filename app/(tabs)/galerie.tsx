import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, Image, Dimensions, 
  FlatList, StatusBar, Animated, SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Camera, Heart, Share2, MapPin, Calendar, Users, Mountain, 
  Plus, Filter, Search, Grid, List, Award, Star, Eye, 
  Bookmark, TrendingUp, Play, Clock, Compass, Wind
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const imageSize = (width - 48) / 2;

export default function GalerieScreen() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Animations raffinées
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(20)).current;
  const filterSlide = useRef(new Animated.Value(-100)).current;
  const photosAnim = useRef(Array.from({ length: 12 }, () => new Animated.Value(0))).current;

  useEffect(() => {
    // Animation d'entrée premium
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlide, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation des photos en cascade
    Animated.stagger(100, 
      photosAnim.map(anim => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  // Données aventures enrichies
  const adventures = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Conquest du Mont Ventoux',
      location: 'Provence, France',
      date: '15 Février 2025',
      time: '06:24',
      category: 'sommets',
      participants: 24,
      likes: 247,
      views: 1430,
      difficulty: 'Expert',
      expedition: 'Mission Ventoux Elite',
      altitude: '1,912m',
      weather: 'Ensoleillé, -2°C',
      photographer: 'Sophie M.',
      awards: ['Sommet Elite', 'Photo Premium'],
      description: 'Conquest épique au lever du soleil avec conditions parfaites'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Aurore sur le Lac d\'Annecy',
      location: 'Haute-Savoie, France',
      date: '8 Février 2025',
      time: '05:47',
      category: 'paysages',
      participants: 18,
      likes: 189,
      views: 892,
      difficulty: 'Intermédiaire',
      expedition: 'Alpine Discovery',
      altitude: '447m',
      weather: 'Brumeux, 5°C',
      photographer: 'Marc T.',
      awards: ['Lever de soleil'],
      description: 'Moment magique capturé dans la brume matinale'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Forêt des Mystères',
      location: 'Vosges, France',
      date: '1 Février 2025',
      time: '14:20',
      category: 'forets',
      participants: 15,
      likes: 156,
      views: 674,
      difficulty: 'Débutant',
      expedition: 'Forest Exploration',
      altitude: '850m',
      weather: 'Couvert, 8°C',
      photographer: 'Julie R.',
      awards: ['Nature sauvage'],
      description: 'Immersion totale dans la forêt ancestrale'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/2350366/pexels-photo-2350366.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Camp de Base Chamonix',
      location: 'Mont-Blanc, France',
      date: '25 Janvier 2025',
      time: '19:45',
      category: 'camps',
      participants: 32,
      likes: 203,
      views: 1265,
      difficulty: 'Expert',
      expedition: 'Mont Blanc Challenge',
      altitude: '2,400m',
      weather: 'Neige, -8°C',
      photographer: 'Alex D.',
      awards: ['Camp Elite', 'Conditions Extrêmes'],
      description: 'Installation du camp sous la voie normale'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Rivière Cristalline du Jura',
      location: 'Jura, France',
      date: '20 Janvier 2025',
      time: '11:30',
      category: 'eau',
      participants: 12,
      likes: 98,
      views: 543,
      difficulty: 'Intermédiaire',
      expedition: 'Jura Adventure',
      altitude: '680m',
      weather: 'Ensoleillé, 12°C',
      photographer: 'Emma L.',
      awards: ['Eau pure'],
      description: 'Source d\'eau pure découverte en randonnée'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Vallée des Géants',
      location: 'Pyrénées, France',
      date: '12 Janvier 2025',
      time: '16:18',
      category: 'vallees',
      participants: 28,
      likes: 174,
      views: 976,
      difficulty: 'Expert',
      expedition: 'Pyrenean Quest',
      altitude: '1,650m',
      weather: 'Variable, 3°C',
      photographer: 'Thomas K.',
      awards: ['Panorama Epic', 'Vallée Sauvage'],
      description: 'Vue imprenable sur la vallée préservée'
    },
  ];

  const categories = [
    { key: 'tous', label: 'Toutes', icon: Grid, count: adventures.length },
    { key: 'sommets', label: 'Sommets', icon: Mountain, count: adventures.filter(a => a.category === 'sommets').length },
    { key: 'paysages', label: 'Paysages', icon: Eye, count: adventures.filter(a => a.category === 'paysages').length },
    { key: 'forets', label: 'Forêts', icon: Star, count: adventures.filter(a => a.category === 'forets').length },
    { key: 'camps', label: 'Camps', icon: Users, count: adventures.filter(a => a.category === 'camps').length },
    { key: 'eau', label: 'Eau', icon: Award, count: adventures.filter(a => a.category === 'eau').length },
  ];

  const filteredAdventures = selectedCategory === 'tous' 
    ? adventures 
    : adventures.filter(item => item.category === selectedCategory);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
    Animated.timing(filterSlide, {
      toValue: isFilterVisible ? -100 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Expert': return '#D72638';
      case 'Intermédiaire': return '#FF8C42';
      case 'Débutant': return '#22c55e';
      default: return '#6B7280';
    }
  };

  const renderAdventureCard = ({ item, index }: { item: any, index: number }) => {
    const animatedStyle = {
      opacity: photosAnim[index] || 1,
      transform: [{
        translateY: (photosAnim[index] || new Animated.Value(1)).interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        })
      }]
    };

    if (viewMode === 'grid') {
      return (
        <Animated.View style={[{ width: imageSize }, animatedStyle]}>
          <TouchableOpacity 
            className="mb-6"
            activeOpacity={0.95}
          >
            <View className="relative overflow-hidden rounded-3xl">
              <Image
                source={{ uri: item.image }}
                style={{ 
                  width: imageSize, 
                  height: imageSize * 1.3,
                }}
                className="rounded-3xl"
              />
              
              {/* Overlay sophistiqué */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
                locations={[0, 0.4, 0.7, 1]}
                className="absolute inset-0 rounded-3xl"
              />

              {/* Badge difficulté */}
              <View className="absolute top-4 left-4">
                <View 
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: `${getDifficultyColor(item.difficulty)}20` }}
                >
                  <Text 
                    className="font-montserrat-bold text-xs"
                    style={{ color: getDifficultyColor(item.difficulty) }}
                  >
                    {item.difficulty}
                  </Text>
                </View>
              </View>

              {/* Stats en haut à droite */}
              <View className="absolute top-4 right-4 items-end">
                <View className="bg-gntrek-black/60 px-2 py-1 rounded-full flex-row items-center mb-2">
                  <Heart size={12} color="#D72638" strokeWidth={2} />
                  <Text className="text-gntrek-white font-montserrat-semibold text-xs ml-1">
                    {item.likes}
                  </Text>
                </View>
                <View className="bg-gntrek-black/60 px-2 py-1 rounded-full flex-row items-center">
                  <Eye size={12} color="#4A90E2" strokeWidth={2} />
                  <Text className="text-gntrek-white font-montserrat-semibold text-xs ml-1">
                    {item.views}
                  </Text>
                </View>
              </View>

              {/* Contenu bas */}
              <View className="absolute bottom-0 left-0 right-0 p-4">
                <Text className="text-gntrek-white font-roboto-slab-bold text-base mb-2 leading-tight">
                  {item.title}
                </Text>
                
                <View className="flex-row items-center mb-3">
                  <MapPin size={12} color="#D72638" strokeWidth={2} />
                  <Text className="text-gntrek-white/80 font-montserrat text-xs ml-1 flex-1">
                    {item.location}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Users size={12} color="#22c55e" strokeWidth={2} />
                    <Text className="text-gntrek-white font-montserrat-semibold text-xs ml-1">
                      {item.participants}
                    </Text>
                  </View>
                  <Text className="text-gntrek-white/60 font-montserrat text-xs">
                    {item.time}
                  </Text>
                </View>

                {/* Awards */}
                {item.awards.length > 0 && (
                  <View className="flex-row mt-2">
                    {item.awards.slice(0, 2).map((award, awardIndex) => (
                      <View key={awardIndex} className="bg-gntrek-red/20 px-2 py-1 rounded-full mr-1">
                        <Text className="text-gntrek-red font-montserrat text-xs">
                          {award}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      );
    } else {
      // Vue liste améliorée
      return (
        <Animated.View style={animatedStyle}>
          <TouchableOpacity className="mb-4" activeOpacity={0.95}>
            <LinearGradient
              colors={['#1A1A1A', '#2A2A2A']}
              className="rounded-3xl p-5 border border-gntrek-red/20 flex-row"
            >
              <View className="relative mr-4">
                <Image
                  source={{ uri: item.image }}
                  className="w-24 h-24 rounded-2xl"
                />
                <View className="absolute -top-2 -right-2 bg-gntrek-red rounded-full p-1">
                  <Camera size={12} color="white" strokeWidth={2} />
                </View>
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-gntrek-white font-roboto-slab-bold text-lg flex-1">
                    {item.title}
                  </Text>
                  <View 
                    className="px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${getDifficultyColor(item.difficulty)}20` }}
                  >
                    <Text 
                      className="font-montserrat-bold text-xs"
                      style={{ color: getDifficultyColor(item.difficulty) }}
                    >
                      {item.difficulty}
                    </Text>
                  </View>
                </View>
                
                <Text className="text-gntrek-red font-montserrat-semibold mb-2">
                  {item.expedition}
                </Text>
                
                <View className="flex-row items-center mb-2">
                  <MapPin size={14} color="#6B7280" strokeWidth={2} />
                  <Text className="text-gntrek-white/70 font-montserrat text-sm ml-1 flex-1">
                    {item.location} • {item.altitude}
                  </Text>
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center space-x-4">
                    <View className="flex-row items-center">
                      <Users size={14} color="#4A90E2" strokeWidth={2} />
                      <Text className="text-gntrek-white font-montserrat text-sm ml-1">
                        {item.participants}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Heart size={14} color="#D72638" strokeWidth={2} />
                      <Text className="text-gntrek-white font-montserrat text-sm ml-1">
                        {item.likes}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Eye size={14} color="#22c55e" strokeWidth={2} />
                      <Text className="text-gntrek-white font-montserrat text-sm ml-1">
                        {item.views}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gntrek-white/60 font-montserrat text-sm">
                    {item.date.split(' ')[0]} {item.date.split(' ')[1]}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gntrek-black">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header Premium */}
      <Animated.View 
        style={{ opacity: headerOpacity }}
        className="relative"
      >
        <LinearGradient
          colors={['#1A2F1A', 'rgba(215, 38, 56, 0.1)', 'transparent']}
          className="pt-12 pb-6 px-6"
        >
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center flex-1">
              <View className="w-1 h-16 bg-gradient-to-b from-gntrek-red to-transparent rounded-full mr-4" />
              <View className="flex-1">
                <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-1">
                  Galerie Premium
                </Text>
                <Text className="text-gntrek-white/70 font-montserrat text-base">
                  Vos plus beaux moments d'aventure
                </Text>
              </View>
            </View>
            <View className="bg-gntrek-red/20 p-3 rounded-2xl">
              <Camera size={28} color="#D72638" strokeWidth={2.5} />
            </View>
          </View>

          {/* Stats overview */}
          <View className="flex-row justify-between mb-4">
            <View className="bg-gntrek-black/60 px-4 py-2 rounded-2xl border border-gntrek-red/30">
              <Text className="text-gntrek-white/60 font-montserrat text-sm text-center">Photos</Text>
              <Text className="text-gntrek-white font-roboto-slab-bold text-xl text-center">
                {adventures.length}
              </Text>
            </View>
            <View className="bg-gntrek-red/20 px-4 py-2 rounded-2xl border border-gntrek-red/40">
              <Text className="text-gntrek-white/60 font-montserrat text-sm text-center">Likes</Text>
              <Text className="text-gntrek-white font-roboto-slab-bold text-xl text-center">
                {adventures.reduce((sum, item) => sum + item.likes, 0)}
              </Text>
            </View>
            <View className="bg-gntrek-black/60 px-4 py-2 rounded-2xl border border-gntrek-red/30">
              <Text className="text-gntrek-white/60 font-montserrat text-sm text-center">Vues</Text>
              <Text className="text-gntrek-white font-roboto-slab-bold text-xl text-center">
                {Math.round(adventures.reduce((sum, item) => sum + item.views, 0) / 1000)}K
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Contrôles et filtres */}
      <Animated.View 
        className="px-6 mb-4"
        style={{ transform: [{ translateY: contentSlide }] }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity 
              onPress={() => setViewMode('grid')}
              className={`p-3 rounded-2xl ${viewMode === 'grid' ? 'bg-gntrek-red' : 'bg-gntrek-black/60 border border-gntrek-red/30'}`}
            >
              <Grid size={20} color={viewMode === 'grid' ? 'white' : '#D72638'} strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setViewMode('list')}
              className={`p-3 rounded-2xl ${viewMode === 'list' ? 'bg-gntrek-red' : 'bg-gntrek-black/60 border border-gntrek-red/30'}`}
            >
              <List size={20} color={viewMode === 'list' ? 'white' : '#D72638'} strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity 
              onPress={toggleFilter}
              className="bg-gntrek-black/60 p-3 rounded-2xl border border-gntrek-red/30"
            >
              <Filter size={20} color="#D72638" strokeWidth={2.5} />
            </TouchableOpacity>
            <TouchableOpacity className="bg-gntrek-red/20 p-3 rounded-2xl border border-gntrek-red/40">
              <Plus size={20} color="#D72638" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filtres par catégories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map((category, index) => (
            <TouchableOpacity 
              key={category.key}
              onPress={() => setSelectedCategory(category.key)}
              className={`mr-3 px-4 py-3 rounded-2xl flex-row items-center ${
                selectedCategory === category.key 
                  ? 'bg-gntrek-red border border-gntrek-red/60' 
                  : 'bg-gntrek-black/60 border border-gntrek-red/30'
              }`}
            >
              <category.icon 
                size={16} 
                color={selectedCategory === category.key ? 'white' : '#D72638'} 
                strokeWidth={2.5} 
              />
              <Text className={`font-montserrat-semibold text-sm ml-2 ${
                selectedCategory === category.key ? 'text-gntrek-white' : 'text-gntrek-red'
              }`}>
                {category.label}
              </Text>
              <View className={`ml-2 px-2 py-1 rounded-full ${
                selectedCategory === category.key ? 'bg-gntrek-white/20' : 'bg-gntrek-red/20'
              }`}>
                <Text className={`text-xs font-montserrat-bold ${
                  selectedCategory === category.key ? 'text-gntrek-white' : 'text-gntrek-red'
                }`}>
                  {category.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Galerie */}
      <Animated.View 
        className="flex-1 px-6"
        style={{ transform: [{ translateY: contentSlide }] }}
      >
        {viewMode === 'grid' ? (
          <FlatList
            data={filteredAdventures}
            renderItem={renderAdventureCard}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        ) : (
          <FlatList
            data={filteredAdventures}
            renderItem={renderAdventureCard}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}