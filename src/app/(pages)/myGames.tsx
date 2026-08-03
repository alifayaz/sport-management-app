import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { apiService } from '@/services/apiService';
import { MatchData } from '@/types/schemas';

import MyCard from '@/components/myCard/myCard';
import NoData from '@/components/common/noData';

import { Ionicons } from '@expo/vector-icons';

export default function MyGames() {
  const [activeMatch, setActiveMatch] = useState<MatchData>();
  const [history, setHistory] = useState<MatchData[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    try {
      const [active, historyResult] = await Promise.allSettled([
        apiService.getMatchActive(),
        apiService.getMatchHistory(),
      ]);

      if (active.status === 'fulfilled') {
        setActiveMatch(active.value?.data);
      }

      if (historyResult.status === 'fulfilled') {
        setHistory(historyResult.value?.data);
      }

      if (active.status === 'rejected') {
        Alert.alert('خطا', active.reason?.toString());
      }

      if (historyResult.status === 'rejected') {
        Alert.alert('خطا', historyResult.reason?.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const onDetail = (id: string) => {
    router.push({
      pathname: '/gameDetail/[id]',
      params: { id },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#1E5A99" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 100,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}

      <View className="mb-6">
        <Text className="font-yekanBold text-xl text-primary">
          مدیریت بازی‌های فعال و تاریخچه
        </Text>
      </View>

      {/* Active Match */}

      <View className="mb-8">
        <View className="flex-row items-center mb-3">
          <Ionicons name="football-outline" size={22} color="#2563EB" />

          <Text className="font-yekanBold text-xl mr-2">بازی فعال</Text>
        </View>

        {activeMatch ? (
          <MyCard data={activeMatch} onDetail={onDetail} />
        ) : (
          <NoData />
        )}
      </View>

      {/* History */}

      <View>
        <View className="flex-row items-center mb-3">
          <Ionicons name="time-outline" size={22} color="#64748B" />

          <Text className="font-yekanBold text-xl mr-2">تاریخچه بازی‌ها</Text>
        </View>

        {history.length ? (
          history.map((item) => (
            <MyCard key={item.id} data={item} onDetail={onDetail} />
          ))
        ) : (
          <NoData />
        )}
      </View>
    </ScrollView>
  );
}
