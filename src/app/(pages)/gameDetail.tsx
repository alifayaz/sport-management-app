import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';
import { apiService } from '@/services/apiService';
import { MatchData, MatchStatus } from '@/types/schemas';
import { useFocusEffect } from 'expo-router';
import {
  getArenaTypeFa,
  getDuration,
  getSportNameFa,
  PRIMARY,
} from '@/utils/constant';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns-jalali';

export default function GameDetail() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MatchData>();

  const duration = getDuration(
    data ? data?.start_time : '',
    data ? data?.end_time : '',
  );

  const StatusBadge = ({ status }: { status: MatchStatus }) => {
    const map = {
      accepted: {
        label: 'پذیرفته شده',
        bg: 'bg-green-50',
        text: 'text-green-600',
        icon: 'checkmark-circle-outline',
      },
      active: {
        label: 'فعال',
        bg: 'bg-green-50',
        text: 'text-green-600',
        icon: 'checkmark-circle-outline',
      },
      expire: {
        label: 'منقضی شده',
        bg: 'bg-gray-100',
        text: 'text-gray-400',
        icon: 'close-circle-outline',
      },
      waiting: {
        label: 'در انتظار',
        bg: 'bg-yellow-50',
        text: 'text-yellow-600',
        icon: 'time-outline',
      },
      canceled: {
        label: 'کنسل شده',
        bg: 'bg-red-50',
        text: 'text-red-600',
        icon: 'close-circle-outline',
      },
      completed: {
        label: 'تکمیل شده',
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        icon: 'checkmark-circle-outline',
      },
    } as const;

    const item = map[status];

    return (
      <View
        className={`flex-row items-center px-3 py-1 rounded-2xl ${item?.bg}`}
      >
        <Ionicons name={item?.icon as any} size={14} color={PRIMARY} />
        <Text className={`text-xs font-yekan mr-1 ${item?.text}`}>
          {item?.label}
        </Text>
      </View>
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

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
    >
      <View>
        <Text className="text-xl text-primary font-yekanBold my-4">
          جزئیات بازی
        </Text>
      </View>
      {data && (
        <View className="bg-white mt-4">
          {/* HEADER */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl text-[#1E5A99] font-yekanBold">
                {getSportNameFa(data?.sport)}
              </Text>

              <View className="flex-row items-center mt-1">
                <Ionicons name="location-outline" size={14} color="#94a3b8" />
                <Text className="text-slate-400 text-xs mr-1 font-yekan">
                  {data?.arena_name}
                </Text>
              </View>
            </View>

            <StatusBadge status={data?.status} />
          </View>

          {/* INFO GRID */}
          <View className="mt-5 space-y-3">
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="stadium"
                size={18}
                color={PRIMARY}
              />
              <Text className="text-slate-600 mr-2 font-yekan">
                نوع زمین: {getArenaTypeFa(data.arena_type)}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Feather name="clock" size={18} color={PRIMARY} />
              <Text className="text-slate-600 mr-2 font-yekan">
                مدت زمان: {duration}
              </Text>
            </View>

            <View className="flex-row items-center gap-2">
              <Feather name="calendar" size={18} color={PRIMARY} />
              <Text className="text-slate-600 font-yekan text-xs">
                {format(data?.start_time, 'dd MMMM yyyy')} ساعت:
                {format(data?.start_time, 'HH:mm')}
              </Text>
              <Ionicons name="arrow-back" size={15} />
              <Text className="text-slate-600 font-yekan text-xs">
                {format(data?.end_time, 'dd MMMM yyyy')} ساعت:
                {format(data?.end_time, 'HH:mm')}
              </Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
