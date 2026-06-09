'use client';
import {
  Slider as RASlider,
  SliderThumb,
  SliderTrack,
  SliderProps,
} from 'react-aria-components';
import { forwardRef, ReactNode, Ref, useState } from 'react';
import Text from '@/components/ui/text';
import { renderPrice } from '@/utils/helper';
import { ILanguage } from '@/utils/interfaces/common';
import { useLocale } from 'next-intl';

interface ISlider extends SliderProps {
  label?: ReactNode;
  isPrice?: boolean;
}

function Slider(props: ISlider, ref: Ref<HTMLDivElement>) {
  const local = useLocale();
  const { minValue = 0, maxValue = 100, isPrice = false, label } = props;
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <RASlider
      minValue={minValue}
      maxValue={maxValue}
      className='w-full'
      {...props}
      ref={ref}
    >
      <div className='flex text-white'>
        <Text className='flex-1'>{label}</Text>
      </div>
      <SliderTrack
        onPointerEnter={() => setShowTooltip(true)}
        onPointerLeave={() => setShowTooltip(false)}
        onPointerDown={() => setShowTooltip(true)}
        onPointerUp={() => setShowTooltip(false)}
        className='relative w-full h-7'
      >
        {({ state }) => (
          <>
            <div className='absolute h-1.5 top-1/2 -translate-y-1/2 w-full rounded-full bg-gold-line' />
            <div
              className='absolute h-1.5 w-full top-1/2 -translate-y-1/2 rounded-full bg-purple-line bg-repeat bg-contain'
              style={{ width: state.getThumbPercent(0) * 100 + '%' }}
            />
            <SliderThumb className='h-4 w-4 top-[50%] rounded-full border border-solid border-white bg-primaryLight transition outline-hidden focus-visible:ring-2 ring-black cursor-pointer'>
              {showTooltip && (
                <div className='absolute -top-8 left-1/2 -translate-x-1/2 bg-primaryLight text-white text-xs px-2 py-1 rounded text-center whitespace-nowrap'>
                  {isPrice
                    ? renderPrice({
                        price: state.getThumbValue(0),
                        currency: 'IRR',
                        lng: local as ILanguage,
                        variant: 'caption',
                        className: 'text-white',
                      })
                    : state.getThumbValue(0)}
                </div>
              )}
            </SliderThumb>
          </>
        )}
      </SliderTrack>
      <div className='flex justify-between items-center'>
        <Text variant='caption'>
          {isPrice
            ? renderPrice({
                price: minValue,
                currency: 'IRR',
                lng: local as ILanguage,
                variant: 'caption',
              })
            : minValue}
        </Text>
        <Text variant='caption'>
          {isPrice
            ? renderPrice({
                price: maxValue,
                currency: 'IRR',
                lng: local as ILanguage,
                variant: 'caption',
              })
            : maxValue}
        </Text>
      </div>
    </RASlider>
  );
}

export default forwardRef(Slider);
