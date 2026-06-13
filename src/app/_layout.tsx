import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import "../global.css";
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Slot } from 'expo-router';
import {useFonts} from "expo-font";
import {useEffect} from "react";
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
    const [fontsLoaded] = useFonts({
        YekanBakh: require('../../assets/fonts/YekanBakh-Regular.ttf'),
        YekanBakhBold: require('../../assets/fonts/YekanBakh-Bold.ttf'),
    });
    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Slot  />
    </ThemeProvider>
  );
}
