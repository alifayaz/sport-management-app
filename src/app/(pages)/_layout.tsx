import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HamburgerMenu from '@/components/hamburgerMenu';
import { useEffect } from 'react';

export default function PagesLayout() {
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
        headerShown: true,
        headerRight: () => <HamburgerMenu />,
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
          // Android shadow
          elevation: 5,
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
    </Tabs>
  );
}
