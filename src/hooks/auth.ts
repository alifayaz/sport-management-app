import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';

export function useAuth() {
  useEffect(() => {
    check();
  }, []);

  async function check() {
    const token = await AsyncStorage.getItem('authToken');

    if (!token) {
      router.replace('/login');
      return;
    }
  }
}
