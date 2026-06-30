import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Player = {
  id: string;
  first_name: string;
  last_name: string;
  rate: string;
};

type Props = {
  players: Player[];
};

export default function BestPlayersCard({ players }: Props) {
  return (
    <View className="bg-white rounded-2xl p-4 mt-4 border border-slate-100">
      <View className="flex-row items-center mb-4">
        <Ionicons name="trophy" size={22} color="#F59E0B" />

        <Text className="font-yekanBold text-lg mr-2">بهترین بازیکنان</Text>
      </View>

      {players.map((item, index) => (
        <View
          key={item.id}
          className={`flex-row justify-between items-center py-3 ${
            index !== players.length - 1 ? 'border-b border-slate-100' : ''
          }`}
        >
          <View className="flex-row items-center">
            <View className="bg-amber-100 h-8 w-8 rounded-full items-center justify-center">
              <Text className="font-bold text-amber-700">{index + 1}</Text>
            </View>

            <Text className="mr-3 font-yekan">
              {item.first_name} {item.last_name}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Text className="font-yekan ml-1">
              {Number(item.rate).toFixed(1)}
            </Text>

            <Ionicons name="star" color="#FBBF24" size={16} />
          </View>
        </View>
      ))}
    </View>
  );
}
