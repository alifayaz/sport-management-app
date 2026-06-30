import React, { useMemo, useState } from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import { toJalaali, toGregorian, isLeapJalaaliYear } from 'jalaali-js';

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

const weekDays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

function getDaysInMonth(jy: number, jm: number) {
  if (jm <= 6) return 31;
  if (jm <= 11) return 30;

  return isLeapJalaaliYear(jy) ? 30 : 29;
}

function jalaliToDate(jy: number, jm: number, jd: number) {
  const g = toGregorian(jy, jm, jd);

  return new Date(g.gy, g.gm - 1, g.gd);
}

function toJalaliToday() {
  const now = new Date();

  return toJalaali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

/**
 * شنبه = 0
 * یکشنبه = 1
 * ...
 * جمعه = 6
 */
function getFirstDayOffset(jy: number, jm: number) {
  const g = toGregorian(jy, jm, 1);

  const date = new Date(Date.UTC(g.gy, g.gm - 1, g.gd));

  // Saturday = 0
  return (date.getUTCDay() + 1) % 7;
}

type CalendarDay = {
  jy: number;
  jm: number;
  jd: number;
  current: boolean;
};

export default function JalaliReservationPicker({ value, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  const today = toJalaliToday();

  const [current, setCurrent] = useState(today);

  const [selected, setSelected] = useState<{
    jy: number;
    jm: number;
    jd: number;
  } | null>(
    value
      ? toJalaali(value.getFullYear(), value.getMonth() + 1, value.getDate())
      : null,
  );

  const [hour, setHour] = useState(value?.getHours() ?? 0);

  const [minute, setMinute] = useState(value?.getMinutes() ?? 0);

  const isSame = (a: any, b: any) =>
    a?.jy === b?.jy && a?.jm === b?.jm && a?.jd === b?.jd;

  const isBeforeToday = (d: any) => {
    if (d.jy < today.jy) return true;

    if (d.jy === today.jy && d.jm < today.jm) return true;

    if (d.jy === today.jy && d.jm === today.jm && d.jd < today.jd) return true;

    return false;
  };

  const calendarDays = useMemo(() => {
    const offset = getFirstDayOffset(current.jy, current.jm);

    const currentMonthDays = getDaysInMonth(current.jy, current.jm);

    const prev =
      current.jm === 1
        ? {
            jy: current.jy - 1,
            jm: 12,
          }
        : {
            jy: current.jy,
            jm: current.jm - 1,
          };

    const next =
      current.jm === 12
        ? {
            jy: current.jy + 1,
            jm: 1,
          }
        : {
            jy: current.jy,
            jm: current.jm + 1,
          };

    const prevMonthDays = getDaysInMonth(prev.jy, prev.jm);

    const result: CalendarDay[] = [];

    // روزهای ماه قبل
    for (let i = offset; i > 0; i--) {
      result.push({
        jy: prev.jy,
        jm: prev.jm,
        jd: prevMonthDays - i + 1,
        current: false,
      });
    }

    // روزهای ماه جاری
    for (let i = 1; i <= currentMonthDays; i++) {
      result.push({
        jy: current.jy,
        jm: current.jm,
        jd: i,
        current: true,
      });
    }

    // روزهای ماه بعد
    let nextDay = 1;

    while (result.length < 42) {
      result.push({
        jy: next.jy,
        jm: next.jm,
        jd: nextDay++,
        current: false,
      });
    }

    return result;
  }, [current]);
  const renderPicker = (
    list: number[],
    value: number,
    onChange: (v: number) => void,
  ) => {
    return (
      <View style={{ height: 160 }}>
        <ScrollView snapToInterval={44} decelerationRate="fast">
          {list.map((item) => {
            const active = item === value;

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
                  backgroundColor: active ? '#dbeaff' : 'transparent',
                }}
              >
                <Text
                  style={{
                    color: active ? '#2563eb' : '#000',
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
        <Text
          style={{
            fontSize: 12,
            color: '#666',
            fontFamily: 'YekanBakh',
          }}
        >
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

      <Modal visible={visible} animationType="slide">
        <View
          style={{
            flex: 1,
            padding: 16,
            backgroundColor: '#fff',
          }}
        >
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
                  jy: p.jm === 1 ? p.jy - 1 : p.jy,
                  jm: p.jm === 1 ? 12 : p.jm - 1,
                }))
              }
            >
              <Text style={{ fontSize: 24 }}>‹</Text>
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
                  jy: p.jm === 12 ? p.jy + 1 : p.jy,
                  jm: p.jm === 12 ? 1 : p.jm + 1,
                }))
              }
            >
              <Text style={{ fontSize: 24 }}>›</Text>
            </Pressable>
          </View>

          {/* WEEK HEADER */}

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            {weekDays.map((day) => (
              <Text
                key={day}
                style={{
                  width: '14.28%',
                  textAlign: 'center',
                  color: '#888',
                  fontFamily: 'YekanBakh',
                  fontWeight: '700',
                }}
              >
                {day}
              </Text>
            ))}
          </View>

          {/* CALENDAR */}

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {calendarDays.map((d, index) => {
              const disabled = !d.current || isBeforeToday(d);

              const selectedItem = isSame(selected, d);

              return (
                <Pressable
                  key={index}
                  disabled={disabled}
                  onPress={() =>
                    setSelected({
                      jy: d.jy,
                      jm: d.jm,
                      jd: d.jd,
                    })
                  }
                  style={{
                    width: '14.28%',
                    height: 48,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: disabled ? 0.45 : 1,
                    marginBottom: 6,
                  }}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: selectedItem ? '#2563eb' : 'transparent',
                    }}
                  >
                    <Text
                      style={{
                        color: selectedItem
                          ? '#fff'
                          : d.current
                            ? '#000'
                            : '#bbb',
                        fontFamily: 'YekanBakh',
                        fontWeight: '600',
                      }}
                    >
                      {d.jd}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
          {/* TIME PICKER */}

          <View className="flex flex-row justify-between items-center mt-5 border border-gray-300 p-2 rounded-lg">
            <View className="w-1/3">
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

          <View className="flex flex-row mt-20 gap-5">
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
              onPress={() => {
                if (!selected) return;

                const date = jalaliToDate(
                  selected.jy,
                  selected.jm,
                  selected.jd,
                );

                date.setHours(hour);
                date.setMinutes(minute);
                date.setSeconds(0);
                date.setMilliseconds(0);

                onChange(date);
                setVisible(false);
              }}
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
