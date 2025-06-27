import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TreePine, Leaf, Star, Sparkles, Cloud, Sun } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

interface MagicalBackgroundProps {
  ambiance: {
    sky: string[];
    overlay: string[];
    accent: string;
  };
  intensity?: 'subtle' | 'medium' | 'intense';
}

export const MagicalBackground: React.FC<MagicalBackgroundProps> = ({ 
  ambiance, 
  intensity = 'medium' 
}) => {
  // 🧚‍♀️ Particules magiques additionnelles
  const pollenAnim = useRef(Array.from({ length: 8 }, () => new Animated.Value(0))).current;
  const butterflyAnim = useRef(Array.from({ length: 3 }, () => new Animated.Value(0))).current;
  const dewdropsAnim = useRef(Array.from({ length: 6 }, () => new Animated.Value(0))).current;
  const auraAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startMagicalParticles();
  }, []);

  const startMagicalParticles = () => {
    // ✨ Pollen doré flottant
    pollenAnim.forEach((pollen, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pollen, {
              toValue: 1,
              duration: 12000 + (index * 800),
              useNativeDriver: true,
            }),
            Animated.timing(pollen, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, index * 1500);
    });

    // 🦋 Papillons lumineux
    butterflyAnim.forEach((butterfly, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(butterfly, {
              toValue: 1,
              duration: 20000 + (index * 5000),
              useNativeDriver: true,
            }),
            Animated.timing(butterfly, {
              toValue: 0,
              duration: 3000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, index * 8000);
    });

    // 💧 Gouttes de rosée scintillantes
    dewdropsAnim.forEach((dewdrop, index) => {
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(dewdrop, {
              toValue: 1,
              duration: 8000 + (index * 600),
              useNativeDriver: true,
            }),
            Animated.timing(dewdrop, {
              toValue: 0,
              duration: 4000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, index * 2000);
    });

    // 🌟 Aura magique générale
    Animated.loop(
      Animated.sequence([
        Animated.timing(auraAnim, {
          toValue: 1,
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(auraAnim, {
          toValue: 0,
          duration: 8000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const getIntensityMultiplier = () => {
    switch (intensity) {
      case 'subtle': return 0.3;
      case 'intense': return 1.2;
      default: return 0.7;
    }
  };

  return (
    <View className="absolute inset-0 pointer-events-none">
      {/* 🌈 Aura magique générale */}
      <Animated.View 
        className="absolute inset-0"
        style={{
          opacity: auraAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.05, 0.15 * getIntensityMultiplier()],
          }),
        }}
      >
        <LinearGradient
          colors={[
            'transparent', 
            ambiance.accent + '10', 
            'transparent', 
            ambiance.accent + '08'
          ]}
          className="absolute inset-0"
        />
      </Animated.View>

      {/* ✨ Pollen doré magique */}
      {pollenAnim.map((pollenAnimation, index) => {
        const randomX = Math.random() * width;
        const randomStartY = height + (Math.random() * 200);
        const pollenSize = 2 + (index % 3);
        
        return (
          <Animated.View
            key={`pollen-${index}`}
            className="absolute"
            style={{
              left: randomX,
              bottom: 0,
              opacity: pollenAnimation.interpolate({
                inputRange: [0, 0.2, 0.8, 1],
                outputRange: [0, 0.6 * getIntensityMultiplier(), 0.8 * getIntensityMultiplier(), 0],
              }),
              transform: [
                {
                  translateY: pollenAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -randomStartY],
                  }),
                },
                {
                  translateX: pollenAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 20, -10],
                  }),
                },
                {
                  scale: pollenAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.8],
                  }),
                },
              ],
            }}
          >
            <View 
              className="rounded-full"
              style={{
                width: pollenSize,
                height: pollenSize,
                backgroundColor: ambiance.accent + 'AA',
                shadowColor: ambiance.accent,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 8,
              }}
            />
          </Animated.View>
        );
      })}

      {/* 🦋 Papillons lumineux mystiques */}
      {butterflyAnim.map((butterflyAnimation, index) => {
        const randomX = Math.random() * (width - 100);
        const randomY = Math.random() * (height * 0.6);
        const butterflyPath = [
          { x: randomX, y: randomY },
          { x: randomX + 150, y: randomY - 80 },
          { x: randomX + 300, y: randomY + 50 },
          { x: width + 50, y: randomY - 20 }
        ];
        
        return (
          <Animated.View
            key={`butterfly-${index}`}
            className="absolute"
            style={{
              left: butterflyAnimation.interpolate({
                inputRange: [0, 0.33, 0.66, 1],
                outputRange: butterflyPath.map(point => point.x),
              }),
              top: butterflyAnimation.interpolate({
                inputRange: [0, 0.33, 0.66, 1],
                outputRange: butterflyPath.map(point => point.y),
              }),
              opacity: butterflyAnimation.interpolate({
                inputRange: [0, 0.1, 0.9, 1],
                outputRange: [0, 0.4 * getIntensityMultiplier(), 0.6 * getIntensityMultiplier(), 0],
              }),
              transform: [
                {
                  scale: butterflyAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.5, 1.2, 0.8],
                  }),
                },
                {
                  rotate: butterflyAnimation.interpolate({
                    inputRange: [0, 0.33, 0.66, 1],
                    outputRange: ['0deg', '15deg', '-10deg', '5deg'],
                  }),
                },
              ],
            }}
          >
            <Sparkles size={8 + index * 2} color={ambiance.accent + 'DD'} strokeWidth={1.5} />
          </Animated.View>
        );
      })}

      {/* 💧 Gouttes de rosée scintillantes */}
      {dewdropsAnim.map((dewdropAnimation, index) => {
        const randomX = Math.random() * width;
        const randomY = Math.random() * (height * 0.3);
        
        return (
          <Animated.View
            key={`dewdrop-${index}`}
            className="absolute"
            style={{
              left: randomX,
              top: randomY,
              opacity: dewdropAnimation.interpolate({
                inputRange: [0, 0.3, 0.7, 1],
                outputRange: [0, 0.8 * getIntensityMultiplier(), 0.9 * getIntensityMultiplier(), 0],
              }),
              transform: [
                {
                  scale: dewdropAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1.5, 1],
                  }),
                },
                {
                  translateY: dewdropAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30],
                  }),
                },
              ],
            }}
          >
            <View 
              className="w-1 h-1 rounded-full"
              style={{
                backgroundColor: '#FFFFFF',
                shadowColor: ambiance.accent,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 2,
                elevation: 4,
              }}
            />
          </Animated.View>
        );
      })}

      {/* 🌸 Particules de vie flottantes */}
      <Animated.View 
        className="absolute inset-0"
        style={{
          opacity: auraAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.02, 0.08 * getIntensityMultiplier()],
          }),
        }}
      >
        {Array.from({ length: 20 }).map((_, index) => {
          const randomX = Math.random() * width;
          const randomY = Math.random() * height;
          const particleSize = 1 + (Math.random() * 2);
          
          return (
            <View
              key={`life-particle-${index}`}
              className="absolute rounded-full"
              style={{
                left: randomX,
                top: randomY,
                width: particleSize,
                height: particleSize,
                backgroundColor: index % 3 === 0 
                  ? ambiance.accent + '60' 
                  : index % 3 === 1 
                    ? '#FFFFFF40' 
                    : '#22c55e40',
              }}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

export default MagicalBackground; 