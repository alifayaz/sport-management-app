import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  count: number;
  onPress: () => void;
  icon: any;
  loading: boolean;
};

export default function DashboardCard({
  title,
  count,
  onPress,
  icon,
  loading,
}: Props) {
  return (
    <View className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mt-4">
      {/* Header */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xl text-primary font-yekanBold mt-4">
          {title}
        </Text>
        <View className="h-10 w-10 rounded-2xl bg-[#1E5A99]/10 items-center justify-center">
          <Text className="text-[#1E5A99] text-lg">
            <Ionicons name={icon} color="#FF5722" size={20} />
          </Text>
        </View>
      </View>

      {/* Count */}
      <View className="items-center py-6">
        <Text className="text-4xl font-bold text-[#1E5A99] font-yekan">
          {loading ? <ActivityIndicator color="#1E5A99" /> : count}
        </Text>

        <Text className="text-slate-400 text-sm mt-2 font-yekan">
          تعداد بازی‌ها
        </Text>
      </View>

      {/* Action */}
      <Pressable
        onPress={onPress}
        className="bg-[#1E5A99] rounded-2xl py-3 items-center active:opacity-80"
      >
        <Text className="text-white font-semibold font-yekan">
          دیدن بازی‌ها
        </Text>
      </Pressable>
    </View>
  );
}
