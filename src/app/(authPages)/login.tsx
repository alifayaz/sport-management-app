'use client';

import { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Dimensions,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '@/services/apiService';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormType, loginSchema } from '@/types/schemas';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (body: LoginFormType) => {
    setLoading(true);
    try {
      const response = await apiService.login(body);
      await AsyncStorage.setItem('authToken', response?.data?.token);
      router.replace('/dashboard');
    } catch (error) {
      if (error) {
        Alert.alert('خطا', error.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            alt=""
            source={require('@/assets/images/logo.jpg')}
            style={styles.logo}
          />
          <Text style={styles.title}>بازیار</Text>
          <Text style={styles.subtitle}>اپلیکیشن جستجو همبازی</Text>
        </View>

        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState: { error } }) => (
              <TextInput
                {...field}
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="نام کاربری"
                className="border border-gray-300 rounded-md h-12 px-2 font-yekan placeholder:text-right placeholder:text-gray-400 outline-0"
              />
            )}
          />
          <View className="w-full border border-gray-300 rounded-md flex-row items-center px-2">
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={24}
                color="gray"
              />
            </Pressable>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState: { error } }) => (
                <TextInput
                  {...field}
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="رمز عبور"
                  secureTextEntry={!showPassword}
                  className="flex-1 h-12 font-yekan placeholder:text-right placeholder:text-gray-400 outline-0"
                />
              )}
            />
          </View>

          <Pressable style={styles.button} onPress={handleSubmit(handleLogin)}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ورود</Text>
            )}
          </Pressable>
          <View className="flex-row gap-2 mt-2">
            <Text
              onPress={() => router.push('/register')}
              className="font-yekan text-primary"
            >
              ثبت نام
            </Text>
            <Text className="font-yekan">حساب کاربری ندارید؟</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    color: '#1E5A99',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'YekanBakh',
    fontSize: 25,
  },
  subtitle: {
    color: '#666',
    textAlign: 'center',
    fontFamily: 'YekanBakh',
  },
  inputContainer: {
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#1E5A99',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1E5A99',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'YekanBakh',
  },
});
