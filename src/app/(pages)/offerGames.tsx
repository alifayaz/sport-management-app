import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { apiService } from '@/services/apiService';
import MyCard from '@/components/myCard/myCard';
import { MatchData } from '@/types/schemas';
import NoData from '@/components/common/noData';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/hooks/auth';

export default function OfferGames() {
  useAuth();
  const [data, setData] = useState<MatchData[]>([]);

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
      const data = await apiService.getAvailableList();
      setData(data?.data);
    } catch (error) {
      if (error) {
        Alert.alert('خطا', error.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  const submitGame = async (id: string) => {
    setLoadingId(id);
    try {
      await apiService.postAvailable(id);
      await loadData();
      Alert.alert(
        'موفق',
        'بازی شما با موفقیت تایید شد. برای دیدن یا کنسل کردن آن به صفحه بازی های من بروید',
      );
    } catch (error) {
      if (error) {
        Alert.alert('خطا', error.toString());
      }
    } finally {
      setLoadingId(null);
    }
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
  ) : data?.length ? (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 12,
        paddingBottom: 100, // fallback
      }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data.map((item, index) => (
        <MyCard
          key={index}
          data={item}
          onConfirm={submitGame}
          loading={loadingId === item.id}
          offerPage
        />
      ))}
    </ScrollView>
  ) : (
    <NoData />
  );
}
