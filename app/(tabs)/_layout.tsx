import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Home, Camera, Map, Settings, UserPlus, CreditCard, 
  Mountain, TreePine, Compass, Shield 
} from 'lucide-react-native';

export default function TabLayout() {
  const tabConfig = [
    {
      name: 'index',
      title: 'Explorer',
      icon: Compass,
      focusedIcon: Mountain,
    },
    {
      name: 'galerie', 
      title: 'Galerie',
      icon: Camera,
      focusedIcon: TreePine,
    },
    {
      name: 'carte',
      title: 'Carte',
      icon: Map,
      focusedIcon: Map,
    },
    {
      name: 'inscription',
      title: 'Missions',
      icon: UserPlus,
      focusedIcon: UserPlus,
    },
    {
      name: 'paiement',
      title: 'Premium',
      icon: CreditCard,
      focusedIcon: Shield,
    },
    {
      name: 'admin',
      title: 'Profil',
      icon: Settings,
      focusedIcon: Settings,
    }
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 88,
          paddingBottom: 34,
          paddingTop: 8,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarBackground: () => (
          <View className="absolute inset-0 overflow-hidden">
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.95)',
                'rgba(255, 255, 255, 0.98)',
                'rgba(255, 255, 255, 1)'
              ]}
              className="flex-1"
            />
            {/* Ligne d'accent premium */}
            <View className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gntrek-red to-transparent" />
            
            {/* Ombre douce */}
            <View className="absolute -top-2 left-0 right-0 h-2 bg-gradient-to-b from-gntrek-black/5 to-transparent" />
          </View>
        ),
        tabBarActiveTintColor: '#D72638',
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: 'Montserrat-SemiBold',
          marginTop: 4,
          textTransform: 'capitalize' as const,
        },
        tabBarIconStyle: {
          marginTop: 2,
        }
      }}
    >
      {tabConfig.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => {
              const IconComponent = focused ? tab.focusedIcon : tab.icon;
              
              if (focused) {
                return (
                  <View className="items-center">
                    {/* Indicateur actif premium */}
                    <View className="absolute -top-1 w-8 h-1 bg-gntrek-red rounded-full" />
                    
                    {/* Conteneur icône avec glow subtil */}
                    <View className="w-8 h-8 items-center justify-center">
                      <View className="absolute inset-0 bg-gntrek-red/10 rounded-full" />
                      <IconComponent 
                        size={size} 
                        color={color} 
                        strokeWidth={2.5}
                      />
                    </View>
                  </View>
                );
              }
              
              return (
                <View className="w-8 h-8 items-center justify-center">
                  <IconComponent 
                    size={size} 
                    color={color} 
                    strokeWidth={2}
                  />
                </View>
              );
            },
            tabBarLabel: ({ focused, color, children }) => (
              <Text
                style={{ 
                  color,
                  fontSize: 11,
                  fontFamily: focused ? 'Montserrat-Bold' : 'Montserrat-SemiBold',
                  marginTop: 4,
                  textTransform: 'capitalize'
                }}
              >
                {children}
              </Text>
            )
          }}
        />
      ))}
    </Tabs>
  );
}