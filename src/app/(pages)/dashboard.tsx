import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { ScrollView, RefreshControl, Alert, View } from 'react-native';
import { apiService } from '@/services/apiService';
import { router } from 'expo-router';
import { DashboardInfo } from '@/types/schemas';
import DashboardStatCard from '@/components/dashboardStatCard';
import BestPlayersCard from '@/components/bestPlayersCard';

export default function Dashboard() {
  const [data, setData] = useState<DashboardInfo>();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, []),
  );

  const loadDashboardData = async () => {
    try {
      const listData = await apiService.getDashboardInfo();
      setData(listData?.data);
    } catch (error) {
      if (error) {
        Alert.alert('خطا', error.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 12,
        paddingBottom: 100,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="flex-row flex-wrap justify-between mt-4">
        <DashboardStatCard
          title="بازی‌های من"
          value={data?.my_match_count || 0}
          icon="game-controller-outline"
          color="#2563EB"
          loading={loading}
          onPress={() => router.push('/myGames')}
        />

        <DashboardStatCard
          title="پیشنهادها"
          value={data?.my_availability_count || 0}
          icon="sparkles-outline"
          color="#14B8A6"
          loading={loading}
          onPress={() => router.push('/offerGames')}
        />

        <DashboardStatCard
          title="لغو شده"
          value={data?.my_match_canceled || 0}
          icon="close-circle-outline"
          color="#EF4444"
          loading={loading}
          onPress={() => {}}
        />

        <DashboardStatCard
          title="تکمیل شده"
          value={data?.my_match_complete || 0}
          icon="checkmark-circle-outline"
          color="#22C55E"
          loading={loading}
          onPress={() => {}}
        />

        <DashboardStatCard
          title="بازیکنان"
          value={data?.players_count || 0}
          icon="people-outline"
          color="#F59E0B"
          loading={loading}
          onPress={() => {}}
        />

        <DashboardStatCard
          title="کل بازی‌های پایان یافته"
          value={data?.all_match_completed || 0}
          icon="trophy-outline"
          color="#8B5CF6"
          loading={loading}
          onPress={() => {}}
        />
      </View>
      <BestPlayersCard players={data?.best_players ?? []} />
    </ScrollView>
  );
}
