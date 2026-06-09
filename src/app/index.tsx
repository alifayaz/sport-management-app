import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage"

import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import {useEffect, useState} from "react";
import Login from "@/app/(pages)/login";
import Dashboard from "@/app/(pages)/dashboard";

export default function HomeScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken")
      setIsAuthenticated(!!token)
    } catch (error) {
      console.error("Error checking auth status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  if (isLoading) {
    return null // You can add a loading screen here
  }

  return (
      <ThemedView style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          {isAuthenticated ? (
              <Dashboard />
          ) : (
              <Login onLogin={() => setIsAuthenticated(true)} />
          )}
          {Platform.OS === 'web' && <WebBadge />}
        </SafeAreaView>
      </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
