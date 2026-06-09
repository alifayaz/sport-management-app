'use client';

import { CalendarDate } from '@internationalized/date';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Button, Input } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { Popover } from '../../Popover';
import ModalTemplate from '../../modalTemplate';
import Calendar from '../calendar';
import { IPickDate } from '../interface';
import RangeCalendar from '../range/rangeCalendar';
import { usePickDate } from './hook';
import Icon from '../../Icon';

export default function PickDate({
  cheapestData,
  isRange,
  features,
  onChange,
  defaultValue,
  outboundSyncDateRef,
  outboundPlaceholder,
  returnPlaceholder,
  minDate = new Date(),
}: IPickDate) {
  const t = useTranslations('flightSearchForm');
  const {
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
  } = usePickDate(
    {
      initShowMonthCount: features?.initShowMonthCount,
      reset: features?.reset || false,
      switchSystem: features?.switchSystem || false,
      today: features?.today || false,
    },
    onChange,
    defaultValue,
    outboundSyncDateRef,
  );

  const defaultRageValue = useMemo(() => {
    if (defaultValue && defaultValue.length > 1) {
      return {
        start: new CalendarDate(
          defaultValue[0].getFullYear(),
          defaultValue[0].getMonth() + 1,
          defaultValue[0].getDate(),
        ),
        end: new CalendarDate(
          defaultValue[1].getFullYear(),
          defaultValue[1].getMonth() + 1,
          defaultValue[1].getDate(),
        ),
      };
    }
  }, [defaultValue]);

  const Content = () => {
    return (
      <>
        {isRange ? (
          <RangeCalendar
            visibleDurationMonth={visibleDurationMonth}
            cheapestData={cheapestData}
            minDate={minDate}
            onChange={dates => {
              setRangeValue(dates);
              onFinishDate(true, dates);
            }}
            focusTodayRef={focusTodayRef}
            defaultValue={defaultRageValue}
            value={rangeValue}
            chosenLocal={chosenLocal}
          />
        ) : (
          <Calendar
            visibleDurationMonth={visibleDurationMonth}
            cheapestData={cheapestData}
            minDate={new Date()}
            onChange={date => {
              setSingleValue(date);
              onFinishDate(false, date);
            }}
            focusTodayRef={focusTodayRef}
            defaultValue={
              defaultValue
                ? new CalendarDate(
                    defaultValue[0].getFullYear(),
                    defaultValue[0].getMonth() + 1,
                    defaultValue[0].getDate(),
                  )
                : undefined
            }
            value={singleValue}
          />
        )}

        {typeof features !== 'undefined' && (
          <div
            className={twMerge(
              visibleDurationMonth === 1
                ? 'grid grid-cols-2 gap-1'
                : 'w-full flex flex-wrap gap-2 mt-1 justify-end',
            )}
          >
            {features.today && (
              <Button
                onPress={goToDay}
                className={twMerge(
                  'flex items-center gap-1 px-1.5 text-[14px]',
                  visibleDurationMonth === 1 && 'w-full',
                )}
              >
                {t('today')}
              </Button>
            )}
            {features.reset && (
              <Button
                onPress={handleRest}
                className={twMerge(
                  'flex items-center gap-1 px-3 text-[14px] text-error',
                  'cursor-pointer transition-colors hover:bg-red-100',
                  'py-1 rounded-b-md',
                  visibleDurationMonth === 1 && 'w-full',
                )}
              >
                {t('reset')}
                <Icon icon='trash' className='text-inherit' />
              </Button>
            )}
            {features.switchSystem && (
              <Button
                onPress={handleSwitchSystem}
                style={{ gridArea: 'auto/1/auto/-1' }}
                className={twMerge(
                  'flex items-center gap-1 px-3 text-[14px] text-primary',
                  'cursor-pointer transition-colors hover:bg-primaryBrighter',
                  'py-1 rounded-b-md',
                  visibleDurationMonth === 1 && 'w-full',
                )}
              >
                {chosenLocal === 'fa'
                  ? t('switch-to-gregorian')
                  : t('switch-to-jalali')}
                <Icon icon='calendar1' className='text-inherit' />
              </Button>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div
        ref={selectionAreaRef}
        className={twMerge(
          'grid transition-colors duration-200 rounded-2xl min-h-11 px-5 border border-gray-300 focus-within:border-primary w-full bg-gray-100',
          isRange && 'grid-cols-[50%_50%] md:col-span-2',
        )}
      >
        <div className={twMerge('relative bg-gray-100')}>
          <Input
            className={twMerge(
              'h-full w-full outline-0 lg:text-base text-sm',
              !!isRange && 'border-e-1 border-gray-300',
            )}
            placeholder={
              outboundPlaceholder ? outboundPlaceholder : t('outbound-date')
            }
            readOnly
            onSelect={handleShowPopup}
            ref={outboundRef}
          />
        </div>

        {isRange && (
          <div className='relative'>
            <Input
              className={twMerge(
                'h-full w-full  outline-0 lg:text-base text-sm',
                isRange && 'ltr:pl-2 rtl:pr-2',
              )}
              placeholder={
                returnPlaceholder ? returnPlaceholder : t('return-date')
              }
              readOnly
              onSelect={handleShowPopup}
              ref={returnRef}
            />
          </div>
        )}
      </div>

      {isMobile ? (
        <ModalTemplate
          show={showPopup}
          onClose={isOpen => {
            if (isOpen) handleShowPopup();
            else handleClosePopup();
          }}
        >
          <Content />
        </ModalTemplate>
      ) : (
        <Popover
          triggerRef={selectionAreaRef}
          isOpen={showPopup}
          onOpenChange={isOpen => {
            if (isOpen) handleShowPopup();
            else handleClosePopup();
          }}
          className={'w-fit max-w-[unset] p-5'}
        >
          <Content />
        </Popover>
      )}
    </>
  );
}
