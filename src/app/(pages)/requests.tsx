import { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
  Text,
  Dimensions,
} from 'react-native';
import { apiService } from '@/services/apiService';

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  unpaidMembers: number;
  totalRevenue: number;
  monthlyExpenses: number;
}

interface UnpaidMember {
  id: string;
  name: string;
  avatar?: string;
  daysOverdue: number;
  amount: number;
}

export default function Requests() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeMembers: 0,
    unpaidMembers: 0,
    totalRevenue: 0,
    monthlyExpenses: 0,
  });
  const [unpaidMembers, setUnpaidMembers] = useState<UnpaidMember[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //loadDashboardData()
  }, []);

  const loadDashboardData = async () => {
    try {
      const [statsData, unpaidData] = await Promise.all([
        apiService.getMyAvailable(),
        apiService.getUnpaidMembers(),
      ]);
      setStats(statsData);
      setUnpaidMembers(unpaidData);
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
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.statsGrid}>
        <Text>test</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: Dimensions.get('window').width,
  },
  statsGrid: {
    padding: 10,
  },
});
