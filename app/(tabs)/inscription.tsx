import React, { useState, useEffect, useRef } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, TextInput, Alert, 
  Dimensions, Animated, StatusBar, SafeAreaView, Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Mountain, Users, MapPin, Calendar, Clock, Thermometer, Star, 
  Shield, Award, ChevronRight, User, Mail, Phone, Heart, Target, 
  Compass, Check, Eye, TrendingUp, Activity, Wind, Sunrise,
  Camera, Route, Badge, Zap, TreePine, Navigation
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function InscriptionScreen() {
  const [selectedMission, setSelectedMission] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1); // 1: selection, 2: details, 3: inscription
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'debutant',
    medical_info: '',
    emergency_contact: '',
    equipment_level: 'basic'
  });

  // Animations sophistiquées
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const cardsSlide = useRef(new Animated.Value(30)).current;
  const formSlide = useRef(new Animated.Value(50)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation d'entrée premium
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(cardsSlide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation progress
    Animated.timing(progressAnim, {
      toValue: currentStep / 3,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  // Missions enrichies avec plus de détails
  const missions = [
    {
      id: 1,
      title: 'Conquest des Pics de Belledonne',
      subtitle: 'Expédition Alpine Premium',
      date: '23 Février 2025',
      time: '05:30',
      duration: '12h',
      difficulty: 'Expert',
      maxParticipants: 24,
      currentParticipants: 18,
      price: 149,
      originalPrice: 189,
      featured: true,
      image: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Belledonne, Isère',
      elevation: {
        start: '1,200m',
        peak: '2,847m',
        gain: '1,647m'
      },
      weather: {
        condition: 'Ensoleillé',
        temp: '-2°C',
        wind: '15km/h'
      },
      includes: [
        'Guide expert certifié UIAGM',
        'Équipement sécurité premium',
        'Petit-déjeuner & collations',
        'Photos professionnelles',
        'Certificat de conquête',
        'Assurance premium'
      ],
      requirements: [
        'Expérience alpinisme (niveau 3)',
        'Condition physique excellente',
        'Équipement personnel complet',
        'Certificat médical récent'
      ],
      highlights: [
        'Vue panoramique 360° sur les Alpes',
        'Technique mixte rocher/neige',
        'Groupe premium limité',
        'Photographe professionnel'
      ],
      stats: {
        rating: 4.9,
        completions: 847,
        satisfaction: 98
      }
    },
    {
      id: 2,
      title: 'Alpine Discovery Premium',
      subtitle: 'Initiation haute montagne',
      date: '8 Mars 2025',
      time: '07:00',
      duration: '8h',
      difficulty: 'Intermédiaire',
      maxParticipants: 16,
      currentParticipants: 12,
      price: 89,
      originalPrice: 109,
      featured: false,
      image: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Massif du Mont-Blanc',
      elevation: {
        start: '1,400m',
        peak: '2,200m',
        gain: '800m'
      },
      weather: {
        condition: 'Partiellement nuageux',
        temp: '5°C',
        wind: '10km/h'
      },
      includes: [
        'Guide qualifié certifié',
        'Matériel technique fourni',
        'Déjeuner montagnard',
        'Photos souvenir',
        'Manuel technique',
        'Badge réussite'
      ],
      requirements: [
        'Expérience randonnée régulière',
        'Bonne condition physique',
        'Chaussures de montagne',
        'Motivation à apprendre'
      ],
      highlights: [
        'Initiation techniques alpines',
        'Environnement sécurisé',
        'Petit groupe personnalisé',
        'Approche pédagogique'
      ],
      stats: {
        rating: 4.7,
        completions: 1240,
        satisfaction: 95
      }
    },
    {
      id: 3,
      title: 'Forest Exploration Premium',
      subtitle: 'Immersion nature authentique',
      date: '15 Mars 2025',
      time: '09:00',
      duration: '6h',
      difficulty: 'Débutant',
      maxParticipants: 20,
      currentParticipants: 8,
      price: 59,
      originalPrice: 75,
      featured: false,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      location: 'Forêt des Vosges',
      elevation: {
        start: '600m',
        peak: '1,100m',
        gain: '500m'
      },
      weather: {
        condition: 'Brouillard matinal',
        temp: '8°C',
        wind: '5km/h'
      },
      includes: [
        'Guide naturaliste expert',
        'Kit découverte nature',
        'Goûter forestier bio',
        'Carnet de bord premium',
        'Atelier photo nature',
        'Certificat explorateur'
      ],
      requirements: [
        'Curiosité naturelle',
        'Chaussures de marche',
        'Envie de découvrir',
        'Respect de l\'environnement'
      ],
      highlights: [
        'Faune et flore locales',
        'Techniques de survie douce',
        'Photographie nature',
        'Approche éco-responsable'
      ],
      stats: {
        rating: 4.8,
        completions: 890,
        satisfaction: 97
      }
    },
  ];

  const experienceLevels = [
    { key: 'debutant', label: 'Débutant', description: 'Première expérience montagne' },
    { key: 'intermediaire', label: 'Intermédiaire', description: '2-5 ans d\'expérience' },
    { key: 'avance', label: 'Avancé', description: '5+ ans, techniques maîtrisées' },
    { key: 'expert', label: 'Expert', description: 'Guide ou niveau équivalent' }
  ];

  const equipmentLevels = [
    { key: 'basic', label: 'Équipement de base', description: 'Chaussures + vêtements' },
    { key: 'complete', label: 'Équipement complet', description: 'Matériel technique inclus' },
    { key: 'expert', label: 'Équipement expert', description: 'Matériel personnel premium' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Expert': return '#D72638';
      case 'Intermédiaire': return '#FF8C42';
      case 'Débutant': return '#22c55e';
      default: return '#6B7280';
    }
  };

  const handleMissionSelect = (mission: any) => {
    setSelectedMission(mission);
    setCurrentStep(2);
    Animated.timing(formSlide, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const handleInscription = () => {
    if (!selectedMission) {
      Alert.alert('Erreur', 'Veuillez sélectionner une mission');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    setCurrentStep(3);
    Alert.alert(
      'Inscription Confirmée! 🎉', 
      `Félicitations ! Votre inscription pour "${selectedMission?.title}" a été confirmée.\n\nVous recevrez un email de confirmation avec tous les détails.`,
      [{ text: 'Parfait !', style: 'default' }]
    );
  };

  const renderMissionCard = (mission: any) => (
    <TouchableOpacity 
      key={mission.id}
      onPress={() => handleMissionSelect(mission)}
      className="mb-6"
      activeOpacity={0.95}
    >
      <View className="relative overflow-hidden rounded-3xl">
        {/* Image de fond */}
        <Image
          source={{ uri: mission.image }}
          className="absolute inset-0 w-full h-80"
          style={{ resizeMode: 'cover' }}
        />
        
        {/* Overlay gradient */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
          locations={[0, 0.3, 0.7, 1]}
          className="absolute inset-0"
        />

        {/* Badge featured */}
        {mission.featured && (
          <View className="absolute top-4 left-4">
            <LinearGradient
              colors={['#D72638', '#8B1538']}
              className="px-3 py-1 rounded-full flex-row items-center"
            >
              <Star size={12} color="white" strokeWidth={2} fill="white" />
              <Text className="text-gntrek-white font-montserrat-bold text-xs ml-1">
                PREMIUM
              </Text>
            </LinearGradient>
          </View>
        )}

        {/* Stats en haut à droite */}
        <View className="absolute top-4 right-4 items-end space-y-2">
          <View className="bg-gntrek-black/80 px-3 py-1 rounded-full flex-row items-center">
            <Star size={12} color="#FFD700" strokeWidth={2} fill="#FFD700" />
            <Text className="text-gntrek-white font-montserrat-semibold text-xs ml-1">
              {mission.stats.rating}
            </Text>
          </View>
          <View className="bg-gntrek-black/80 px-3 py-1 rounded-full flex-row items-center">
            <Users size={12} color="#22c55e" strokeWidth={2} />
            <Text className="text-gntrek-white font-montserrat-semibold text-xs ml-1">
              {mission.currentParticipants}/{mission.maxParticipants}
            </Text>
          </View>
        </View>

        {/* Contenu principal */}
        <View className="relative p-6 h-80 justify-end">
          <View className="mb-4">
            <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-1">
              {mission.title}
            </Text>
            <Text className="text-gntrek-red font-montserrat-semibold text-lg mb-3">
              {mission.subtitle}
            </Text>
            
            <View className="flex-row items-center mb-3">
              <MapPin size={16} color="#4A90E2" strokeWidth={2} />
              <Text className="text-gntrek-white/90 font-montserrat text-sm ml-2">
                {mission.location}
              </Text>
            </View>

            {/* Métadonnées en grille */}
            <View className="flex-row justify-between mb-4">
              <View className="flex-row items-center">
                <Calendar size={14} color="#22c55e" strokeWidth={2} />
                <Text className="text-gntrek-white/80 font-montserrat text-sm ml-2">
                  {mission.date.split(' ').slice(0, 2).join(' ')}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Clock size={14} color="#FF8C42" strokeWidth={2} />
                <Text className="text-gntrek-white/80 font-montserrat text-sm ml-2">
                  {mission.duration}
                </Text>
              </View>
              <View className="flex-row items-center">
                <Mountain size={14} color="#D72638" strokeWidth={2} />
                <Text className="text-gntrek-white/80 font-montserrat text-sm ml-2">
                  {mission.elevation.peak}
                </Text>
              </View>
            </View>

            {/* Prix et difficulté */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Text className="text-gntrek-white font-roboto-slab-bold text-2xl">
                  {mission.price}€
                </Text>
                {mission.originalPrice > mission.price && (
                  <Text className="text-gntrek-white/50 font-montserrat line-through text-lg ml-2">
                    {mission.originalPrice}€
                  </Text>
                )}
              </View>
              <View 
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: `${getDifficultyColor(mission.difficulty)}20` }}
              >
                <Text 
                  className="font-montserrat-bold text-sm"
                  style={{ color: getDifficultyColor(mission.difficulty) }}
                >
                  {mission.difficulty}
                </Text>
              </View>
            </View>
          </View>

          {/* Bouton d'action */}
          <LinearGradient
            colors={['#D72638', '#8B1538']}
            className="py-3 rounded-2xl flex-row items-center justify-center"
          >
            <Target size={18} color="white" strokeWidth={2.5} />
            <Text className="text-gntrek-white font-montserrat-bold text-base ml-2">
              DÉCOUVRIR & S'INSCRIRE
            </Text>
            <ChevronRight size={18} color="white" strokeWidth={2.5} />
          </LinearGradient>

          {/* Progress bar inscriptions */}
          <View className="mt-3">
            <View className="h-1 bg-gntrek-black/50 rounded-full overflow-hidden">
              <View 
                className="h-full rounded-full"
                style={{ 
                  width: `${(mission.currentParticipants / mission.maxParticipants) * 100}%`,
                  backgroundColor: getDifficultyColor(mission.difficulty)
                }}
              />
            </View>
            <Text className="text-gntrek-white/60 font-montserrat text-xs mt-1">
              {Math.round((mission.currentParticipants / mission.maxParticipants) * 100)}% des places réservées
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMissionDetails = () => (
    <Animated.View 
      className="px-6 mb-8"
      style={{ transform: [{ translateY: formSlide }] }}
    >
      <TouchableOpacity 
        onPress={() => setCurrentStep(1)}
        className="flex-row items-center mb-6"
      >
        <ChevronRight size={20} color="#D72638" strokeWidth={2.5} style={{ transform: [{ rotate: '180deg' }] }} />
        <Text className="text-gntrek-red font-montserrat-semibold text-base ml-2">
          Retour aux missions
        </Text>
      </TouchableOpacity>

      <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-6">
        Détails de la Mission
      </Text>

      {/* Carte mission sélectionnée */}
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        className="rounded-3xl p-6 border border-gntrek-red/30 mb-6"
      >
        <View className="flex-row items-start mb-4">
          <Image
            source={{ uri: selectedMission.image }}
            className="w-20 h-20 rounded-2xl mr-4"
          />
          <View className="flex-1">
            <Text className="text-gntrek-white font-roboto-slab-bold text-xl mb-1">
              {selectedMission.title}
            </Text>
            <Text className="text-gntrek-red font-montserrat-semibold text-base mb-2">
              {selectedMission.subtitle}
            </Text>
            <View className="flex-row items-center">
              <Calendar size={14} color="#4A90E2" strokeWidth={2} />
              <Text className="text-gntrek-white/80 font-montserrat text-sm ml-2">
                {selectedMission.date} à {selectedMission.time}
              </Text>
            </View>
          </View>
          <Text className="text-gntrek-white font-roboto-slab-bold text-2xl">
            {selectedMission.price}€
          </Text>
        </View>

        {/* Highlights */}
        <View className="mb-4">
          <Text className="text-gntrek-white font-montserrat-semibold text-base mb-3">
            🌟 Points forts de l'expédition
          </Text>
          {selectedMission.highlights.map((highlight, index) => (
            <View key={index} className="flex-row items-center mb-2">
              <View className="w-2 h-2 bg-gntrek-red rounded-full mr-3" />
              <Text className="text-gntrek-white/80 font-montserrat text-sm flex-1">
                {highlight}
              </Text>
            </View>
          ))}
        </View>

        {/* Inclus */}
        <View className="mb-4">
          <Text className="text-gntrek-white font-montserrat-semibold text-base mb-3">
            ✅ Inclus dans l'expédition
          </Text>
          <View className="flex-row flex-wrap">
            {selectedMission.includes.map((item, index) => (
              <View key={index} className="bg-green-500/20 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-green-400 font-montserrat text-sm">
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Prérequis */}
        <View>
          <Text className="text-gntrek-white font-montserrat-semibold text-base mb-3">
            📋 Prérequis nécessaires
          </Text>
          <View className="flex-row flex-wrap">
            {selectedMission.requirements.map((req, index) => (
              <View key={index} className="bg-orange-500/20 px-3 py-1 rounded-full mr-2 mb-2">
                <Text className="text-orange-400 font-montserrat text-sm">
                  {req}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* Formulaire d'inscription premium */}
      <LinearGradient
        colors={['#1A1A1A', '#2A2A2A']}
        className="rounded-3xl p-6 border border-gntrek-red/30"
      >
        <Text className="text-xl font-roboto-slab-bold text-gntrek-white mb-6">
          Formulaire d'Inscription
        </Text>

        {/* Informations personnelles */}
        <View className="space-y-4">
          <View>
            <Text className="text-gntrek-white font-montserrat-semibold text-sm mb-2">
              Nom complet *
            </Text>
            <TextInput
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              className="bg-gntrek-black/60 text-gntrek-white p-4 rounded-2xl border border-gntrek-red/30 font-montserrat"
              placeholder="Votre nom et prénom"
              placeholderTextColor="#6B7280"
            />
          </View>

          <View>
            <Text className="text-gntrek-white font-montserrat-semibold text-sm mb-2">
              Email *
            </Text>
            <TextInput
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              className="bg-gntrek-black/60 text-gntrek-white p-4 rounded-2xl border border-gntrek-red/30 font-montserrat"
              placeholder="votre@email.com"
              placeholderTextColor="#6B7280"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gntrek-white font-montserrat-semibold text-sm mb-2">
              Téléphone *
            </Text>
            <TextInput
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              className="bg-gntrek-black/60 text-gntrek-white p-4 rounded-2xl border border-gntrek-red/30 font-montserrat"
              placeholder="+33 6 XX XX XX XX"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
            />
          </View>

          {/* Niveau d'expérience */}
          <View>
            <Text className="text-gntrek-white font-montserrat-semibold text-sm mb-3">
              Niveau d'expérience
            </Text>
            <View className="space-y-2">
              {experienceLevels.map((level) => (
                <TouchableOpacity
                  key={level.key}
                  onPress={() => setFormData({...formData, experience: level.key})}
                  className={`p-4 rounded-2xl border ${
                    formData.experience === level.key 
                      ? 'bg-gntrek-red border-gntrek-red' 
                      : 'bg-gntrek-black/40 border-gntrek-red/30'
                  }`}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className={`font-montserrat-semibold text-base ${
                        formData.experience === level.key ? 'text-gntrek-white' : 'text-gntrek-white/80'
                      }`}>
                        {level.label}
                      </Text>
                      <Text className={`font-montserrat text-sm ${
                        formData.experience === level.key ? 'text-gntrek-white/80' : 'text-gntrek-white/60'
                      }`}>
                        {level.description}
                      </Text>
                    </View>
                    {formData.experience === level.key && (
                      <Check size={20} color="white" strokeWidth={2.5} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Contact d'urgence */}
          <View>
            <Text className="text-gntrek-white font-montserrat-semibold text-sm mb-2">
              Contact d'urgence
            </Text>
            <TextInput
              value={formData.emergency_contact}
              onChangeText={(text) => setFormData({...formData, emergency_contact: text})}
              className="bg-gntrek-black/60 text-gntrek-white p-4 rounded-2xl border border-gntrek-red/30 font-montserrat"
              placeholder="Nom et téléphone de votre contact d'urgence"
              placeholderTextColor="#6B7280"
            />
          </View>

          {/* Informations médicales */}
          <View>
            <Text className="text-gntrek-white font-montserrat-semibold text-sm mb-2">
              Informations médicales importantes
            </Text>
            <TextInput
              value={formData.medical_info}
              onChangeText={(text) => setFormData({...formData, medical_info: text})}
              className="bg-gntrek-black/60 text-gntrek-white p-4 rounded-2xl border border-gntrek-red/30 font-montserrat h-24"
              placeholder="Allergies, traitements, problèmes de santé à signaler..."
              placeholderTextColor="#6B7280"
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Bouton inscription */}
        <TouchableOpacity 
          onPress={handleInscription}
          className="mt-8"
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={['#D72638', '#8B1538']}
            className="py-4 rounded-2xl flex-row items-center justify-center"
          >
            <Shield size={20} color="white" strokeWidth={2.5} />
            <Text className="text-gntrek-white font-montserrat-bold text-lg ml-3">
              CONFIRMER MON INSCRIPTION
            </Text>
            <ChevronRight size={20} color="white" strokeWidth={2.5} />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gntrek-black">
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Header Ultra-Premium */}
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
              <View className="w-1 h-16 bg-gradient-to-b from-gntrek-red to-transparent rounded-full mr-4" />
              <View className="flex-1">
                <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-1">
                  Missions Elite
                </Text>
                <Text className="text-gntrek-white/70 font-montserrat text-base">
                  Choisissez votre prochaine conquête
                </Text>
              </View>
            </View>
            <View className="bg-gntrek-red/20 p-3 rounded-2xl">
              <Target size={28} color="#D72638" strokeWidth={2.5} />
            </View>
          </View>

          {/* Progress indicator */}
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gntrek-white/60 font-montserrat text-sm">
                Étape {currentStep}/3
              </Text>
              <Text className="text-gntrek-white/60 font-montserrat text-sm">
                {currentStep === 1 ? 'Sélection' : currentStep === 2 ? 'Inscription' : 'Confirmation'}
              </Text>
            </View>
            <View className="h-1 bg-gntrek-black/60 rounded-full overflow-hidden">
              <Animated.View 
                className="h-full bg-gntrek-red rounded-full"
                style={{
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }}
              />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {currentStep === 1 && (
          <Animated.View 
            className="px-6 mb-8"
            style={{ transform: [{ translateY: cardsSlide }] }}
          >
            <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-6">
              Expéditions Disponibles
            </Text>
            
            {missions.map(renderMissionCard)}
          </Animated.View>
        )}

        {currentStep === 2 && selectedMission && renderMissionDetails()}

        {currentStep === 3 && (
          <Animated.View 
            className="px-6 mb-8 items-center"
            style={{ transform: [{ translateY: formSlide }] }}
          >
            <View className="w-24 h-24 bg-green-500/20 rounded-full items-center justify-center mb-6">
              <Check size={48} color="#22c55e" strokeWidth={3} />
            </View>
            <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-4 text-center">
              Inscription Confirmée !
            </Text>
            <Text className="text-gntrek-white/80 font-montserrat text-center text-base mb-8">
              Félicitations ! Vous êtes maintenant inscrit(e) à l'expédition "{selectedMission?.title}".
            </Text>
            
            <TouchableOpacity 
              onPress={() => { setCurrentStep(1); setSelectedMission(null); }}
              className="w-full"
            >
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                className="py-4 rounded-2xl flex-row items-center justify-center"
              >
                <Target size={20} color="white" strokeWidth={2.5} />
                <Text className="text-white font-montserrat-bold text-lg ml-3">
                  EXPLORER D'AUTRES MISSIONS
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}