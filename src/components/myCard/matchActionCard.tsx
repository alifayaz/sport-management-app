import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  loading: boolean;
  onCancel: () => void;
};

export default function MatchActionCard({ visible, loading, onCancel }: Props) {
  if (!visible) return null;

  return (
    <View className="mt-6">
      <Pressable
        onPress={onCancel}
        disabled={loading}
        className="bg-red-500 rounded-2xl py-4 active:opacity-80"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View className="flex-row items-center justify-center">
            <Ionicons name="close-circle" size={22} color="white" />

            <Text className="text-white font-yekanBold text-base mr-2">
              لغو بازی
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}
