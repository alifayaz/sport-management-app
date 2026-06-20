import AsyncStorage from "@react-native-async-storage/async-storage"
import { Redirect } from "expo-router";
import {useEffect, useState} from "react";

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
      isAuthenticated
          ? <Redirect href="/dashboard" />
          : <Redirect href="/login" />
  );
}
