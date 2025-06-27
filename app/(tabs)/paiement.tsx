import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CreditCard, Smartphone, CircleCheck as CheckCircle, Download, Shield, Mountain, Banknote, Lock, TreePine, Leaf, Star, Clock, AlertCircle, Receipt, ChevronRight, Wallet } from 'lucide-react-native';
import { useRef, useEffect } from 'react';

const { width } = Dimensions.get('window');

type PaymentMethod = 'orange' | 'mtn' | null;

export default function PaiementScreen() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation de sécurité pulse
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

    // Animation de flottement
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
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

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert('Méthode requise', 'Veuillez choisir votre mode de paiement Mobile Money pour sécuriser votre place dans l\'expédition GNTREK');
      return;
    }

    const receipt = {
      id: 'GNTREK-EXP-' + Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      amount: '5000 FCFA',
      method: selectedMethod === 'orange' ? 'Orange Money' : 'MTN Mobile Money',
      event: 'Mont Gangan Expedition - 15 Février 2025',
      status: 'Confirmé & Sécurisé',
      expedition: 'MONT-GANGAN-2025',
      adventurer: 'Aventurier GNTREK',
    };

    // Simulation paiement sécurisé
    setTimeout(() => {
      setReceiptData(receipt);
      setPaymentCompleted(true);
    }, 2000);
  };

  const downloadReceipt = () => {
    Alert.alert(
      'Justificatif sauvegardé ✓',
      'Votre reçu d\'expédition GNTREK a été téléchargé avec succès. Conservez-le précieusement pour le jour J !',
      [{ text: 'Parfait !' }]
    );
  };

  if (paymentCompleted && receiptData) {
    return (
      <ScrollView className="flex-1 bg-slate-900" showsVerticalScrollIndicator={false}>
        {/* Success Header Premium */}
        <View className="relative pt-12 pb-8">
          <LinearGradient
            colors={['#2D4A22', '#22c55e', '#2D4A22']}
            className="absolute inset-0"
          />
          
          {/* Floating Success Elements */}
          <Animated.View 
            className="absolute top-16 left-6 opacity-40"
            style={{ transform: [{ translateY: floatAnim }] }}
          >
            <Star size={20} color="#FFFFFF" strokeWidth={2} />
          </Animated.View>
          
          <Animated.View 
            className="absolute top-20 right-8 opacity-50"
            style={{ transform: [{ translateY: floatAnim }] }}
          >
            <TreePine size={18} color="#FFFFFF" strokeWidth={2} />
          </Animated.View>

          <View className="items-center pt-8">
            <Animated.View 
              className="bg-white/20 p-6 rounded-full mb-6"
              style={{ transform: [{ scale: pulseAnim }] }}
            >
              <CheckCircle size={48} color="#FFFFFF" strokeWidth={2.5} />
            </Animated.View>
            <Text className="text-white text-3xl font-roboto-slab-bold text-center mb-2">
              Paiement Confirmé !
            </Text>
            <Text className="text-white/90 font-montserrat text-center">
              Votre place d'aventurier est officiellement réservée
            </Text>
          </View>
        </View>

        <View className="px-6">
          <Animated.View 
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }]
            }}
          >
            {/* Receipt Card Premium */}
            <View className="bg-slate-800/90 rounded-3xl p-8 mb-6 border border-green-600/30">
              <View className="flex-row items-center mb-8">
                <View className="bg-green-600/20 p-4 rounded-2xl mr-4">
                  <Receipt size={28} color="#22c55e" strokeWidth={2} />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-2xl font-roboto-slab-bold mb-1">
                    Justificatif d'Expédition
                  </Text>
                  <Text className="text-green-600 font-montserrat-semibold">
                    Paiement Sécurisé Confirmé
                  </Text>
                </View>
              </View>

              {/* Transaction Details Premium */}
              <View className="bg-slate-700/50 rounded-2xl p-6 mb-8">
                <Text className="text-white text-lg font-montserrat-bold mb-5">
                  Détails de la Transaction
                </Text>
                
                <View className="space-y-4">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70 font-inter">ID Transaction</Text>
                    <Text className="text-white font-inter-semibold">{receiptData.id}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70 font-inter">Date & Heure</Text>
                    <Text className="text-white font-inter-semibold">{receiptData.date}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70 font-inter">Méthode</Text>
                    <View className="flex-row items-center">
                      <Smartphone size={16} color="#22c55e" strokeWidth={2} />
                      <Text className="text-green-600 font-inter-semibold ml-2">{receiptData.method}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Expedition Details Premium */}
              <View className="bg-red-600/10 rounded-2xl p-6 mb-8 border border-red-600/20">
                <Text className="text-white text-lg font-montserrat-bold mb-5">
                  Détails de l'Expédition
                </Text>
                
                <View className="space-y-4">
                  <View className="flex-row justify-between items-start">
                    <Text className="text-white/70 font-inter">Événement</Text>
                    <Text className="text-white font-inter-semibold text-right flex-1 ml-4">
                      {receiptData.event}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70 font-inter">Code Expédition</Text>
                    <Text className="text-red-600 font-inter-bold">{receiptData.expedition}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70 font-inter">Aventurier</Text>
                    <Text className="text-white font-inter-semibold">{receiptData.adventurer}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-white/70 font-inter">Statut</Text>
                    <View className="bg-green-600/20 px-4 py-2 rounded-full border border-green-600/40">
                      <Text className="text-green-600 font-montserrat-semibold text-sm">
                        {receiptData.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Total Amount Premium */}
              <View className="bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-2xl p-6 mb-8 border border-orange-600/30">
                <View className="flex-row justify-between items-center">
                  <Text className="text-white text-xl font-montserrat-bold">
                    Montant Total Payé
                  </Text>
                  <Text className="text-orange-600 text-3xl font-roboto-slab-bold">
                    {receiptData.amount}
                  </Text>
                </View>
              </View>

              {/* Download Button Premium */}
              <TouchableOpacity onPress={downloadReceipt} className="mb-6">
                <LinearGradient
                  colors={['#3B82F6', '#1d4ed8', '#3B82F6']}
                  className="rounded-2xl py-4 px-6 flex-row items-center justify-center"
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Download size={24} color="#FFFFFF" strokeWidth={2} />
                  <Text className="text-white font-montserrat-bold text-lg ml-3">
                    TÉLÉCHARGER JUSTIFICATIF
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

            {/* Final Briefing Premium */}
            <View className="bg-slate-800/90 rounded-3xl p-8 mb-8 border border-orange-600/30">
              <View className="flex-row items-center mb-6">
                <View className="bg-orange-600/20 p-4 rounded-2xl mr-4">
                  <Mountain size={28} color="#ecb75f" strokeWidth={2} />
                </View>
                <Text className="text-white text-2xl font-roboto-slab-bold">
                  Briefing Final
                </Text>
              </View>

              <View className="space-y-4 mb-6">
                <View className="flex-row items-center">
                  <View className="bg-green-600/20 w-8 h-8 rounded-full items-center justify-center mr-4">
                    <CheckCircle size={16} color="#22c55e" strokeWidth={2} />
                  </View>
                  <Text className="text-white font-inter text-base">Confirmation SMS dans 24h</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="bg-blue-600/20 w-8 h-8 rounded-full items-center justify-center mr-4">
                    <Clock size={16} color="#45B7D1" strokeWidth={2} />
                  </View>
                  <Text className="text-white font-inter text-base">Briefing technique 48h avant</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="bg-yellow-600/20 w-8 h-8 rounded-full items-center justify-center mr-4">
                    <Shield size={16} color="#f59e0b" strokeWidth={2} />
                  </View>
                  <Text className="text-white font-inter text-base">Check matériel obligatoire</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="bg-red-600/20 w-8 h-8 rounded-full items-center justify-center mr-4">
                    <Mountain size={16} color="#8B1538" strokeWidth={2} />
                  </View>
                  <Text className="text-white font-inter text-base">RDV 05:30 - Base Camp GNTREK</Text>
                </View>
              </View>

              <View className="bg-orange-600/10 p-4 rounded-2xl border border-orange-600/20">
                <Text className="text-orange-600 font-montserrat-semibold text-center">
                  Conservez ce justificatif pour l'accès à l'expédition !
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
        
        {/* Bottom Spacer */}
        <View className="h-20" />
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-slate-900" showsVerticalScrollIndicator={false}>
      {/* Hero Header Premium */}
      <View className="relative pt-12 pb-6">
        <LinearGradient
          colors={['#8B1538', '#b91c1c', '#8B1538']}
          className="absolute inset-0"
        />
        
        {/* Floating Security Elements */}
        <Animated.View 
          className="absolute top-16 left-6 opacity-30"
          style={{ transform: [{ translateY: floatAnim }] }}
        >
          <Shield size={24} color="#FFFFFF" strokeWidth={2} />
        </Animated.View>
        
        <Animated.View 
          className="absolute top-20 right-8 opacity-40"
          style={{ transform: [{ translateY: floatAnim }] }}
        >
          <Lock size={20} color="#FFFFFF" strokeWidth={2} />
        </Animated.View>

        <View className="items-center pt-8">
          <Animated.View 
            className="bg-white/20 p-4 rounded-full mb-4"
            style={{ transform: [{ scale: pulseAnim }] }}
          >
            <Wallet size={32} color="#FFFFFF" strokeWidth={2.5} />
          </Animated.View>
          <Text className="text-white text-3xl font-roboto-slab-bold text-center">
            Sécuriser ma Place
          </Text>
          <Text className="text-white/90 font-montserrat text-center mt-2">
            Paiement Mobile Money • Sécurisé & Instantané
          </Text>
        </View>
      </View>

      <View className="px-6">
        <Animated.View 
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }}
        >
          {/* Security Badge Premium */}
          <View className="bg-slate-800/90 rounded-3xl p-6 mb-8 border border-blue-600/30">
            <View className="flex-row items-center mb-4">
              <Animated.View 
                className="bg-blue-600/20 p-4 rounded-2xl mr-4"
                style={{ transform: [{ scale: pulseAnim }] }}
              >
                <Shield size={28} color="#45B7D1" strokeWidth={2} />
              </Animated.View>
              <View className="flex-1">
                <Text className="text-white text-xl font-roboto-slab-bold mb-1">
                  Paiement 100% Sécurisé
                </Text>
                <Text className="text-blue-600 font-montserrat-semibold">
                  Chiffrement SSL • Données Protégées
                </Text>
              </View>
            </View>
            <Text className="text-white/80 font-inter text-base leading-6">
              Vos transactions sont sécurisées par les standards de sécurité 
              les plus élevés du secteur Mobile Money au Cameroun.
            </Text>
          </View>

          {/* Expedition Summary Premium */}
          <View className="bg-slate-800/90 rounded-3xl p-6 mb-8 border border-green-600/30">
            <View className="flex-row items-center mb-6">
              <View className="bg-green-600/20 p-4 rounded-2xl mr-4">
                <Mountain size={28} color="#22c55e" strokeWidth={2} />
              </View>
              <View className="flex-1">
                <Text className="text-white text-xl font-roboto-slab-bold mb-1">
                  Récapitulatif Expédition
                </Text>
                <Text className="text-green-600 font-montserrat-semibold">
                  Mont Gangan • 15 Février 2025
                </Text>
              </View>
            </View>

            <View className="space-y-4 mb-6">
              <View className="flex-row justify-between items-center">
                <Text className="text-white/70 font-inter">Aventurier</Text>
                <Text className="text-white font-inter-semibold">Votre place réservée</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-white/70 font-inter">Durée</Text>
                <Text className="text-white font-inter-semibold">8 heures d'aventure</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-white/70 font-inter">Niveau</Text>
                <Text className="text-orange-600 font-inter-semibold">Intermédiaire</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-white/70 font-inter">Équipe</Text>
                <Text className="text-white font-inter-semibold">29/35 aventuriers</Text>
              </View>
            </View>

            <View className="bg-green-600/10 p-4 rounded-2xl border border-green-600/20">
              <View className="flex-row justify-between items-center">
                <Text className="text-white text-lg font-montserrat-bold">
                  Contribution Totale
                </Text>
                <Text className="text-green-600 text-2xl font-roboto-slab-bold">
                  5000 FCFA
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Methods Premium */}
          <View className="bg-slate-800/90 rounded-3xl p-6 mb-8 border border-orange-600/30">
            <View className="flex-row items-center mb-6">
              <View className="w-1 h-8 bg-orange-600 rounded-full mr-4" />
              <Text className="text-white text-2xl font-roboto-slab-bold flex-1">
                Mode de Paiement
              </Text>
              <Smartphone size={24} color="#ecb75f" strokeWidth={2} />
            </View>

            <Text className="text-white/70 font-inter text-base mb-6 leading-6">
              Choisissez votre opérateur Mobile Money préféré pour sécuriser 
              votre place dans cette expédition légendaire.
            </Text>

            {/* Orange Money */}
            <TouchableOpacity
              onPress={() => setSelectedMethod('orange')}
              className="mb-4"
            >
              <View className={`rounded-2xl p-6 border-2 ${
                selectedMethod === 'orange' 
                  ? 'bg-orange-600/20 border-orange-600' 
                  : 'bg-slate-700/50 border-slate-600/50'
              }`}>
                <View className="flex-row items-center">
                  <View className={`p-4 rounded-xl mr-4 ${
                    selectedMethod === 'orange' ? 'bg-orange-600/30' : 'bg-orange-600/20'
                  }`}>
                    <Smartphone size={28} color="#f97316" strokeWidth={2} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-xl font-montserrat-bold mb-1">
                      Orange Money
                    </Text>
                    <Text className="text-orange-600 font-inter-semibold">
                      Paiement sécurisé • Instantané
                    </Text>
                  </View>
                  {selectedMethod === 'orange' && (
                    <View className="bg-orange-600/20 p-2 rounded-full">
                      <CheckCircle size={20} color="#f97316" strokeWidth={2} />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>

            {/* MTN Mobile Money */}
            <TouchableOpacity
              onPress={() => setSelectedMethod('mtn')}
            >
              <View className={`rounded-2xl p-6 border-2 ${
                selectedMethod === 'mtn' 
                  ? 'bg-yellow-600/20 border-yellow-600' 
                  : 'bg-slate-700/50 border-slate-600/50'
              }`}>
                <View className="flex-row items-center">
                  <View className={`p-4 rounded-xl mr-4 ${
                    selectedMethod === 'mtn' ? 'bg-yellow-600/30' : 'bg-yellow-600/20'
                  }`}>
                    <Smartphone size={28} color="#eab308" strokeWidth={2} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white text-xl font-montserrat-bold mb-1">
                      MTN Mobile Money
                    </Text>
                    <Text className="text-yellow-600 font-inter-semibold">
                      Paiement sécurisé • Instantané
                    </Text>
                  </View>
                  {selectedMethod === 'mtn' && (
                    <View className="bg-yellow-600/20 p-2 rounded-full">
                      <CheckCircle size={20} color="#eab308" strokeWidth={2} />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Payment Button Premium */}
          <TouchableOpacity 
            onPress={handlePayment}
            className="mb-8"
            disabled={!selectedMethod}
          >
            <LinearGradient
              colors={selectedMethod ? ['#2D4A22', '#22c55e', '#2D4A22'] : ['#64748b', '#475569', '#64748b']}
              className="rounded-3xl py-5 px-6 flex-row items-center justify-center"
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <CreditCard size={28} color="#FFFFFF" strokeWidth={2.5} />
              <Text className="text-white font-montserrat-bold text-xl ml-4">
                {selectedMethod ? 'CONFIRMER PAIEMENT' : 'CHOISIR MODE DE PAIEMENT'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Security Info Premium */}
          <View className="bg-slate-800/90 rounded-2xl p-6 mb-8 border border-blue-600/20">
            <View className="flex-row items-center mb-4">
              <Lock size={20} color="#45B7D1" strokeWidth={2} />
              <Text className="text-white font-montserrat-semibold ml-3">
                Sécurité & Confidentialité
              </Text>
            </View>
            <Text className="text-white/70 font-inter text-sm leading-6">
              • Paiements chiffrés SSL 256-bit{'\n'}
              • Aucune donnée bancaire stockée{'\n'}
              • Conformité standards PCI DSS{'\n'}
              • Remboursement garanti si annulation
            </Text>
          </View>
        </Animated.View>
      </View>
      
      {/* Bottom Spacer */}
      <View className="h-20" />
    </ScrollView>
  );
}