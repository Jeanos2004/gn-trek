import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Camera, Heart, Share2, MapPin, Calendar, Users, Mountain, 
  Plus, Filter, Search, Grid, List, Award, Star, Eye
} from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');
const imageSize = (width - 48) / 2; // 2 colonnes avec padding

export default function GalerieScreen() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [selectedCategory, setSelectedCategory] = useState('tous');

  // Photos d'aventures avec métadonnées
  const adventures = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sommet du Mont Ventoux',
      location: 'Provence, France',
      date: '15 Février 2025',
      category: 'sommets',
      participants: 24,
      likes: 127,
      difficulty: 'Expert',
      expedition: 'Conquest Ventoux',
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Lever de soleil au lac',
      location: 'Annecy, France',
      date: '8 Février 2025',
      category: 'paysages',
      participants: 18,
      likes: 89,
      difficulty: 'Intermédiaire',
      expedition: 'Alpine Discovery',
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Forêt mystérieuse',
      location: 'Vosges, France',
      date: '1 Février 2025',
      category: 'forets',
      participants: 15,
      likes: 156,
      difficulty: 'Débutant',
      expedition: 'Forest Exploration',
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/2350366/pexels-photo-2350366.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Camp de base premium',
      location: 'Chamonix, France',
      date: '25 Janvier 2025',
      category: 'camps',
      participants: 32,
      likes: 203,
      difficulty: 'Expert',
      expedition: 'Mont Blanc Challenge',
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Rivière cristalline',
      location: 'Jura, France',
      date: '20 Janvier 2025',
      category: 'eau',
      participants: 12,
      likes: 98,
      difficulty: 'Intermédiaire',
      expedition: 'Jura Adventure',
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1559825/pexels-photo-1559825.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Vallée des géants',
      location: 'Pyrénées, France',
      date: '12 Janvier 2025',
      category: 'vallees',
      participants: 28,
      likes: 174,
      difficulty: 'Expert',
      expedition: 'Pyrenean Quest',
    },
  ];

  const categories = [
    { key: 'tous', label: 'Toutes', icon: Grid },
    { key: 'sommets', label: 'Sommets', icon: Mountain },
    { key: 'paysages', label: 'Paysages', icon: Eye },
    { key: 'forets', label: 'Forêts', icon: Star },
    { key: 'camps', label: 'Camps', icon: Users },
  ];

  const filteredAdventures = selectedCategory === 'tous' 
    ? adventures 
    : adventures.filter(item => item.category === selectedCategory);

  const renderAdventureCard = ({ item, index }: { item: any, index: number }) => {
    if (viewMode === 'grid') {
      return (
        <TouchableOpacity 
          className="mb-6"
          style={{ width: imageSize }}
        >
          <View className="relative">
            <Image
              source={{ uri: item.image }}
              style={{ 
                width: imageSize, 
                height: imageSize * 1.2,
                borderRadius: 20
              }}
              className="mb-4"
            />
            
            {/* Overlay gradient */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: imageSize * 0.6,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingBottom: 16,
                justifyContent: 'flex-end'
              }}
            >
              <Text className="text-gntrek-white font-roboto-slab-bold text-lg mb-2">
                {item.title}
              </Text>
              <View className="flex-row items-center mb-3">
                <MapPin size={14} color="#D72638" strokeWidth={2} />
                <Text className="text-gntrek-white/80 font-montserrat text-sm ml-1">
                  {item.location}
                </Text>
              </View>
              
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Heart size={16} color="#D72638" strokeWidth={2} />
                  <Text className="text-gntrek-white font-montserrat-semibold text-sm ml-2">
                    {item.likes}
                  </Text>
                </View>
                <View className="bg-gntrek-red/20 px-2 py-1 rounded-full">
                  <Text className="text-gntrek-red font-montserrat-semibold text-xs">
                    {item.difficulty}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity className="mb-4">
          <LinearGradient
            colors={['#1A1A1A', '#2A2A2A']}
            className="rounded-2xl p-4 border border-gntrek-red/20 flex-row"
          >
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-xl mr-4"
            />
            <View className="flex-1">
              <Text className="text-gntrek-white font-roboto-slab-bold text-lg mb-1">
                {item.title}
              </Text>
              <Text className="text-gntrek-stone font-montserrat mb-2">
                {item.expedition}
              </Text>
              <View className="flex-row items-center justify-between">
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
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View className="flex-1 bg-gntrek-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header Premium */}
      <LinearGradient
        colors={['#1A2F1A', 'rgba(215, 38, 56, 0.1)', 'transparent']}
        className="pt-16 pb-6 px-6"
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center flex-1">
            <View className="w-2 h-12 bg-gntrek-red rounded-full mr-4" />
            <View className="flex-1">
              <Text className="text-4xl font-roboto-slab-bold text-gntrek-white mb-1">
                Galerie Premium
              </Text>
              <Text className="text-gntrek-stone font-montserrat text-lg">
                Vos moments d'aventure épiques
              </Text>
            </View>
          </View>
          <View className="bg-gntrek-red/20 p-4 rounded-2xl">
            <Camera size={32} color="#D72638" strokeWidth={2.5} />
          </View>
        </View>

        {/* Actions Header */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row space-x-3">
            <TouchableOpacity>
              <View className="bg-gntrek-red/20 p-3 rounded-xl border border-gntrek-red/30">
                <Plus size={20} color="#D72638" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View className="bg-gntrek-black/60 p-3 rounded-xl border border-gntrek-white/20">
                <Search size={20} color="#FFFFFF" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-row space-x-2">
            <TouchableOpacity onPress={() => setViewMode('grid')}>
              <View className={`p-3 rounded-xl ${viewMode === 'grid' ? 'bg-gntrek-red/20 border border-gntrek-red/30' : 'bg-gntrek-black/60 border border-gntrek-white/20'}`}>
                <Grid size={20} color={viewMode === 'grid' ? '#D72638' : '#FFFFFF'} strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setViewMode('list')}>
              <View className={`p-3 rounded-xl ${viewMode === 'list' ? 'bg-gntrek-red/20 border border-gntrek-red/30' : 'bg-gntrek-black/60 border border-gntrek-white/20'}`}>
                <List size={20} color={viewMode === 'list' ? '#D72638' : '#FFFFFF'} strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Categories Filter */}
      <View className="px-6 mb-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row space-x-3">
            {categories.map((category) => (
              <TouchableOpacity 
                key={category.key}
                onPress={() => setSelectedCategory(category.key)}
              >
                <View className={`px-6 py-3 rounded-2xl flex-row items-center ${
                  selectedCategory === category.key 
                    ? 'bg-gntrek-red border border-gntrek-red' 
                    : 'bg-gntrek-black/80 border border-gntrek-white/20'
                }`}>
                  <category.icon 
                    size={18} 
                    color={selectedCategory === category.key ? '#FFFFFF' : '#D72638'} 
                    strokeWidth={2.5} 
                  />
                  <Text className={`font-montserrat-semibold ml-2 ${
                    selectedCategory === category.key ? 'text-gntrek-white' : 'text-gntrek-red'
                  }`}>
                    {category.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Stats rapides */}
      <View className="px-6 mb-6">
        <View className="flex-row justify-between">
          <View className="bg-gntrek-black/80 rounded-2xl p-4 flex-1 mr-2 border border-gntrek-red/20 items-center">
            <Text className="text-gntrek-white text-2xl font-roboto-slab-bold mb-1">
              {adventures.length}
            </Text>
            <Text className="text-gntrek-stone font-montserrat text-sm">
              Aventures
            </Text>
          </View>
          <View className="bg-gntrek-black/80 rounded-2xl p-4 flex-1 mx-1 border border-gntrek-red/20 items-center">
            <Text className="text-gntrek-white text-2xl font-roboto-slab-bold mb-1">
              {adventures.reduce((sum, item) => sum + item.likes, 0)}
            </Text>
            <Text className="text-gntrek-stone font-montserrat text-sm">
              J'aime
            </Text>
          </View>
          <View className="bg-gntrek-black/80 rounded-2xl p-4 flex-1 ml-2 border border-gntrek-red/20 items-center">
            <Text className="text-gntrek-white text-2xl font-roboto-slab-bold mb-1">
              {adventures.reduce((sum, item) => sum + item.participants, 0)}
            </Text>
            <Text className="text-gntrek-stone font-montserrat text-sm">
              Aventuriers
            </Text>
          </View>
        </View>
      </View>

      {/* Gallery Content */}
      <View className="flex-1 px-6">
        <FlatList
          data={filteredAdventures}
          renderItem={renderAdventureCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewMode === 'grid' ? 2 : 1}
          columnWrapperStyle={viewMode === 'grid' ? { justifyContent: 'space-between' } : null}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>
    </View>
  );
}