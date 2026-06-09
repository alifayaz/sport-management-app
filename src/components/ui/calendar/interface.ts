import { ICheapestData } from '@/utils/interfaces/common';
import { RefObject } from 'react';
import { CalendarProps, DateValue, RangeCalendarProps } from 'react-aria';

export interface IPickDate {
  onChange?: (value: Date[]) => void;
  defaultValue?: Date[];
  cheapestData?: ICheapestData;
  isRange?: boolean;
  features?: ICalendarFeatures;
  outboundSyncDateRef?: RefObject<HTMLInputElement | null>;
  outboundPlaceholder?: string;
  returnPlaceholder?: string;
  minDate?: Date;
}

export interface ICalendarFeatures {
  reset?: boolean;
  today?: boolean;
  switchSystem?: boolean;
  initShowMonthCount?: number;
}

export interface IRangeCalendar extends RangeCalendarProps<DateValue> {
  visibleDurationMonth?: number;
  cheapestData?: ICheapestData;
  minDate?: Date;
  maxDate?: Date;
  focusTodayRef: RefObject<() => void>;
  chosenLocal?: string;
}

export interface ICalendar extends CalendarProps<DateValue> {
  visibleDurationMonth?: number;
  cheapestData?: ICheapestData;
  minDate?: Date;
  maxDate?: Date;
  focusTodayRef: RefObject<() => void>;
}
