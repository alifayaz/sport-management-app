import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { apiService } from '@/services/apiService';
import MyCard from '@/components/myCard';
import { MatchData } from '@/types/schemas';
import NoData from '@/components/common/noData';
import { useFocusEffect } from 'expo-router';

export default function MyGames() {
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
      style={styles.container}
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
          onCancel={cancelGame}
          loading={loadingId === item.id}
        />
      ))}
    </ScrollView>
  ) : (
    <NoData />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    width: Dimensions.get('window').width * 0.95,
    margin: 'auto',
    marginBottom: 20,
  },
});
