import { useEffect, useRef, useState } from 'react';
import { Animated, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const headlines: string[] = [
  'نسخه جدید بازیار منتشر شد!',
  'ورزش های دیگر به این نسخه اضافه شدند.',
  'عبور کاربران اپلیکیشن از هزار نفر!',
];

export default function NewsTicker() {
  const [index, setIndex] = useState<number>(0);

  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev === headlines.length - 1 ? 0 : prev + 1));

        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View
      className="flex flex-row items-center gap-2 bg-white rounded-xl px-4 py-3 mt-4"
      style={{
        shadowColor: '#1E5A99',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <Ionicons name="newspaper-outline" size={25} color="#e95050" />
      <Animated.Text style={{ opacity }} numberOfLines={1}>
        <Text className="text-sm font-yekanBold text-gray-800">
          {headlines[index]}
        </Text>
      </Animated.Text>
    </View>
  );
}
