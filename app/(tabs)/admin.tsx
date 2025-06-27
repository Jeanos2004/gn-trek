import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions, StatusBar, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Settings, Users, BarChart3, Shield, Bell, Moon, 
  Globe, Download, Trash2, LogOut, ChevronRight,
  Target, Mountain, Award, Compass, User, Mail
} from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function AdminScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [gpsTracking, setGpsTracking] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);

  const adminStats = [
    { label: 'Utilisateurs Actifs', value: '2,547', icon: Users, trend: '+12%' },
    { label: 'Missions Complètes', value: '1,284', icon: Target, trend: '+8%' },
    { label: 'Sommets Conquis', value: '427', icon: Mountain, trend: '+15%' },
    { label: 'Trophées Débloqués', value: '896', icon: Award, trend: '+23%' },
  ];

  const quickActions = [
    { 
      title: 'Gestion Utilisateurs', 
      subtitle: 'Voir et gérer les comptes', 
      icon: Users, 
      color: '#4A90E2',
      action: () => Alert.alert('Admin', 'Gestion des utilisateurs')
    },
    { 
      title: 'Statistiques Missions', 
      subtitle: 'Analytics et performances', 
      icon: BarChart3, 
      color: '#22c55e',
      action: () => Alert.alert('Admin', 'Statistiques missions')
    },
    { 
      title: 'Sécurité Système', 
      subtitle: 'Logs et monitoring', 
      icon: Shield, 
      color: '#FF8C42',
      action: () => Alert.alert('Admin', 'Sécurité système')
    },
    { 
      title: 'Configuration GPS', 
      subtitle: 'Points d\'intérêt et cartes', 
      icon: Compass, 
      color: '#D72638',
      action: () => Alert.alert('Admin', 'Configuration GPS')
    },
  ];

  const settingsSections = [
    {
      title: 'Préférences',
      items: [
        { 
          label: 'Notifications Push', 
          type: 'toggle', 
          value: notifications, 
          onToggle: setNotifications,
          icon: Bell 
        },
        { 
          label: 'Mode Sombre', 
          type: 'toggle', 
          value: darkMode, 
          onToggle: setDarkMode,
          icon: Moon
        },
        { 
          label: 'Tracking GPS', 
          type: 'toggle', 
          value: gpsTracking, 
          onToggle: setGpsTracking,
          icon: Globe 
        },
        { 
          label: 'Sauvegarde Auto', 
          type: 'toggle', 
          value: autoBackup, 
          onToggle: setAutoBackup,
          icon: Download 
        },
      ]
    },
    {
      title: 'Compte',
      items: [
        { 
          label: 'Profil Administrateur', 
          type: 'action', 
          action: () => Alert.alert('Profil', 'Configuration du profil admin'),
          icon: User 
        },
        { 
          label: 'Exporter Données', 
          type: 'action', 
          action: () => Alert.alert('Export', 'Export des données en cours...'),
          icon: Download 
        },
        { 
          label: 'Effacer Cache', 
          type: 'action', 
          action: () => Alert.alert('Cache', 'Cache système effacé'),
          icon: Trash2 
        },
      ]
    },
    {
      title: 'Système',
      items: [
        { 
          label: 'Se Déconnecter', 
          type: 'action', 
          action: () => Alert.alert('Déconnexion', 'Êtes-vous sûr ?'),
          icon: LogOut,
          dangerous: true 
        },
      ]
    },
  ];

  return (
    <View className="flex-1 bg-gntrek-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header Admin Premium */}
      <LinearGradient
        colors={['#1A2F1A', 'rgba(215, 38, 56, 0.1)', 'transparent']}
        className="pt-16 pb-6 px-6"
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center flex-1">
            <View className="w-2 h-12 bg-gntrek-red rounded-full mr-4" />
            <View className="flex-1">
              <Text className="text-4xl font-roboto-slab-bold text-gntrek-white mb-1">
                Admin GNTREK
              </Text>
              <Text className="text-gntrek-stone font-montserrat text-lg">
                Panneau de contrôle système
              </Text>
            </View>
          </View>
          <View className="bg-gntrek-red/20 p-4 rounded-2xl">
            <Settings size={32} color="#D72638" strokeWidth={2.5} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Statistiques Admin */}
        <View className="px-6 mb-8">
          <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-6">
            Statistiques Système
          </Text>
          
          <View className="flex-row flex-wrap justify-between">
            {adminStats.map((stat, index) => (
              <View key={index} className="w-[48%] mb-4">
                <LinearGradient
                  colors={['#1A1A1A', '#2A2A2A']}
                  className="rounded-2xl p-5 border border-gntrek-red/20"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="bg-gntrek-red/20 p-3 rounded-xl">
                      {(() => {
                        const IconComponent = stat.icon;
                        return <IconComponent size={24} color="#D72638" strokeWidth={2.5} />;
                      })()}
                    </View>
                    <Text className="text-green-400 font-montserrat-semibold text-sm">
                      {stat.trend}
                    </Text>
                  </View>
                  <Text className="text-gntrek-white text-2xl font-roboto-slab-bold mb-1">
                    {stat.value}
                  </Text>
                  <Text className="text-gntrek-stone font-montserrat text-sm">
                    {stat.label}
                  </Text>
                </LinearGradient>
              </View>
            ))}
          </View>
        </View>

        {/* Actions Rapides Admin */}
        <View className="px-6 mb-8">
          <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-6">
            Actions Administrateur
          </Text>
          
          <View className="space-y-4">
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} onPress={action.action}>
                <LinearGradient
                  colors={['#1A1A1A', '#2A2A2A']}
                  className="rounded-2xl p-6 border border-gntrek-red/20 flex-row items-center"
                >
                  <View 
                    className="p-4 rounded-2xl mr-4"
                    style={{ backgroundColor: `${action.color}20` }}
                  >
                    {(() => {
                      const IconComponent = action.icon;
                      return <IconComponent size={28} color={action.color} strokeWidth={2.5} />;
                    })()}
                  </View>
                  <View className="flex-1">
                    <Text className="text-gntrek-white font-roboto-slab-bold text-xl mb-1">
                      {action.title}
                    </Text>
                    <Text className="text-gntrek-stone font-montserrat">
                      {action.subtitle}
                    </Text>
                  </View>
                  <ChevronRight size={24} color="#D72638" strokeWidth={2.5} />
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Configuration Système */}
        <View className="px-6 mb-12">
          <Text className="text-3xl font-roboto-slab-bold text-gntrek-white mb-6">
            Configuration
          </Text>
          
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} className="mb-8">
              <Text className="text-xl font-roboto-slab-bold text-gntrek-white mb-4">
                {section.title}
              </Text>
              
              <View className="bg-gntrek-black/80 rounded-3xl border border-gntrek-red/20 overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <View key={itemIndex}>
                    <TouchableOpacity 
                      onPress={item.type === 'action' ? item.action : undefined}
                      className="flex-row items-center p-6"
                    >
                      <View className={`p-3 rounded-xl mr-4 ${
                        item.dangerous ? 'bg-red-500/20' : 'bg-gntrek-red/20'
                      }`}>
                        {(() => {
                          const IconComponent = item.icon;
                          return <IconComponent 
                            size={24} 
                            color={(item as any).dangerous ? '#ef4444' : '#D72638'} 
                            strokeWidth={2.5} 
                          />;
                        })()}
                      </View>
                      
                      <Text className={`flex-1 font-montserrat-semibold text-lg ${
                        item.dangerous ? 'text-red-400' : 'text-gntrek-white'
                      }`}>
                        {item.label}
                      </Text>
                      
                      {item.type === 'toggle' ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{ false: '#6B7280', true: '#D72638' }}
                          thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
                        />
                      ) : (
                        <ChevronRight 
                          size={20} 
                          color={item.dangerous ? '#ef4444' : '#D72638'} 
                          strokeWidth={2} 
                        />
                      )}
                    </TouchableOpacity>
                    
                    {itemIndex < section.items.length - 1 && (
                      <View className="h-px bg-gntrek-white/10 mx-6" />
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Version Info */}
        <View className="px-6 mb-8">
          <View className="bg-gntrek-black/60 rounded-2xl p-6 border border-gntrek-white/10">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-gntrek-white font-roboto-slab-bold text-lg mb-1">
                  GNTREK Admin v2.1.0
                </Text>
                <Text className="text-gntrek-stone font-montserrat">
                  Build 2025.02.15 - Premium Edition
                </Text>
              </View>
              <View className="bg-green-500/20 px-3 py-2 rounded-full">
                <Text className="text-green-400 font-montserrat-semibold text-sm">
                  ✓ À jour
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}