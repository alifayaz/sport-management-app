import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
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
import { Ionicons } from '@expo/vector-icons';

export default function MyGames() {
  const [data, setData] = useState<MatchData>();
  const [historyData, setHistoryData] = useState<MatchData[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      const [data, historyData] = await Promise.allSettled([
        apiService.getMatchActive(),
        apiService.getMatchHistory(),
      ]);
      if (data.status === 'fulfilled') {
        setData(data.value.data);
      }

      if (historyData.status === 'fulfilled') {
        setHistoryData(historyData.value.data);
      }
      if (data.status === 'rejected') {
        Alert.alert('خطا', data.reason);
      }

      if (historyData.status === 'rejected') {
        Alert.alert('خطا', historyData.reason);
      }
    } finally {
      setLoading(false);
    }
  };

  const onDetail = async (id: string) => {
    router.push({
      pathname: '/gameDetail/[id]',
      params: { id },
    });
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
        <View className="flex flex-row justify-between items-center">
          <Text className="text-xl text-primary font-yekanBold mt-4">
            بازی های من
          </Text>
          <Pressable
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              }
            }}
            className="items-center flex-row justify-center mt-4"
          >
            <View className="flex flex-row items-center justify-center">
              <Text className="font-yekan mr-2">بازگشت</Text>
              <Ionicons name="arrow-back" size={18} />
            </View>
          </Pressable>
        </View>
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
