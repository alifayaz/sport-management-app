import { useState } from 'react';
import {
  StyleSheet,
  Alert,
  ScrollView,
  Text,
  Pressable,
  ActivityIndicator,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { apiService } from '@/services/apiService';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createAvailabilitySchema,
  CreateAvailabilityType,
} from '@/types/schemas';
import CustomTextInput from '@/components/ui/textInput';
import CustomDropdown from '@/components/ui/dropdown';

export default function CreateGame() {
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(createAvailabilitySchema),
    defaultValues: {
      sport: 'football',
      latitude: '0',
      longitude: '0',
      start_time: '',
      arena_type: 'outdoor',
      arena_name: '',
      duration: '0',
    },
  });
  const [loading, setLoading] = useState(false);

  const handleRegisterGame = async (body: CreateAvailabilityType) => {
    setLoading(true);
    try {
      await apiService.createGame(body);
      Alert.alert('موفق', 'ثبت بازی با موفقیت انجام شد');
      reset();
    } catch (error) {
      if (error) {
        Alert.alert('خطا', error.toString());
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 12,
          paddingBottom: 100, // fallback
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex gap-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl text-primary font-yekanBold mt-4">
              فرم ثبت درخواست بازی
            </Text>
          </View>
          <Controller
            control={control}
            name="arena_name"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="نام مکان برگزاری"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="arena_type"
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                label="نوع ورزشگاه"
                required
                value={field.value}
                onChange={field.onChange}
                error={error?.message}
                data={[
                  {
                    label: 'فضای باز',
                    value: 'outdoor',
                  },
                  {
                    label: 'سرپوشیده',
                    value: 'indoor',
                  },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="sport"
            render={({ field, fieldState: { error } }) => (
              <CustomDropdown
                label="ورزش"
                required
                value={field.value}
                onChange={field.onChange}
                error={error?.message}
                data={[
                  {
                    label: 'فوتبال',
                    value: 'football',
                  },
                  {
                    label: 'فوتسال',
                    value: 'futsal',
                  },
                  {
                    label: 'والیبال',
                    value: 'volleyball',
                  },
                  {
                    label: 'بدمینتون',
                    value: 'badminton',
                  },
                  {
                    label: 'پدل',
                    value: 'padel',
                  },
                  {
                    label: 'تنیس',
                    value: 'tennis',
                  },
                ]}
              />
            )}
          />
          <Controller
            control={control}
            name="start_time"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="تاریخ شروع"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="duration"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                type="number"
                onBlur={field.onBlur}
                placeholder="مدت زمان"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="latitude"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                type="number"
                onBlur={field.onBlur}
                placeholder="latitude"
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="longitude"
            render={({ field, fieldState: { error } }) => (
              <CustomTextInput
                value={field.value}
                onChangeText={field.onChange}
                type="number"
                onBlur={field.onBlur}
                placeholder="longitude"
                error={error?.message}
              />
            )}
          />
          <Pressable
            style={styles.button}
            onPress={handleSubmit(handleRegisterGame)}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>ثبت درخواست بازی</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
  },
  inputContainer: {
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: '#1E5A99',
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1E5A99',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'YekanBakh',
  },
});
