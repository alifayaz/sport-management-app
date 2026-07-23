import { useState } from 'react';
import {
  StyleSheet,
  Alert,
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
import JalaliReservationPicker from '@/components/ui/jalaliDateTimePicker';
import LeafletMap from '@/components/leafletMap';
import { useAuth } from '@/hooks/auth';

export default function CreateGame() {
  useAuth();
  const { handleSubmit, control, resetField, watch, setValue } = useForm({
    resolver: zodResolver(createAvailabilitySchema),
    defaultValues: {
      sport: 'football',
      latitude: 0,
      longitude: 0,
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
      resetField('sport');
      resetField('start_time');
      resetField('arena_type');
      resetField('arena_name');
      resetField('duration');
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
      <View className="flex gap-4 px-4 pb-24">
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
        <View className="flex-row flex-wrap -mx-2">
          <View className="w-1/2 px-2 mb-4">
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
          </View>
          <View className="w-1/2 px-2 mb-4">
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
          </View>
        </View>
        <View className="flex-row flex-wrap -mx-2">
          <View className="w-1/2 px-2">
            <Controller
              control={control}
              name="start_time"
              render={({ field, fieldState: { error } }) => (
                <JalaliReservationPicker
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date.toISOString())}
                />
              )}
            />
          </View>

          <View className="w-1/2 px-2 mb-4">
            <Controller
              control={control}
              name="duration"
              render={({ field, fieldState: { error } }) => (
                <CustomDropdown
                  label="مدت زمان"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  error={error?.message}
                  data={[
                    { label: 'یک ساعت', value: '60' },
                    { label: 'یک ساعت و نیم', value: '90' },
                    { label: 'دو ساعت', value: '120' },
                    { label: 'دو ساعت و نیم', value: '150' },
                    { label: 'سه ساعت', value: '180' },
                  ]}
                />
              )}
            />
          </View>
        </View>
        <View>
          <Text>
            موقعیت مکانی خود را میتوانید با ضربه زدن روی نقشه تغییر دهید.
          </Text>
        </View>
        <LeafletMap
          onLocationChange={(lat, lng) => {
            setValue('latitude', lat, {
              shouldDirty: true,
              shouldValidate: true,
            });

            setValue('longitude', lng, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
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
