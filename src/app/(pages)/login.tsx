"use client"

import { useState } from "react"
import {View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, Text, Dimensions} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { apiService } from "@/services/apiService"
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginFormType, loginSchema} from "@/app/(pages)/schemas";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

interface LoginScreenProps {
  onLogin: () => void
}

export default function Login({ onLogin }: LoginScreenProps) {
  const {handleSubmit, control} = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [loading, setLoading] = useState(false)

  const handleLogin = async (body: LoginFormType) => {
    setLoading(true)
    try {
      const response = await apiService.login(body)
      await AsyncStorage.setItem("authToken", response.data.token)
      await AsyncStorage.setItem("userInfo", JSON.stringify(response.user))
      onLogin()
    } catch (error) {
      Alert.alert("خطا", "نام کاربری یا رمز عبور اشتباه است")
    } finally {
      setLoading(false)
    }
  }

  return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <img alt='' src={"/placeholder.svg?height=120&width=120"} style={styles.logo} />
            <Text style={styles.title}>
              باشگاه ورزشی
            </Text>
            <Text>سیستم مدیریت باشگاه</Text>
          </View>

          <View style={styles.card}>
            <form
                onSubmit={handleSubmit(handleLogin, console.error)}
                className='flex flex-col justify-center items-center gap-6 my-4'
            >
              <Controller
                  control={control}
                  name='username'
                  render={({field, fieldState: {error}}) => (
                      <Input
                          {...field}
                          onChange={value => {
                            field.onChange(value);
                          }}
                          placeholder={'User name'}
                          className='w-full'
                          errorMessage={!!error?.message ? error.message : undefined}
                      />
                  )}
              />
              <Controller
                  control={control}
                  name='password'
                  render={({field, fieldState: {error}}) => (
                      <Input
                          {...field}
                          onChange={value => {
                            field.onChange(value);
                          }}
                          placeholder={'Password'}
                          className='w-full [&>div]:bg-white rounded-2xl'
                          errorMessage={!!error?.message ? error.message : undefined}
                      />
                  )}
              />
              <Button
                  type='submit'
                  variant='secondary'
                  className='w-full'
                  loading={loading}
              >
                submit
              </Button>
            </form>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
        "#f5f5f5",
    width: Dimensions.get("window").width
  }
  ,
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    color: "#2196F3",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  inputContainer: {
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#2196F3",
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
})
