import {useCallback, useState} from "react"
import {ActivityIndicator, Alert, Dimensions, RefreshControl, ScrollView, StyleSheet, View} from "react-native"
import {apiService} from "@/services/apiService"
import MyCard from "@/components/myCard";
import {MatchData} from "@/types/schemas";
import NoData from "@/components/common/noData";
import {useFocusEffect} from "expo-router";

export default function MyGames() {
  const [data, setData] = useState<MatchData[]>([])

  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

    useFocusEffect(
        useCallback(() => {
            loadData()
        }, [])
    );

  const loadData = async () => {
    try {
      const data = await apiService.getMyAvailable()
      setData(data?.data)
    } catch (error) {
        if (error) {
            Alert.alert("خطا", error.toString());
        }
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  return (
      loading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#1E5A99"/>
          </View>
      ) : (
          data?.length ? <ScrollView
              style={styles.container}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
              }
          >
            {data.map((item, index) => (
                <MyCard key={index} data={item} />
            ))}
          </ScrollView> : <NoData />
      )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width * 0.95,
    margin: 'auto',
  },
})
