import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme } from 'react-native';
import "../global.css";
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Slot } from 'expo-router';
import {useFonts} from "expo-font";

export default function TabLayout() {
  const colorScheme = useColorScheme();
    const [fontsLoaded] = useFonts({
        YekanBakh: require('../../assets/fonts/YekanBakh-Regular.ttf'),
        YekanBakhBold: require('../../assets/fonts/YekanBakh-Bold.ttf'),
    });

    if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Slot  />
    </ThemeProvider>
  );
}
