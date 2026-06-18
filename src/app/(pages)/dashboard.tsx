import { useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  Text,
  Dimensions,
} from "react-native"
import { apiService } from "@/services/apiService"

interface SportList {
  sport: string,
  arena_type: string,
  arena_name: string,
  start_time: string,
  end_time: string,
  status: string,
  location: {
    lat: string,
    lng: string
  }
}

export default function Dashboard() {
  const [data, setData] = useState<SportList[]>([])
  const [listData, setListData] = useState<SportList[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [data, listData] = await Promise.all([apiService.getMyAvailable(), apiService.getAvailableList()])
      setData(data?.data)
      setListData(listData?.data)
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

  const StatCard = ({ name, sport, status, date, cardType }: any) => (
      <View style={styles.statCard}>
        <View style={styles.statContent}>
          <View className='flex justify-center'>
            <Text style={styles.statTitle} className='font-yekan'>ورزش</Text>
            <Text style={styles.statValue}>{sport}</Text>
          </View>
          <View className='flex justify-center'>
            <Text style={styles.statTitle}>مکان</Text>
            <Text style={styles.statValue}>{name}</Text>
          </View>
          <View className='flex justify-center'>
            <Text style={styles.statTitle}>وضعیت</Text>
            <Text style={styles.statValue}>{status}</Text>
          </View>
        </View>
        <View style={styles.statContent}>
          <Text style={styles.statTitle}>تاریخ</Text>
          <Text style={styles.statValue}>{date}</Text>
        </View>
      </View>
  )

  return (
      <ScrollView
          style={styles.container}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text className='text-2xl text-primary font-yekanBold mt-4'>بازی های من</Text>
        <View className='flex mt-4'>
          {data?.map((item, index) => {
            return <StatCard key={index} name={item.arena_name} sport={item.sport} status={item.status} date={item.start_time} />
          })}
        </View>
        <Text className='text-2xl text-primary font-yekanBold mt-4'>بازی های پیشنهادی</Text>
        <View className='flex mt-4'>
          {listData?.map((item, index) => {
            return <StatCard key={index} name={item.arena_name} sport={item.sport} status={item.status} date={item.start_time} />
          })}
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width  * 0.95,
    margin: 'auto',
  },
  statCard: {
    backgroundColor: "#dbeaff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderRightWidth: 6,
    borderRightColor: "#1E5A99",
    boxShadow: "0px 4px 10px rgba(30, 90, 153, 0.12)",
    elevation: 3,
    gap: 20
  },
  statContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E5A99",
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'YekanBakh',
  },

  statValue: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    fontFamily: 'YekanBakh',
    display: 'flex',
    textTransform: 'capitalize',
    justifyContent: 'center'
  },
})
