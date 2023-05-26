import { languageAtomState } from '@/atoms/languageAtom';
import useLanguage from '@/hooks/useLanguage';
import { useRental } from '@/providers/rentalProvider';
import { calculateDate } from '@/utils/calculateDate';
import { fetchPlaces } from '@/utils/fetcher';
import { ChevronDownIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { useRecoilState } from 'recoil';

// Because it opens, when click on it. So no need to import when this page renders first time.
const Calendar = dynamic(() => import('./Calendar'));
const SearchResults = dynamic(() => import('./SearchResults'));

const PickUp = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { rentals, setRentals } = useRental();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchInput, setSearchInput] = useState('');
  const [placeholder, setPlaceHolder] = useState('');
  const userId = Cookies.get('userId') as string;

  const [languageChange, setLanguageChange] = useRecoilState(languageAtomState);
  const {
    data: places,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['places'],
    queryFn: async () => searchInput && (await fetchPlaces(searchInput)),
  });
  const [locationTxt, dateRentTxt, dateReturnTxt, browseVehicleTxt] =
    useLanguage([
      'home.pickUp.location',
      'home.pickUp.dateRent',
      'home.pickUp.dateReturn',
      'home.pickUp.browseVehicle',
    ]);

  useEffect(() => {
    const { stringStartDate, stringEndDate, totalDays } = calculateDate(
      startDate,
      endDate
    );

    setRentals((prev) => ({
      ...prev,
      dateRent: stringStartDate, // etc. "2023-04-26"
      dateReturn: stringEndDate, // etc. "2023-04-29"
      totalDays, // etc. 3 days
      userId,
    }));
  }, [startDate, endDate, setRentals, userId]);

  useEffect(() => {
    refetch();
  }, [refetch, searchInput]);

  return (
    <>
      <div className='absolute -bottom-10 left-1/2 sm:-bottom-52  md:-bottom-40 lg:-bottom-10 -translate-x-1/2 bg-white dark:bg-dark-secondary p-2 shadow-md rounded-lg z-20 w-[200px] sm:w-auto md:w-[760px]'>
        <div className='flex flex-col justify-between items-center space-y-2 md:flex-row '>
          {/* 1) <Mapbox Search API /> */}
          <div className=''>
            {searchInput && (
              <div className='absolute top-16 left-1/2 md:-bottom-40 lg:-bottom-10 -translate-x-1/2 bg-gray-100 dark:bg-dark-primary p-2 shadow-md rounded-lg z-20 w-[200px] sm:w-[500px] md:w-[800px] h-fit'>
                {isFetching && (
                  <ClipLoader
                    color={theme === 'dark' ? 'white' : 'black'}
                    size={25}
                  />
                )}
                {!isFetching && places && (
                  <SearchResults
                    places={places}
                    setSearchInput={setSearchInput}
                    setPlaceHolder={setPlaceHolder}
                    isFetching={isFetching}
                  />
                )}
              </div>
            )}

            {/* 2) <Search Input /> */}
            <div className='flex md:items-center border-[1px] rounded-md py-2 md:shadow-sm dark:border-gray-500'>
              <MapPinIcon className='h-8 text-red-primary rounded-full p-1 cursor-pointer' />
              <input
                type='text'
                placeholder={placeholder || locationTxt}
                className='pl-2 bg-transparent outline-none w-full placeholder:text-sm md:placeholder:text-base dark:placeholder:text-gray-secondary dark:text-gray-secondary'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>

          {/* PICKUP date */}
          <div className='flex flex-col md:flex-row dropdown dropdown-bottom md:!m-0 sm:mt-2'>
            <label
              tabIndex={0}
              className='btn bg-white border-white dark:bg-dark-primary dark:border-gray-500 dark:border-1 text-black dark:text-gray-secondary focus:bg-white hover:bg-gray-100 md:mr-2 mb-2 md:mb-0'
            >
              <div className='flex flex-col items-start space-y-1'>
                <div className='flex flex-row space-x-4 items-center justify-between'>
                  <div className='normal-case'>{dateRentTxt}</div>
                  <ChevronDownIcon className='h-4' />
                </div>
                <div className='text-gray-400 font-normal normal-case text-[12px] sm:text-sm'>
                  {startDate.toDateString()}
                </div>
              </div>
            </label>
            <label
              tabIndex={0}
              className='btn bg-white border-white dark:bg-dark-primary dark:border-gray-500 dark:border-1 text-black dark:text-gray-secondary focus:bg-white hover:bg-gray-100 md:mr-2'
            >
              <div className='flex flex-col items-start space-y-1'>
                <div className='flex flex-row space-x-4 items-center justify-between'>
                  <div className='normal-case'>{dateReturnTxt}</div>
                  <ChevronDownIcon className='h-4' />
                </div>
                <div className='text-gray-400 font-normal normal-case text-[12px] sm:text-sm'>
                  {endDate.toDateString()}
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content menu shadow bg-white mt-2 -translate-x-24'
            >
              <li className=''>
                <Calendar
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  startDate={startDate}
                  endDate={endDate}
                />
              </li>
            </ul>
          </div>
          <button
            className='main-button m-1 md:!mt-0'
            onClick={() => {
              rentals.location === '' || rentals.totalDays === 0
                ? toast.error('Please choose your date and location')
                : router.push('/reserve/cars');
            }}
          >
            {browseVehicleTxt}
          </button>
        </div>
      </div>
    </>
  );
};

export default PickUp;
