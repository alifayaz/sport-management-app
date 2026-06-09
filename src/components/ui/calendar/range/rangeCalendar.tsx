/* eslint-disable react/no-children-prop */
import { convertJalaliMonthIndexToText } from '@/utils/helper';
import {
  CalendarDate,
  fromDate,
  getLocalTimeZone,
  GregorianCalendar,
  isToday,
  parseDate,
  PersianCalendar,
  toCalendar,
  toCalendarDate,
  today,
} from '@internationalized/date';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  CalendarCell,
  CalendarGrid,
  Heading,
  RangeCalendar as RARangeCalendar,
  useLocale,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import Icon from '../../Icon';
import Text from '../../text';
import { IRangeCalendar } from '../interface';
import useWindowSize from '@/utils/hooks/common/useWindowSize';

export default function RangeCalendar(props: IRangeCalendar) {
  const t = useTranslations('uiComponents');
  const locale = useLocale();
  const showedMonth = props.visibleDurationMonth || 2;
  const td = today(getLocalTimeZone());
  const toDay = new CalendarDate(td.year, td.month, td.day);
  const [focusedDate, setFocusedDate] = useState(toDay);
  const { width } = useWindowSize();

  function handleCutPrice(price: number | undefined) {
    if (!price) return '';
    if (!isNaN(price)) {
      price = price / 1000;
      price = parseFloat(String(price));
      return price?.toLocaleString('IRR', { currency: 'IRR' });
    }
    return '';
  }

  const minValue: undefined | CalendarDate = useMemo(() => {
    if (!props.minDate) return undefined;
    const zoned = fromDate(props.minDate, getLocalTimeZone());
    const cd = toCalendarDate(zoned);
    if (locale.locale === 'fa-IR') {
      return toCalendar(cd, new PersianCalendar());
    }
    return toCalendar(cd, new GregorianCalendar());
  }, [props.minDate]);

  const maxValue: undefined | CalendarDate = useMemo(() => {
    if (!props.maxDate) return undefined;
    const zoned = fromDate(props.maxDate, getLocalTimeZone());
    const cd = toCalendarDate(zoned);
    if (locale.locale === 'fa-IR') {
      return toCalendar(cd, new PersianCalendar());
    }
    return toCalendar(cd, new GregorianCalendar());
  }, [props.maxDate]);

  useEffect(() => {
    props.focusTodayRef.current = () => setFocusedDate(toDay);
  }, [props.focusTodayRef]);

  return (
    <RARangeCalendar
      focusedValue={focusedDate}
      onFocusChange={setFocusedDate}
      aria-label='Range picker'
      visibleDuration={{ months: showedMonth }}
      className={'w-full'}
      {...props}
      minValue={minValue}
      maxValue={maxValue}
    >
      {({ state }) => (
        <>
          <header className='flex justify-between items-center p-1.5 pb-5'>
            <Button
              slot='previous'
              className={({ isDisabled }) =>
                twMerge(
                  'text-neutral-600 hover:text-primary hover:scale-125 transition-transform cursor-pointer',
                  isDisabled && 'cursor-not-allowed text-neutral-400',
                )
              }
            >
              <Icon
                icon={locale.locale === 'fa-IR' ? 'arrowRight' : 'arrowLeft'}
                size={15}
              />
            </Button>

            {locale.locale === 'fa-IR' ? (
              <>
                {showedMonth > 2 ? (
                  <div className='flex items-center gap-1'>
                    <span>{state.visibleRange.start.year}</span>
                    <span>
                      {convertJalaliMonthIndexToText(
                        state.visibleRange.start.month,
                      )}
                    </span>{' '}
                    -
                    <span>
                      {convertJalaliMonthIndexToText(
                        state.visibleRange.end.month,
                      )}
                    </span>
                    <span>
                      {state.visibleRange.start.year !==
                        state.visibleRange.end.year && (
                        <span>{state.visibleRange.end.year}</span>
                      )}
                    </span>
                  </div>
                ) : showedMonth === 2 ? (
                  <div
                    className={
                      'grid grid-cols-3 w-full px-8 [&>span]:text-center text-neutral-600'
                    }
                  >
                    <span>
                      {convertJalaliMonthIndexToText(
                        state.visibleRange.start.month,
                      )}
                    </span>
                    <span>
                      {state.visibleRange.start.year}
                      <span>
                        {state.visibleRange.start.year !==
                          state.visibleRange.end.year && (
                          <span>/ {state.visibleRange.end.year}</span>
                        )}
                      </span>
                    </span>
                    <span>
                      {convertJalaliMonthIndexToText(
                        state.visibleRange.end.month,
                      )}
                    </span>
                  </div>
                ) : (
                  <div
                    className={
                      'flex justify-center gap-2 items-center w-full px-8 [&>span]:text-center text-neutral-600'
                    }
                  >
                    <span>
                      {convertJalaliMonthIndexToText(
                        state.visibleRange.start.month,
                      )}
                    </span>
                    <span>
                      {state.visibleRange.start.year}
                      <span>
                        {state.visibleRange.start.year !==
                          state.visibleRange.end.year && (
                          <span>/ {state.visibleRange.end.year}</span>
                        )}
                      </span>
                    </span>
                  </div>
                )}
              </>
            ) : (
              <Heading className='pb-2' />
            )}

            <Button slot='next'>
              <Icon
                icon={locale.locale === 'fa-IR' ? 'arrowLeft' : 'arrowRight'}
                className='text-gray-500 hover:text-primary hover:scale-125 transition-transform cursor-pointer'
                size={15}
              />
            </Button>
          </header>

          <div className='flex gap-7'>
            {Array(showedMonth)
              .fill(1)
              .map((_, i) => (
                <CalendarGrid
                  weekdayStyle={
                    locale.locale !== 'fa-IR'
                      ? 'short'
                      : width > 600
                        ? 'narrow'
                        : 'narrow'
                  }
                  offset={{ months: i }}
                  className='w-full [&_th]:text-[11px] font-normal [&_th]:pb-2 [&_th]:border-b-1 border-gray-400 text-neutral-600'
                  key={i}
                >
                  {date => (
                    <CalendarCell
                      date={date}
                      className={({
                        isSelected,
                        isDisabled,
                        isUnavailable,
                        isInvalid,
                        isOutsideMonth,
                        isSelectionStart,
                        isSelectionEnd,
                      }) =>
                        twMerge(
                          'w-full h-14 md:w-14 md:h-14 flex flex-col justify-center items-center cursor-pointer ',
                          isDisabled && 'text-neutral-400 cursor-default',
                          isUnavailable && 'text-gray-400 cursor-default',
                          isInvalid && 'line-through text-error cursor-default',
                          isToday(date, getLocalTimeZone()) &&
                            !isSelected &&
                            'inset-shadow-[0px_0px_15px_0px_rgb(166,132,255)] rounded-[15px]',
                          isOutsideMonth && 'hidden',
                          isSelectionEnd &&
                            'rtl:rounded-l-[15px] ltr:rounded-r-[15px]',
                          props.chosenLocal === 'en' &&
                            isSelectionEnd &&
                            'rtl:rounded-l-none',
                          props.chosenLocal === 'fa' &&
                            isSelectionEnd &&
                            'ltr:rounded-r-none',
                          isSelectionStart &&
                            'rtl:rounded-r-[15px] ltr:rounded-l-[15px]',
                          props.chosenLocal === 'en' &&
                            isSelectionStart &&
                            'rtl:rounded-r-none',
                          props.chosenLocal === 'fa' &&
                            isSelectionStart &&
                            'ltr:rounded-l-none',
                          isSelected && 'bg-primaryLight text-white',
                          (isSelectionEnd || isSelectionStart) && 'bg-primary',
                        )
                      }
                      children={({ date, isSelected, isDisabled }) => {
                        const trueRoute = !!state.highlightedRange
                          ? props.cheapestData?.return || []
                          : props.cheapestData?.outbound || [];
                        if (!trueRoute.length || isDisabled)
                          return date.day.toString();
                        const founded = trueRoute.find(
                          d => parseDate(d.g_date).compare(date) === 0,
                        );

                        return (
                          <div className='flex flex-col items-center'>
                            <Text
                              variant='body'
                              className={twMerge(
                                isSelected ? 'text-white' : 'text-inherit',
                              )}
                            >
                              {date.day.toString()}
                            </Text>
                            <Text
                              className={twMerge(
                                '!text-[11px]',
                                isSelected ? 'text-white' : 'text-inherit',
                              )}
                              variant='caption'
                              center
                            >
                              {founded?.is_capacity_full
                                ? t('full')
                                : handleCutPrice(founded?.price)}
                            </Text>
                          </div>
                        );
                      }}
                    />
                  )}
                </CalendarGrid>
              ))}
          </div>
        </>
      )}
    </RARangeCalendar>
  );
}
