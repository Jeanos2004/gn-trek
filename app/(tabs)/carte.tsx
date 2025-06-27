import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, Dimensions, 
  StatusBar, Alert, Animated, SafeAreaView 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  MapPin, Navigation, Compass, Mountain, Target, Zap, 
  Wifi, Battery, Signal, Settings, Plus, Share2, Bookmark,
  Wind, Thermometer, Eye, Clock, Users, Award, Search,
  Layers, Route, ScanLine, AlertTriangle, Shield, Radio,
  Satellite, Map as MapIcon, Crosshair, Activity
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function CarteScreen() {
  const [currentMode, setCurrentMode] = useState('exploration');
  const [gpsStatus, setGpsStatus] = useState('connected');
  const [mapStyle, setMapStyle] = useState('terrain'); // terrain, satellite, hybrid
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 44.1736,
    lng: 5.2786,
    accuracy: 3,
    altitude: 1650,
    speed: 0
  });

  // Animations raffinées
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const compassRotate = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const trackingPulse = useRef(new Animated.Value(1)).current;
  const scanAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation d'entrée
    Animated.timing(headerOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animation boussole continue
    Animated.loop(
      Animated.timing(compassRotate, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();

    // Pulse position
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animation scan si tracking
    if (isTracking) {
      Animated.loop(
        Animated.timing(scanAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isTracking]);

  // Points d'intérêt enrichis
  const pointsOfInterest = [
    {
      id: 1,
      name: 'Sommet Mont Ventoux',
      type: 'sommet',
      distance: '2.3 km',
      bearing: '045°',
      elevation: '1,912m',
      difficulty: 'Expert',
      status: 'accessible',
      coords: { lat: 44.1736, lng: 5.2786 },
      description: 'Point culminant mythique de Provence',
      weather: 'Ensoleillé, -2°C',
      services: ['Point de vue', 'Station météo'],
      estimated_time: '45min'
    },
    {
      id: 2,
      name: 'Refuge des Alpages',
      type: 'refuge',
      distance: '0.8 km',
      bearing: '135°',
      elevation: '1,456m',
      difficulty: 'Intermédiaire',
      status: 'ouvert',
      coords: { lat: 44.1650, lng: 5.2650 },
      description: 'Refuge gardé avec restauration',
      weather: 'Couvert, 5°C',
      services: ['Hébergement', 'Restauration', 'Wi-Fi'],
      estimated_time: '20min'
    },
    {
      id: 3,
      name: 'Source Cristalline',
      type: 'eau',
      distance: '1.2 km',
      bearing: '270°',
      elevation: '1,280m',
      difficulty: 'Facile',
      status: 'accessible',
      coords: { lat: 44.1580, lng: 5.2580 },
      description: 'Source d\'eau pure potable',
      weather: 'Ensoleillé, 8°C',
      services: ['Eau potable', 'Aire de repos'],
      estimated_time: '25min'
    },
    {
      id: 4,
      name: 'Point de Vue Panoramique',
      type: 'panorama',
      distance: '3.1 km',
      bearing: '315°',
      elevation: '1,750m',
      difficulty: 'Expert',
      status: 'conditions_difficiles',
      coords: { lat: 44.1820, lng: 5.2920 },
      description: 'Vue 360° sur les Alpes',
      weather: 'Vent fort, 0°C',
      services: ['Table orientation', 'Abri vent'],
      estimated_time: '1h15'
    },
    {
      id: 5,
      name: 'Camp de Base Alpha',
      type: 'camp',
      distance: '1.8 km',
      bearing: '090°',
      elevation: '1,650m',
      difficulty: 'Intermédiaire',
      status: 'accessible',
      coords: { lat: 44.1700, lng: 5.2850 },
      description: 'Zone de bivouac autorisée',
      weather: 'Partiellement nuageux, 3°C',
      services: ['Bivouac', 'Point d\'eau', 'Sanitaires'],
      estimated_time: '35min'
    }
  ];

  const currentWeather = {
    temperature: '12°C',
    feels_like: '8°C',
    wind: '15 km/h SO',
    gusts: '28 km/h',
    visibility: '8 km',
    humidity: '65%',
    pressure: '1015 hPa',
    condition: 'Partiellement nuageux',
    uv_index: 3,
    sunrise: '07:24',
    sunset: '18:42'
  };

  const navigationModes = [
    { 
      key: 'exploration', 
      label: 'Exploration', 
      icon: Compass, 
      color: '#4A90E2',
      description: 'Navigation libre'
    },
    { 
      key: 'mission', 
      label: 'Mission', 
      icon: Target, 
      color: '#D72638',
      description: 'Suivi d\'itinéraire'
    },
    { 
      key: 'urgence', 
      label: 'Urgence', 
      icon: Zap, 
      color: '#FF8C42',
      description: 'Mode sécurité'
    },
  ];

  const mapStyles = [
    { key: 'terrain', label: 'Terrain', icon: Mountain, color: '#22c55e' },
    { key: 'satellite', label: 'Satellite', icon: Satellite, color: '#4A90E2' },
    { key: 'hybrid', label: 'Hybride', icon: Layers, color: '#FF8C42' },
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
      case 'sommet': return Mountain;
      case 'refuge': return Award;
      case 'eau': return Target;
      case 'panorama': return Eye;
      case 'camp': return Users;
      default: return MapPin;
    }
  };

  const compassRotation = compassRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleEmergency = () => {
    Alert.alert(
      'Mode Urgence Activé',
      'Votre position a été partagée avec les services de secours. Restez calme et attendez les instructions.',
      [{ text: 'Compris', style: 'default' }]
    );
  };

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    if (!isTracking) {
      Animated.loop(
        Animated.timing(trackingPulse, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gntrek-black">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header GPS Ultra-Premium */}
      <Animated.View 
        style={{ opacity: headerOpacity }}
        className="relative"
      >
        <LinearGradient
          colors={['#1A2F1A', 'rgba(215, 38, 56, 0.15)', 'rgba(0, 0, 0, 0.9)']}
          className="pt-12 pb-6 px-6"
        >
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center flex-1">
              <View className="w-1 h-16 bg-gradient-to-b from-green-500 to-gntrek-red rounded-full mr-4" />
              <View className="flex-1">
                <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-1">
                  GPS GNTREK
                </Text>
                <Text className="text-gntrek-white/70 font-montserrat text-base">
                  Navigation terrain professionnel
                </Text>
              </View>
            </View>
            <Animated.View 
              className="bg-green-500/20 p-3 rounded-2xl"
              style={{ transform: [{ rotate: compassRotation }] }}
            >
              <Compass size={28} color="#22c55e" strokeWidth={2.5} />
            </Animated.View>
          </View>

          {/* Status GPS avancé */}
          <View className="bg-gntrek-black/60 rounded-2xl p-4 border border-green-500/30">
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <Text className="text-gntrek-white font-montserrat-semibold">GPS CONNECTÉ</Text>
              </View>
              <View className="flex-row items-center space-x-3">
                <View className="flex-row items-center">
                  <Signal size={16} color="#4A90E2" strokeWidth={2} />
                  <Text className="text-gntrek-white font-montserrat text-sm ml-1">4G</Text>
                </View>
                <View className="flex-row items-center">
                  <Satellite size={16} color="#22c55e" strokeWidth={2} />
                  <Text className="text-gntrek-white font-montserrat text-sm ml-1">12 SAT</Text>
                </View>
                <View className="flex-row items-center">
                  <Battery size={16} color="#22c55e" strokeWidth={2} />
                  <Text className="text-gntrek-white font-montserrat text-sm ml-1">87%</Text>
                </View>
              </View>
            </View>
            
            {/* Coordonnées et précision */}
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-gntrek-white/60 font-montserrat text-xs">Position actuelle</Text>
                <Text className="text-gntrek-white font-montserrat-semibold text-sm">
                  {currentLocation.lat.toFixed(4)}°N, {currentLocation.lng.toFixed(4)}°E
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-gntrek-white/60 font-montserrat text-xs">Précision</Text>
                <Text className="text-green-400 font-montserrat-semibold text-sm">±{currentLocation.accuracy}m</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Modes de Navigation Premium */}
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
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={currentMode === mode.key 
                    ? ['#D72638', '#8B1538'] 
                    : ['#1A1A1A', '#2A2A2A']
                  }
                  className="rounded-2xl p-4 items-center border border-gntrek-red/20"
                >
                  <mode.icon 
                    size={24} 
                    color={currentMode === mode.key ? '#FFFFFF' : mode.color} 
                    strokeWidth={2.5} 
                  />
                  <Text className={`font-montserrat-semibold text-sm mt-2 text-center ${
                    currentMode === mode.key ? 'text-gntrek-white' : 'text-gntrek-white/70'
                  }`}>
                    {mode.label}
                  </Text>
                  <Text className={`font-montserrat text-xs mt-1 text-center ${
                    currentMode === mode.key ? 'text-gntrek-white/80' : 'text-gntrek-white/50'
                  }`}>
                    {mode.description}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Carte Interactive Simulée Premium */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-roboto-slab-bold text-gntrek-white">
              Carte Interactive
            </Text>
            <View className="flex-row items-center space-x-2">
              {mapStyles.map((style) => (
                <TouchableOpacity 
                  key={style.key}
                  onPress={() => setMapStyle(style.key)}
                  className={`p-2 rounded-xl ${
                    mapStyle === style.key ? 'bg-gntrek-red' : 'bg-gntrek-black/60 border border-gntrek-red/30'
                  }`}
                >
                  <style.icon 
                    size={16} 
                    color={mapStyle === style.key ? 'white' : style.color} 
                    strokeWidth={2} 
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="relative rounded-3xl overflow-hidden h-80 border-2 border-gntrek-red/30">
            {/* Background carte selon le style */}
            <LinearGradient
              colors={mapStyle === 'terrain' 
                ? ['#1A2F1A', '#2D4A22', '#1A2F1A']
                : mapStyle === 'satellite'
                ? ['#0F1419', '#1A2332', '#0F1419'] 
                : ['#1A2F1A', '#1A2332', '#2D4A22']
              }
              className="absolute inset-0"
            />
            
            {/* Grille de carte */}
            <View className="absolute inset-0">
              {Array.from({ length: 8 }).map((_, i) => (
                <View key={i} className="flex-1 border-b border-gntrek-white/10" />
              ))}
            </View>

            {/* Position actuelle avec animation */}
            <Animated.View 
              className="absolute top-1/2 left-1/2 -mt-6 -ml-6"
              style={{ transform: [{ scale: pulseAnim }] }}
            >
              <View className="relative">
                <View className="w-12 h-12 bg-gntrek-red/30 rounded-full items-center justify-center">
                  <View className="w-6 h-6 bg-gntrek-red rounded-full items-center justify-center border-2 border-gntrek-white">
                    <View className="w-2 h-2 bg-gntrek-white rounded-full" />
                  </View>
                </View>
                {/* Cercle de précision */}
                <View className="absolute -inset-4 border border-gntrek-red/20 rounded-full" />
              </View>
            </Animated.View>

            {/* Points d'intérêt sur la carte */}
            {pointsOfInterest.slice(0, 4).map((poi, index) => {
              const positions = [
                { top: '20%', right: '25%' },
                { bottom: '30%', left: '20%' },
                { top: '35%', left: '15%' },
                { bottom: '20%', right: '30%' }
              ];
              
              const IconComponent = getTypeIcon(poi.type);
              
              return (
                <TouchableOpacity 
                  key={poi.id}
                  className="absolute w-8 h-8 rounded-full items-center justify-center border-2 border-gntrek-white"
                  style={{
                    ...positions[index],
                    backgroundColor: `${getStatusColor(poi.status)}90`
                  }}
                >
                  <IconComponent 
                    size={16} 
                    color="white" 
                    strokeWidth={2.5} 
                  />
                </TouchableOpacity>
              );
            })}

            {/* Boussole dans la carte */}
            <View className="absolute top-4 right-4">
              <Animated.View 
                className="w-12 h-12 bg-gntrek-black/80 rounded-full items-center justify-center border border-gntrek-white/30"
                style={{ transform: [{ rotate: compassRotation }] }}
              >
                <Compass size={20} color="#22c55e" strokeWidth={2.5} />
              </Animated.View>
            </View>

            {/* Contrôles carte */}
            <View className="absolute bottom-4 right-4 space-y-2">
              <TouchableOpacity className="w-10 h-10 bg-gntrek-black/80 rounded-xl items-center justify-center border border-gntrek-white/30">
                <Plus size={18} color="white" strokeWidth={2.5} />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-gntrek-black/80 rounded-xl items-center justify-center border border-gntrek-white/30">
                <Text className="text-gntrek-white font-montserrat-bold">-</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={toggleTracking}
                className={`w-10 h-10 rounded-xl items-center justify-center border ${
                  isTracking ? 'bg-gntrek-red border-gntrek-red' : 'bg-gntrek-black/80 border-gntrek-white/30'
                }`}
              >
                <Crosshair size={18} color="white" strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            {/* Échelle */}
            <View className="absolute bottom-4 left-4">
              <View className="bg-gntrek-black/80 px-3 py-1 rounded-lg border border-gntrek-white/30">
                <Text className="text-gntrek-white font-montserrat text-xs">500m</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Météo Avancée */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-roboto-slab-bold text-gntrek-white mb-4">
            Conditions Météorologiques
          </Text>
          
          <LinearGradient
            colors={['#1A1A1A', '#2A2A2A']}
            className="rounded-2xl p-6 border border-gntrek-red/20"
          >
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Thermometer size={24} color="#FF8C42" strokeWidth={2.5} />
                <View className="ml-3">
                  <Text className="text-gntrek-white font-roboto-slab-bold text-2xl">
                    {currentWeather.temperature}
                  </Text>
                  <Text className="text-gntrek-white/60 font-montserrat text-sm">
                    Ressenti {currentWeather.feels_like}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-gntrek-white font-montserrat-semibold text-lg">
                  {currentWeather.condition}
                </Text>
                <Text className="text-gntrek-white/60 font-montserrat text-sm">
                  UV Index: {currentWeather.uv_index}
                </Text>
              </View>
            </View>

            <View className="grid grid-cols-2 gap-4">
              <View className="bg-gntrek-black/50 rounded-xl p-3">
                <View className="flex-row items-center mb-1">
                  <Wind size={16} color="#4A90E2" strokeWidth={2} />
                  <Text className="text-gntrek-white/60 font-montserrat text-sm ml-2">Vent</Text>
                </View>
                <Text className="text-gntrek-white font-montserrat-semibold">
                  {currentWeather.wind}
                </Text>
                <Text className="text-gntrek-white/60 font-montserrat text-xs">
                  Rafales: {currentWeather.gusts}
                </Text>
              </View>

              <View className="bg-gntrek-black/50 rounded-xl p-3">
                <View className="flex-row items-center mb-1">
                  <Eye size={16} color="#22c55e" strokeWidth={2} />
                  <Text className="text-gntrek-white/60 font-montserrat text-sm ml-2">Visibilité</Text>
                </View>
                <Text className="text-gntrek-white font-montserrat-semibold">
                  {currentWeather.visibility}
                </Text>
                <Text className="text-gntrek-white/60 font-montserrat text-xs">
                  Humidité: {currentWeather.humidity}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between mt-4 pt-4 border-t border-gntrek-white/10">
              <Text className="text-gntrek-white/60 font-montserrat text-sm">
                🌅 {currentWeather.sunrise}
              </Text>
              <Text className="text-gntrek-white/60 font-montserrat text-sm">
                🌅 {currentWeather.sunset}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Points d'Intérêt Premium */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-roboto-slab-bold text-gntrek-white">
              Points d'Intérêt Proximité
            </Text>
            <TouchableOpacity className="bg-gntrek-red/20 p-2 rounded-xl border border-gntrek-red/40">
              <Search size={18} color="#D72638" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
          
          {pointsOfInterest.map((poi) => {
            const IconComponent = getTypeIcon(poi.type);
            const statusColor = getStatusColor(poi.status);
            
            return (
              <TouchableOpacity key={poi.id} className="mb-4" activeOpacity={0.9}>
                <LinearGradient
                  colors={['#1A1A1A', '#2A2A2A']}
                  className="rounded-2xl p-5 border border-gntrek-red/20"
                >
                  <View className="flex-row items-start">
                    <View 
                      className="p-3 rounded-2xl mr-4"
                      style={{ backgroundColor: `${statusColor}20` }}
                    >
                      <IconComponent size={24} color={statusColor} strokeWidth={2.5} />
                    </View>
                    
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-gntrek-white font-roboto-slab-bold text-lg">
                          {poi.name}
                        </Text>
                        <View className="flex-row items-center">
                          <MapPin size={14} color="#D72638" strokeWidth={2} />
                          <Text className="text-gntrek-white font-montserrat-semibold text-sm ml-1">
                            {poi.distance}
                          </Text>
                        </View>
                      </View>
                      
                      <Text className="text-gntrek-white/70 font-montserrat text-sm mb-3">
                        {poi.description}
                      </Text>
                      
                      <View className="flex-row justify-between items-center mb-3">
                        <View className="flex-row items-center space-x-4">
                          <View className="flex-row items-center">
                            <Mountain size={14} color="#22c55e" strokeWidth={2} />
                            <Text className="text-gntrek-white/80 font-montserrat text-sm ml-1">
                              {poi.elevation}
                            </Text>
                          </View>
                          <View className="flex-row items-center">
                            <Compass size={14} color="#4A90E2" strokeWidth={2} />
                            <Text className="text-gntrek-white/80 font-montserrat text-sm ml-1">
                              {poi.bearing}
                            </Text>
                          </View>
                          <View className="flex-row items-center">
                            <Clock size={14} color="#FF8C42" strokeWidth={2} />
                            <Text className="text-gntrek-white/80 font-montserrat text-sm ml-1">
                              {poi.estimated_time}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center space-x-2">
                          <View 
                            className="px-2 py-1 rounded-full"
                            style={{ backgroundColor: `${statusColor}20` }}
                          >
                            <Text 
                              className="font-montserrat-semibold text-xs"
                              style={{ color: statusColor }}
                            >
                              {poi.status.replace('_', ' ')}
                            </Text>
                          </View>
                          <View className="bg-gntrek-red/20 px-2 py-1 rounded-full">
                            <Text className="text-gntrek-red font-montserrat-semibold text-xs">
                              {poi.difficulty}
                            </Text>
                          </View>
                        </View>
                        
                        <View className="flex-row items-center space-x-2">
                          <TouchableOpacity className="bg-gntrek-black/60 p-2 rounded-xl">
                            <Route size={16} color="#4A90E2" strokeWidth={2} />
                          </TouchableOpacity>
                          <TouchableOpacity className="bg-gntrek-black/60 p-2 rounded-xl">
                            <Bookmark size={16} color="#FF8C42" strokeWidth={2} />
                          </TouchableOpacity>
                        </View>
                      </View>

                      {poi.services.length > 0 && (
                        <View className="flex-row flex-wrap mt-3 pt-3 border-t border-gntrek-white/10">
                          {poi.services.map((service, index) => (
                            <View key={index} className="bg-gntrek-black/50 px-2 py-1 rounded-full mr-2 mb-1">
                              <Text className="text-gntrek-white/60 font-montserrat text-xs">
                                {service}
                              </Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Actions d'Urgence */}
        <View className="px-6 mb-12">
          <Text className="text-xl font-roboto-slab-bold text-gntrek-white mb-4">
            Sécurité & Urgence
          </Text>
          
          <View className="space-y-3">
            <TouchableOpacity 
              onPress={handleEmergency}
              className="bg-red-600 rounded-2xl p-4 border border-red-500"
            >
              <View className="flex-row items-center">
                <AlertTriangle size={24} color="white" strokeWidth={2.5} />
                <View className="ml-4 flex-1">
                  <Text className="text-white font-roboto-slab-bold text-lg">
                    Urgence Montagne
                  </Text>
                  <Text className="text-white/80 font-montserrat text-sm">
                    Alerte automatique aux secours
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View className="flex-row space-x-3">
              <TouchableOpacity className="flex-1 bg-gntrek-red/20 rounded-2xl p-4 border border-gntrek-red/40">
                <View className="items-center">
                  <Shield size={24} color="#D72638" strokeWidth={2.5} />
                  <Text className="text-gntrek-white font-montserrat-semibold text-sm mt-2">
                    Partager Position
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity className="flex-1 bg-gntrek-red/20 rounded-2xl p-4 border border-gntrek-red/40">
                <View className="items-center">
                  <Radio size={24} color="#D72638" strokeWidth={2.5} />
                  <Text className="text-gntrek-white font-montserrat-semibold text-sm mt-2">
                    Signal Détresse
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}