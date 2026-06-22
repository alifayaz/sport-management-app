import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { apiService } from '@/services/apiService';
import MyCard from '@/components/myCard';
import { MatchData } from '@/types/schemas';
import NoData from '@/components/common/noData';
import { router, useFocusEffect } from 'expo-router';

export default function MyGames() {
  const [data, setData] = useState<MatchData>();
  const [historyData, setHistoryData] = useState<MatchData[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      const [data, historyData] = await Promise.all([
        apiService.getMatchActive(),
        apiService.getMatchHistory(),
      ]);
      setData(data?.data);
      setHistoryData(historyData?.data);
    } catch (error) {
      if (error) {
        Alert.alert('خطا', error.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelGame = async (id: string) => {
    Alert.alert('خروج', 'آیا مطمئن هستید که می‌خواهید بازی را لغو کنید؟', [
      { text: 'خیر', style: 'cancel' },
      {
        text: 'بله',
        style: 'destructive',
        onPress: async () => {
          setLoadingId(id);
          try {
            await apiService.postCancelGame(id);
            await loadData();
            Alert.alert('موفق', 'بازی شما لغو شد.');
          } catch (error) {
            if (error) {
              Alert.alert('خطا', error.toString());
            }
          } finally {
            setLoadingId(null);
          }
        },
      },
    ]);
  };

  const onDetail = async (id: string) => {
    router.push('/gameDetail');
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#1E5A99" />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 12,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Text className="text-xl text-primary font-yekanBold mt-4">
          بازی های من
        </Text>
        {data ? (
          <MyCard data={data} onDetail={onDetail} loading={loading} />
        ) : (
          <NoData />
        )}
      </View>

      <View>
        <Text className="text-xl text-primary font-yekanBold my-4">
          تاریخچه بازی های من
        </Text>
        {historyData?.length ? (
          historyData?.map((item, index) => {
            return <MyCard data={item} key={index} onDetail={onDetail} />;
          })
        ) : (
          <NoData />
        )}
      </View>
    </ScrollView>
  );
}
