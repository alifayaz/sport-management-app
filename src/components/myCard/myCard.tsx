import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns-jalali';

import { MatchData } from '@/types/schemas';
import {
  getArenaTypeFa,
  getDuration,
  getSportNameFa,
  PRIMARY,
} from '@/utils/constant';

import StatusBadge from './statusBadge';

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

type InfoRowProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
};

const InfoRow = ({ icon, title, value }: InfoRowProps) => (
  <View className="flex-row items-center mt-4">
    <View className="h-10 w-10 rounded-xl bg-slate-100 items-center justify-center">
      {icon}
    </View>

    <View className="mr-3 flex-1">
      <Text className="text-slate-400 text-xs font-yekan">{title}</Text>

      <Text className="text-slate-700 font-yekanBold mt-1">{value}</Text>
    </View>
  </View>
);

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

  const showDetailButton =
    data.status !== 'waiting' && !offerPage && !requestPage;

  const showJoinButton = data.status === 'waiting' && offerPage;

  const showCancelButton = data.status === 'waiting' && requestPage;

  return (
    <View
      className={`
rounded-3xl
p-5
mt-4
border
shadow-sm

  ${historyPage ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-100'}
  `}
    >
      {/* Header */}

      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="text-2xl text-primary font-yekanBold">
            {getSportNameFa(data.sport)}
          </Text>

          <View className="flex-row items-center mt-2">
            <Ionicons name="location-outline" size={16} color="#94A3B8" />

            <Text
              numberOfLines={1}
              className="mr-2 text-slate-500 text-sm font-yekan flex-1"
            >
              {data.arena_name}
            </Text>
          </View>
        </View>

        <StatusBadge status={data.status} />
      </View>

      {/* Divider */}

      <View className="h-px bg-slate-100 my-5" />

      {/* Information */}

      <InfoRow
        icon={<Ionicons name="calendar-outline" size={20} color="#F59E0B" />}
        title="تاریخ"
        value={format(data.start_time, 'dd MMMM yyyy')}
      />

      <InfoRow
        icon={<Feather name="clock" size={20} color="#10B981" />}
        title="زمان"
        value={`${format(data.start_time, 'HH:mm')} تا ${format(
          data.end_time,
          'HH:mm',
        )}`}
      />

      <InfoRow
        icon={
          <MaterialCommunityIcons name="stadium" size={20} color={PRIMARY} />
        }
        title="زمین"
        value={`${getArenaTypeFa(data.arena_type)} • ${duration}`}
      />

      {/* Footer */}
      <View className="mt-6 pt-4 border-t border-slate-100">
        {/* جزئیات بازی */}
        {showDetailButton && (
          <Pressable
            onPress={() => onDetail?.(data.id)}
            className="flex-row items-center justify-center active:opacity-70"
          >
            <Text className="text-primary font-yekanBold text-base">
              مشاهده جزئیات
            </Text>

            <Ionicons
              name="arrow-back"
              size={18}
              color={PRIMARY}
              style={{ marginRight: 6 }}
            />
          </Pressable>
        )}

        {/* پیوستن به بازی */}
        {showJoinButton && (
          <Pressable
            onPress={() => onConfirm?.(data.id)}
            disabled={loading}
            className="bg-primary rounded-2xl py-3 items-center active:opacity-80"
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View className="flex-row items-center">
                <Ionicons name="add-circle-outline" size={20} color="white" />

                <Text className="text-white font-yekanBold mr-2">
                  پیوستن به بازی
                </Text>
              </View>
            )}
          </Pressable>
        )}

        {/* لغو درخواست */}
        {showCancelButton && (
          <Pressable
            onPress={() => cancelGame?.(data.id)}
            disabled={cancelLoading}
            className="bg-red-500 rounded-2xl py-3 items-center active:opacity-80"
          >
            {cancelLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <View className="flex-row items-center">
                <Ionicons name="close-circle" size={20} color="white" />

                <Text className="text-white font-yekanBold mr-2">
                  لغو درخواست
                </Text>
              </View>
            )}
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default MyCard;
