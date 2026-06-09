import React, { ReactNode } from 'react';
import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
} from 'react-aria-components';
import Icon from '@/components/ui/Icon';
import Text from '@/components/ui/text';

const Collapse: React.FC<{
  children: ReactNode;
  className?: string;
  isOpen?: boolean;
  title?: string;
}> = props => {
  const { children, title, className, isOpen = false } = props;
  return (
    <Disclosure defaultExpanded={isOpen} className={className}>
      <Heading>
        <Button
          slot='trigger'
          className='react-aria-Button w-full flex justify-between items-center cursor-pointer mb-3'
        >
          <Text className=''>{title}</Text>
          <Icon icon='arrowDown' size={14} className='text-primaryLight' />
        </Button>
      </Heading>
      <DisclosurePanel className='react-aria-DisclosurePanel'>
        {children}
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Collapse;
