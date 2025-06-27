import { View, Text, ScrollView, TouchableOpacity, Dimensions, StatusBar, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MapPin, Navigation, Compass, Mountain, Target, Zap, 
  Wifi, Battery, Signal, Settings, Plus, Share2, Bookmark,
  Wind, Thermometer, Eye, Clock, Users, Award
} from 'lucide-react-native';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function CarteScreen() {
  const [currentMode, setCurrentMode] = useState('exploration'); // 'exploration', 'mission', 'urgence'
  const [gpsStatus, setGpsStatus] = useState('connected');
  
  // Points d'intérêt sur la carte
  const pointsOfInterest = [
    {
      id: 1,
      name: 'Sommet Mont Ventoux',
      type: 'sommet',
      distance: '2.3 km',
      elevation: '1,912m',
      difficulty: 'Expert',
      status: 'accessible',
      coords: { lat: 44.1736, lng: 5.2786 },
    },
    {
      id: 2,
      name: 'Refuge des Alpages',
      type: 'refuge',
      distance: '0.8 km',
      elevation: '1,456m',
      difficulty: 'Intermédiaire',
      status: 'ouvert',
      coords: { lat: 44.1650, lng: 5.2650 },
    },
    {
      id: 3,
      name: 'Source cristalline',
      type: 'eau',
      distance: '1.2 km',
      elevation: '1,280m',
      difficulty: 'Facile',
      status: 'accessible',
      coords: { lat: 44.1580, lng: 5.2580 },
    },
    {
      id: 4,
      name: 'Point de vue panoramique',
      type: 'panorama',
      distance: '3.1 km',
      elevation: '1,750m',
      difficulty: 'Expert',
      status: 'conditions_difficiles',
      coords: { lat: 44.1820, lng: 5.2920 },
    },
  ];

  const currentWeather = {
    temperature: '12°C',
    wind: '15 km/h',
    visibility: '8 km',
    condition: 'Partiellement nuageux',
  };

  const navigationModes = [
    { key: 'exploration', label: 'Exploration', icon: Compass, color: '#4A90E2' },
    { key: 'mission', label: 'Mission', icon: Target, color: '#D72638' },
    { key: 'urgence', label: 'Urgence', icon: Zap, color: '#FF8C42' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accessible':
      case 'ouvert':
        return '#22c55e';
      case 'conditions_difficiles':
        return '#FF8C42';
      case 'ferme':
      case 'inaccessible':
        return '#ef4444';
      default:
        return '#6B7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sommet':
        return Mountain;
      case 'refuge':
        return Award;
      case 'eau':
        return Target;
      case 'panorama':
        return Eye;
      default:
        return MapPin;
    }
  };

  return (
    <View className="flex-1 bg-gntrek-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header GPS Premium */}
      <LinearGradient
        colors={['#1A2F1A', 'rgba(215, 38, 56, 0.1)', 'transparent']}
        className="pt-16 pb-6 px-6"
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center flex-1">
            <View className="w-2 h-12 bg-gntrek-red rounded-full mr-4" />
            <View className="flex-1">
              <Text className="text-4xl font-roboto-slab-bold text-gntrek-white mb-1">
                GPS GNTREK
              </Text>
              <Text className="text-gntrek-stone font-montserrat text-lg">
                Navigation premium terrain
              </Text>
            </View>
          </View>
          <View className="bg-green-500/20 p-4 rounded-2xl">
            <Navigation size={32} color="#22c55e" strokeWidth={2.5} />
          </View>
        </View>

        {/* Status GPS */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row space-x-4">
            <View className="flex-row items-center">
              <View className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              <Text className="text-gntrek-white font-montserrat text-sm">GPS Connecté</Text>
            </View>
            <View className="flex-row items-center">
              <Signal size={16} color="#4A90E2" strokeWidth={2} />
              <Text className="text-gntrek-white font-montserrat text-sm ml-1">4G</Text>
            </View>
            <View className="flex-row items-center">
              <Battery size={16} color="#22c55e" strokeWidth={2} />
              <Text className="text-gntrek-white font-montserrat text-sm ml-1">87%</Text>
            </View>
          </View>
          <TouchableOpacity>
            <View className="bg-gntrek-black/60 p-3 rounded-xl border border-gntrek-white/20">
              <Settings size={20} color="#FFFFFF" strokeWidth={2.5} />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Modes de Navigation */}
        <View className="px-6 mb-6">
          <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-4">
            Mode Navigation
          </Text>
          <View className="flex-row justify-between">
            {navigationModes.map((mode) => (
              <TouchableOpacity 
                key={mode.key}
                onPress={() => setCurrentMode(mode.key)}
                className="flex-1 mx-1"
              >
                <LinearGradient
                  colors={currentMode === mode.key ? ['#D72638', '#8B1538'] : ['#1A1A1A', '#2A2A2A']}
                  className="rounded-2xl p-4 items-center border border-gntrek-red/20"
                >
                  <mode.icon 
                    size={28} 
                    color={currentMode === mode.key ? '#FFFFFF' : mode.color} 
                    strokeWidth={2.5} 
                  />
                  <Text className={`font-montserrat-semibold text-sm mt-2 ${
                    currentMode === mode.key ? 'text-gntrek-white' : 'text-gntrek-stone'
                  }`}>
                    {mode.label}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Carte Simulée */}
        <View className="px-6 mb-6">
          <View className="bg-gntrek-black/90 rounded-3xl p-6 border-2 border-gntrek-red/30 relative h-64">
            {/* Arrière-plan carte */}
            <LinearGradient
              colors={['#1A2F1A', '#2D4A22', '#1A2F1A']}
              className="absolute inset-0 rounded-3xl"
            />
            
            {/* Position actuelle */}
            <View className="absolute top-1/2 left-1/2 -mt-4 -ml-4">
              <View className="w-8 h-8 bg-gntrek-red rounded-full items-center justify-center border-2 border-gntrek-white">
                <View className="w-3 h-3 bg-gntrek-white rounded-full" />
              </View>
            </View>

            {/* Points d'intérêt simulés */}
            <View className="absolute top-12 right-12">
              <View className="w-6 h-6 bg-blue-500 rounded-full border border-gntrek-white" />
            </View>
            <View className="absolute bottom-16 left-8">
              <View className="w-6 h-6 bg-green-500 rounded-full border border-gntrek-white" />
            </View>
            <View className="absolute top-20 left-20">
              <View className="w-6 h-6 bg-orange-500 rounded-full border border-gntrek-white" />
            </View>

            {/* Boussole */}
            <View className="absolute top-4 left-4">
              <View className="bg-gntrek-black/80 p-3 rounded-xl border border-gntrek-red/30">
                <Compass size={24} color="#D72638" strokeWidth={2.5} />
              </View>
            </View>

            {/* Échelle */}
            <View className="absolute bottom-4 right-4">
              <View className="bg-gntrek-black/80 px-3 py-2 rounded-lg border border-gntrek-white/20">
                <Text className="text-gntrek-white font-montserrat text-xs">1 km</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Météo Actuelle */}
        <View className="px-6 mb-6">
          <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-4">
            Conditions Terrain
          </Text>
          <LinearGradient
            colors={['#1A1A1A', '#2A2A2A']}
            className="rounded-2xl p-6 border border-gntrek-red/20"
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Thermometer size={24} color="#FF8C42" strokeWidth={2.5} />
                <Text className="text-gntrek-white font-montserrat-semibold text-lg ml-3">
                  {currentWeather.temperature}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Wind size={24} color="#4A90E2" strokeWidth={2.5} />
                <Text className="text-gntrek-white font-montserrat-semibold text-lg ml-3">
                  {currentWeather.wind}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Eye size={24} color="#22c55e" strokeWidth={2.5} />
                <Text className="text-gntrek-white font-montserrat-semibold text-lg ml-3">
                  {currentWeather.visibility}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Points d'Intérêt */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-roboto-slab-bold text-gntrek-white">
              Points d'Intérêt
            </Text>
            <TouchableOpacity>
              <View className="bg-gntrek-red/20 p-3 rounded-xl border border-gntrek-red/30">
                <Plus size={20} color="#D72638" strokeWidth={2.5} />
              </View>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {pointsOfInterest.map((poi) => {
              const IconComponent = getTypeIcon(poi.type);
              return (
                <TouchableOpacity key={poi.id}>
                  <LinearGradient
                    colors={['#1A1A1A', '#2A2A2A']}
                    className="rounded-2xl p-5 border border-gntrek-red/20"
                  >
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-row items-center flex-1">
                        <View className="bg-gntrek-red/20 p-3 rounded-xl mr-4">
                          <IconComponent size={24} color="#D72638" strokeWidth={2.5} />
                        </View>
                        <View className="flex-1">
                          <Text className="text-gntrek-white font-roboto-slab-bold text-lg mb-1">
                            {poi.name}
                          </Text>
                          <View className="flex-row items-center">
                            <MapPin size={14} color="#6B7280" strokeWidth={2} />
                            <Text className="text-gntrek-stone font-montserrat ml-1">
                              {poi.distance} • {poi.elevation}
                            </Text>
                          </View>
                        </View>
                      </View>
                      
                      <View 
                        className="px-3 py-1 rounded-full border"
                        style={{ 
                          backgroundColor: `${getStatusColor(poi.status)}20`,
                          borderColor: `${getStatusColor(poi.status)}40`
                        }}
                      >
                        <Text 
                          className="font-montserrat-semibold text-xs"
                          style={{ color: getStatusColor(poi.status) }}
                        >
                          {poi.status === 'accessible' ? 'Accessible' :
                           poi.status === 'ouvert' ? 'Ouvert' :
                           poi.status === 'conditions_difficiles' ? 'Difficile' : 'Fermé'}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-row justify-between items-center">
                      <View className="bg-orange-500/20 px-3 py-1 rounded-full">
                        <Text className="text-orange-400 font-montserrat-semibold text-sm">
                          {poi.difficulty}
                        </Text>
                      </View>
                      
                      <View className="flex-row space-x-3">
                        <TouchableOpacity>
                          <View className="bg-gntrek-black/60 p-2 rounded-lg border border-gntrek-white/20">
                            <Bookmark size={16} color="#FFFFFF" strokeWidth={2} />
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Alert.alert('Navigation', `Navigation vers ${poi.name}`)}>
                          <View className="bg-gntrek-red/20 p-2 rounded-lg border border-gntrek-red/30">
                            <Navigation size={16} color="#D72638" strokeWidth={2.5} />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Actions Rapides */}
        <View className="px-6 mb-12">
          <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-4">
            Actions Rapides
          </Text>
          <View className="flex-row justify-between space-x-3">
            <TouchableOpacity className="flex-1">
              <LinearGradient
                colors={['#D72638', '#8B1538']}
                className="rounded-2xl p-4 items-center"
              >
                <Target size={28} color="white" strokeWidth={2.5} />
                <Text className="text-gntrek-white font-montserrat-bold text-sm mt-2">
                  SOS Urgence
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1">
              <View className="bg-gntrek-black/80 rounded-2xl p-4 items-center border border-gntrek-red/20">
                <Share2 size={28} color="#4A90E2" strokeWidth={2.5} />
                <Text className="text-gntrek-white font-montserrat-bold text-sm mt-2">
                  Partager Position
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-1">
              <View className="bg-gntrek-black/80 rounded-2xl p-4 items-center border border-gntrek-red/20">
                <Users size={28} color="#22c55e" strokeWidth={2.5} />
                <Text className="text-gntrek-white font-montserrat-bold text-sm mt-2">
                  Groupe
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}