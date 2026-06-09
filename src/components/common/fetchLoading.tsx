import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

const Loading: FC<{
  type?: 'circle' | 'wide' | 'btn' | 'pageLoader';
  size?: string;
}> = props => {
  const { type, size } = props;
  return type === 'circle' ? (
    <Single size={size} />
  ) : type === 'btn' ? (
    <div className='flex items-center gap-3'>
      <Single size={'size-3'} />
      <Single size={'size-3'} count={2} />
      <Single size={'size-3'} count={3} />
    </div>
  ) : type === 'pageLoader' ? (
    <div className='grid grid-cols-3 gap-3'>
      <Single size={'size-6'} />
      <Single size={'size-6'} count={2} />
      <Single size={'size-6'} count={3} />
    </div>
  ) : (
    <div className=' w-full'>
      <div className='mx-auto bg-white w-full border border-gray-300 rounded-2xl px-7 py-5'>
        <div className='flex animate-pulse space-x-4'>
          <div className='size-10 rounded-full bg-gray-200'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-gray-200'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-200'></div>
                <div className='col-span-1 h-2 rounded bg-gray-200'></div>
              </div>
              <div className='h-2 rounded bg-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Single({ size = 'size-8', count }: { size?: string; count?: number }) {
  return (
    <span className={`relative flex ${size}`}>
      <span
        className={twMerge(
          'absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75',
          count === 2 ? 'delay-75' : count === 3 && 'delay-150',
        )}
      ></span>
      <span
        className={`relative inline-flex ${size} rounded-full bg-secondary`}
      ></span>
    </span>
  );
}

export default Loading;
