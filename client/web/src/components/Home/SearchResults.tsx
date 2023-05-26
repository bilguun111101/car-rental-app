import { geocodeCenter } from '@/atoms/geocodeCenter';
import { useRental } from '@/providers/rentalProvider';
import { MapIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';

type Props = {
  places: SearchResultsGeocode[];
  setSearchInput: Dispatch<SetStateAction<string>>;
  setPlaceHolder: Dispatch<SetStateAction<string>>;
  isFetching: boolean;
};

const SearchResults = ({
  places,
  setPlaceHolder,
  setSearchInput,
  isFetching,
}: Props) => {
  const { setRentals } = useRental();
  const [geoCenter, setGeoCenter] = useRecoilState(geocodeCenter);

  const onSubmitHandler = (location: string, center: number[]) => {
    setRentals((prev) => ({
      ...prev,
      location,
    }));
    setPlaceHolder(location);
    setGeoCenter(center);
    setSearchInput('');
  };

  return (
    <div>
      {places.map((place, i) => (
        <div
          key={place.id}
          className='hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer'
          onClick={() => onSubmitHandler(place.text, place.center)}
        >
          <div className='flex items-center justify-start '>
            <MapIcon className='h-6 md:h-8 rounded-full p-1 cursor-pointer dark:text-gray-secondary' />
            <p className='text-xs font-semibold dark:text-gray-secondary'>
              {place.text}
            </p>
          </div>
          <p className='text-[10px] pl-1 dark:text-gray-secondary'>
            {place.place_name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
