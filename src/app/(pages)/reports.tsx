import { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl, Alert, Text } from 'react-native';
import { apiService } from '@/services/apiService';
import { useAuth } from '@/hooks/auth';

interface Data {
  totalMembers: number;
  activeMembers: number;
  unpaidMembers: number;
  totalRevenue: number;
  monthlyExpenses: number;
}

export default function Reports() {
  useAuth();
  const [data, setData] = useState<Data>();

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await apiService.getMatchActive();
      setData(data?.data);
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
    await loadData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 12,
        paddingBottom: 100, // fallback
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Text>test</Text>
      </View>
    </ScrollView>
  );
}
