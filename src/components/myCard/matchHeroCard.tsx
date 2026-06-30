import { View, Text } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import StatusBadge from './statusBadge';
import {
  getArenaTypeFa,
  getDuration,
  getSportNameFa,
  PRIMARY,
} from '@/utils/constant';
import { MatchData } from '@/types/schemas';

type Props = {
  data: MatchData;
};

export default function MatchHeroCard({ data }: Props) {
  const duration = getDuration(data.start_time, data.end_time);

  return (
    <View style={{ backgroundColor: PRIMARY }} className="rounded-3xl p-5 mt-4">
      {/* Status */}
      <View className="items-start">
        <StatusBadge status={data.status} />
      </View>

      {/* Sport */}
      <Text className="text-white text-3xl font-yekanBold mt-5">
        {getSportNameFa(data.sport)}
      </Text>

      {/* Arena */}
      <View className="flex-row items-center mt-2">
        <Feather name="map-pin" size={16} color="white" />

        <Text className="text-white/90 font-yekan mr-2 text-base">
          {data.arena_name}
        </Text>
      </View>

      {/* Bottom Cards */}
      <View className="flex-row justify-between mt-6">
        <View className="bg-white/15 rounded-2xl p-4 w-[48%]">
          <MaterialCommunityIcons name="stadium" size={22} color="white" />

          <Text className="text-white/70 text-xs mt-3 font-yekan">
            نوع زمین
          </Text>

          <Text className="text-white font-yekanBold mt-1">
            {getArenaTypeFa(data.arena_type)}
          </Text>
        </View>

        <View className="bg-white/15 rounded-2xl p-4 w-[48%]">
          <Feather name="clock" size={22} color="white" />

          <Text className="text-white/70 text-xs mt-3 font-yekan">
            مدت بازی
          </Text>

          <Text className="text-white font-yekanBold mt-1">{duration}</Text>
        </View>
      </View>
    </View>
  );
}
