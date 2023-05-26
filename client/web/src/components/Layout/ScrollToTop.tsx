import { ArrowUpIcon } from '@heroicons/react/24/solid';

type Props = {};

const ScrollToTop = (props: Props) => {
  return (
    <div className='fixed bottom-10 right-10 z-50'>
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
        className='btn opacity-50 hover:opacity-90'
      >
        <ArrowUpIcon className='h-4 text-white font-bold' />
      </button>
    </div>
  );
};

export default ScrollToTop;
