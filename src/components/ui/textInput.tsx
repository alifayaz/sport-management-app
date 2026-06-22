import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type InputType = 'text' | 'password' | 'number' | 'phone' | 'email';

interface CustomTextInputProps extends TextInputProps {
  error?: string;
  type?: InputType;
  containerClassName?: string;
  inputClassName?: string;
}

export default function CustomTextInput({
  error,
  type = 'text',
  containerClassName = '',
  inputClassName = '',
  ...props
}: CustomTextInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getKeyboardType = () => {
    switch (type) {
      case 'phone':
        return 'phone-pad';

      case 'number':
        return 'numeric';

      case 'email':
        return 'email-address';

      default:
        return 'default';
    }
  };

  return (
    <View>
      <View
        className={`border rounded-md flex-row items-center px-2 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${containerClassName}`}
      >
        <TextInput
          {...props}
          keyboardType={getKeyboardType()}
          autoCapitalize={type === 'email' ? 'none' : 'sentences'}
          secureTextEntry={type === 'password' && !showPassword}
          className={`flex-1 h-12 font-yekan ${inputClassName}`}
        />

        {type === 'password' && (
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="gray"
            />
          </Pressable>
        )}
      </View>

      {!!error && (
        <Text className="text-red-500 text-xs mt-1 font-yekan">{error}</Text>
      )}
    </View>
  );
}
