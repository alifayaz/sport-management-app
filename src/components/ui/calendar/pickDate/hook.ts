import { useChangeLocal } from '@/components/common/clientAppProvider/clientAppProvider';
import { usePathname } from '@/i18n/navigation';
import { dateFormat } from '@/utils/constants';
import useIsMobile from '@/utils/hooks/common/useIsMobile';
import useDateFns from '@/utils/hooks/useDateFns';
import { ILanguage } from '@/utils/interfaces/common';
import { getLocalTimeZone } from '@internationalized/date';
import {
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { DateValue, useLocale } from 'react-aria';
import type { DateRange } from 'react-aria-components';
import { ICalendarFeatures } from '../interface';

export function usePickDate(
  features: ICalendarFeatures,
  onChange?: (value: Date[]) => void,
  defaultValue?: Date[],
  outboundSyncDateRef?: RefObject<HTMLInputElement | null>,
) {
  const { locale } = useLocale();
  const pathname = usePathname();
  const changeLocal = useChangeLocal();
  const isMobile = useIsMobile();
  const [chosenLocal, setChosenLocal] = useState<ILanguage>(
    locale === 'fa-IR' ? 'fa' : 'en',
  );
  const [rangeValue, setRangeValue] = useState<DateRange>();
  const [singleValue, setSingleValue] = useState<DateValue>();
  const selectionAreaRef = useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [visibleDurationMonth, setVisibleDurationMonth] = useState(2);
  const { format } = useDateFns(chosenLocal === 'fa' ? 'jalali' : 'gregorian');
  const focusTodayRef = useRef<() => void>(() => undefined);

  const returnRef = useRef<HTMLInputElement | null>(null);
  const outboundRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(
    outboundSyncDateRef,
    () => ({
      ...(outboundRef?.current as HTMLInputElement),
      openPopup: handleShowPopup,
    }),
    [outboundSyncDateRef, outboundRef],
  );

  function handleShowPopup() {
    if (pathname === '/' && !isMobile) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      setTimeout(() => setShowPopup(true), 250);
      return;
    }
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
  }

  function onFinishDate(isRange: boolean, date: DateValue | DateRange) {
    if (isRange && isDateRange(date)) {
      onChange?.([
        date.start.toDate(getLocalTimeZone()),
        date.end.toDate(getLocalTimeZone()),
      ]);
      if (outboundRef.current) {
        const d = date.start.toDate(getLocalTimeZone());
        outboundRef.current.value = format(d, dateFormat.justDateFormat);
      }
      if (returnRef.current) {
        const d = date.end.toDate(getLocalTimeZone());
        returnRef.current.value = format(d, dateFormat.justDateFormat);
      }
    } else if (!isDateRange(date)) {
      onChange?.([date.toDate(getLocalTimeZone())]);
      if (outboundRef.current)
        outboundRef.current.value = format(
          date.toDate(getLocalTimeZone()),
          dateFormat.justDateFormat,
        );
    }
    handleClosePopup();
  }

  function goToDay() {
    if (!showPopup) return;
    focusTodayRef.current?.();
  }

  function handleRest() {
    if (!showPopup) return;
    if (outboundRef.current) outboundRef.current.value = '';
    if (returnRef.current) returnRef.current.value = '';
    onChange?.([]);
    setRangeValue(undefined);
    setSingleValue(undefined);
  }

  function handleSwitchSystem() {
    if (chosenLocal === 'fa') {
      changeLocal('en');
      setChosenLocal('en');
    } else {
      changeLocal('fa');
      setChosenLocal('fa');
    }
  }

  function isDateRange(value: DateValue | DateRange): value is DateRange {
    return (value as DateRange).start !== undefined;
  }

  useEffect(() => {
    if (defaultValue?.[0] && outboundRef.current) {
      outboundRef.current.value = format(
        defaultValue?.[0],
        dateFormat.justDateFormat,
      );
    }
  }, [defaultValue, outboundRef.current]);

  useEffect(() => {
    if (defaultValue?.[1] && returnRef.current) {
      returnRef.current.value = format(
        defaultValue?.[1],
        dateFormat.justDateFormat,
      );
    }
  }, [defaultValue, returnRef.current]);

  useEffect(() => {
    if (features.initShowMonthCount) {
      setVisibleDurationMonth(features.initShowMonthCount);
    }
  }, [features.initShowMonthCount]);

  return {
    chosenLocal,
    selectionAreaRef,
    showPopup,
    handleShowPopup,
    handleClosePopup,
    onFinishDate,
    visibleDurationMonth,
    returnRef,
    outboundRef,
    goToDay,
    handleRest,
    handleSwitchSystem,
    focusTodayRef,
    isMobile,
    rangeValue,
    setRangeValue,
    singleValue,
    setSingleValue,
  };
}
