import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useCheckToken() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    async function check() {
      const token = await AsyncStorage.getItem('authToken');
      setHasToken(!!token);
    }

    check();
  }, []);

  return hasToken;
}
