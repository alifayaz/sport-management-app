import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { useColorScheme, View } from 'react-native';
import '../global.css';
import { Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { I18nManager } from 'react-native';

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function MainLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    YekanBakh: require('../../assets/fonts/YekanBakh-Regular.ttf'),
    YekanBakhBold: require('../../assets/fonts/YekanBakh-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View className="flex-1 bg-gray-100">
        <Slot />
      </View>
    </ThemeProvider>
  );
}
