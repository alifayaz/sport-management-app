import React, { useMemo, useState } from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { toJalaali, toGregorian } from 'jalaali-js';

type Props = {
  value?: Date;
  onChange: (date: Date) => void;
};

const months = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

function getDaysInMonth(jy: number, jm: number) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;
  return 29;
}

function toJalaliToday() {
  const now = new Date();
  return toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

function jalaliToDate(jy: number, jm: number, jd: number) {
  const g = toGregorian(jy, jm, jd);
  return new Date(g.gy, g.gm - 1, g.gd);
}

export default function JalaliReservationPicker({ value, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  const today = toJalaliToday();

  const [current, setCurrent] = useState(today);

  const [selected, setSelected] = useState<{
    jy: number;
    jm: number;
    jd: number;
  } | null>(null);

  const [hour, setHour] = useState(value?.getHours() ?? 0);
  const [minute, setMinute] = useState(value?.getMinutes() ?? 0);

  const days = useMemo(() => {
    const count = getDaysInMonth(current.jy, current.jm);

    return Array.from({ length: count }).map((_, i) => ({
      jy: current.jy,
      jm: current.jm,
      jd: i + 1,
    }));
  }, [current]);

  const isBeforeToday = (d: any) => {
    if (d.jy < today.jy) return true;
    if (d.jy === today.jy && d.jm < today.jm) return true;
    if (d.jy === today.jy && d.jm === today.jm && d.jd < today.jd) return true;
    return false;
  };

  const confirm = () => {
    if (!selected) return;

    const date = jalaliToDate(selected.jy, selected.jm, selected.jd);

    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);

    onChange(date);
    setVisible(false);
  };

  const isSame = (a: any, b: any) =>
    a?.jy === b?.jy && a?.jm === b?.jm && a?.jd === b?.jd;

  const renderPicker = (
    list: number[],
    value: number,
    onChange: (v: number) => void,
  ) => {
    return (
      <View style={{ height: 160 }}>
        <ScrollView snapToInterval={44} decelerationRate="fast">
          {list.map((item) => {
            const selected = item === value;

            return (
              <Pressable
                key={item}
                onPress={() => onChange(item)}
                style={{
                  height: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginVertical: 4,
                  backgroundColor: selected ? '#dbeaff' : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: selected ? '#878787' : '#000',
                    fontSize: 16,
                    fontWeight: '600',
                    fontFamily: 'YekanBakh',
                  }}
                >
                  {String(item).padStart(2, '0')}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      {/* INPUT */}
      <Pressable
        onPress={() => setVisible(true)}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          backgroundColor: '#fff',
          padding: 14,
          borderRadius: 12,
        }}
      >
        <Text style={{ fontSize: 12, color: '#666', fontFamily: 'YekanBakh' }}>
          انتخاب تاریخ و ساعت
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: '700',
            marginTop: 4,
            fontFamily: 'YekanBakh',
          }}
        >
          {value
            ? (() => {
                const j = toJalaali(
                  value.getFullYear(),
                  value.getMonth() + 1,
                  value.getDate(),
                );
                return `${j.jy}/${j.jm}/${j.jd} ${hour}:${minute
                  .toString()
                  .padStart(2, '0')}`;
              })()
            : 'انتخاب نشده'}
        </Text>
      </Pressable>

      {/* MODAL */}
      <Modal visible={visible} animationType="slide">
        <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
          {/* HEADER */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Pressable
              onPress={() =>
                setCurrent((p) => ({
                  ...p,
                  jm: p.jm === 1 ? 12 : p.jm - 1,
                  jy: p.jm === 1 ? p.jy - 1 : p.jy,
                }))
              }
            >
              <Text style={{ fontSize: 22 }}>‹</Text>
            </Pressable>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                fontFamily: 'YekanBakh',
              }}
            >
              {months[current.jm - 1]} {current.jy}
            </Text>

            <Pressable
              onPress={() =>
                setCurrent((p) => ({
                  ...p,
                  jm: p.jm === 12 ? 1 : p.jm + 1,
                  jy: p.jm === 12 ? p.jy + 1 : p.jy,
                }))
              }
            >
              <Text style={{ fontSize: 22 }}>›</Text>
            </Pressable>
          </View>

          {/* WEEK ROW */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map((d) => (
              <Text
                key={d}
                style={{
                  width: 40,
                  textAlign: 'center',
                  color: '#888',
                  fontFamily: 'YekanBakh',
                }}
              >
                {d}
              </Text>
            ))}
          </View>

          {/* GRID */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
            {days.map((d, i) => {
              const disabled = isBeforeToday(d);

              const selectedItem = isSame(selected, d);

              return (
                <Pressable
                  key={i}
                  disabled={disabled}
                  onPress={() => setSelected(d)}
                  style={{
                    width: 40,
                    height: 40,
                    marginVertical: 4,
                    //marginHorizontal: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: disabled ? 0.25 : 1,
                  }}
                >
                  <View
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      backgroundColor: selectedItem ? '#dbeaff' : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: selectedItem ? '#878787' : '#000',
                        fontWeight: '600',
                        fontFamily: 'YekanBakh',
                      }}
                    >
                      {d.jd}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View className="flex flex-row justify-between items-center mt-5 border border-gray-300 p-2 rounded-lg">
            <View className="w-1/3">
              {/* TIME PICKER */}
              <Text className="text-center font-yekan">ساعت</Text>

              {renderPicker(
                Array.from({ length: 24 }).map((_, i) => i),
                hour,
                setHour,
              )}
            </View>

            <View className="w-1/3">
              <Text className="text-center font-yekan">دقیقه</Text>

              {renderPicker(
                [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
                minute,
                setMinute,
              )}
            </View>
          </View>

          {/* ACTIONS */}
          <View className="flex flex-row mt-20 gap-20">
            <Pressable
              onPress={() => setVisible(false)}
              style={{
                flex: 1,
                padding: 14,
                backgroundColor: '#eee',
                borderRadius: 10,
              }}
            >
              <Text className="text-center font-yekan">انصراف</Text>
            </Pressable>

            <Pressable
              onPress={confirm}
              style={{
                flex: 1,
                padding: 14,
                backgroundColor: '#2563eb',
                borderRadius: 10,
              }}
            >
              <Text className="text-center text-white font-yekan">تایید</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}
