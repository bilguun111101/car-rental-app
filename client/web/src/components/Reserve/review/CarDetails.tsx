import React, { Dispatch, SetStateAction, memo, useEffect } from 'react';
import Image from 'next/image';
import { useRental } from '@/providers/rentalProvider';

type Props = {
  setSummary: Dispatch<SetStateAction<number>>;
};

const CarDetails = ({ setSummary }: Props) => {
  const { rentals } = useRental();
  const carCostADay = rentals.car.price;
  const GPScostADay = 4 * rentals.totalDays;
  const totalDays = rentals.totalDays;
  const tax = (totalDays * carCostADay + GPScostADay) * 0.1;
  const summary = totalDays * carCostADay + GPScostADay + tax;

  useEffect(() => {
    setSummary(summary);
  }, [setSummary, summary]);

  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between'>
        <div className='flex gap-2 flex-col'>
          <h4 className='card-title md:text-xl lg:text-2xl mt-6 dark:text-gray-secondary'>
            {rentals.car.model}
          </h4>
          <p className='dark:text-gray-secondary'>{rentals.car.type}</p>
          <div className='flex gap-2 ml-2'>
            <div className='flex gap-2'>
              <Image
                src={'/icons/gear.png'}
                alt='Movie'
                width={15}
                height={15}
                className='object-contain dark:bg-gray-secondary dark:rounded-full'
              />
              <p className='text-xs text-gray-500'>
                {rentals.car.transmission}
              </p>
            </div>
            <div className='flex gap-2'>
              <Image
                src={'/icons/users.png'}
                alt='users'
                width={15}
                height={15}
                className='object-contain dark:bg-gray-secondary dark:rounded-full'
              />
              <p className='text-xs text-gray-500'>{rentals.car.passengers}</p>
            </div>
          </div>
          <div className='flex gap-2 ml-2'>
            <div className='flex gap-2'>
              <Image
                src={'/icons/km.png'}
                alt='km'
                width={15}
                height={15}
                className='object-contain dark:bg-gray-secondary dark:rounded-full'
              />
              <p className='text-xs text-gray-500'>{rentals.car.kml}KML</p>
            </div>
            <div className='flex gap-2 ml-2'>
              <Image
                src={'/icons/door.png'}
                alt='door'
                width={15}
                height={15}
                className='object-contain dark:bg-gray-secondary dark:rounded-full'
              />
              <p className='text-xs text-gray-500'>
                {rentals.car.type === 'SUV' ? '4' : '1'}
              </p>
            </div>
          </div>
        </div>
        <div className='mt-4 ml-2'>
          <Image
            src={rentals.car.image}
            alt='car'
            width={140}
            height={100}
            className='object-contain'
          />
        </div>
      </div>
      {/* ----------------------------------------------------------------------------- */}
      <div className='mt-10 w-full'>
        <p className='font-semibold dark:text-gray-secondary'>Машин</p>
        <div className='flex justify-between text-xs mt-4'>
          <p className='dark:text-gray-secondary'>
            Time & Distance 1 Day(s) @ $ {carCostADay} / Day
          </p>
          <span className='dark:text-gray-secondary'>
            $ {carCostADay * totalDays}.00
          </span>
        </div>
        <div className='flex justify-between text-xs mt-2'>
          <p className='dark:text-gray-secondary'>Хязгааргүй км</p>
          <span className='dark:text-gray-secondary'>Багтсан</span>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------- */}
      <div className='mt-10 w-full'>
        <p className='font-semibold dark:text-gray-secondary'>Нэмэлт</p>
        <div className='flex justify-between text-xs mt-4'>
          {rentals.extras.coverage ? (
            <div className='dark:text-gray-secondary'>
              Даатгал {totalDays} Day(s) @ $ 4.00 / Day
            </div>
          ) : (
            <p className='dark:text-gray-secondary'>-</p>
          )}
          <div className='dark:text-gray-secondary'>
            {' '}
            {rentals.extras.coverage ? `$ ${totalDays * 4}.00` : '$ 0.00'}
          </div>
        </div>
        <div className='flex justify-between text-xs mt-2'>
          {rentals.extras.child_safety ? (
            <div className='dark:text-gray-secondary'>
              Хүүхдийн аюулгүйн суудал {totalDays} Day(s) @ $ 4.00 / Day
            </div>
          ) : (
            <p className='dark:text-gray-secondary'>-</p>
          )}
          <div className='dark:text-gray-secondary'>
            {rentals.extras.child_safety ? `$ ${totalDays * 4}.00` : '$ 0.00'}
          </div>
        </div>
        <div className='flex justify-between text-xs mt-2'>
          {rentals.extras.GPS ? (
            <div className='dark:text-gray-secondary'>
              GPS {totalDays} Day(s) @ $ 4.00 / Day
            </div>
          ) : (
            <p className='dark:text-gray-secondary'>-</p>
          )}
          <div className='dark:text-gray-secondary'>
            {rentals.extras.GPS ? `$ ${totalDays * 4}.00` : '$ 0.00'}
          </div>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------- */}
      <div className='w-full h-0.5 dark:h-[1px] bg-gray-200 mt-8' />
      {/* ----------------------------------------------------------------------------- */}
      <div className='mt-8 w-full'>
        <p className='font-normal text-primary text-sm '>Татвар & Зардал</p>
        <div className='flex justify-between text-xs mt-4'>
          <p className='dark:text-gray-secondary'>НӨАТ татвар (10.0%)</p>
          <span className='dark:text-gray-secondary'>$ {tax.toFixed(2)}</span>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------- */}
      <div className='w-full h-0.5 dark:h-[1px] bg-gray-200 mt-8'></div>
      {/* ----------------------------------------------------------------------------- */}
      <div className='my-4 w-full'>
        <p className='font-semibold text-xs sm:text-sm dark:text-gray-secondary'>
          Нийт Дүн
        </p>
        <div className='flex justify-between text-sm mt-2 font-semibold'>
          <p className='' />
          <span className='dark:text-gray-secondary'>$</span>
          <span className='text-2xl md:text-4xl mt-[-4px] dark:text-gray-secondary'>
            {summary}
          </span>
          <span className='text-xs sm:text-sm dark:text-gray-secondary'>
            00
          </span>
        </div>
      </div>
    </div>
  );
};
export default memo(CarDetails);
