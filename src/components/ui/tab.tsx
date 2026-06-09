import React, { ReactNode } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Collection,
} from 'react-aria-components';
import Text from '@/components/ui/text';
import { twMerge } from 'tailwind-merge';

interface IData {
  id: number;
  title: string;
  icon?: ReactNode;
  content: ReactNode;
  isDisabled?: boolean;
}

const CustomTab: React.FC<{
  data: IData[];
  className?: string;
  justify?: boolean;
}> = props => {
  const { data, className, justify } = props;
  return (
    <Tabs
      defaultSelectedKey='keyboard'
      className={twMerge(
        className,
        'flex data-[orientation=horizontal]:flex-col',
      )}
    >
      <TabList
        aria-label='Dynamic tabs'
        items={data}
        className='flex data-[orientation=horizontal]:border-b-3 data-[orientation=horizontal]:border-white'
      >
        {item => (
          <Tab
            className={twMerge(
              'lg:px-14 px-2 lg:text-base text-sm py-2 cursor-pointer outline-none relative transition-colors duration-500 -mb-1',
              'gap-2 flex items-center border-b-7 border-transparent data-[selected]:border-b-7 data-[selected]:border-primary',
              'data-[disabled]:text-neutral-400 data-[orientation=horizontal]:border-b-2 data-[orientation=horizontal]:border-gray-300',
              justify && 'w-full justify-center',
            )}
            isDisabled={item.isDisabled}
          >
            {item.icon}
            <Text variant='body2'>{item.title}</Text>
          </Tab>
        )}
      </TabList>

      <Collection items={data}>
        {item => (
          <TabPanel className='mt-1 p-2 outline-none'>{item.content}</TabPanel>
        )}
      </Collection>
    </Tabs>
  );
};

export default CustomTab;
