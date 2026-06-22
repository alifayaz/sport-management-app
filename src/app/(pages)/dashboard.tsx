import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { ScrollView, RefreshControl, Alert } from 'react-native';
import { apiService } from '@/services/apiService';
import DashboardCard from '@/components/dashboardCard';
import { router } from 'expo-router';

interface SportList {
  sport: string;
  arena_type: string;
  arena_name: string;
  start_time: string;
  end_time: string;
  status: string;
  location: {
    lat: string;
    lng: string;
  };
}

export default function Dashboard() {
  const [listData, setListData] = useState<SportList[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadDashboardData();
    }, []),
  );

  const loadDashboardData = async () => {
    try {
      const listData = await apiService.getAvailableList();
      setListData(listData?.data);
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
      <DashboardCard
        title="بازی های من"
        count={1}
        icon="game-controller-outline"
        loading={loading}
        onPress={() => router.push('/myGames')}
      />
      <DashboardCard
        title="بازی های پیشنهادی"
        count={listData?.length}
        icon="sparkles-outline"
        loading={loading}
        onPress={() => router.push('/offerGames')}
      />
    </ScrollView>
  );
}
