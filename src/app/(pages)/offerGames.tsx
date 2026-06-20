import {useEffect, useState} from "react"
import {ActivityIndicator, Alert, RefreshControl, ScrollView, View} from "react-native"
import {apiService} from "@/services/apiService"
import MyCard from "@/components/myCard";
import {MatchData} from "@/types/schemas";
import NoData from "@/components/common/noData";

export default function OfferGames() {
  const [data, setData] = useState<MatchData[]>([])

  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)
    const [addGameLoading, setAddGameLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await apiService.getAvailableList()
      setData(data?.data)
    } catch (error) {
      Alert.alert("خطا", "خطا در بارگذاری اطلاعات")
    } finally {
      setLoading(false)
    }
  }

    const submitGame = async (id: string) => {
        setAddGameLoading(true)
        try {
            await apiService.postAvailable(id)
            await loadData()
        } catch (error) {
            Alert.alert("خطا", "خطا در تایید بازی")
        } finally {
            setAddGameLoading(false)
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
              }
          >
            {data.map((item, index) => (
                <MyCard key={index} data={item} onConfirm={submitGame} loading={addGameLoading} offerPage/>
            ))}
          </ScrollView>  : <NoData />
      )
  )
}
