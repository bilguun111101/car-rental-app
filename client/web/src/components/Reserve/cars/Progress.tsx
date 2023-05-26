import { activeProgress } from '@/atoms/activeProgress';
import { useRental } from '@/providers/rentalProvider';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { memo, useEffect } from 'react';
import { useRecoilState } from 'recoil';

const Progress = () => {
  const [activePage, setActivePage] = useRecoilState(activeProgress);
  const { rentals, setRentals } = useRental();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/reserve/extras')
      setActivePage({ page_car: false, page_review: false, page_extras: true });
    if (router.pathname === '/reserve/cars')
      setActivePage({ page_car: true, page_review: false, page_extras: false });
    if (router.pathname === '/reserve/review&reserve')
      setActivePage({ page_car: false, page_review: true, page_extras: false });
  }, [router.pathname, setActivePage]);

  return (
    <>
      <div className='bg-gray-secondary dark:bg-dark-primary'>
        <div className='flex flex-row justify-center flex-wrap lg:flex-nowrap items-start'>
          {/* 1) RENTAL DETAILS */}
          <div
            className='flex flex-row items-center space-x-2 p-2 sm:p-4 cursor-pointer'
            onClick={() => router.push('/')}
          >
            <div className='flex flex-col space-y-2 sm:space-y-4'>
              <div className='flex flex-row items-center space-x-2'>
                <div className='cursor-pointer'>
                  <span className='flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full border-2 border-gray-600 text-xs md:text-sm p-2 dark:text-gray-secondary'>
                    1
                  </span>
                </div>
                <label className='font-bold text-[10px] sm:text-xs md:text-sm dark:text-gray-secondary'>
                  БАЙРШИЛ
                </label>
              </div>
              <div className='text-red-500 text-[9px] sm:text-[10px] md:text-xs ml-2'>
                <div className='flex flex-col space-y-1'>
                  <p>From: {rentals.dateRent}</p>
                  <p>To: {rentals.dateReturn}</p>
                </div>
              </div>
            </div>
            <div className='pl-2 md:pl-5'>
              <ArrowRightIcon className='h-4 md:h-6 dark:text-gray-secondary' />
            </div>
          </div>
          {/* 2) PICKUP RETURN */}
          <div
            className='flex flex-row items-center space-x-2 p-2 sm:p-4 cursor-pointer'
            onClick={() => router.push('/')}
          >
            <div className='flex flex-col space-y-2 sm:space-y-4'>
              <div className='flex flex-row items-center space-x-2'>
                <div className='cursor-pointer'>
                  <span className='flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full border-2 border-gray-600 text-xs md:text-sm p-2 dark:text-gray-secondary'>
                    2
                  </span>
                </div>
                <label className='font-bold text-[10px] sm:text-xs md:text-sm dark:text-gray-secondary'>
                  АВАХ, ӨГӨХ
                </label>
              </div>
              <div className='text-red-500 text-[9px] sm:text-[10px] md:text-xs ml-2'>
                {rentals.location}
              </div>
            </div>
            <div className='pl-2 md:pl-5'>
              <ArrowRightIcon className='h-4 md:h-6 dark:text-gray-secondary' />
            </div>
          </div>
          {/* 3) VEHICLE */}
          <div
            className='flex flex-row items-center space-x-2 p-2 sm:p-4 cursor-pointer'
            onClick={() => router.push('/reserve/cars')}
          >
            <div className='flex flex-col space-y-2 sm:space-y-4'>
              <div className='flex flex-row items-center space-x-2'>
                <div className='cursor-pointer'>
                  <span
                    className={`flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full border-2 border-gray-600 text-xs md:text-sm p-2.5 dark:text-gray-secondary ${
                      activePage.page_car &&
                      'bg-gradient-to-r from-red-primary to-red-secondary text-white border-0 border-transparent '
                    } `}
                  >
                    3
                  </span>
                </div>
                <label className='font-bold text-[10px] sm:text-xs md:text-sm dark:text-gray-secondary'>
                  МАШИН
                </label>
              </div>
              <div className='flex flex-col'>
                <div
                  className={`text-[10px] sm:text-xs md:text-sm ml-2 ${
                    rentals.car?.model && 'text-red-500'
                  }`}
                >
                  {rentals.car?.model ? rentals.car?.model : 'Сонгох'}
                </div>
                <div
                  className={`text-[10px] sm:text-xs md:text-sm ml-2 ${
                    rentals.car?.type && 'text-red-500'
                  }`}
                >
                  {rentals.car?.type && rentals.car?.type}
                </div>
              </div>
            </div>
            <div className='pl-2 md:pl-5'>
              <ArrowRightIcon className='h-4 md:h-6 dark:text-gray-secondary' />
            </div>
          </div>
          {/* 4) EXTRAS */}
          <div
            className='flex flex-row items-center space-x-2 p-2 sm:p-4 cursor-pointer'
            onClick={() => router.push('/reserve/extras')}
          >
            <div className='flex flex-col space-y-2 sm:space-y-4'>
              <div className='flex flex-row items-center space-x-2'>
                <div className='cursor-pointer'>
                  <span
                    className={`flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full dark:text-gray-secondary border-gray-600 border-2 text-xs md:text-sm p-2.5 ${
                      activePage.page_extras &&
                      'bg-gradient-to-r from-red-primary to-red-secondary text-white border-0 border-transparent'
                    } `}
                  >
                    4
                  </span>
                </div>
                <label className='font-bold text-[10px] sm:text-xs md:text-sm dark:text-gray-secondary'>
                  НЭМЭЛТ
                </label>
              </div>
              <div className='flex flex-col'>
                <div
                  className={`text-[10px] sm:text-xs md:text-sm ml-2 ${
                    rentals.extras.GPS && 'text-red-500'
                  }`}
                >
                  {rentals.extras.GPS && 'GPS'}
                </div>
                <div
                  className={`text-[10px] sm:text-xs md:text-sm ml-2 ${
                    rentals.extras.child_safety && 'text-red-500'
                  }`}
                >
                  {rentals.extras.child_safety && 'Child Safety'}
                </div>
                <div
                  className={`text-[10px] sm:text-xs md:text-sm ml-2 ${
                    rentals.extras.coverage && 'text-red-500'
                  }`}
                >
                  {rentals.extras.coverage && 'Coverage'}
                </div>
              </div>
            </div>
            <div className='pl-2 md:pl-5'>
              <ArrowRightIcon className='h-4 md:h-6 dark:text-gray-secondary' />
            </div>
          </div>
          {/* 5) REVIEW & RESERVE */}
          <div
            className='flex flex-row items-center space-x-2 p-2 sm:p-4 cursor-pointer'
            onClick={() => router.push('/reserve/review&reserve')}
          >
            <div className='flex flex-col space-y-2 sm:space-y-4'>
              <div className='flex flex-row items-center space-x-2'>
                <div className='cursor-pointer'>
                  <span
                    className={`flex h-4 w-4 md:h-6 md:w-6 items-center justify-center rounded-full border-gray-600 border-2 dark:text-gray-secondary ${
                      activePage.page_review &&
                      'bg-gradient-to-r from-red-primary to-red-secondary border-0 border-transparent text-white'
                    } text-xs md:text-sm  p-2.5`}
                  >
                    5
                  </span>
                </div>
                <label className='font-bold text-[10px] sm:text-xs md:text-sm dark:text-gray-secondary'>
                  НЯГТЛАХ, ЗАХИАЛАХ
                </label>
              </div>
            </div>
            <div className='pl-2 md:pl-5'>
              <ArrowRightIcon className='h-4 md:h-6 dark:text-gray-secondary' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Progress);
