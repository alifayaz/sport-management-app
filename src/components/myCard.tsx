import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MatchData, MatchStatus } from '@/types/schemas';
import {
  getArenaTypeFa,
  getDuration,
  getSportNameFa,
  PRIMARY,
} from '@/utils/constant';
import { format } from 'date-fns-jalali';

type Props = {
  data: MatchData;
  onConfirm?: (id: string) => void;
  onDetail?: (id: string) => void;
  loading?: boolean;
  offerPage?: boolean;
  requestPage?: boolean;
  cancelGame?: (id: string) => void;
  cancelLoading?: boolean;
  historyPage?: boolean;
};

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
    <View className={`flex-row items-center px-3 py-1 rounded-2xl ${item?.bg}`}>
      <Ionicons name={item?.icon as any} size={14} color={PRIMARY} />
      <Text className={`text-xs font-yekan mr-1 ${item?.text}`}>
        {item?.label}
      </Text>
    </View>
  );
};

const MyCard: React.FC<Props> = ({
  data,
  onConfirm,
  onDetail,
  loading,
  offerPage,
  requestPage,
  cancelGame,
  cancelLoading,
  historyPage,
}) => {
  const duration = getDuration(data.start_time, data.end_time);

  return (
    <View
      className={`bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-4 ${historyPage ? 'opacity-75' : 'opacity-100'}`}
    >
      {/* HEADER */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl text-[#1E5A99] font-yekanBold">
            {getSportNameFa(data.sport)}
          </Text>

          <View className="flex-row items-center mt-1">
            <Ionicons name="location-outline" size={14} color="#94a3b8" />
            <Text className="text-slate-400 text-xs mr-1 font-yekan">
              {data.arena_name}
            </Text>
          </View>
        </View>

        <StatusBadge status={data.status} />
      </View>

      {/* INFO GRID */}
      <View className="mt-5 space-y-3">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="stadium" size={18} color={PRIMARY} />
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
            {format(data.start_time, 'dd MMMM yyyy')} ساعت:
            {format(data.start_time, 'HH:mm')}
          </Text>
          <Ionicons name="arrow-back" size={15} />
          <Text className="text-slate-600 font-yekan text-xs">
            {format(data.end_time, 'dd MMMM yyyy')} ساعت:
            {format(data.end_time, 'HH:mm')}
          </Text>
        </View>
      </View>
      {data.status !== 'waiting' && !offerPage && !requestPage && (
        <Pressable
          onPress={() => onDetail?.(data.id)}
          className="mt-5 bg-[#1E5A99] rounded-xl py-3 items-center active:opacity-80 flex-row justify-center"
        >
          <View className="flex flex-row items-center justify-center">
            <Ionicons name="document-text-outline" size={18} color="white" />
            <Text className="text-white font-yekan mr-2">جزئیات بازی</Text>
          </View>
        </Pressable>
      )}

      {data.status === 'waiting' && offerPage && (
        <Pressable
          onPress={() => onConfirm?.(data.id)}
          className="mt-5 bg-[#1E5A99] rounded-2xl py-3 items-center active:opacity-80 flex-row justify-center"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View className="flex flex-row items-center justify-center">
              <Ionicons name="add" size={18} color="white" />
              <Text className="text-white font-yekan mr-2">پیوستن به بازی</Text>
            </View>
          )}
        </Pressable>
      )}
      {data.status === 'waiting' && requestPage && (
        <Pressable
          onPress={() => cancelGame?.(data.id)}
          className="mt-5 bg-red-400 rounded-xl py-3 items-center active:opacity-80 flex-row justify-center"
        >
          {cancelLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View className="flex flex-row items-center justify-center">
              <Ionicons name="close-circle-outline" size={18} color="white" />
              <Text className="text-white font-yekan mr-2">لغو بازی</Text>
            </View>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default MyCard;
