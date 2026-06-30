import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HamburgerMenu from '@/components/hamburgerMenu';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PagesLayout() {
  const insets = useSafeAreaInsets();
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'fa';
      document.body.dir = 'rtl';
    }
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerTitleStyle: {
          fontFamily: 'YekanBakhBold',
          fontSize: 20,
        },
        headerShown: true,
        headerRight: () => (
          <Pressable onPress={() => router.back()} style={{ marginLeft: 10 }}>
            <Ionicons name="arrow-back" size={24} color="#1E5A99" />
          </Pressable>
        ),
        headerLeft: () => <HamburgerMenu />,
        sceneStyle: {
          backgroundColor: '#f5f5f5',
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#eee',
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          elevation: 5,
          height: 80 + insets.bottom,
        },
        tabBarItemStyle: {
          paddingVertical: 6,
        },
        tabBarLabelStyle: {
          fontFamily: 'YekanBakh',
          color: '#1E5A99',
        },
        tabBarInactiveTintColor: '#1E5A99',
        tabBarActiveTintColor: '#FF5722',
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'خانه',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="requests"
        options={{
          title: 'درخواست ها',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="createGame"
        options={{
          title: 'ثبت بازی',
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add" size={32} color="#fff" />
          ),
          tabBarStyle: {
            height: 80 + insets.bottom,
            backgroundColor: '#fff',
            borderTopColor: '#eee',
          },
          tabBarButton: ({ onPress, accessibilityState }) => (
            <Pressable
              onPress={onPress}
              style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#FF5722',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="add" size={32} color="#fff" />
              </View>
            </Pressable>
          ),
        }}
      />

      <Tabs.Screen
        name="myGames"
        options={{
          title: 'بازی های من',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="offerGames"
        options={{
          title: 'بازی پیشنهادی',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="sparkles-outline" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="reports"
        options={{
          title: 'گزارشات',
          href: null,
        }}
      />
      <Tabs.Screen
        name="gameDetail/[id]"
        options={{
          title: '',
          href: null,
        }}
      />
    </Tabs>
  );
}
