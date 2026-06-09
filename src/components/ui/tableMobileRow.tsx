import { createContext, ReactNode } from 'react';
import Text from './text';

interface ITableMobile {
  children: ReactNode;
  titleWidth?: number;
}
const TitleWidthContext = createContext(150);

export default function TableMobile({
  titleWidth = 150,
  children,
}: ITableMobile) {
  return (
    <TitleWidthContext.Provider value={titleWidth}>
      <div className='flex flex-col'>{children}</div>
    </TitleWidthContext.Provider>
  );
}

interface ITableMobileCell {
  children: ReactNode;
  headKey?: string;
  align?: AlignSetting;
}
function TableMobileCell({ children, headKey, align }: ITableMobileCell) {
  return (
    <div>
      {!!headKey && (
        <Text gray slot='title' variant='body2'>
          {headKey} :
        </Text>
      )}
      <div style={{ textAlign: align }}>{children}</div>
    </div>
  );
}

TableMobile.Cell = TableMobileCell;
