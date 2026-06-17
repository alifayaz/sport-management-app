import { useState, useEffect } from "react"
import { router } from "expo-router";
import {View, StyleSheet, ScrollView, RefreshControl, Alert, Text, Dimensions, Platform, Button} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { apiService } from "@/services/apiService"
import HamburgerMenu from "@/components/hamburgerMenu";


interface DashboardStats {
  totalMembers: number
  activeMembers: number
  unpaidMembers: number
  totalRevenue: number
  monthlyExpenses: number
}

interface UnpaidMember {
  id: string
  name: string
  avatar?: string
  daysOverdue: number
  amount: number
}

export default function Reports() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeMembers: 0,
    unpaidMembers: 0,
    totalRevenue: 0,
    monthlyExpenses: 0,
  })
  const [unpaidMembers, setUnpaidMembers] = useState<UnpaidMember[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsData, unpaidData] = await Promise.all([apiService.getDashboardStats(), apiService.getUnpaidMembers()])
      setStats(statsData)
      setUnpaidMembers(unpaidData)
    } catch (error) {
      Alert.alert("خطا", "خطا در بارگذاری اطلاعات")
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  const handleLogout = async () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm(
          "آیا مطمئن هستید که می‌خواهید خارج شوید؟"
      );

      if (confirmed) {
        await AsyncStorage.clear();
      }
    } else {
      Alert.alert(
          "خروج",
          "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
          [
            { text: "لغو", style: "cancel" },
            {
              text: "خروج",
              style: "destructive",
              onPress: async () => {
                await AsyncStorage.clear();
                router.replace("/");
              },
            },
          ]
      );
    }
    router.replace("/");
  };

  const StatCard = ({ title, value, color }: any) => (
      <View style={[styles.statCard, { borderLeftColor: color }]}>
        <View style={styles.statContent}>
          <View>
            <Text style={styles.statValue}>{value.toLocaleString()}</Text>
            <Text style={styles.statTitle}>{title}</Text>
          </View>
        </View>
      </View>
  )

  return (
      <ScrollView
          style={styles.container}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.header}>
          <HamburgerMenu />
          <Text style={styles.welcomeText}>
            گزارشات
          </Text>
          <Button
              title='خروج'
              onPress={handleLogout}
          />
        </View>

        <View style={styles.statsGrid}>

        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    elevation: 2,
  },
  welcomeText: {
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#F44336",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  statsGrid: {
    padding: 10,
  },
  statCard: {
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    elevation: 3,
  },
  statContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  unpaidCard: {
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    marginBottom: 15,
    color: "#333",
  },
  noDataText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    padding: 20,
  },
})
