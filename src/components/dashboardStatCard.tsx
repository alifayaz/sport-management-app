import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  value: number;
  icon: any;
  color: string;
  onPress: () => void;
  loading: boolean;
};

export default function DashboardStatCard({
  title,
  value,
  icon,
  color,
  onPress,
  loading,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl p-4 w-[48%] mb-4 border border-slate-100 active:opacity-80"
    >
      <View className="flex-row justify-between items-center">
        <View
          style={{ backgroundColor: `${color}20` }}
          className="h-10 w-10 rounded-xl items-center justify-center"
        >
          <Ionicons name={icon} size={20} color={color} />
        </View>

        {loading ? (
          <ActivityIndicator color={color} />
        ) : (
          <Text style={{ color }} className="text-3xl font-yekanBold">
            {value}
          </Text>
        )}
      </View>

      <Text className="font-yekan text-slate-500 mt-4">{title}</Text>
    </Pressable>
  );
}
