import { useRental } from '@/providers/rentalProvider';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

const Card = ({
  image,
  type,
  typeDefinition,
  model,
  kml,
  transmission,
  passengers,
  price,
}: CarsType) => {
  const { rentals, setRentals } = useRental();
  const router = useRouter();
  const totalDays = rentals.totalDays;

  const goToExtrasPage = useCallback(() => {
    if (totalDays === 0) return toast.error('Та байршил, өдрөө сонгоно уу');

    setRentals((prev) => ({
      ...prev,
      car: {
        image,
        type,
        typeDefinition,
        model,
        kml,
        transmission,
        passengers,
        price,
      },
    }));

    router.push('/reserve/extras');
  }, [
    image,
    kml,
    price,
    router,
    model,
    passengers,
    totalDays,
    transmission,
    typeDefinition,
    type,
    setRentals,
  ]);

  return (
    <div className='mb-5'>
      <div className='flex flex-col py-5 md:px-5 items-center justify-center md:flex-row md:justify-between bg-white dark:bg-dark-secondary shadow-xl rounded-xl hover:bg-gray-50 hover:scale-[1.01] transition-all duration-300 '>
        <figure>
          <Image
            src={image}
            alt='cars'
            width={150}
            height={150}
            className='md:w-[400px]'
            priority={true}
          />
        </figure>
        <div className='card-body p-4 w-full'>
          <h4 className='card-title md:text-2xl dark:text-gray-secondary'>
            {typeDefinition}
          </h4>
          <p className='dark:text-gray-secondary'>{model}</p>
          <div className='flex space-x-2 md:flex-wrap'>
            <div className='flex space-x-1'>
              <Image
                src={'/icons/km.png'}
                alt='Movie'
                width={15}
                height={15}
                className='object-contain dark:bg-gray-secondary rounded-full'
              />
              <p className='font-semibold dark:text-gray-secondary'>
                {kml} KML
              </p>
            </div>
            <div className='flex space-x-1'>
              <Image
                src={'/icons/gear.png'}
                alt='Movie'
                width={15}
                height={15}
                className='object-contain dark:bg-gray-secondary rounded-full'
              />
              <p className='font-semibold dark:text-gray-secondary'>
                {transmission}
              </p>
            </div>
            <div className='flex space-x-1'>
              <Image
                src={'/icons/users.png'}
                alt='Movie'
                width={15}
                height={15}
                className='object-contain dark:bg-gray-secondary rounded-full'
              />
              <p className='font-semibold dark:text-gray-secondary'>
                {passengers}
              </p>
            </div>
            <div className='flex space-x-1'>
              <Image
                src={'/icons/door.png'}
                alt='Movie'
                width={15}
                height={15}
                className='object-contain dark:bg-gray-secondary rounded-full'
              />
              <p className='font-semibold dark:text-gray-secondary'>
                {type === 'Bus' ? '1' : '4'}
              </p>
            </div>
          </div>
          <div
            tabIndex={0}
            className='collapse collapse-arrow bg-gray-100 dark:bg-transparent rounded-box w-full '
          >
            <div className='collapse-title text-sm lg:text-lg font-medium text-red-primary dark:bg-dark-primary '>
              Дэлгэрэнгүй
            </div>
            <div className='collapse-content flex flex-row flex-wrap space-x-2 md:grid dark:bg-dark-primary'>
              <div>
                <span className='text-xs sm:text-sm pl-2 dark:text-gray-secondary'>
                  Make:{' '}
                </span>
                <span className='text-xs sm:text-sm font-semibold dark:text-gray-secondary'>
                  Toyota
                </span>
              </div>
              <div>
                <span className='text-xs sm:text-sm dark:text-gray-secondary'>
                  Загвар:{' '}
                </span>
                <span className='text-xs sm:text-sm font-semibold dark:text-gray-secondary'>
                  {model}
                </span>
              </div>
              <div>
                <span className='text-xs sm:text-sm dark:text-gray-secondary'>
                  Он:{' '}
                </span>
                <span className='text-xs sm:text-sm font-semibold dark:text-gray-secondary'>
                  {2020}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full px-6 md:w-auto md:px-2'>
          <div>
            <p className='dark:text-gray-secondary'>Дараа төлөх</p>
            <div className='divider m-0 before:h-[1px] after:h-[1px] dark:before:bg-gray-secondary dark:after:bg-gray-secondary' />

            <div className='flex flex-row justify-end '>
              <div className='w-full bg-white p-2 dark:bg-dark-secondary'>
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex flex-row space-x-2 justify-end'>
                    <span className='font-semibold pt-1 dark:text-gray-secondary'>
                      $
                    </span>
                    <span className='font-semibold text-3xl dark:text-gray-secondary'>
                      {price}
                    </span>
                    <span className='text-sm pt-1 dark:text-gray-secondary'>
                      .00
                    </span>
                  </div>
                  <p className='text-gray-400 text-sm'>1 өдөр</p>
                </div>
              </div>
              <div className='divider divider-horizontal h-9 mt-5 before:h-[1px] after:h-[1px] dark:before:bg-gray-secondary dark:after:bg-gray-secondary' />
              <div className='w-full bg-white p-2 dark:bg-dark-secondary'>
                <div className='flex flex-col justify-center items-center'>
                  <div className='flex flex-row space-x-2 justify-end'>
                    <span className='font-semibold pt-1 dark:text-gray-secondary'>
                      $
                    </span>
                    <span className='font-semibold text-3xl dark:text-gray-secondary'>
                      {price * totalDays}
                    </span>
                    <span className='text-sm pt-1 dark:text-gray-secondary'>
                      .00
                    </span>
                  </div>
                  <p className='text-gray-400 text-sm'>Нийт</p>
                </div>
              </div>
            </div>
          </div>

          <button
            className='btn btn-primary btn-xs sm:btn-sm md:btn-md normal-case rounded-3xl py-2 w-full'
            onClick={goToExtrasPage}
          >
            Сонгох
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
