//Loading for navigating between pages

import Loading from '../common/fetchLoading';

export default function SiteLoading() {
  return (
    <div className={'w-full h-[60vh] flex items-center justify-center'}>
      <div className='flex gap-1 items-center md:scale-[1.3]'>
        <Loading type='pageLoader' />
      </div>
    </div>
  );
}
