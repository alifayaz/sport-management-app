import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value: string;
  color?: string;
};

export default function MatchInfoCard({
  icon,
  title,
  value,
  color = '#2563EB',
}: Props) {
  return (
    <View className="bg-white rounded-2xl p-4 border border-slate-100 w-[48%] mb-4 shadow-sm">
      {/* Icon */}
      <View
        style={{
          backgroundColor: `${color}15`,
        }}
        className="h-11 w-11 rounded-xl items-center justify-center"
      >
        <Ionicons name={icon} size={22} color={color} />
      </View>

      {/* Title */}
      <Text className="text-slate-400 text-xs font-yekan mt-4">{title}</Text>

      {/* Value */}
      <Text
        numberOfLines={2}
        className="text-slate-800 text-base font-yekanBold mt-1"
      >
        {value}
      </Text>
    </View>
  );
}
