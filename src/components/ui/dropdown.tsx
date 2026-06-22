import React, { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface DropdownItem {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  data: DropdownItem[];
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export default function CustomDropdown({
  label,
  required,
  placeholder = 'انتخاب کنید',
  value,
  data,
  error,
  disabled = false,
  onChange,
}: CustomDropdownProps) {
  const [visible, setVisible] = useState(false);

  const selectedItem = useMemo(
    () => data.find((item) => item.value === value),
    [value, data],
  );

  return (
    <View className="gap-1">
      {label && (
        <View className="flex-row gap-1">
          <Text className="font-yekan text-gray-700">{label}</Text>

          {required && <Text className="text-red-500">*</Text>}
        </View>
      )}

      <Pressable
        disabled={disabled}
        onPress={() => setVisible(true)}
        className={`
          h-12
          border
          rounded-md
          px-3
          flex-row
          items-center
          gap-2
          ${disabled ? 'bg-gray-100' : 'bg-white'}
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        <Ionicons name="chevron-down-outline" size={20} color="#6b7280" />

        <Text
          className={`font-yekan ${
            selectedItem ? 'text-black' : 'text-gray-400'
          }`}
        >
          {selectedItem?.label ?? placeholder}
        </Text>
      </Pressable>

      {error && (
        <Text className="text-red-500 text-xs font-yekan">{error}</Text>
      )}

      <Modal transparent animationType="fade" visible={visible}>
        <Pressable
          className="flex-1 bg-black/40 justify-center px-5"
          onPress={() => setVisible(false)}
        >
          <Pressable
            className="bg-white rounded-xl overflow-hidden"
            onPress={(e) => e.stopPropagation()}
          >
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const active = item.value === value;

                return (
                  <Pressable
                    className={`
                      px-4
                      py-4
                      border-b
                      border-gray-100
                      flex-row
                      justify-between
                    `}
                    onPress={() => {
                      onChange(item.value);
                      setVisible(false);
                    }}
                  >
                    <Text className="font-yekan">{item.label}</Text>
                    {active && (
                      <Ionicons name="checkmark" size={20} color="#2563eb" />
                    )}
                  </Pressable>
                );
              }}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
