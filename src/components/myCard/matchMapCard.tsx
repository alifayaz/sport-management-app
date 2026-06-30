import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import LeafletMap from '../leafletMap';

type Props = {
  latitude: number;
  longitude: number;
};

export default function MatchMapCard({ latitude, longitude }: Props) {
  return (
    <View className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm mt-5">
      <View className="flex-row items-center mb-4">
        <View className="bg-blue-100 h-10 w-10 rounded-xl items-center justify-center">
          <Ionicons name="location" size={20} color="#2563EB" />
        </View>

        <Text className="font-yekanBold text-lg text-slate-800 mr-3">
          موقعیت زمین
        </Text>
      </View>

      <View className="overflow-hidden rounded-2xl">
        <LeafletMap
          latitude={latitude}
          longitude={longitude}
          editable={false}
          showCurrentLocationButton={false}
        />
      </View>
    </View>
  );
}
