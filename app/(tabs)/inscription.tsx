import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Dimensions, Animated, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Mountain, Users, MapPin, Calendar, Clock, Thermometer, Star, Shield, Award, ChevronRight, User, Mail, Phone, Heart, Target, Compass, Check } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default function InscriptionScreen() {
  const [selectedMission, setSelectedMission] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: 'debutant',
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const missions = [
    {
      id: 1,
      title: 'Conquest du Mont Ventoux',
      date: '23 Février 2025',
      time: '06:00',
      duration: '10h',
      difficulty: 'Expert',
      maxParticipants: 30,
      currentParticipants: 24,
      price: 89,
      includes: ['Guide expert', 'Équipement de sécurité', 'Collation énergétique', 'Certificat de conquête'],
      requirements: ['Expérience en haute montagne', 'Condition physique excellente', 'Équipement personnel complet'],
    },
    {
      id: 2,
      title: 'Alpine Discovery',
      date: '8 Mars 2025',
      time: '07:30',
      duration: '6h',
      difficulty: 'Intermédiaire',
      maxParticipants: 20,
      currentParticipants: 12,
      price: 59,
      includes: ['Guide qualifié', 'Matériel de randonnée', 'Déjeuner montagnard', 'Photos souvenir'],
      requirements: ['Expérience de randonnée', 'Bonne condition physique', 'Chaussures de montagne'],
    },
    {
      id: 3,
      title: 'Forest Exploration',
      date: '15 Mars 2025',
      time: '09:00',
      duration: '4h',
      difficulty: 'Débutant',
      maxParticipants: 25,
      currentParticipants: 8,
      price: 35,
      includes: ['Guide nature', 'Kit découverte', 'Goûter forestier', 'Carnet de bord'],
      requirements: ['Motivation', 'Chaussures confortables', 'Curiosité naturelle'],
    },
  ];

  const handleInscription = () => {
    if (!selectedMission) {
      Alert.alert('Erreur', 'Veuillez sélectionner une mission');
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }
    Alert.alert('Succès', `Inscription confirmée pour ${selectedMission.title}`);
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
                Missions GNTREK
              </Text>
              <Text className="text-gntrek-stone font-montserrat text-lg">
                Choisissez votre prochaine aventure
              </Text>
            </View>
          </View>
          <View className="bg-gntrek-red/20 p-4 rounded-2xl">
            <Target size={32} color="#D72638" strokeWidth={2.5} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Missions Disponibles */}
          <View className="px-6 mb-8">
            <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-6">
              Missions Disponibles
            </Text>
            
            {missions.map((mission) => (
              <TouchableOpacity 
                key={mission.id}
                onPress={() => setSelectedMission(mission)}
                className="mb-6"
              >
                <LinearGradient
                  colors={selectedMission?.id === mission.id 
                    ? ['#D72638', '#8B1538'] 
                    : ['#1A1A1A', '#2A2A2A']
                  }
                  className="rounded-3xl p-6 border-2 border-gntrek-red/30"
                >
                  {/* Header Mission */}
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center flex-1">
                      <View className="bg-gntrek-white/20 p-4 rounded-2xl mr-4">
                        <Mountain size={28} color="#FFFFFF" strokeWidth={2.5} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gntrek-white font-roboto-slab-bold text-xl mb-1">
                          {mission.title}
                        </Text>
                        <View className="flex-row items-center">
                          <Calendar size={16} color="#FFFFFF" strokeWidth={2} />
                          <Text className="text-gntrek-white/80 font-montserrat ml-2">
                            {mission.date}
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    {selectedMission?.id === mission.id && (
                      <View className="bg-gntrek-white/20 p-3 rounded-full">
                        <Check size={24} color="#FFFFFF" strokeWidth={3} />
                      </View>
                    )}
                  </View>

                  {/* Détails Mission */}
                  <View className="bg-gntrek-black/30 rounded-2xl p-4 mb-4">
                    <View className="flex-row justify-between mb-3">
                      <View className="flex-row items-center">
                        <Clock size={18} color="#4A90E2" strokeWidth={2} />
                        <Text className="text-gntrek-white font-montserrat ml-2">
                          {mission.time} • {mission.duration}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Users size={18} color="#22c55e" strokeWidth={2} />
                        <Text className="text-gntrek-white font-montserrat ml-2">
                          {mission.currentParticipants}/{mission.maxParticipants}
                        </Text>
                      </View>
                    </View>
                    
                    <View className="flex-row justify-between items-center">
                      <View className="bg-orange-500/20 px-3 py-1 rounded-full">
                        <Text className="text-orange-400 font-montserrat-bold">
                          {mission.difficulty}
                        </Text>
                      </View>
                      <Text className="text-gntrek-white font-roboto-slab-bold text-2xl">
                        {mission.price}€
                      </Text>
                    </View>
                  </View>

                  {/* Progress Bar */}
                  <View className="mb-4">
                    <View className="h-2 bg-gntrek-black/50 rounded-full overflow-hidden">
                      <View 
                        className="h-full bg-gntrek-white rounded-full"
                        style={{ width: `${(mission.currentParticipants / mission.maxParticipants) * 100}%` }}
                      />
                    </View>
                    <Text className="text-gntrek-white/60 font-montserrat text-sm mt-1">
                      {Math.round((mission.currentParticipants / mission.maxParticipants) * 100)}% des places occupées
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {/* Formulaire d'Inscription */}
          {selectedMission && (
            <View className="px-6 mb-8">
              <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-6">
                Inscription - {selectedMission.title}
              </Text>
              
              <View className="space-y-4">
                <View>
                  <Text className="text-gntrek-white font-montserrat-semibold mb-2">
                    Nom complet *
                  </Text>
                  <View className="bg-gntrek-black/80 rounded-2xl border border-gntrek-red/30 p-4 flex-row items-center">
                    <User size={20} color="#D72638" strokeWidth={2} />
                    <TextInput
                      value={formData.name}
                      onChangeText={(text) => setFormData({...formData, name: text})}
                      placeholder="Votre nom et prénom"
                      placeholderTextColor="#6B7280"
                      className="text-gntrek-white font-montserrat ml-3 flex-1"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-gntrek-white font-montserrat-semibold mb-2">
                    Email *
                  </Text>
                  <View className="bg-gntrek-black/80 rounded-2xl border border-gntrek-red/30 p-4 flex-row items-center">
                    <Mail size={20} color="#D72638" strokeWidth={2} />
                    <TextInput
                      value={formData.email}
                      onChangeText={(text) => setFormData({...formData, email: text})}
                      placeholder="votre@email.com"
                      placeholderTextColor="#6B7280"
                      className="text-gntrek-white font-montserrat ml-3 flex-1"
                      keyboardType="email-address"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-gntrek-white font-montserrat-semibold mb-2">
                    Téléphone *
                  </Text>
                  <View className="bg-gntrek-black/80 rounded-2xl border border-gntrek-red/30 p-4 flex-row items-center">
                    <Phone size={20} color="#D72638" strokeWidth={2} />
                    <TextInput
                      value={formData.phone}
                      onChangeText={(text) => setFormData({...formData, phone: text})}
                      placeholder="06 12 34 56 78"
                      placeholderTextColor="#6B7280"
                      className="text-gntrek-white font-montserrat ml-3 flex-1"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                <View>
                  <Text className="text-gntrek-white font-montserrat-semibold mb-2">
                    Niveau d'expérience
                  </Text>
                  <View className="flex-row space-x-3">
                    {['debutant', 'intermediaire', 'expert'].map((level) => (
                      <TouchableOpacity 
                        key={level}
                        onPress={() => setFormData({...formData, experience: level})}
                        className="flex-1"
                      >
                        <View className={`p-3 rounded-xl border ${
                          formData.experience === level 
                            ? 'bg-gntrek-red border-gntrek-red' 
                            : 'bg-gntrek-black/60 border-gntrek-white/20'
                        }`}>
                          <Text className={`font-montserrat-semibold text-center ${
                            formData.experience === level ? 'text-gntrek-white' : 'text-gntrek-stone'
                          }`}>
                            {level === 'debutant' ? 'Débutant' : 
                             level === 'intermediaire' ? 'Intermédiaire' : 'Expert'}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* Inclus dans la mission */}
              <View className="mt-8">
                <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-4">
                  Inclus dans cette mission
                </Text>
                <View className="bg-gntrek-black/80 rounded-2xl p-6 border border-gntrek-red/20">
                  {selectedMission.includes.map((item, index) => (
                    <View key={index} className="flex-row items-center mb-3">
                      <View className="bg-green-500/20 p-2 rounded-full mr-3">
                        <Check size={16} color="#22c55e" strokeWidth={2.5} />
                      </View>
                      <Text className="text-gntrek-white font-montserrat">
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Bouton d'inscription */}
              <TouchableOpacity onPress={handleInscription} className="mt-8 mb-12">
                <LinearGradient
                  colors={['#D72638', '#8B1538']}
                  className="rounded-3xl py-5 px-8 flex-row items-center justify-center shadow-xl"
                >
                  <Target size={24} color="white" strokeWidth={2.5} />
                  <Text className="text-gntrek-white font-montserrat-bold text-xl ml-3">
                    CONFIRMER INSCRIPTION
                  </Text>
                  <ChevronRight size={24} color="white" strokeWidth={2.5} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}