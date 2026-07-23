import React, { useCallback, useState } from 'react';
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

export default function Requests() {
  useAuth();
  const [data, setData] = useState<MatchData[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      const data = await apiService.getMyAvailable();
      setData(data?.data);
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
          try {
            setCancelLoading(true);
            await apiService.postCancelMyGame(id);
            Alert.alert('موفق', 'بازی شما لغو شد.');
            await loadData();
          } catch (error) {
            if (error) {
              Alert.alert('خطا', error.toString());
            }
          } finally {
            setCancelLoading(false);
          }
        },
      },
    ]);
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
        {data?.length ? (
          data?.map((item, index) => (
            <MyCard
              key={index}
              data={item}
              requestPage
              cancelGame={cancelGame}
              cancelLoading={cancelLoading}
            />
          ))
        ) : (
          <NoData />
        )}
      </View>
    </ScrollView>
  );
}
