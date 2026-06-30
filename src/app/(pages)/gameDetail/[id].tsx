import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View } from 'react-native';
import { apiService } from '@/services/apiService';
import { MatchData } from '@/types/schemas';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { format } from 'date-fns-jalali';
import MatchHeroCard from '@/components/myCard/matchHeroCard';
import MatchInfoCard from '@/components/myCard/matchInfoCard';
import MatchMapCard from '@/components/myCard/matchMapCard';
import MatchActionCard from '@/components/myCard/matchActionCard';

export default function Id() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MatchData>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cancelLoading, setCancelLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [id]),
  );

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await apiService.getMatchDetail(id);
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
            await apiService.postCancelGame(id);
            await loadData();
            Alert.alert('موفق', 'بازی شما لغو شد.');
            router.push('/myGames');
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

  return loading ? (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#1E5A99" />
    </View>
  ) : (
    data && (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 12,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <MatchHeroCard data={data} />
        <View className="flex-row flex-wrap justify-between mt-5">
          <MatchInfoCard
            icon="calendar-outline"
            title="تاریخ شروع"
            value={format(data.start_time, 'dd MMMM yyyy')}
          />

          <MatchInfoCard
            icon="time-outline"
            title="ساعت شروع"
            value={format(data.start_time, 'HH:mm')}
            color="#10B981"
          />

          <MatchInfoCard
            icon="calendar-clear-outline"
            title="تاریخ پایان"
            value={format(data.end_time, 'dd MMMM yyyy')}
            color="#F59E0B"
          />

          <MatchInfoCard
            icon="time-outline"
            title="ساعت پایان"
            value={format(data.end_time, 'HH:mm')}
            color="#EF4444"
          />
        </View>
        <MatchMapCard
          latitude={parseFloat(data.latitude)}
          longitude={parseFloat(data.longitude)}
        />
        <MatchActionCard
          visible={data.status === 'accepted' || data.status === 'active'}
          loading={cancelLoading}
          onCancel={() => cancelGame(data.id)}
        />
      </ScrollView>
    )
  );
}
