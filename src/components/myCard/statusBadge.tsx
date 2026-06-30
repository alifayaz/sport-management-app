import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { MatchStatus } from '@/types/schemas';

type Props = {
  status: MatchStatus;
};

const STATUS_MAP = {
  accepted: {
    label: 'پذیرفته شده',
    bg: '#DCFCE7',
    text: '#15803D',
    icon: 'checkmark-circle',
  },
  active: {
    label: 'فعال',
    bg: '#DBEAFE',
    text: '#2563EB',
    icon: 'play-circle',
  },
  waiting: {
    label: 'در انتظار',
    bg: '#FEF3C7',
    text: '#D97706',
    icon: 'time',
  },
  completed: {
    label: 'تکمیل شده',
    bg: '#E0F2FE',
    text: '#0284C7',
    icon: 'trophy',
  },
  canceled: {
    label: 'لغو شده',
    bg: '#FEE2E2',
    text: '#DC2626',
    icon: 'close-circle',
  },
  expire: {
    label: 'منقضی شده',
    bg: '#F1F5F9',
    text: '#64748B',
    icon: 'hourglass',
  },
} as const;

export default function StatusBadge({ status }: Props) {
  const item = STATUS_MAP[status];

  return (
    <View
      style={{
        backgroundColor: item.bg,
      }}
      className="self-start rounded-full px-4 py-2 flex-row items-center"
    >
      <Ionicons name={item.icon as any} size={16} color={item.text} />

      <Text
        style={{
          color: item.text,
        }}
        className="font-yekanBold text-xs mr-2"
      >
        {item.label}
      </Text>
    </View>
  );
}
