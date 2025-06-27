import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, ScrollView, TouchableOpacity, Alert, Animated, 
  Dimensions, Image, SafeAreaView, StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  CreditCard, Smartphone, CheckCircle, Download, Shield, Mountain, 
  Banknote, Lock, TreePine, Leaf, Star, Clock, AlertCircle, Receipt, 
  ChevronRight, Wallet, Award, Target, Zap, Apple, Paypal, Users
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google' | null;
type PremiumPlan = 'explorer' | 'adventurer' | 'legend' | null;

export default function PaiementScreen() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [selectedPlan, setSelectedPlan] = useState<PremiumPlan>('adventurer');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  
  // Animations sophistiquées
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const securityPulse = useRef(new Animated.Value(1)).current;
  const processingAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation d'entrée premium
    Animated.sequence([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(contentSlide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation sécurité
    Animated.loop(
      Animated.sequence([
        Animated.timing(securityPulse, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(securityPulse, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Animation éléments flottants
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

    // Animation processing
    if (isProcessing) {
      Animated.loop(
        Animated.timing(processingAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isProcessing]);

  // Plans premium enrichis
  const premiumPlans = [
    {
      id: 'explorer',
      name: 'Explorer',
      subtitle: 'Découverte Premium',
      price: 29,
      originalPrice: 39,
      duration: '/mois',
      color: '#22c55e',
      gradient: ['#22c55e', '#16a34a'],
      icon: TreePine,
      badge: 'Populaire',
      features: [
        'Accès à toutes les randonnées niveau débutant',
        'Guide expert inclus',
        'Équipement de base fourni',
        'Photos souvenirs professionnelles',
        'Assurance accident incluse',
        'Communauté GNTREK'
      ],
      missions_month: '4-6',
      difficulty: 'Débutant à Intermédiaire'
    },
    {
      id: 'adventurer',
      name: 'Adventurer',
      subtitle: 'Expérience Elite',
      price: 59,
      originalPrice: 79,
      duration: '/mois',
      color: '#D72638',
      gradient: ['#D72638', '#8B1538'],
      icon: Mountain,
      badge: 'Recommandé',
      features: [
        'Accès illimité à toutes les expéditions',
        'Guide UIAGM certifié premium',
        'Équipement professionnel complet',
        'Photos & vidéos 4K incluses',
        'Assurance premium multi-risques',
        'Priorité réservations',
        'Coaching personnalisé',
        'Accès VIP événements'
      ],
      missions_month: '8-12',
      difficulty: 'Tous niveaux'
    },
    {
      id: 'legend',
      name: 'Legend',
      subtitle: 'Excellence Absolue',
      price: 99,
      originalPrice: 129,
      duration: '/mois',
      color: '#FF8C42',
      gradient: ['#FF8C42', '#f97316'],
      icon: Award,
      badge: 'Elite',
      features: [
        'Expéditions exclusives et sur-mesure',
        'Guide personnel dédié',
        'Matériel haut de gamme premium',
        'Reportage photo/vidéo professionnel',
        'Assurance mondiale premium',
        'Accès helicopter & transport VIP',
        'Coaching expert individuel',
        'Réseau ambassadeurs GNTREK',
        'Concierge aventure 24/7'
      ],
      missions_month: 'Illimité',
      difficulty: 'Expert & Expéditions privées'
    }
  ];

  // Méthodes de paiement modernes
  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte Bancaire',
      subtitle: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: '#4A90E2',
      secure: 'Cryptage SSL 256-bit'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      subtitle: 'Paiement sécurisé et rapide',
      icon: Wallet,
      color: '#0070BA',
      secure: 'Protection Acheteur PayPal'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      subtitle: 'Touch ID ou Face ID',
      icon: Apple,
      color: '#000000',
      secure: 'Secure Element Apple'
    },
    {
      id: 'google',
      name: 'Google Pay',
      subtitle: 'Paiement en un clic',
      icon: Smartphone,
      color: '#4285f4',
      secure: 'Tokenisation Google'
    }
  ];

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert(
        'Méthode de paiement requise', 
        'Veuillez sélectionner votre méthode de paiement sécurisée pour finaliser votre abonnement GNTREK Premium.'
      );
      return;
    }

    if (!selectedPlan) {
      Alert.alert(
        'Plan requis', 
        'Veuillez choisir votre plan d\'abonnement GNTREK Premium.'
      );
      return;
    }

    setIsProcessing(true);

    const selectedPlanData = premiumPlans.find(p => p.id === selectedPlan);
    const selectedMethodData = paymentMethods.find(m => m.id === selectedMethod);

    const receipt = {
      id: 'GNTREK-PREM-' + Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      amount: `${selectedPlanData?.price}€`,
      method: selectedMethodData?.name,
      plan: selectedPlanData?.name,
      status: 'Confirmé & Activé',
      subscription: 'GNTREK-PREMIUM-' + Date.now().toString().slice(-6),
      next_billing: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      features: selectedPlanData?.features || []
    };

    // Simulation paiement sécurisé
    setTimeout(() => {
      setIsProcessing(false);
      setReceiptData(receipt);
      setPaymentCompleted(true);
    }, 3000);
  };

  const downloadReceipt = () => {
    Alert.alert(
      'Justificatif sauvegardé ✓',
      'Votre reçu d\'abonnement GNTREK Premium a été téléchargé avec succès. Bienvenue dans l\'aventure premium !',
      [{ text: 'Parfait !' }]
    );
  };

  if (isProcessing) {
    return (
      <SafeAreaView className="flex-1 bg-gntrek-black">
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <View className="flex-1 items-center justify-center px-6">
          <LinearGradient
            colors={['#1A2F1A', 'rgba(215, 38, 56, 0.3)', 'rgba(0, 0, 0, 0.9)']}
            className="absolute inset-0"
          />
          
          <Animated.View 
            className="w-32 h-32 mb-8"
            style={{
              transform: [{
                rotate: processingAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })
              }]
            }}
          >
            <LinearGradient
              colors={['#D72638', '#8B1538']}
              className="w-full h-full rounded-full items-center justify-center"
            >
              <Shield size={48} color="white" strokeWidth={2.5} />
            </LinearGradient>
          </Animated.View>

          <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-4 text-center">
            Traitement Sécurisé
          </Text>
          <Text className="text-gntrek-white/80 font-montserrat text-center text-lg mb-8">
            Votre paiement est en cours de validation sécurisée...
          </Text>
          
          <View className="flex-row items-center space-x-2">
            <View className="w-2 h-2 bg-gntrek-red rounded-full" />
            <View className="w-2 h-2 bg-gntrek-red/50 rounded-full" />
            <View className="w-2 h-2 bg-gntrek-red/30 rounded-full" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (paymentCompleted && receiptData) {
    return (
      <SafeAreaView className="flex-1 bg-gntrek-black">
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Success Header Ultra-Premium */}
          <View className="relative pt-12 pb-8">
            <LinearGradient
              colors={['#1A2F1A', '#22c55e', 'rgba(34, 197, 94, 0.1)', 'transparent']}
              className="absolute inset-0"
            />
            
            {/* Éléments flottants success */}
            <Animated.View 
              className="absolute top-16 left-6 opacity-40"
              style={{ transform: [{ translateY: floatAnim }] }}
            >
              <Star size={24} color="#FFFFFF" strokeWidth={2} />
            </Animated.View>
            
            <Animated.View 
              className="absolute top-20 right-8 opacity-50"
              style={{ transform: [{ translateY: floatAnim }] }}
            >
              <Award size={20} color="#FFFFFF" strokeWidth={2} />
            </Animated.View>

            <View className="items-center pt-8">
              <Animated.View 
                className="relative mb-6"
                style={{ transform: [{ scale: securityPulse }] }}
              >
                <View className="w-24 h-24 bg-green-500/20 rounded-full items-center justify-center border-2 border-green-500/60">
                  <CheckCircle size={48} color="#22c55e" strokeWidth={3} />
                </View>
                <View className="absolute -inset-4 bg-green-500/10 rounded-full blur-xl" />
              </Animated.View>
              
              <Text className="text-gntrek-white text-4xl font-roboto-slab-bold text-center mb-2">
                Abonnement Activé !
              </Text>
              <Text className="text-gntrek-white/90 font-montserrat text-center text-lg">
                Bienvenue dans l'aventure GNTREK Premium
              </Text>
            </View>
          </View>

          <View className="px-6">
            {/* Receipt Card Ultra-Premium */}
            <LinearGradient
              colors={['#1A1A1A', '#2A2A2A']}
              className="rounded-3xl p-8 mb-6 border border-green-500/30"
            >
              <View className="flex-row items-center mb-8">
                <View className="bg-green-500/20 p-4 rounded-2xl mr-4">
                  <Receipt size={28} color="#22c55e" strokeWidth={2.5} />
                </View>
                <View className="flex-1">
                  <Text className="text-gntrek-white text-2xl font-roboto-slab-bold mb-1">
                    Justificatif Premium
                  </Text>
                  <Text className="text-green-500 font-montserrat-semibold text-base">
                    Paiement Confirmé & Abonnement Activé
                  </Text>
                </View>
                <TouchableOpacity 
                  onPress={downloadReceipt}
                  className="bg-green-500/20 p-3 rounded-2xl"
                >
                  <Download size={20} color="#22c55e" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              {/* Transaction Details Premium */}
              <View className="bg-gntrek-black/50 rounded-2xl p-6 mb-6">
                <Text className="text-gntrek-white text-xl font-roboto-slab-bold mb-5">
                  Détails de la Transaction
                </Text>
                
                <View className="space-y-4">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gntrek-white/70 font-montserrat">ID Transaction</Text>
                    <Text className="text-gntrek-white font-montserrat-semibold">{receiptData.id}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gntrek-white/70 font-montserrat">Date & Heure</Text>
                    <Text className="text-gntrek-white font-montserrat-semibold">{receiptData.date}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gntrek-white/70 font-montserrat">Méthode</Text>
                    <View className="flex-row items-center">
                      <CreditCard size={16} color="#22c55e" strokeWidth={2} />
                      <Text className="text-green-500 font-montserrat-semibold ml-2">{receiptData.method}</Text>
                    </View>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gntrek-white/70 font-montserrat">Montant</Text>
                    <Text className="text-gntrek-white font-roboto-slab-bold text-xl">{receiptData.amount}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-gntrek-white/70 font-montserrat">Prochain prélèvement</Text>
                    <Text className="text-gntrek-white font-montserrat-semibold">{receiptData.next_billing}</Text>
                  </View>
                </View>
              </View>

              {/* Plan Details Premium */}
              <View className="bg-gntrek-red/10 rounded-2xl p-6 border border-gntrek-red/30">
                <Text className="text-gntrek-white text-xl font-roboto-slab-bold mb-5">
                  Votre Plan Premium
                </Text>
                
                <View className="flex-row items-center mb-4">
                  <View className="bg-gntrek-red/20 p-3 rounded-2xl mr-4">
                    <Award size={24} color="#D72638" strokeWidth={2.5} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gntrek-white font-roboto-slab-bold text-lg">{receiptData.plan}</Text>
                    <Text className="text-gntrek-red font-montserrat-semibold">Abonnement Premium Activé</Text>
                  </View>
                </View>

                <Text className="text-gntrek-white/80 font-montserrat-semibold text-base mb-3">
                  ✨ Avantages inclus
                </Text>
                <View className="space-y-2">
                  {receiptData.features.slice(0, 5).map((feature: string, index: number) => (
                    <View key={index} className="flex-row items-center">
                      <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                      <Text className="text-gntrek-white/80 font-montserrat text-sm flex-1">
                        {feature}
                      </Text>
                    </View>
                  ))}
                  {receiptData.features.length > 5 && (
                    <Text className="text-gntrek-red font-montserrat-semibold text-sm mt-2">
                      +{receiptData.features.length - 5} autres avantages premium
                    </Text>
                  )}
                </View>
              </View>
            </LinearGradient>

            {/* Actions Premium */}
            <View className="space-y-4 mb-12">
              <TouchableOpacity>
                <LinearGradient
                  colors={['#D72638', '#8B1538']}
                  className="py-4 rounded-2xl flex-row items-center justify-center"
                >
                  <Mountain size={20} color="white" strokeWidth={2.5} />
                  <Text className="text-gntrek-white font-montserrat-bold text-lg ml-3">
                    COMMENCER MON AVENTURE
                  </Text>
                  <ChevronRight size={20} color="white" strokeWidth={2.5} />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity className="bg-gntrek-black/60 py-4 rounded-2xl flex-row items-center justify-center border border-gntrek-red/30">
                <Download size={20} color="#D72638" strokeWidth={2.5} />
                <Text className="text-gntrek-red font-montserrat-bold text-lg ml-3">
                  TÉLÉCHARGER LE JUSTIFICATIF
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
                  GNTREK Premium
                </Text>
                <Text className="text-gntrek-white/70 font-montserrat text-base">
                  Débloquez votre potentiel d'aventurier
                </Text>
              </View>
            </View>
            <Animated.View 
              className="bg-gntrek-red/20 p-3 rounded-2xl"
              style={{ transform: [{ scale: securityPulse }] }}
            >
              <Shield size={28} color="#D72638" strokeWidth={2.5} />
            </Animated.View>
          </View>

          {/* Security Badge */}
          <View className="bg-gntrek-black/60 rounded-2xl p-4 border border-green-500/30">
            <View className="flex-row items-center">
              <Lock size={20} color="#22c55e" strokeWidth={2.5} />
              <Text className="text-green-400 font-montserrat-semibold ml-3 flex-1">
                Paiement 100% sécurisé SSL
              </Text>
              <View className="w-2 h-2 bg-green-500 rounded-full" />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <Animated.View 
          className="px-6 mb-8"
          style={{ transform: [{ translateY: contentSlide }] }}
        >
          {/* Plans Premium */}
          <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-6">
            Choisissez Votre Plan
          </Text>
          
          {premiumPlans.map((plan, index) => (
            <TouchableOpacity 
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id as PremiumPlan)}
              className="mb-6"
              activeOpacity={0.95}
            >
              <View className="relative overflow-hidden rounded-3xl">
                <LinearGradient
                  colors={selectedPlan === plan.id 
                    ? plan.gradient 
                    : ['#1A1A1A', '#2A2A2A']
                  }
                  className="p-6 border-2"
                  style={{ 
                    borderColor: selectedPlan === plan.id ? plan.color : 'rgba(215, 38, 56, 0.2)' 
                  }}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <View className="absolute top-4 right-4">
                      <View 
                        className="px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${plan.color}20` }}
                      >
                        <Text 
                          className="font-montserrat-bold text-xs"
                          style={{ color: plan.color }}
                        >
                          {plan.badge}
                        </Text>
                      </View>
                    </View>
                  )}

                  {/* Header */}
                  <View className="flex-row items-center mb-4">
                    <View 
                      className="p-3 rounded-2xl mr-4"
                      style={{ backgroundColor: selectedPlan === plan.id ? 'rgba(255,255,255,0.2)' : `${plan.color}20` }}
                    >
                      <plan.icon 
                        size={28} 
                        color={selectedPlan === plan.id ? 'white' : plan.color} 
                        strokeWidth={2.5} 
                      />
                    </View>
                    <View className="flex-1">
                      <Text className={`text-2xl font-roboto-slab-bold mb-1 ${
                        selectedPlan === plan.id ? 'text-gntrek-white' : 'text-gntrek-white'
                      }`}>
                        {plan.name}
                      </Text>
                      <Text className={`font-montserrat-semibold ${
                        selectedPlan === plan.id ? 'text-gntrek-white/80' : 'text-gntrek-white/70'
                      }`}>
                        {plan.subtitle}
                      </Text>
                    </View>
                    {selectedPlan === plan.id && (
                      <View className="bg-gntrek-white/20 p-2 rounded-full">
                        <CheckCircle size={20} color="white" strokeWidth={2.5} />
                      </View>
                    )}
                  </View>

                  {/* Prix */}
                  <View className="flex-row items-baseline mb-4">
                    <Text className={`text-4xl font-roboto-slab-bold ${
                      selectedPlan === plan.id ? 'text-gntrek-white' : 'text-gntrek-white'
                    }`}>
                      {plan.price}€
                    </Text>
                    <Text className={`font-montserrat text-lg ${
                      selectedPlan === plan.id ? 'text-gntrek-white/80' : 'text-gntrek-white/70'
                    }`}>
                      {plan.duration}
                    </Text>
                    {plan.originalPrice > plan.price && (
                      <Text className={`font-montserrat line-through ml-3 ${
                        selectedPlan === plan.id ? 'text-gntrek-white/50' : 'text-gntrek-white/40'
                      }`}>
                        {plan.originalPrice}€
                      </Text>
                    )}
                  </View>

                  {/* Métadonnées */}
                  <View className="flex-row justify-between mb-4">
                    <View>
                      <Text className={`font-montserrat text-sm ${
                        selectedPlan === plan.id ? 'text-gntrek-white/60' : 'text-gntrek-white/50'
                      }`}>
                        Missions/mois
                      </Text>
                      <Text className={`font-montserrat-semibold ${
                        selectedPlan === plan.id ? 'text-gntrek-white' : 'text-gntrek-white/80'
                      }`}>
                        {plan.missions_month}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className={`font-montserrat text-sm ${
                        selectedPlan === plan.id ? 'text-gntrek-white/60' : 'text-gntrek-white/50'
                      }`}>
                        Difficulté
                      </Text>
                      <Text className={`font-montserrat-semibold ${
                        selectedPlan === plan.id ? 'text-gntrek-white' : 'text-gntrek-white/80'
                      }`}>
                        {plan.difficulty}
                      </Text>
                    </View>
                  </View>

                  {/* Features highlights */}
                  <View className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, featureIndex) => (
                      <View key={featureIndex} className="flex-row items-center">
                        <View 
                          className="w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: selectedPlan === plan.id ? 'white' : plan.color }}
                        />
                        <Text className={`font-montserrat text-sm flex-1 ${
                          selectedPlan === plan.id ? 'text-gntrek-white/90' : 'text-gntrek-white/70'
                        }`}>
                          {feature}
                        </Text>
                      </View>
                    ))}
                    {plan.features.length > 4 && (
                      <Text className={`font-montserrat-semibold text-sm mt-2 ${
                        selectedPlan === plan.id ? 'text-gntrek-white' : 'text-gntrek-white/80'
                      }`}>
                        +{plan.features.length - 4} autres avantages premium
                      </Text>
                    )}
                  </View>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          ))}

          {/* Méthodes de Paiement */}
          <Text className="text-2xl font-roboto-slab-bold text-gntrek-white mb-6 mt-8">
            Méthode de Paiement
          </Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity 
              key={method.id}
              onPress={() => setSelectedMethod(method.id as PaymentMethod)}
              className="mb-4"
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={selectedMethod === method.id 
                  ? ['#D72638', '#8B1538'] 
                  : ['#1A1A1A', '#2A2A2A']
                }
                className="rounded-2xl p-5 border"
                style={{ 
                  borderColor: selectedMethod === method.id ? '#D72638' : 'rgba(215, 38, 56, 0.2)' 
                }}
              >
                <View className="flex-row items-center">
                  <View 
                    className="p-3 rounded-2xl mr-4"
                    style={{ 
                      backgroundColor: selectedMethod === method.id 
                        ? 'rgba(255,255,255,0.2)' 
                        : `${method.color}20` 
                    }}
                  >
                    <method.icon 
                      size={24} 
                      color={selectedMethod === method.id ? 'white' : method.color} 
                      strokeWidth={2.5} 
                    />
                  </View>
                  <View className="flex-1">
                    <Text className={`font-roboto-slab-bold text-lg mb-1 ${
                      selectedMethod === method.id ? 'text-gntrek-white' : 'text-gntrek-white/90'
                    }`}>
                      {method.name}
                    </Text>
                    <Text className={`font-montserrat text-sm mb-2 ${
                      selectedMethod === method.id ? 'text-gntrek-white/80' : 'text-gntrek-white/60'
                    }`}>
                      {method.subtitle}
                    </Text>
                    <View className="flex-row items-center">
                      <Shield size={12} color={selectedMethod === method.id ? 'white' : '#22c55e'} strokeWidth={2} />
                      <Text className={`font-montserrat text-xs ml-1 ${
                        selectedMethod === method.id ? 'text-gntrek-white/70' : 'text-green-400'
                      }`}>
                        {method.secure}
                      </Text>
                    </View>
                  </View>
                  {selectedMethod === method.id && (
                    <View className="bg-gntrek-white/20 p-2 rounded-full">
                      <CheckCircle size={20} color="white" strokeWidth={2.5} />
                    </View>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}

          {/* Bouton de paiement */}
          <TouchableOpacity 
            onPress={handlePayment}
            className="mt-8 mb-12"
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#D72638', '#8B1538']}
              className="py-5 rounded-3xl flex-row items-center justify-center"
              style={{ 
                shadowColor: '#D72638',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8
              }}
            >
              <Lock size={24} color="white" strokeWidth={2.5} />
              <Text className="text-gntrek-white font-montserrat-bold text-xl ml-3">
                PAIEMENT SÉCURISÉ
              </Text>
              <ChevronRight size={24} color="white" strokeWidth={2.5} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Garanties */}
          <View className="bg-gntrek-black/60 rounded-2xl p-6 border border-green-500/30 mb-8">
            <Text className="text-gntrek-white font-montserrat-bold text-lg mb-4 text-center">
              🔒 Garanties GNTREK Premium
            </Text>
            <View className="space-y-3">
              <View className="flex-row items-center">
                <CheckCircle size={16} color="#22c55e" strokeWidth={2} />
                <Text className="text-gntrek-white/80 font-montserrat text-sm ml-3 flex-1">
                  Paiement 100% sécurisé et crypté
                </Text>
              </View>
              <View className="flex-row items-center">
                <CheckCircle size={16} color="#22c55e" strokeWidth={2} />
                <Text className="text-gntrek-white/80 font-montserrat text-sm ml-3 flex-1">
                  Annulation possible à tout moment
                </Text>
              </View>
              <View className="flex-row items-center">
                <CheckCircle size={16} color="#22c55e" strokeWidth={2} />
                <Text className="text-gntrek-white/80 font-montserrat text-sm ml-3 flex-1">
                  Garantie satisfait ou remboursé 30 jours
                </Text>
              </View>
              <View className="flex-row items-center">
                <CheckCircle size={16} color="#22c55e" strokeWidth={2} />
                <Text className="text-gntrek-white/80 font-montserrat text-sm ml-3 flex-1">
                  Support premium 24/7
                </Text>
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}