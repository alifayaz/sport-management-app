'use client';

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Dimensions,
  Image,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { apiService } from '@/services/apiService';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormType, registerSchema } from '@/types/schemas';
import { router } from 'expo-router';
import CustomTextInput from '@/components/ui/textInput';
import { Ionicons } from '@expo/vector-icons';

export default function Register() {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
      phone_number: '',
    },
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (body: RegisterFormType) => {
    const { confirmPassword, ...payload } = body;
    setLoading(true);
    try {
      await apiService.register(payload);
      Alert.alert('موفق', 'ثبت نام با موفقیت انجام شد');
      router.push('/login');
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
      <TouchableOpacity onPress={() => router.push('/')} className="mt-4 ml-2">
        <Ionicons name="arrow-back" size={25} color="#1E5A99" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            alt=""
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>بازیار</Text>
          <Text style={styles.subtitle}>اپلیکیشن جستجو همبازی</Text>
        </View>

        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="first_name"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="نام"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="last_name"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="نام خانوادگی"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="نام کاربری"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone_number"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                type="phone"
                onBlur={field.onBlur}
                placeholder="شماره موبایل"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="رمز عبور"
                type="password"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="تکرار رمز عبور"
                type="password"
                error={error?.message}
              />
            )}
          />
          <Pressable
            style={styles.button}
            onPress={handleSubmit(handleRegister)}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ثبت نام</Text>
            )}
          </Pressable>
          <View className="flex-row gap-2 justify-end">
            <Text
              onPress={() => router.push('/login')}
              className="font-yekan mt-2 text-primary"
            >
              ورود به حساب کاربری
            </Text>
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
